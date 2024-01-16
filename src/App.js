import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { BLUE_COLOR, PURPLE_COLOR } from './defaults';


const theme = createTheme({
  palette: {
    primary: {
      main: PURPLE_COLOR
    },
    secondary: {
      main: BLUE_COLOR
    }
  }
})


export const HOME_PATH = '/home';
export const PROFILE_PATH = '/perfil';


const initialState = {};

const reducer = (state = initialState, { type, property, field, value }) => {
  switch (type) {
    default:
      if (type && property && field) return { ...state, [type]: { ...state[type], [property]: { ...state[type][property], [field]: value } } };
      else if (type && field) return { ...state, [type]: { ...state[type], [field]: value } };
      else if (field) return { ...state, [field]: value };
  }
};

export const GlobalContext = createContext(initialState);


function App() {

  const navigate = useNavigate();
  const [state, dispatch] = useReducer(reducer, initialState);
  const globalContextValues = useMemo(() => ({ ...state, dispatch }), [state, dispatch]);

  const goToHome = useCallback(() => {
    if (window.location.pathname) navigate(HOME_PATH);
  }, [navigate]);
  useEffect(() => goToHome(), [goToHome]);

  //[ DEVELOPMENT ONLY ]
  console.log('globalContextValues', globalContextValues);


  return (
    <ThemeProvider theme={theme}>
      <GlobalContext.Provider value={globalContextValues}>
        <Routes>
          <Route path={HOME_PATH} Component={Home} />
          <Route path={`${PROFILE_PATH}/:profileId`} Component={Profile} />
        </Routes>
      </GlobalContext.Provider>
    </ThemeProvider>
  );
};


export default App;
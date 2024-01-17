import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';
import { createContext, useCallback, useEffect, useMemo, useReducer } from 'react';
import { ThemeProvider, createTheme } from '@mui/material';
import { BLUE_COLOR, PURPLE_COLOR } from './defaults';
import AppBar from './components/AppBar';

//[ DEVELOPMENT ONLY ]
const staticSearch = {
  inputValue: "maria",
  options: [],
  option: {
    "login": "maria",
    "id": 1681405,
    "node_id": "MDQ6VXNlcjE2ODE0MDU=",
    "avatar_url": "https://avatars.githubusercontent.com/u/1681405?v=4",
    "gravatar_id": "",
    "url": "https://api.github.com/users/maria",
    "html_url": "https://github.com/maria",
    "followers_url": "https://api.github.com/users/maria/followers",
    "following_url": "https://api.github.com/users/maria/following{/other_user}",
    "gists_url": "https://api.github.com/users/maria/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/maria/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/maria/subscriptions",
    "organizations_url": "https://api.github.com/users/maria/orgs",
    "repos_url": "https://api.github.com/users/maria/repos",
    "events_url": "https://api.github.com/users/maria/events{/privacy}",
    "received_events_url": "https://api.github.com/users/maria/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Maria Niță",
    "company": "@Google",
    "blog": "",
    "location": "Zurich, Switzerland",
    "email": null,
    "hireable": null,
    "bio": "People. Tech. Sustainability.",
    "twitter_username": null,
    "public_repos": 52,
    "public_gists": 4,
    "followers": 210,
    "following": 7,
    "created_at": "2012-04-26T10:02:04Z",
    "updated_at": "2023-02-02T09:43:45Z"
  }
};


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

const initialStateHomeLoading = {
  search: false
}

const initialState = {
  // search: {
  //   inputValue: '',
  //   options: [],
  //   option: {}
  // },
  search: staticSearch, //[ DEVELOPMENT ONLY ]
  home: {
    loading: initialStateHomeLoading
  }
};

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
    // (window.location.pathname === '/') && navigate(HOME_PATH);
    navigate(`${PROFILE_PATH}/${staticSearch.option.login}`); //[ DEVELOPMENT ONLY ]
  }, [navigate]);
  useEffect(() => goToHome(), [goToHome]);

  //[ DEVELOPMENT ONLY ]
  console.log('globalContextValues', globalContextValues);


  return (
    <ThemeProvider theme={theme}>
      <GlobalContext.Provider value={globalContextValues}>
        {(window.location.pathname !== '/') && <AppBar />}
        <Routes>
          <Route path={HOME_PATH} Component={Home} />
          <Route path={`${PROFILE_PATH}/:profileId`} Component={Profile} />
        </Routes>
      </GlobalContext.Provider>
    </ThemeProvider>
  );
};


export default App;
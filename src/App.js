import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Profile from './pages/Profile';


function App() {
  return (
    <div>
      <Routes>
        <Route path='/home' Component={Home} />
        <Route path='/perfil/:profileId' Component={Profile} />
      </Routes>
    </div>
  );
};


export default App;
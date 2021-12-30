import React from 'react';
import Navbar from './components/Navbar'
import './App.css';
import Home from './pages/Home';
import { BrowserRouter as Router, Switch, Route,Routes} from 'react-router-dom';
import Projets from './pages/Projets';
import Consulter from './pages/Consulter';
import Ajout from './pages/Ajout';
import Profile from './pages/Profile';
import Login from  './pages/Login';
import { getUser } from './api/users';
import { faGetPocket } from '@fortawesome/free-brands-svg-icons';

function App() {

  return (
    <Router>
    <Navbar user={getUser}/>
    <Routes>
      <Route path='/' exact element={<Home/>} />
      <Route path='/Projets' element={<Projets/>} />
      <Route path='/login' element={<Login/>} />
      <Route path='/ajout' element={<Ajout/>} />
      <Route path='/consulter' element={<Consulter/>} />
      <Route path='/profile' element={<Profile/>} />
    </Routes>

  </Router>)
}

export default App;

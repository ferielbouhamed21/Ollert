import React from 'react';
import Navbar from './components/Navbar'
import Footer from './components/Footer'
// import './App.css';
import Home from './pages/home';
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';
import Projects from './pages/projects';
import Consulter from './pages/Consulter';
import Ajout from './pages/Ajout';
import Profile from './pages/Profile';
import Login from './pages/Login';
import { getUser } from './api/users';
import { faGetPocket } from '@fortawesome/free-brands-svg-icons';

function App() {
    const [user, setUser] = React.useState({});
    React.useEffect(async () => {
        setUser(await getUser());
    }, []);
    return (
        <Router>
            <div className="ollert-app">
                <Navbar user={user} />
                <div className="content">
                    <Routes>
                        <Route path='/' exact element={<Home />} />
                        <Route path='/Projets' element={<Projects />} />
                        <Route path='/login' element={<Login />} />
                        <Route path='/ajout' element={<Ajout />} />
                        <Route path='/consulter' element={<Consulter />} />
                        <Route path='/profile' element={<Profile />} />
                    </Routes>
                </div>
<Footer/>
            </div>
        </Router>)
}

export default App;

import React from 'react';
import Navbar from './components/Navbar'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getUser } from './api/users'
import Home from "./pages/home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Projects from "./pages/projects";
import TasksList from "./pages/TasksList";
import Consulter from './pages/Consulter';
import Ajout from './pages/Ajout';
import Profile from './pages/Profile';
import Login from './pages/Login';
import axios from "axios";


function App() {
	const [user, setUser] = React.useState({});

	React.useEffect(async () => {
		axios.post('/api/users/login', {
			email: 'chaimabouhle@gmail.com',
			password: 'ollert'
		})
		setUser(await getUser());
	}, []);

	return (
		<Router>
			<div className="ollert-app">
				<Navbar user={user} />
				<Header />
				<div className="content">
					<Routes>
						<Route exact path="/" element={<Home />}> </Route>
						<Route exact path="/projects" element={<Projects />}> </Route>
						<Route exact path="/taskslist" element={<TasksList />}> </Route>
						<Route path="/projects" element={<Projects user={user} />} />
						<Route path='/login' element={<Login />} />
						<Route path='/ajout' element={<Ajout />} />
						<Route path='/consulter' element={<Consulter />} />
						<Route path='/profile' element={<Profile />} />
					</Routes>
				</div>
				<Footer />
			</div>
		</Router>
	);
}

export default App;

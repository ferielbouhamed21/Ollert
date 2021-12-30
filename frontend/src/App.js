import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import  {getUser} from './api/users'
import Home from "./pages/home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Projects from "./pages/projects";
import TasksList from "./pages/TasksList";
import axios from "axios";

function App() {
	const [user, setUser] = React.useState({});

	React.useEffect(async () => {
		axios.post('/api/users/login',{ 
			email: 'chaimabouhle@gmail.com',
			password: 'ollert'
		})
		setUser(await getUser());
	}, []);

	return(
	<Router>
		<div className="ollert-app">
			<Header/>
			<div className="content">
				<Routes>
					<Route exact path ="/" element={<Home/>}> </Route>
					<Route exact path ="/projects" element={<Projects/>}> </Route>
					<Route exact path ="/taskslist" element={<TasksList />}> </Route>
					<Route path="/projects" element={<Projects user={user} />} />
				</Routes>
			</div>
			<Footer/>
		</div>
	</Router>
	);
}

export default App;

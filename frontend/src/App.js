import React from "react";
import {ProjectList} from "./components/ProjectList";
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Home from "./pages/home";
// import Header from "./components/Header";
// import Footer from "./components/Footer";
// import Projects from "./pages/projects";
// import TasksList from "./pages/TasksList";

let userExample = {role: 'CHEF'};
let page = 1;
const projectExample =
	<ProjectList projects = {[
		{
			id: 1,
			name: 'ahmini',
			nbCompleted: 2,
			nbTotal: 100,
			dueDate: new Date(2022, 6, 25),
			members: [
				{id: 0, name: 'wadhah', imageSource: './img/wadhah.png'}
			]},
		{
			id: 2,
			name: 'jei-formation',
			nbCompleted: 20,
			nbTotal: 20,
			dueDate: new Date(2021, 10, 30),
			members: [
				{id: 1, name: 'sofiene chihi', imageSource: './img/sofienechihi.png'},
				{id: 2, name: 'elli yji', imageSource: './img/elliyji.png'}
			]},
		{
			id: 3,
			name: 'ollert',
			nbCompleted: 0,
			nbTotal: 20,
			dueDate: new Date(2022, 0, 1),
			members: [
				{id: 3, name: 'omar besbes', imageSource: './img/omarbesbes.png'},
				{id: 4, name: 'feriel bouhamed', imageSource: './img/ferielbouhamed.png'},
				{id: 5, name: 'chaima bouhlel', imageSource: './img/chaimabouhlel.png'},
				{id: 6, name: 'semah chaouech', imageSource: './img/semahchaouech.png'}
			]},
		{
			id: 4,
			name: 'mahrouda',
			nbCompleted: 6,
			nbTotal: 10,
			dueDate: new Date(2021, 10, 10),
			members: [
				{id: 7, name: 'mahroud', imageSource: './img/mahroud.png'}
			]}
	]} members = {[
		{id: 0, name: 'wadhah', imageSource: './img/wadhah.png'},
		{id: 1, name: 'sofiene chihi', imageSource: './img/sofienechihi.png'},
		{id: 2, name: 'elli yji', imageSource: './img/elliyji.png'},
		{id: 3, name: 'omar besbes', imageSource: './img/omarbesbes.png'},
		{id: 4, name: 'feriel bouhamed', imageSource: './img/ferielbouhamed.png'},
		{id: 5, name: 'chaima bouhlel', imageSource: './img/chaimabouhlel.png'},
		{id: 6, name: 'semah chaouech', imageSource: './img/semahchaouech.png'},
		{id: 7, name: 'mahroud', imageSource: './img/mahroud.png'}
	]} user={userExample} page={page} nbPages={5} />;

function App() {
	return (projectExample);
}

// function App() {
// 	const [user, setUser] = React.useState({});
// 	React.useEffect(async () => {
// 		setUser(await getUser());
// 	}, []);
//
// 	<Router>
// 		<div className="ollert-app">
// 			<Header/>
// 			<div className="content">
// 				<Routes>
// 					<Route exact path ="/" element={<Home/>}> </Route>
// 					<Route exact path ="/projects" element={<Projects/>}></Route>
// 					<Route exact path ="/taskslist" element={<TasksList />}></Route>
// 					<Route path="/projects" element={<Projects user={user} />} />
// 				</Routes>
// 			</div>
// 			<Footer/>
// 		</div>
// 	</Router>
// }

export default App;

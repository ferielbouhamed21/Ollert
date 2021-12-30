// Author : omar besbes
// Component renders the list of all projects

import {render} from "react-dom";
import {Project} from "./Project";
import {AddProject} from "./AddProject";
import "../styles/ProjectList.css";
import React, {useState} from "react";
import {GeneratePages} from "./GeneratePages";

function ProjectList(props) {
	let style = {display: 'hidden'};
	let [page, setPage] = useState(1);

	// changes page
	const changePage = (nextPage) => {
		try {
			if (nextPage === 'next')
				setPage(page+1);
			else if (nextPage === 'previous')
				setPage(page-1);
			else setPage(parseInt(nextPage));
		}
		catch (err) {
			document.getElementById('root').innerHTML = err.message;
		}
	};

	// renders addProject when user clicks on button
	const addProject = () => {
		render(
			<AddProject members={props.members}/>,
			document.getElementById('root')
		)
	};

	// this function hides addButton when user is not a manager
	const addButtonStyle = () => {
		if(props.user.role === 'CHEF')
			style = {display: 'visible'};
		return style;
	};

	try {
		return (
			<div className="projectList-page">
				<div className="projectList-window">
					{props.projects.map((project) =>
						<Project
							key={project.id}
							{...project}
						/>
					)}
					<div className="projectList-buttonWindow">
						<button
							className="projectList-addButton"
							onClick={addProject}
							style={addButtonStyle()}
						>
							<span> + </span>
						</button>
					</div>
				</div>
				<div className="projectList-pagination">
					<a onClick={() => changePage('previous')} > &laquo; </a>
					<GeneratePages changePage={changePage} page={page} nbPages={props.nbPages} />
					<a onClick={() => changePage('next')} > &raquo; </a>
				</div>
			</div>
		)
	}
	catch (err) {
		document.getElementById('root').innerHTML = err.message;
	}
}

export {ProjectList};
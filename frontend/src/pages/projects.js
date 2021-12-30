import React, { useEffect, useState } from "react";
import { ProjectList } from "../components/ProjectList";
import axios from "axios";
import { getUser } from "../api/users";

function Projects() {
	const [projects, setProjects] = useState([]);
	const [allMembers, setAllMembers] = useState([]);
	const [page, setPage] = useState(1);
	const [user, setUser] = useState({});
	const rowCount = 6;


	useEffect(() => {
		// getting projects within current page
		axios.get('/api/projects/list/' + rowCount + '/' + page).then((response) => {
			setProjects(response.data);
		});

		// getting the list of all members in database
		axios.get('api/users/list').then(response => {
			setAllMembers(response.data);
		});

		// getting current user
		getUser().then(u => {
			setUser(u);
		});
	}, [page, user, allMembers, projects]);

	return (
		<ProjectList
			projects={projects}
			allMembers={allMembers}
			user={user}
			page={page}
			nbPages={Math.ceil(projects.length / rowCount)}
			setPage={setPage}
		/>
	);
}

export default Projects;
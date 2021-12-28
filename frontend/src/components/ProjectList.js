// Author : omar besbes
// Component renders the list of all projects

import {render} from "react-dom";
import {Project} from "./Project";
import {AddProject} from "./AddProject";
import "../styles/ProjectList.css";

function ProjectList(props) {
    let allMembers = [];

    try {
        props.Projects.map((project) => {
            project.members.map((member) => {
                const newMember = member;
                newMember.isSelected = false;
                allMembers.push(newMember);
            });
        });
    }
    catch (err) {
        document.getElementById('root').innerHTML = err.message();
    }

    let addProject = () => {
        render(
            <AddProject members={allMembers}/>,
            document.getElementById('root')
        )
    };

    try {
        return (
            <div className="projectList-window">
                {props.Projects.map((project) =>
                    <Project
                        key={project.id}
                        name={project.name}
                        nbCompleted={project.nbCompleted}
                        nbTotal={project.nbTotal}
                        members={project.members}
                        dueDate={project.dueDate}
                    />
                )}
                <div className="projectList-buttonWindow">
                    <button onClick={addProject} className="projectList-addButton">
                        <span> Add Project </span>
                    </button>
                </div>
            </div>
        )
    }
    catch (err) {
        document.getElementById('root').innerHTML = err.message();
    }
}

export {ProjectList};
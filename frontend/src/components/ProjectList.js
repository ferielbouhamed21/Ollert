// Author : omar besbes
// Component renders the list of all projects

import {render} from "react-dom";
import {Project} from "./Project";
import {AddProject} from "./AddProject";
import "../styles/projectList.css";

function ProjectList(props) {
    // let [nbProjects, setNbProjects] = useState(0);
    let allMembers = [];

    try {
        props.Projects.map((project) => {
            project.members.map((member) => {
                const newMember = member;
                newMember.selectStatus = false;
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
            <div className="projectList">
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
                <button onClick={addProject} className="addProject">
                    <span> Add Project </span>
                </button>
            </div>
        )
    }
    catch (err) {
        document.getElementById('root').innerHTML = err.message();
    }
}

export {ProjectList};
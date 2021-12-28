// Author : omar besbes
// Component renders a single project

import {useState, useEffect} from "react";
import '../styles/Project.css';

// This function calculates given a date the number of days remaining until that day comes
function CalculateDaysRemaining(dueDate) {
    const current = new Date();
    return Math.floor((dueDate.getTime() - current.getTime()) / (24 * 60 * 60 * 1000));
}

function Project(props) {
    let [nbDaysLeft, setNbDaysLeft] = useState(CalculateDaysRemaining(props.dueDate));
    const members = props.members.slice(0, 2);

    // Calculates nbDaysLeft every minute and renders it
    useEffect(() => {setTimeout(() => {
        setNbDaysLeft(CalculateDaysRemaining(props.dueDate));
    }, 60*1000)});

    let projectNameJSX =
        <div className="project-projectName">
            <a> {props.name} </a>
        </div>;

    let membersJSX;
    if (members.length < props.members.length)
       membersJSX =
          <div className="project-members">
             <div className="project-member"> Members : </div>
             <div className="project-membersImages">
                {members.map((member) =>
                   <img
                      key={member.id}
                      className="project-memberImage"
                      src={member.imageSource}
                      alt={member.name}
                   />
                )}
                ...
            </div>
          </div>
    else membersJSX =
       <div className="project-members">
          <div className="project-member"> Members : </div>
          <div className="project-membersImages">
             {members.map((member) =>
                <img
                   key={member.id}
                   className="project-memberImage"
                   src={member.imageSource}
                   alt={member.name}
                />
             )}
          </div>
       </div>;

    let tasksJSX;
    if(nbDaysLeft < 0) {
        if (props.nbTotal === props.nbCompleted)
            tasksJSX =
                <div className="project-tasks">
                    Project is Ready
                    <br/>
                    All Tasks Completed
                </div>;
        else tasksJSX =
            <div className="project-tasks">
                <div> {props.nbTotal - props.nbCompleted} Tasks Remaining </div>
                Project is Late
            </div>;
    }
    else tasksJSX =
        <div className="project-tasks">
            <div> {props.nbTotal - props.nbCompleted} Tasks Remaining </div>
            <div> {nbDaysLeft} Days Left </div>
        </div>;

    let progressBarJSX =
        <div className="project-progress-bar">
            <div className="project-progress">
                <span className="project-progressMessage"> {props.nbCompleted} Tasks Completed </span>
            </div>
        </div>;

    try {
        return (
            <div className="project-window">
                {projectNameJSX}
                {membersJSX}
                {tasksJSX}
                {progressBarJSX}
            </div>
        );
    }
    catch (err) {
        document.getElementById('root').innerHTML = err.message();
    }
}

export { Project, CalculateDaysRemaining };
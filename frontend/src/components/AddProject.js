// Author : omar besbes
// Component adds project to current list of projects

import '../styles/addProject.css';
import {useState} from "react";
import {Popup} from "./Popup";

function AddProject(props) {
    // const membersButtonValue = {name: 'Add Members'};
    let [popupState, setPopupState] = useState(false);
    let [project, setProject] = useState(
        {
            name: "",
            type: "",
            description: "",
            addMembers: "Add Members",
            members: [],
            deadline: ""
        });

    const updateMemberSelectStatus = (member) => {
        try {
            const membersKeyName = 'members';
            if(member != null) member.selectStatus = !member.selectStatus;
            props.members.map((m) => {
                if(!m.selectStatus) {
                    document.getElementById(m.id).style.border = '0';
                    setProject(values => ({...values, [membersKeyName]: [...project.members, m]}));
                }
                else {
                    document.getElementById(m.id).style.border = '2px solid #222831';
                    console.log('yes');
                    if (member != null) {
                        let tmp = project.members;
                        tmp = project.members.filter(me => (me.id !== member.id));
                        setProject(values => ({...values, [membersKeyName]: tmp}));
                    }
                }
            });
            console.log(project);
        }
        catch (err) {
            document.getElementById('root').innerHTML = err.message();
        }
    };
    // updateMemberSelectStatus(null);

    const handleChange = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        setProject(values => ({...values, [key]: value}))
        console.log(project);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        alert(event.type);
        alert(project.members);
    }

   try {
       return (
           <main className="page">
               <section className="window">
                   <div className="title"> Add Your Project</div>
                   <form onSubmit={handleSubmit}>
                       <div className="field">
                           <label className="label" htmlFor="projectName"> Project Name </label>
                           <input id="projectName"
                                  name="name"
                                  type="text"
                                  value={project.name}
                                  onChange={handleChange}
                           />
                       </div>

                       <div className="field">
                           <label className="label" htmlFor="projectType"> Project Type </label>
                           <input id="projectType"
                                  name="type"
                                  type="text"
                                  value={project.type}
                                  onChange={handleChange}
                           />
                       </div>

                       <div className="field">
                           <label className="label" htmlFor="projectDescription"> Project Description </label>
                           <input id="projectDescription"
                                  name="description"
                                  type="text"
                                  value={project.description}
                                  onChange={handleChange}
                           />
                       </div>

                       <div className="field">
                           <label className="label" htmlFor="projectMembers"> Project Members </label>
                           <div id="selectedMembers">
                               {project.members.map(member =>
                                   <div className="members">
                                       {member.name}
                                   </div>
                               )}
                           </div>
                           <input
                               id="projectMembers"
                               name="members"
                               type="button"
                               value={project.addMembers}
                               onChange={handleChange}
                               onClick={() => setPopupState(true)}
                           />
                           <Popup trigger={popupState} setTrigger={setPopupState}>
                               <div className="popup-title"> Select Your Members </div>
                               <div className="popup-members">
                                   {props.members.map((member) =>
                                       <input id={member.id}
                                              name="members"
                                              type="button"
                                              value={member.name}
                                              className="popup-member"
                                              onClick={() => updateMemberSelectStatus(member)}
                                       />
                                   )}
                               </div>
                           </Popup>
                       </div>

                       <div className="field">
                           <label className="label" htmlFor="projectDeadline"> Project Deadline </label>
                           <input id="projectDeadline"
                                  name="deadline"
                                  type="date"
                                  value={project.deadline}
                                  onChange={handleChange}
                           />
                       </div>

                       <div id="submit" className="field">
                           <input id="submit"
                                  type="submit"
                           />
                       </div>
                   </form>
               </section>
           </main>
       );
   }
   catch (err) {
       document.getElementById('root').innerHTML = err.message();
   }
}

export { AddProject };
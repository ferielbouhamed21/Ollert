// Author : omar besbes
// Component adds project to current list of projects

import '../styles/AddProject.css';
import {useState} from "react";
import {Popup} from "./Popup";

function AddProject(props) {
   let [popupState, setPopupState] = useState(false);
   let [allMembers, setAllMembers] = useState(props.members);
   let [project, setProject] = useState(
     {
         name: "",
         type: "",
         description: "",
         addMembers: "Add Members",
         members: [],
         deadline: ""
     });

   const handleClick = (member) => {
      let copy = [...allMembers];
      copy[copy.findIndex(m => m.id === member.id)].isSelected = !member.isSelected;
      setAllMembers(copy);
   }

   const handleChange = (event) => {
     const key = event.target.name;
     const value = event.target.value;
     setProject(prevState => ({...prevState, [key]: value}))
     console.log(project);
   }

   const handleSubmit = (event) => {
     event.preventDefault();
   }

   const handlePopupClose = () => {
      const selectedMembers = allMembers.filter(m => m.isSelected);
      const name = 'members';
      setProject(prevState => ({...prevState, [name]: selectedMembers}))
      setPopupState(false);
   }

   const projectNameJSX =
     <div className="addProject-field">
         <label className="addProject-label" htmlFor="addProject-projectName"> Project Name </label>
         <input
            id="addProject-projectName"
            className="addProject-input"
            name="name"
            type="text"
            value={project.name}
            onChange={handleChange}
         />
     </div>;

   const projectTypeJSX =
     <div className="addProject-field">
         <label className="addProject-label" htmlFor="addProject-projectType"> Project Type </label>
         <input
            id="addProject-projectType"
            className="addProject-input"
            name="type"
            type="text"
            value={project.type}
            onChange={handleChange}
         />
     </div>;

   const projectDescriptionJSX =
     <div className="addProject-field">
         <label className="addProject-label" htmlFor="addProject-projectDescription"> Project Description </label>
         <input
            id="addProject-projectDescription"
            className="addProject-input"
            name="description"
            type="text"
            value={project.description}
            onChange={handleChange}
         />
     </div>;

   const selectedMemberStyle = (member) => {
      let style = {
         padding: 5 + 'px',
         backgroundColor: '#EEEEEE',
         border: '2px solid #89B5AF',
         borderRadius: 10 + 'px',
         margin: 5 + 'px',
         textAlign: 'center',
         textTransform: 'capitalize',
         cursor: 'pointer',
         flex: '0 0 auto',
         boxShadow: 'none',
         transition: 0 + 's'
      }
      if(member.isSelected)
         style.border = '2px solid #222831';
      return style;
   }

   const selectedMembersStyle = () => {
      let style = {
         display: 'flex',
         justifyContent: 'center',
         alignItems: 'center',
         flexWrap: 'wrap',
         margin: 'none'
      }

      console.log(allMembers.filter(m => m.isSelected));
      if(allMembers.filter(m => m.isSelected).length > 0)
         style.margin = '10px 0';

      return style;
   }

   const projectMembersJSX =
      <div className="addProject-field">
         <label className="addProject-label" htmlFor="addProject-addMembers">
            Project Members
         </label>
         <div style={selectedMembersStyle()}>
            {project.members.map(member =>
               <div className="addProject-selectedMember">
                  {member.name}
               </div>
            )}
         </div>
         <input
            id="addProject-addMembers"
            className="addProject-input"
            name="members"
            type="button"
            value={project.addMembers}
            onChange={handleChange}
            onClick={() => setPopupState(true)}
         />
         <Popup trigger={popupState} setTrigger={handlePopupClose}>
            <div className="addProject-popupTitle"> Select Your Members </div>
            <div className="addProject-popupMembers">
               {props.members.map((member) =>
                  <input
                     id={member.id}
                     className="addProject-input"
                     name="members"
                     type="button"
                     value={member.name}
                     style={selectedMemberStyle(member)}
                     onClick={() => handleClick(member)}
                  />
               )}
            </div>
         </Popup>
      </div>;

   const projectDeadlineJSX =
     <div className="addProject-field">
         <label className="addProject-label" htmlFor="addProject-projectDeadline"> Project Deadline </label>
         <input
            id="addProject-projectDeadline"
            className="addProject-input"
            name="deadline"
            type="date"
            value={project.deadline}
            onChange={handleChange}
         />
     </div>;

   try {
   return (
      <main className="addProject-page">
         <section className="addProject-window">
            <div className="addProject-title"> Add Your Project</div>
            <form className="addProject-form" onSubmit={handleSubmit}>
               {projectNameJSX}
               {projectTypeJSX}
               {projectDescriptionJSX}
               {projectMembersJSX}
               {projectDeadlineJSX}
               <div className="addProject-field">
                  <input
                     id="addProject-submit"
                     className="addProject-input"
                     type="submit"
                  />
               </div>
            </form>
         </section>
      </main>
   );}
   catch (err) {
    document.getElementById('root').innerHTML = err.message();
   }
}

export { AddProject };
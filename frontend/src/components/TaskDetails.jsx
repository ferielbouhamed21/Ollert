import React from "react";
import DeleteIcon from '@material-ui/icons/Delete';

function TaskDetails(props){
  function handleClick(){
    props.onDelete(props.id);
  }
  return (
      <div className="task-details">
      <h1>{props.title}</h1>
      <p>Member:{props.member}</p>
      <img src={props.imgURL} alt={props.member}/>
      <p>{props.deadline}</p>
      <p>{props.description}</p>
      <button onClick={handleClick}>
        <DeleteIcon/>
      </button>
      </div>
  );
}
export default TaskDetails;
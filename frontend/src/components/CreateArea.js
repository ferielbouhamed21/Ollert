import React, { useState } from "react";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";
import Zoom from "@material-ui/core/Zoom";

function CreateArea(props) {
  const [isExpanded, setExpanded] = useState(false);

  const [TaskDetails, setTaskDetails] = useState({
    title: "",
    member: "",
    deadline: "",
    description: "",
    imgURL:
      "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png"
  });

  function expand() {
    setExpanded(true);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setTaskDetails((prevTaskDetails) => {
      return {
        ...prevTaskDetails,
        [name]: value
      };
    });
  }
  function submitTaskDetails(event) {
    props.onAdd(TaskDetails);
    setTaskDetails({
      title: "",
      description: "",
      member: "",
      deadline: "",
      imgURL:
        "https://cdn.pixabay.com/photo/2017/06/13/12/53/profile-2398782_960_720.png"
    });
    event.preventDefault();
  }

  return (
    <div>
      <form className="create-task">
        {isExpanded && (
          <div>
            <input
              onChange={handleChange}
              name="title"
              placeholder="Task Title"
              value={TaskDetails.title}
            />
            <input
              onChange={handleChange}
              name="member"
              placeholder="Member"
              value={TaskDetails.member}
            />
            <input
              onChange={handleChange}
              name="deadline"
              placeholder="Deadline"
              value={TaskDetails.deadline}
            />
          </div>
        )}
        <textarea
          onClick={expand}
          onChange={handleChange}
          name="description"
          placeholder="Add a task ..."
          rows={isExpanded ? 3 : 1}
          value={TaskDetails.description}
        />
        <Zoom in={true}>
          <Fab onClick={submitTaskDetails}>
            <AddIcon />
          </Fab>
        </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
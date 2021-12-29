import React, { useState } from "react";
import TaskDetails from "../components/TaskDetails";
import CreateArea from "../components/CreateArea";

function TasksList() {
  const [tasks, setTasks] = useState([]);

  function addTaskDetails(newTask) {
    setTasks((prevTasks) => {
      return [...prevTasks, newTask];
    });
  }

  function deleteTaskDetails(id) {
    setTasks((prevTasks) => {
      return prevTasks.filter((taskItem, index) => {
        return index !== id;
      });
    });
  }

  return (
    <div>
      <CreateArea onAdd={addTaskDetails} />
      <div className="to-do">
        {tasks.map((taskItem, index) => {
          return (
            <TaskDetails
              key={index}
              id={index}
              title={taskItem.title}
              description={taskItem.description}
              imgURL={taskItem.imgURL}
              member={taskItem.member}
              deadline={taskItem.deadline}
              onDelete={deleteTaskDetails}
            />
          );
        })}
      </div>
    </div>
  );
}

export default TasksList;


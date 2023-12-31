/* eslint-disable react/prop-types */
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
// import MaterialIcon, { colorPalette } from 'material-icons-react';
const TodoItem = (props) => {
  const { id, description, dueDate, setTasks, isCompleted, setIsCompleted } =
    props;

  const reformatDate = (dueDate) => {
    const date = new Date(dueDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const deleteTask = async (id) => {
    try {
      await fetch(`https://658a8a68ba789a9622374750.mockapi.io/tasks/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
      });

      const tasks = await fetch(
        `https://658a8a68ba789a9622374750.mockapi.io/tasks`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await tasks.json();
      setTasks(data);
    } catch (err) {
      console.log(
        `Error occurred while deleting task with id ${id}: ${err.message}`
      );
    }
  };

  const completeTask = async (task) => {
    try {
      const { id, isCompleted } = task;
      const response = await fetch(
        `https://658a8a68ba789a9622374750.mockapi.io/tasks/${id}`,
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ isCompleted: !isCompleted }),
        }
      );

      const updatedTask = await response.json();
      setIsCompleted(updatedTask.isCompleted);

      const tasks = await fetch(
        `https://658a8a68ba789a9622374750.mockapi.io/tasks`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await tasks.json();
      setTasks(data);
    } catch (err) {
      console.log(
        `Error occurred while completing task with id ${id} : ${err.message}`
      );
    }
  };

  return (
    <li
      className={isCompleted ? "todo_list--item_finished" : "todo_list--item"}
    >
      <div className="col-lg-2 col-md-2 col-sm-2">{id}</div>
      <div className="col-lg-3 col-md-3 col-sm-3">{description}</div>
      <div className="col-lg-3 col-md-3 col-sm-3">{reformatDate(dueDate)}</div>
      <div className="col-lg-2 col-md-2 col-sm-2">
        <button
          className="modified_button--completed"
          onClick={() => completeTask({ id, isCompleted })}
        >
          <CheckIcon></CheckIcon>{" "}
        </button>
      </div>
      <div className="col-lg-2 col-md-2 col-sm-2">
        <button
          className="modified_button--delete"
          onClick={() => deleteTask(id)}
        >
          <ClearIcon></ClearIcon>{" "}
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

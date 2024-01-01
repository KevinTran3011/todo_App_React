/* eslint-disable react/prop-types */
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";

const InputForm = ({ setTasks, setLoading }) => {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [newTask, setNewTask] = useState({ description: "", dueDate: "" });

  const addTask = async () => {
    try {
      setLoading(true);
      await fetch(`https://658a8a68ba789a9622374750.mockapi.io/tasks`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(newTask),
      });

      const response = await fetch(
        `https://658a8a68ba789a9622374750.mockapi.io/tasks`,
        {
          method: "GET",
          headers: { "content-type": "application/json" },
        }
      );
      const data = await response.json();
      setTasks(data);
      setFormIsOpen(false);
    } catch (err) {
      console.log("Error occured while fetching tasks : " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {!formIsOpen && (
        <div className="addList_section">
          <button
            className="modified_button--completed"
            onClick={() => setFormIsOpen(true)}
          >
            Add a new task
          </button>
        </div>
      )}

      {formIsOpen && (
        <div className="inputForm">
          <div className="input_Form--header">ADD A TASK</div>
          <div className="input_section--description">
            <div className="input_Form ">Description</div>
            <input
              type="text"
              className="addList_section--input"
              id="descriptionInput"
              placeholder="Add a new task"
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              value={newTask.description}
            />
          </div>

          <div className="input_section--date">
            <div className="input_Form ">Due Date</div>
            <input
              type="date"
              className="addList_section--input"
              id="dateInput"
              placeholder="Due date"
              onChange={(e) =>
                setNewTask({ ...newTask, dueDate: e.target.value })
              }
              value={newTask.dueDate}
            />
          </div>
          <div className="input_section--button">
            <div className="addList_section--button">
              <button
                className="modified_button--completed"
                onClick={() => {
                  addTask();
                }}
              >
                <AddIcon></AddIcon>{" "}
              </button>
            </div>
            <div className="inputForm--cancel">
              <button
                className="modified_button--delete"
                onClick={() => {
                  setFormIsOpen(false);
                }}
              >
                <CloseIcon></CloseIcon>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default InputForm;

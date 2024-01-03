/* eslint-disable react/prop-types */
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useTranslation } from "react-i18next";
import axios from "axios";

const InputForm = ({ setTasks, setLoading }) => {
  const [formIsOpen, setFormIsOpen] = useState(false);
  const [newTask, setNewTask] = useState({ description: "", dueDate: "" });
  const { t } = useTranslation();

  const showAddTaskSuccessMessage = () => {
    toast.success("Task added successfully"),
      {
        position: toast.POSITION.TOP_RIGHT,
      };
  };

  const showAddTaskFailureMessage = () => {
    toast.error("Task added failed"),
      {
        position: toast.POSITION.TOP_RIGHT,
      };
  };

  const addTask = async () => {
    try {
      setLoading(true);

      await axios.post(
        `https://658a8a68ba789a9622374750.mockapi.io/tasks`,
        newTask
      );

      const response = await axios.get(
        `https://658a8a68ba789a9622374750.mockapi.io/tasks`
      );
      const data = await response.data;
      setTasks(data.reverse());
      setFormIsOpen(false);
      showAddTaskSuccessMessage();
    } catch (err) {
      console.log("Error occured while fetching tasks : " + err.message);
      showAddTaskFailureMessage();
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
            {t("main.prompt")}
          </button>
        </div>
      )}

      {formIsOpen && (
        <div className="inputForm">
          <div className="input_Form--header">{t("inputForm.title")}</div>
          <div className="input_section--description">
            <div className="input_Form ">{t("inputForm.description")}</div>
            <input
              type="text"
              className="addList_section--input"
              id="descriptionInput"
              placeholder={t("inputForm.descriptionPlaceholder")}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
              value={newTask.description}
            />
          </div>

          <div className="input_section--date">
            <div className="input_Form ">{t("inputForm.dueDate")}</div>
            <input
              type="date"
              className="addList_section--input"
              id="dateInput"
              placeholder={t("inputForm.dueDatePlaceholder")}
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

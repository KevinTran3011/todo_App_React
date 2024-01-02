/* eslint-disable react/prop-types */
import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CheckIcon from "@mui/icons-material/Check";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import axios from "axios";

const TodoItem = (props) => {
  const { id, description, dueDate, setTasks, setLoading } = props;
  const [isCompleted, setIsCompleted] = useState(false);
  const { t } = useTranslation();

  const reformatDate = (dueDate) => {
    const date = new Date(dueDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const showToastSuccessMessage = () => {
    toast.success("Task updated successfuly"),
      {
        position: toast.POSITION.TOP_RIGHT,
      };
  };

  const showToastFailureMessage = () => {
    toast.error("Task updated failed"),
      {
        position: toast.POSITION.TOP_RIGHT,
      };
  };

  const deleteTask = async (id) => {
    try {
      setLoading(true);
      await axios.delete(
        `https://658a8a68ba789a9622374750.mockapi.io/tasks/${id}`
      );
      console.log(`Task with id ${id} has been deleted`);

      const tasks = await axios.get(
        `https://658a8a68ba789a9622374750.mockapi.io/tasks`
      );
      const data = await tasks.data;
      setTasks(data);
      showToastSuccessMessage();
    } catch (err) {
      console.log(
        `Error occurred while deleting task with id ${id}: ${err.message}`
      );
      showToastFailureMessage();
    } finally {
      setLoading(false);
    }
  };

  const onDeleteButtonClick = (id) => {
    return Swal.fire({
      title: t("popUp.title"),
      text: t("popUp.subTitle"),
      icon: "warning",
      showCancelButton: true,
      cancelButtonText: t("popUp.cancel"),
      confirmButtonText: t("popUp.confirm"),
      preConfirm: () => deleteTask(id),
    });
  };
  const completeTask = async (task) => {
    try {
      setLoading(true);
      const { id, isCompleted } = task;
      const updatedResponse = await axios.put(
        `https://658a8a68ba789a9622374750.mockapi.io/tasks/${id}`,
        { isCompleted: !isCompleted }
      );
      const updatedTask = updatedResponse.data;
      setIsCompleted(updatedTask.isCompleted);
      console.log(`Sucessfully changed the complete state of task id ${id}`);

      const tasks = await axios.get(
        `https://658a8a68ba789a9622374750.mockapi.io/tasks`
      );
      const data = await tasks.data;
      setTasks(data);
      showToastSuccessMessage();
    } catch (err) {
      console.log(
        `Error occurred while completing task with id ${id} : ${err.message}`
      );
      showToastFailureMessage();
    } finally {
      setLoading(false);
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
          onClick={() => onDeleteButtonClick(id)}
        >
          <DeleteIcon></DeleteIcon>{" "}
        </button>
      </div>
    </li>
  );
};

export default TodoItem;

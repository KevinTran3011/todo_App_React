import { useState, useEffect } from "react";
import axios from "axios";
import TitleContainer from "../titleContainer/titleContainer.component";
import TodoItem from "../todoItem/todoItem.component";
import InputForm from "../inputForm/inputForm.component";
import SearchBar from "../searchBar/searchBar.component";
import SortIcon from "@mui/icons-material/Sort";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import LoadingSpinner from "../spinner/spinner.container";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../todo.scss/main.scss";

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [originalTasks, setOriginalTasks] = useState(...tasks);
  const [isSorted, setIsSorted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getTasks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://658a8a68ba789a9622374750.mockapi.io/tasks`
        );
        const data = await response.data;
        setTasks(data);
        setOriginalTasks(data);
      } catch (err) {
        console.log("Error occured while fetching resources : " + err.message);
      } finally {
        setLoading(false);
      }
    };
    getTasks();
  }, []);

  // useEffect(() => {
  //   const getTasks = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await fetch(
  //         `https://658a8a68ba789a9622374750.mockapi.io/tasks`,
  //         {
  //           method: "GET",
  //           headers: { "content-type": "application/json" },
  //         }
  //       );
  //       const data = await response.json();
  //       console.log(data);
  //       setTasks(data);
  //       setOriginalTasks(data);
  //     } catch (err) {
  //       console.log("Error occured while fetching tasks : " + err.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   getTasks();
  // }, []);

  const deleteAll = async () => {
    try {
      setLoading(true);

      await Promise.all(
        tasks.map(async (task) => {
          const id = task.id;
          await axios.delete(
            `https://658a8a68ba789a9622374750.mockapi.io/tasks/${id}`
          );
        })
      );
      // Fetch the updated list of tasks after deleting
      const response = await axios.get(
        `https://658a8a68ba789a9622374750.mockapi.io/tasks`
      );
      const data = await response.data;
      console.log("deleted task successfully");
      setTasks(data);
    } catch (err) {
      console.log(`Error occurred while deleting tasks: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const sortTasks = () => {
    if (!isSorted) {
      const sortedTasks = [...originalTasks].sort(
        (a, b) => new Date(b.dueDate) - new Date(a.dueDate)
      );
      setTasks(sortedTasks);
      setIsSorted(true);
    } else {
      setTasks(originalTasks);
      setIsSorted(false);
    }
  };

  return (
    <div className="container">
      {loading && <LoadingSpinner loading={loading} />}
      <div style={{ opacity: loading ? 0.5 : 1 }}>
        <div className="title_container">
          <TitleContainer />
        </div>
        <div className="todo_container">
          <InputForm setTasks={setTasks} setLoading={setLoading} />
          <SearchBar originalTasks={originalTasks} setTasks={setTasks} />

          <li className="todo_list--header">
            <div className="col-lg-2 col-md-2 col-sm-2">
              <div className="header">Index</div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3">
              <div className="header">Task</div>
            </div>
            <div className="col-lg-3 col-md-3 col-sm-3" id="due_date">
              <div className="header">Due Date</div>
              <div
                className="sort_section"
                id="sort_button"
                onClick={() => {
                  sortTasks();
                }}
              >
                <SortIcon style={{ color: "white" }}></SortIcon>
                {""}
              </div>
            </div>

            <div className="col-lg-2 col-md-2 col-sm-2">
              <div className="header">Completed</div>
            </div>
            <div className="col-lg-2 col-md-2 col-sm-2">
              <div className="header">Delete</div>
            </div>
          </li>
          <ul className="todo_list">
            {tasks.map((task) => (
              <TodoItem
                key={task.id}
                id={task.id}
                description={task.description}
                dueDate={task.dueDate}
                isCompleted={task.isCompleted}
                setTasks={setTasks}
                setLoading={setLoading}
              />
            ))}
          </ul>

          <div
            className="todo_list--delete"
            onClick={() => {
              deleteAll();
            }}
          >
            <button className="modified_button--delete_all">
              <DeleteForeverIcon></DeleteForeverIcon>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoList;

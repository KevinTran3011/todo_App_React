import { Suspense } from "react";
import TodoList from "./components/todoList/todoList.component";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fontsource/plus-jakarta-sans";
import "./App.css";

const App = () => {
  return (
    <Suspense fallback="...loading">
      <div className="content">
        <div className="container">
          <TodoList />
        </div>
      </div>
    </Suspense>
  );
};

export default App;

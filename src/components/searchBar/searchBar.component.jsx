/* eslint-disable react/prop-types */
import SearchIcon from "@mui/icons-material/Search";

import { useState } from "react";

const SearchBar = ({ originalTasks, setTasks }) => {
  const [searchInput, setSearchInput] = useState("");

  const searchTask = (e) => {
    if (e.key === "Enter") {
      const filteredTasks = originalTasks.filter((task) => {
        return task.description
          .toLowerCase()
          .includes(searchInput.toLowerCase());
      });
      setTasks(filteredTasks);
    }
  };

  return (
    <div className="search_bar">
      <input
        className="search_input"
        placeholder="Search task"
        id="search-Bar"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        onKeyPress={searchTask}
      />
      <SearchIcon id="search_icon"></SearchIcon>
    </div>
  );
};

export default SearchBar;

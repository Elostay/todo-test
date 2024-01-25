"use client";

import { useState, useEffect } from "react";
import TodoItem from "./TodoItemFeed";
import FilterButtons from "./FilterButtons";

const TodoList = ({ data, handleCardClick }) => {
  return (
    <>
      {/* <FilterButtons data={data} /> */}
      <div className="task_layout">
        {data.map((task) => (
          <TodoItem
            key={task._id}
            task={task}
            handleCardClick={handleCardClick}
          />
        ))}
      </div>
    </>
  );
};

const Feed = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchTasks = async () => {
    const response = await fetch("/api/task");
    const data = await response.json();

    setTasks(data);
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const filterTasks = (searchText) => {
    const regex = new RegExp(searchText, "i");

    return tasks.filter((item) => regex.test(item.task));
  };

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterTasks(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  };

  const handleCardClick = () => {
    // redirect to profile
  };
  const handleFilterBtn = async (e) => {
    const nameBtn = e.target.name;

    switch (nameBtn) {
      case "all":
        await fetchTasks();
        setFilteredStatus(tasks);
        break;
      case "completed":
        await fetchTasks();
        const completedTasks = tasks.filter((task) => task.done === true);
        setFilteredStatus(completedTasks);
        break;
      case "active":
        await fetchTasks();
        const activeTasks = tasks.filter((task) => task.done === false);
        setFilteredStatus(activeTasks);
        break;
      default:
        break;
    }
  };
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search by a task name"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      <FilterButtons handleFilterBtn={handleFilterBtn} />

      {searchText ? (
        <TodoList data={searchedResults} handleCardClick={handleCardClick} />
      ) : (
        <TodoList
          data={filteredStatus.length === 0 ? tasks : filteredStatus}
          handleCardClick={handleCardClick}
        />
      )}
    </section>
  );
};

export default Feed;

"use client";

import { useState, useEffect } from "react";
import TodoItemFeed from "./TodoItemFeed";
import FilterButtons from "./FilterButtons";

const TodoList = ({ data }) => {
  return (
    <>
      <div className="task_layout">
        {data.map((task) => (
          <TodoItemFeed key={task._id} task={task} rate={task.rate} />
        ))}
      </div>
    </>
  );
};

const Feed = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredStatus, setFilteredStatus] = useState([]);

  const [ascending, setAscending] = useState(true);

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

  const handleFilterBtn = async (e) => {
    const nameBtn = e.target.name;

    switch (nameBtn) {
      case "all":
        setSearchText("");
        await fetchTasks();
        setFilteredStatus(tasks);
        break;
      case "completed":
        setSearchText("");
        await fetchTasks();
        const completedTasks = tasks.filter((task) => task.done === true);
        setFilteredStatus(completedTasks);
        break;
      case "active":
        setSearchText("");
        await fetchTasks();
        const activeTasks = tasks.filter((task) => task.done === false);
        setFilteredStatus(activeTasks);
        break;
      case "sort":
        searchText !== "" && ascending
          ? searchedResults.sort((a, b) => a.rate - b.rate)
          : searchedResults.sort((a, b) => b.rate - a.rate);
        ascending && tasks.length !== 0
          ? tasks.sort((a, b) => a.rate - b.rate)
          : tasks.sort((a, b) => b.rate - a.rate);
        ascending && filteredStatus.length !== 0
          ? filteredStatus.sort((a, b) => a.rate - b.rate)
          : filteredStatus.sort((a, b) => b.rate - a.rate);

        setAscending((prev) => !prev);
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
        <TodoList data={searchedResults} />
      ) : (
        <TodoList data={filteredStatus.length === 0 ? tasks : filteredStatus} />
      )}
    </section>
  );
};

export default Feed;

"use client";

import { useState, useEffect } from "react";
import TodoItem from "./TodoItem";
// import TodoList from "./TodoList";

const TodoList = ({ data, handleCardClick }) => {
  return (
    <div className="mt-16 task_layout">
      {data.map((task) => (
        <TodoItem
          key={task._id}
          task={task}
          handleCardClick={handleCardClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [tasks, setTasks] = useState([]);

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
      {searchText ? (
        <TodoList data={searchedResults} handleCardClick={() => {}} />
      ) : (
        <TodoList data={tasks} handleCardClick={() => {}} />
      )}
    </section>
  );
};

export default Feed;

"use client";

import { useState, useEffect } from "react";
import TodoList from "./TodoList";

const Feed = () => {
  const [searchText, setSearchText] = useState("");
  const [tasks, setTasks] = useState([]);

  const handleSearchChange = (e) => {};

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch("/api/task");
      const data = await response.json();

      setTasks(data);
    };

    fetchTasks();
  }, []);

  return (
    <section className="todo_list">
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

      <TodoList data={tasks} handleCardClick={() => {}} />
    </section>
  );
};

export default Feed;

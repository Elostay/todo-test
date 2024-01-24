import TodoItem from "./TodoItem";

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

export default TodoList;

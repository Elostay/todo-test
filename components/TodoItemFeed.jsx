import Image from "next/image";

const handleColor = (value) => {
  switch (value) {
    case 1:
      return "blue-bg_gradient";

    case 2:
      return "blue-yellow-bg_gradient";
    case 3:
      return "yellow-bg_gradient";
    case 4:
      return "yellow-red-bg_gradient";
    case 5:
      return "red-bg_gradient";
    default:
      return "";
  }
};

const TodoItemFeed = ({ task, rate }) => {
  return (
    <div className="task_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3">
          <Image
            src={task.creator.image || "/assets/images/user-default-photo.png"}
            alt="user_image"
            width={40}
            height={40}
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {task.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {task.creator.email}
            </p>
          </div>
        </div>
      </div>
      <div className="flex place-content-between">
        <p className="my-4 font-satoshi test-sm text-gray-700">{task.task}</p>
        <p
          className={`my-4 font-satoshi test-sm text-gray-700 w-10 h-10
		   text-white rounded-full flex items-center justify-center ${handleColor(
         rate
       )}`}
        >
          {rate}
        </p>
      </div>
    </div>
  );
};

export default TodoItemFeed;

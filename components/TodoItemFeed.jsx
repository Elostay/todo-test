import Image from "next/image";

const TodoItem = ({ task }) => {
  return (
    <div className="task_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-center gap-3 cursor-pointer">
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
      <p className="my-4 font-satoshi test-sm text-gray-700">{task.task}</p>
    </div>
  );
};

export default TodoItem;

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const TodoItemProfile = ({
  task,
  handleCardClick,
  handleEdit,
  handleDelete,
  taskIdDone,
}) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();
  const [done, setDone] = useState(false);
  const [firstRender, setFirstRender] = useState(true);

  const handleDone = async (e) => {
    //  e.preventDefault();

    if (!task._id) return alert("Task ID not found");

    setDone((prev) => !prev);
  };

  useEffect(() => {
    setDone(task.done);
  }, []);

  useEffect(() => {
    if (firstRender) {
      setFirstRender(false);
      return;
    }
    fetch(`/api/task/${task._id}/done`, {
      method: "PATCH",
      body: JSON.stringify({
        done: done,
      }),
    });
  }, [handleDone]);

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
        {session?.user.id === task.creator._id && pathName === "/profile" && (
          <input
            className="w-8 h-8 p-2"
            type="checkbox"
            checked={done}
            onChange={handleDone}
          />
        )}
      </div>
      <p className="my-4 font-satoshi test-sm text-gray-700">{task.task}</p>

      {session?.user.id === task.creator._id && pathName === "/profile" && (
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p
            className="font-inter text-sm blue_gradient cursor-pointer"
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default TodoItemProfile;

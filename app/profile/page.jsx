"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/profile";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/tasks`);
      const data = await response.json();

      setTasks(data);
    };

    if (session?.user.id) fetchTasks();
  }, []);

  const handleEdit = (task) => {
    router.push(`/update-task?id=${task._id}`);
  };
  const handleDelete = (task) => {};
 

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={tasks}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
      
    />
  );
};

export default MyProfile;

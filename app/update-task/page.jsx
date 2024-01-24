"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditTask = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const taskId = searchParams.get("id");

  const [submitting, setSubmitting] = useState(false);
  const [post, setPost] = useState({
    task: "",
  });

  useEffect(() => {
    const getTaskDetails = async () => {
      const response = await fetch(`/api/task/${taskId}`);
      const data = await response.json();
      setPost({
        task: data.task,
      });
    };

    if (taskId) getTaskDetails();
  }, [taskId]);

  const updateTask = async (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (!taskId) return alert("Task ID not found");

    try {
      const response = await fetch(`/api/task/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          task: post.task,
        }),
      });

      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Edit"
      task={post}
      setTask={setPost}
      submitting={submitting}
      handleSubmit={updateTask}
    />
  );
};

export default EditTask;

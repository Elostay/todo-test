import { connectToDB } from "@utils/database";
import Task from "@models/task";

export const POST = async (req) => {
  const { userId, task, done } = await req.json();

  console.log(done);
  console.log(req);
  try {
    await connectToDB();
    const newTask = new Task({ creator: userId, task, done: done || false });

    await newTask.save();

    return new Response(JSON.stringify(newTask, { status: 201 }));
  } catch (error) {
    return new Response("Failed to create a new task", { status: 500 });
  }
};

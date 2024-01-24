import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  task: {
    type: String,
    required: [true, "Task is required."],
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const Task = models.Task || model("Task", TaskSchema);

export default Task;

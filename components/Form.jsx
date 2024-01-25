"use client";

import Link from "next/link";
import { useState } from "react";

const Form = ({ type, task, setTask, submitting, handleSubmit }) => {
  const [activeBtn, setActiveBtn] = useState(0);
  // (activeBtn === 1 && "active") || (task.rate === 1 && "active");

  return (
    <section className="w-full max-w-full flex-start flex-col">
      <h1 className="head_text text-left">
        <span className="blue_gradient">{type} Task</span>
      </h1>
      <p className="desc text-left max-w-md">
        {type} and share your task with other users
      </p>
      <form
        onSubmit={handleSubmit}
        className="mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism"
      >
        <label>
          <span
            className="font-satoshi font-semibold
			 text-base text-gray-700"
          >
            Your Task
          </span>
          <textarea
            value={task.task}
            onChange={(e) => setTask({ ...task, task: e.target.value })}
            placeholder="Write your task here"
            required
            className="form_textarea"
          />
        </label>

        <div className="flex gap-3 mt-1 ">
          <button
            type="button"
            className={`w-10 h-10 text-white rounded-full flex items-center justify-center blue-bg_gradient ${
              (activeBtn === 1 && "active") || (task.rate === 1 && "active")
            }`}
            value={1}
            onClick={(e) => {
              setActiveBtn(Number(e.target.value));

              return setTask({ ...task, rate: Number(e.target.value) });
            }}
          >
            1
          </button>
          <button
            type="button"
            className={`w-10 h-10 text-white rounded-full flex items-center justify-center blue-yellow-bg_gradient ${
              (activeBtn === 2 && "active") || (task.rate === 2 && "active")
            }`}
            value={2}
            onClick={(e) => {
              setActiveBtn(Number(e.target.value));

              return setTask({ ...task, rate: Number(e.target.value) });
            }}
          >
            2
          </button>
          <button
            type="button"
            className={`w-10 h-10 text-white rounded-full flex items-center justify-center yellow-bg_gradient ${
              (activeBtn === 3 && "active") || (task.rate === 3 && "active")
            }`}
            value={3}
            onClick={(e) => {
              setActiveBtn(Number(e.target.value));

              return setTask({ ...task, rate: Number(e.target.value) });
            }}
          >
            3
          </button>
          <button
            type="button"
            className={`w-10 h-10 text-white rounded-full flex items-center justify-center yellow-red-bg_gradient ${
              (activeBtn === 4 && "active") || (task.rate === 4 && "active")
            }`}
            value={4}
            onClick={(e) => {
              setActiveBtn(Number(e.target.value));

              return setTask({ ...task, rate: Number(e.target.value) });
            }}
          >
            4
          </button>
          <button
            type="button"
            className={`w-10 h-10 text-white rounded-full flex items-center justify-center red-bg_gradient ${
              (activeBtn === 5 && "active") || (task.rate === 5 && "active")
            }`}
            value={5}
            onClick={(e) => {
              setActiveBtn(Number(e.target.value));

              return setTask({ ...task, rate: Number(e.target.value) });
            }}
          >
            5
          </button>
        </div>

        <div className="flex-end mx-3 mb-5 gap-4">
          <Link href="/" className="text-gray-500 text-sm">
            Cancel
          </Link>
          <button
            type="submit"
            disabled={submitting}
            className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
          >
            {submitting ? `${type}ing...` : type}
          </button>
        </div>
      </form>
    </section>
  );
};

export default Form;

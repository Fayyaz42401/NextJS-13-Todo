"use client";
import { redirect, useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../components/Client";

const Page = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { user } = useContext(Context);
  const router = useRouter();
  const addTodo = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/newtask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      toast.success(data.message);
      setTitle("");
      setDescription("");
      router.refresh();
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (!user._id) return redirect("/login");

  return (
    <>
      <h1 className="text-3xl font-bold text-center capitalize mt-10">
        Welcome {user.name}
      </h1>
      <form
        onSubmit={addTodo}
        className="mt-10 flex flex-col justify-center w-1/2 text-black bg-black mx-auto px-5 py-5  "
      >
        <h1 className="text-5xl font-bold text-center my-4 text-white">
          Todo.
        </h1>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          className="outline-gray-600  px-4 py-2  border-black rounded my-3"
          placeholder="Task Title"
        />
        <input
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          className=" outline-gray-600 px-4 py-2  border-black rounded my-3"
          placeholder="Task Description"
        />

        <button
          type="submit"
          className="px-4 py-2 bg-white text-black w-22 mx-auto text-xl font-semibold duration-500 hover:rounded "
        >
          Add
        </button>
      </form>
    </>
  );
};
export default Page;

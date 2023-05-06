import React from "react";
import { TodoItem } from "../components/Server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const fetchTodo = async (token) => {
  try {
    const res = await fetch(`${process.env.URL}/api/mytasks`, {
      cache: "no-cache",
      headers: {
        cookie: `token=${token}`,
      },
    });

    const data = await res.json();
    return data.tasks;
  } catch (error) {}
};

const Todos = async () => {
  const token = cookies().get("token")?.value;
  if (!token) return redirect("/login");
  const tasks = await fetchTodo(token);

  return (
    <div className=" pb-5 w-1/2 mx-auto">
      {tasks?.map((i) => (
        <TodoItem
          title={i.title}
          desc={i.description}
          isCompleted={i.isCompleted}
          id={i._id}
          key={i._id}
        />
      ))}
    </div>
  );
};

export default Todos;

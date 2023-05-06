import React from "react";
import TodoForm from "./TodoForm";
import Todos from "./Todos";
import { Suspense } from "react";

const page = async () => {
  return (
    <div>
      <TodoForm />
      <Suspense fallback={<div>Loading...</div>}>
        <Todos />
      </Suspense>
    </div>
  );
};

export default page;

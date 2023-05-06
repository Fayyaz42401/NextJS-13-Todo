"use client";
import React, { useContext } from "react";
import { Context } from "../../components/Client";
import { redirect } from "next/navigation";

const About = () => {
  const { user } = useContext(Context);

  if (!user._id) return redirect("/login");

  return (
    <div className="flex flex-col space-y-4 w-auto my-10 py-10 mx-auto bg-black text-white justify-center items-center">
      <h1 className="text-3xl capitalize">Name : {user.name}</h1>
      <h2 className="text-xl">Email : {user.email}</h2>
    </div>
  );
};

export default About;

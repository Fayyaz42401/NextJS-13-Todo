"use client";

import Link from "next/link";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../../components/Client";
import { redirect } from "next/navigation";

const Page = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, setUser } = useContext(Context);
  const registerHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await res.json();
      if (!data.success) return toast.error(data.message);
      setUser(data.user);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  if (user._id) return redirect("/");

  return (
    <form
      onSubmit={registerHandler}
      className="my-20 flex flex-col justify-center w-1/2 text-black mx-auto bg-black  px-5 py-5  "
    >
      <h1 className="text-5xl text-white font-bold text-center my-4">
        Register
      </h1>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="outline-gray-600  px-4 py-2  border-black rounded my-3"
        placeholder="Enter Your Name"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="outline-gray-600  px-4 py-2  border-black rounded my-3"
        placeholder="Enter Your Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className=" outline-gray-600 px-4 py-2  border-black rounded my-3"
        placeholder="Enter Your Password"
      />
      <Link
        href={"/login"}
        className="text-right mx-4 text-white hover:underline"
      >
        Already an account
      </Link>
      <button
        type="submit"
        className="px-4 py-2 bg-white text-black w-22 mx-auto text-xl font-semibold duration-500 hover:rounded "
      >
        Register
      </button>
    </form>
  );
};
export default Page;

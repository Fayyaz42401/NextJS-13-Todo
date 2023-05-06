"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit } from "react-icons/fa";
import UpdateForm from "./UpdateForm";
export const Context = createContext({ user: {} });

export const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const checkAuth = async () => {
      const res = await fetch("/api/auth/myprofile");
      const data = await res.json();
      if (data.success) setUser(data.user);
    };
    checkAuth();
  }, []);

  return (
    <Context.Provider value={{ user, setUser }}>
      {children}
      <ToastContainer theme="dark" position="top-center" autoClose="2000" />
    </Context.Provider>
  );
};
export const LogoutBtn = () => {
  const { user, setUser } = useContext(Context);
  const logoutHandler = async () => {
    try {
      const res = await fetch("/api/auth/logout");
      const data = await res.json();
      if (!data) return toast.error(data.message);
      setUser({});
      toast.success(data.message);
    } catch (error) {
      toast.error(data.message);
    }
  };

  return user._id ? (
    <button onClick={logoutHandler} className="btn px-4 py-2 mx-2">
      Logout
    </button>
  ) : (
    <Link href={"/login"} className="btn px-4 py-2 mx-2">
      Login
    </Link>
  );
};

export const DeleteBtn = ({ id }) => {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const deleteHandler = async (id) => {
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!data) return toast.error(data.message);
      toast.success(data.message);
      router.refresh();
    } catch (error) {
      toast.error(error);
    }
  };

  const updateHandler = async (id) => {
    if (!title || !description) return toast.error("Fill the inputs feilds");
    setShow(!show);
    try {
      const res = await fetch(`/api/task/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
        }),
      });
      const data = await res.json();
      if (!data) return toast.error(data.message);
      setTitle("");
      setDescription("");
      toast.success(data.task);
      router.refresh();
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="flex  rounded items-center space-x-5">
      <FaEdit
        onClick={() => setShow(!show)}
        className="  w-5 h-5 cursor-pointer"
      />
      {show ? (
        <UpdateForm
          title={title}
          setTitle={setTitle}
          description={description}
          setDescription={setDescription}
          onCancel={() => setShow(false)}
          onUpdate={() => updateHandler(id)}
        />
      ) : (
        ""
      )}
      <button
        onClick={() => deleteHandler(id)}
        className="bg-white border-2 border-white rounded text-black px-3 font-semibold duration-500 py-1 hover:bg-black hover:text-white   "
      >
        Delete
      </button>
    </div>
  );
};

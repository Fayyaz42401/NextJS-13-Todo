import Link from "next/link";
import React from "react";
import { LogoutBtn } from "../components/Client";

const Header = () => {
  return (
    <div className="flex justify-between p-5 bg-black text-center text-white ">
      <div>
        <Link href={"/"}>
          <h1 className="text-2xl font-bold capitalize">Todo App.</h1>
        </Link>
      </div>
      <nav className="text-xl font-bold space-x-8   ">
        <Link className="btn px-4 py-2" href={"/"}>
          Home
        </Link>
        <Link className="btn px-4 py-2" href={"/profile"}>
          Profile
        </Link>
        <LogoutBtn />
      </nav>
    </div>
  );
};

export default Header;

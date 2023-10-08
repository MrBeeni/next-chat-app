import React, { useState } from "react";
import Link from "next/link";
import { useContext } from "react";
import { MyContext } from "@/context/MyContext";

const Navbar = () => {
  const { user, signout, signInWithGoogle } = useContext(MyContext);

  console.log(user);
  return (
    <header className="text-gray-600 body-font bg-green-300 fixed top-0 w-full z-10">
      <div className="container mx-auto flex flex-wrap gap-5 p-5 flex-col md:flex-row items-center justify-between">
        <h1 className="text-xl cursor-pointer hover:scale-125 hover:translate-x-1 hover:translate-y-1">
          My Blog
        </h1>

        {user ? (
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-900">
              {" "}
              {user.displayName}
            </h2>

            <img
              style={{ borderRadius: "50%" }}
              height={"40"}
              width={"40"}
              src={`${user.photoURL}`}
              alt={`${user.displayName}`}
            />
            <button
              onClick={signout}
              className=" text-white bg-indigo-500 border-0 py-2 px-6 shadow-lg shadow-gray-500 focus:outline-none hover:scale-105 hover:bg-indigo-600 rounded text-lg"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={signInWithGoogle}
            className=" text-white bg-indigo-500 border-0 py-2 px-6 shadow-lg shadow-gray-500 focus:outline-none hover:scale-105 hover:bg-indigo-600 rounded text-lg"
          >
            Login
          </button>
        )}
      </div>
    </header>
  );
};

export default Navbar;

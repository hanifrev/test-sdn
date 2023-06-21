import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Cookies from "js-cookie";

const Navbar = () => {
  const router = useRouter();

  const signOut = () => {
    setTimeout(() => {
      Cookies.remove("access_token");
      Cookies.remove("username");
      localStorage.removeItem("access_token");
      router.push("/").then(() => router.reload());
    }, 1000);
  };

  const handleSignout = (e: any) => {
    e.preventDefault();
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div className="custom-ui">
            <h1>Logout your account?</h1>

            <button onClick={signOut} className="signout-btn">
              Logout
            </button>
            <button onClick={onClose} className="cancels-btn">
              Cancel
            </button>
          </div>
        );
      },
    });
  };

  return (
    <div id="navbar">
      <div className="max-w-screen-xl mx-auto flex flex-row justify-between">
        <div className="text-white">
          <img className="mx-auto pt-[21px]  pl-6" src="" />
          DASHBOARD
        </div>
        <div className="text-white flex flex-row pr-6 rightNav">
          <button
            className="w-full px-[17px] ml-6 info bg-red-500 hover:bg-red-400"
            onClick={handleSignout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

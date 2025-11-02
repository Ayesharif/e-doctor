import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../component/tosters";
import Loader from "../component/loader";

export default function Nav() {
  const [login, SetLogin] = useState(false);
  const [showBar, SetBar] = useState(false);
  const navigate = useNavigate();

  // ✅ Check if user is authenticated
useEffect(() => {
  const checkUserAuth = async () => {
    try {
      const response = await fetch("http://localhost:3000/authMe", {
        method: "GET",
        credentials: "include", 
      });

      const data = await response.json();
      if (data.status === 1) {
        SetLogin(true);
      } else {
        SetLogin(false);
      }
    } catch (error) {
      console.error("Auth check failed:", error);
      SetLogin(false);
    }
  };

  // first check when Nav mounts
  checkUserAuth();

  // listen for login updates (from localStorage)
  const interval = setInterval(() => {
    if (localStorage.getItem("authUpdated")) {
      localStorage.removeItem("authUpdated");
      checkUserAuth();
    }
  }, 500);

  return () => clearInterval(interval);
}, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    handleSuccess("Logged out successfully!");
    SetLogin(false);
    navigate("/login");
  };

  const handleDropDown = () => {
    SetBar(!showBar);
  };

  return (
    <div className="flex h-15 justify-center items-center bg-blue-50">
      <div className="md:w-[90%] w-[100%] flex flex-row justify-between items-center relative transition-all ease-in duration-300">
        <div className="md:w-[25%] flex flex-col justify-between items-center">
          <Link
            className="flex items-center flex-col px-5 md:hover:text-blue-950"
            to={"/"}
          >
            <p className="text-3xl font-extrabold">E-doctor</p>
          </Link>
        </div>

        <button onClick={() => SetBar(!showBar)} className="md:hidden">
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>

        <div
          className={`w-full flex md:items-center justify-end md:flex-row md:gap-10 flex-col md:relative absolute
            transition-all
            md:top-0 top-12 ease-in-out duration-300 delay-100 bg-blue-50 z-10
            ${
              showBar
                ? "opacity-100 translate-y-0 visible scale-100 z-100"
                : "opacity-0 -translate-y-2 invisible md:opacity-100 md:translate-y-0 md:visible md:scale-100 scale-95"
            }`}
        >
          {login ? (
            <>
              <Link
                to={"/"}
                onClick={() => SetBar(false)}
                className="p-1 md:hover:text-blue-950 hover:bg-blue-950 hover:text-white"
              >
                Dashboard
              </Link>
              <Link
                to={"/uploadreport"}
                onClick={() => SetBar(false)}
                className="p-1 md:hover:text-blue-950 hover:bg-blue-950 hover:text-white"
              >
                Upload Report
              </Link>
              <Link
                to={"/addvitals"}
                onClick={() => SetBar(false)}
                className="p-1 md:hover:text-blue-950 hover:bg-blue-950 hover:text-white"
              >
                Add Vitals
              </Link>
              <button
                onClick={handleLogout}
                className="p-1 text-red-600 hover:bg-blue-950 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={"/login"}
                onClick={() => SetBar(false)}
                className="p-1 md:hover:text-blue-950 hover:bg-blue-950 hover:text-white"
              >
                Login
              </Link>
              <Link
                to={"/register"}
                onClick={() => SetBar(false)}
                className="p-1 md:hover:text-blue-950 hover:bg-blue-950 hover:text-white"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../component/loader";
import { handleError, handleSuccess } from "../component/tosters";

export default function Login() {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  // handle input
  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  // handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = loginData;
    const emailFormat = /^[a-zA-Z0-9_.+]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    // ✅ Basic validation
    if (!email || !password) {
      alert("Please fill all fields!");
      return;
    }
    if (!emailFormat.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    setLoading(true);

    try {
      // 🌐 Send request to backend
      const response = await fetch("http://localhost:3000/login", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  credentials: "include", // ✅ important for cookies
  body: JSON.stringify({ email, password }),
});


      const data = await response.json();

      if (response.ok) {
        handleSuccess("Login successful!");
        localStorage.setItem("token", data.token); // ✅ store JWT
        localStorage.setItem("user", JSON.stringify(data.data));
        navigate("/"); // redirect to dashboard
      } else {
        handleError(data.message || "Invalid credentials!");
      }
    } catch (error) {
      console.error("Login error:", error);
      handleError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-[80vh] flex flex-col justify-center items-center">
      {loading && <Loader />}

      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="md:w-[40%] w-[90%] flex flex-col gap-2 p-5 border-1 border-gray-300 hover:border-black rounded shadow"
      >
        <p className="text-2xl text-center font-bold">User Login</p>

        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="outline-1 p-2 rounded focus:outline-black"
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            placeholder="Your Password"
            className="outline-1 p-2 rounded focus:outline-black"
            required
          />
        </div>

        <div className="flex items-center w-full flex-col py-5">
          <button
            type="submit"
            disabled={loading}
            className={`border-1 w-full rounded py-1 cursor-pointer font-medium ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "hover:bg-blue-950 hover:text-white"
            }`}
          >
            {loading ? "Logging in..." : "Submit"}
          </button>
        </div>

        <Link to="/register" className="text-green-600 underline text-center">
          Register?
        </Link>
      </form>
    </div>
  );
}

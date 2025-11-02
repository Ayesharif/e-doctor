import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../component/loader";
import { handleError, handleSuccess } from "../component/tosters";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterData({ ...registerData, [name]: value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const emailFormat = /^[a-zA-Z0-9_.+]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const { firstName, lastName, phone, email, password } = registerData;

    // ✅ Validate
    if (!firstName || !lastName || !phone || !email || !password) {
      alert("Please fill all fields!");
      return;
    }

    if (!emailFormat.test(email)) {
      alert("Please enter a valid email address!");
      return;
    }

    setLoading(true);

    try {
      // 🌐 Call backend API
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      const data = await response.json();

      if (response.ok) {
        handleSuccess("Registration successful!");
        setRegisterData({
          firstName: "",
          lastName: "",
          phone: "",
          email: "",
          password: "",
        });
        navigate("/login");
      } else {
        handleError(data.message || "Registration failed!");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      handleError("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center py-10">
      {loading && <Loader />}

      <form
        autoComplete="off"
        onSubmit={handleSubmit}
        className="md:w-[50%] w-[90%] flex flex-col gap-5 p-5 border-1 border-gray-300 hover:border-black rounded shadow"
      >
        <p className="text-2xl text-center font-bold">User Registration</p>

        <div className="flex flex-col gap-2">
          <label>First Name</label>
          <input
            type="text"
            className="outline-1 p-2 rounded focus:outline-black"
            placeholder="Your First Name"
            name="firstName"
            value={registerData.firstName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Last Name</label>
          <input
            type="text"
            className="outline-1 p-2 rounded focus:outline-black"
            placeholder="Your Last Name"
            name="lastName"
            value={registerData.lastName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Phone</label>
          <input
            type="text"
            className="outline-1 p-2 rounded focus:outline-black"
            placeholder="Your Phone Number"
            name="phone"
            value={registerData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Email</label>
          <input
            type="text"
            className="outline-1 p-2 rounded focus:outline-black"
            placeholder="Your Email"
            name="email"
            value={registerData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label>Password</label>
          <input
            type="password"
            className="outline-1 p-2 rounded focus:outline-black"
            placeholder="Your Password"
            name="password"
            value={registerData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="flex items-center w-full flex-col py-5">
          <button
            type="submit"
            disabled={loading}
            className={`border-1 w-full rounded py-2 cursor-pointer font-medium ${
              loading
                ? "bg-gray-300 cursor-not-allowed"
                : "hover:bg-blue-950 hover:text-white"
            }`}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </div>

        <Link to="/login" className="text-green-600 underline text-center">
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
};

export default Register;

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as EyeOn } from "./eye-svgrepo-com.svg";
import { ReactComponent as EyeOff } from "./eye-off-svgrepo-com.svg";
export default function Signup() {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    location: "",
  });
 const [showPassword,setShowPassword] = useState(true);
  let navigate = useNavigate();
  async function handleSubmit(event) {
    event.preventDefault();
    const userCheck = await fetch("http://localhost:5000/api/emailcheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: credentials.email }),
    });
    const userResponse = await userCheck.json();
    if (!userResponse.success) {
      alert(userResponse.message);
      navigate("/log-in");
      return;
    }

    // Send user details to the backend
    const response = await fetch(
      "http://localhost:5000/api/send-verification",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ phoneNumber: "+917738301351" }),
      }
    );

    const result = await response.json();
    if (result.success) {
      alert("OTP sent to your phone number!");
      // Pass user details to OTP verification page
      navigate("/verifyotp", { state: { credentials } });
    } else {
      alert(result.message || "Failed to send OTP.");
    }
  }
  function handleChange(event) {
    // here i have to write the event.target.name in the brackets
    // because we want to make it as a key in the object.
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }
  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
}
  return (
    <>
      <div className="flex flex-row justify-center">
        <div className="mt-32 bg-violet-700 w-1/4 rounded-3xl">
          <div className="text-white pt-8 text-3xl text-center font-austrailia">
            Welcome To The Family!
          </div>
          <form onSubmit={handleSubmit}>
            <div className="block p-5">
              <label htmlFor="name" className="text-white text-xl">
                Name:
              </label>
              <input
                value={credentials.name}
                onChange={handleChange}
                className="block w-full border-4 border-solid focus:border-violet-300 focus:outline-none rounded-xl"
                type="text"
                id="name"
                name="name"
                required
              />
            </div>
            <div className="block p-5">
              <label htmlFor="email" className="text-white text-xl">
                Email:
              </label>
              <input
                value={credentials.email}
                onChange={handleChange}
                className="block w-full border-4 border-solid focus:border-violet-300 focus:outline-none rounded-xl"
                type="email"
                id="email"
                name="email"
                required
              />
            </div>
            <div className="block p-5 relative">
              <label htmlFor="password" className="text-white text-xl">
                Password:
              </label>
              <input
                value={credentials.password}
                onChange={handleChange}
                className="block w-full border-4 border-solid focus:border-violet-300 focus:outline-none rounded-xl"
                type={showPassword ? "password" : "text"}
                id="password"
                name="password"
                required
              />
              {showPassword ? (
                <EyeOff
                  onClick={togglePasswordVisibility}
                  className="w-8 h-8 absolute bottom-5 right-8 cursor-pointer"
                ></EyeOff>
              ) : (
                <EyeOn
                  onClick={togglePasswordVisibility}
                  className="w-8 h-8 absolute bottom-5 right-8 cursor-pointer"
                ></EyeOn>
              )}
            </div>
            <div className="block p-5">
              <label htmlFor="password" className="text-white text-xl">
                Location:
              </label>
              <input
                value={credentials.location}
                onChange={handleChange}
                className="block w-full border-4 border-solid focus:border-violet-300 focus:outline-none rounded-xl"
                type="text"
                id="location"
                name="location"
                required
              />
            </div>
            <div className="flex justify-center space-x-3 p-5">
              <button
                className="text-stone-700 text-lg bg-violet-400 p-2 rounded-lg hover:text-stone-800 hover:bg-violet-300 hover:text-xl"
                type="submit"
              >
                Submit
              </button>
              <button
                className="text-stone-700 text-lg bg-violet-400 p-2 rounded-lg hover:text-stone-800 hover:bg-violet-300 hover:text-xl"
                type="button"
              >
                <Link to="/log-in">Already a User?</Link>
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

// now to verify the jwt before every request we use it in the following manner
// first is we include it in the header
// const response = await fetch("http://localhost:5000/api/protected-route", {
//     method: "GET", // or "POST", "PUT", etc., depending on the request
//     headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${localStorage.getItem('authToken')}`
//     }
// });

// backend
// const jwt = require('jsonwebtoken');

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers['authorization'];
//     const token = authHeader && authHeader.split(' ')[1];
// Extract token from "Bearer <token>"
//     if (!token) return res.status(401).json({ msg: 'Access Denied. No token provided.' });

//     try {
//         const verified = jwt.verify(token, process.env.JWT_SECRET); // Use your secret key
//         req.user = verified; // Attach user info to the request
//         next(); // Pass control to the next middleware or route handler
//     } catch (err) {
//         res.status(403).json({ msg: 'Invalid Token' });
//     }
// }

// module.exports = authenticateToken;
// the above thing is a middleware or a function which is called by the backend to verify the authentication token before the request
// if the authentication token is  valid then it will carry on with the request

// const express = require('express');
// const router = express.Router();
// const authenticateToken = require('./middleware/authenticateToken');

// router.get('/protected-route', authenticateToken, (req, res) => {
//     res.json({ msg: 'You have accessed a protected route', user: req.user });
// });

// module.exports = router;

// for token expiry
// import jwtDecode from 'jwt-decode';

// function isTokenExpired(token) {
//     const { exp } = jwtDecode(token);
//     return Date.now() >= exp * 1000;
// }

// const token = localStorage.getItem('authToken');
// if (!token || isTokenExpired(token)) {
//     alert('Session expired. Please log in again.');
//     navigate('/login');
// }

import { useEffect, useState } from "react";
import "./App.css";
import AppNavbar from "./components/AppNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Footer from "./components/Footer";
import AllMovie from "./components/AllMovie";
import Profile from "./components/Profile";
import Userprofile from "./components/userprofile";
import React from "react";
export const AuthContext_APP = React.createContext();

function App() {
  const token = localStorage.getItem("token");
  const email = "leonadorbill";
  const [showNavbar, setShowNavbar] = useState(true);
  const [id, setID] = useState("");

  const fetchAPI_LOGIN_TOKEN = async () => {
    try {
      const response = await fetch(`http://localhost:2000/authen`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const data = await response.json();
      if (data.status === "ok") {
        const user_id = data.decoded.id;
        //return ค่า ID ออกไปใช้นอกฟังก์ชั่น
        setID(user_id);
        return data.decoded.id;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(()=>{
    fetchAPI_LOGIN_TOKEN();
  },[])

  console.log("app.js",id);

  return (
      <div>
        {showNavbar && <AppNavbar />}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route
              path="/login"
              element={<Login setShowNavbar={setShowNavbar} />}
            />
            <Route
              path="/signup"
              element={<SignUp setShowNavbar={setShowNavbar} />}
            />
            <Route path="/movies" element={<AllMovie />} />
            <Route path="/profile/" element={<Userprofile id={id}/>} />
            <Route path="/profile/editprofile" element={<Profile id={id}/>} />
          </Routes>
        </BrowserRouter>
      </div>
  );
}

export default App;

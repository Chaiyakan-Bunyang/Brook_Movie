import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Navbar } from "react-bootstrap";
import AppNavbar from "./components/AppNavbar";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import CarouselsMain from "./components/CarouselsMain";
import MainContainer from "./components/MainContainer";
import Footer from "./components/Footer";
import AllMovie from "./components/AllMovie";
import React from 'react';
export const AuthContext_APP = React.createContext();

function App() {
  const email = "leonadorbill"
  const [showNavbar, setShowNavbar] = useState(true);
  return (
    <div>
        {showNavbar && <AppNavbar/>
        }
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route
              path="/login"
              element={<Login setShowNavbar={setShowNavbar} />}
            />
            <Route
              path="/signup"
              element={<SignUp setShowNavbar={setShowNavbar} />}
            />
            <Route 
              path="/movies"
              element={<AllMovie/>}
            />
          </Routes>
        </BrowserRouter>
        <Footer/>
    </div>

    
  );
}

export default App;

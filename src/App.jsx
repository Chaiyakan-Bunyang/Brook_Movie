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
import Footer from "./components/footer";

function App() {
  const [showNavbar, setShowNavbar] = useState(true);
  return (
    <div>
      <header>
        {showNavbar && <AppNavbar />}
        <BrowserRouter>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route
              path="/login"
              element={<Login setShowNavbar={setShowNavbar} />}
            />
            <Route
              path="/signup"
              element={<SignUp setShowNavbar={setShowNavbar} />}
            />
          </Routes>
        </BrowserRouter>
      </header>

      <main>
        <CarouselsMain />
        <MainContainer />
      </main>

      <footer>
        <Footer/>
      </footer>
    </div>
  );
}

export default App;

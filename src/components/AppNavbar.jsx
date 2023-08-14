import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "../css/AppNavbar.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home, { AuthContext } from "./Home";
import Login from "./Login";
import SignUp from "./SignUp";
import { useContext, useEffect, useState } from "react";
import { AuthContext_APP } from "../App";
import Dropdown from "react-bootstrap/Dropdown";
import axios from "axios";
import Profile from "./Profile";
import React from "react";
import {useNavigate} from 'react-router-dom';
function AppNavbar() {
  const [user_login, setUser_login] = useState(false);
  const [id, setID] = useState("");
  const [user_name, setUser_name] = useState("");
  const [user_email, setUser_email] = useState("");
  const token = localStorage.getItem("token");

  // const bcrypt = require('bcrypt');
  // const saltRounds = 10;

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
        setUser_login(true);
        const user_id = data.decoded.id;
        //return ค่า ID ออกไปใช้นอกฟังก์ชั่น
        setID(user_id);
        return data.decoded.id;
      }
    } catch (error) {
      console.log("error", error);
    }
  };
  const fetchUser = async (uid) => {
    try {
      // ตรวจสอบว่า user_login.id มีค่าอยู่แล้วหรือไม่
      if (uid) {
        const res = await axios.get(`http://localhost:2000/profile/${uid}`);
        setUser_email(res.data[0].email);
        setUser_name(res.data[0].username);
      } else {
        console.log("user_login.id is not available yet.=>");
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const handleLoginAndFetchUser = async () => {
    try {
      const fetchToken = await fetchAPI_LOGIN_TOKEN(); // รอให้ fetchAPI_LOGIN_TOKEN เสร็จสิ้นก่อน
      fetchUser(fetchToken); // เรียก fetchUser โดยไม่ต้องรอ
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };
  useEffect(() => {
    handleLoginAndFetchUser();
  }, []);


  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location = "/home";
  };

  const check_login = () => {
    if (!!user_login) {
      return (
        <div
          className="rounded-circle bg-warning d-flex justify-content-center align-items-center"
          style={{ width: "40px", height: "40px" }}
        >
          <Dropdown className="rounded-circle">
            <Dropdown.Toggle
              variant="Warning"
              id="dropdown-basic"
              className="rounded-circle user_icon"
              style={{ width: "40px", height: "40px" }}
            >
              <a className="text-light text-center text-decoration-none">
                <strong>{user_name.toUpperCase().substring(0, 1)}</strong>
              </a>
            </Dropdown.Toggle>

            <Dropdown.Menu
              className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start"
              style={{ width: "200px" }}
            >
              <Dropdown.Header className="d-flex flex-column">
                <strong className="text-warning h5">{user_name}</strong>
                <p className="text-gray d_header_email">{user_email}</p>
              </Dropdown.Header>
              <Dropdown.Item className="mt-0" href="/profile/">
                โปรไฟล์
              </Dropdown.Item>
              <Dropdown.Item
                className="mt-1"
                href="#/logout"
                onClick={handleLogout}
              >
                ออกจากระบบ
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      );
    } else {
      return (
        <div className="text-end">
          <a href="/login" className="btn btn-outline-light me-2">
            เข้าสู่ระบบ
          </a>
          <a href="/signup" className="btn btn-warning">
            ลงทะเบียน
          </a>
        </div>
      );
    }
    // if (user_login === "") {
    //   // หรือใช้ user_login === undefined ก็ได้
    //   return (
    //     <div className="text-end">
    //       <a href="/login" className="btn btn-outline-light me-2">
    //         Login
    //       </a>
    //       <a href="/signup" className="btn btn-warning">
    //         Sign Up
    //       </a>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <div
    //       className="rounded-circle bg-warning d-flex justify-content-center align-items-center"
    //       style={{ width: "40px", height: "40px" }}
    //     >
    //       <Dropdown className="rounded-circle">
    //         <Dropdown.Toggle variant="Warning"
    //         id="dropdown-basic"
    //         className="rounded-circle user_icon"
    //         style={{ width: "40px", height: "40px" }}

    //         >
    //         <a className="text-light text-center text-decoration-none">
    //         <strong>{("a").toUpperCase().substring(0, 1)}</strong>
    //       </a>
    //         </Dropdown.Toggle>

    //         <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start" style={{width:'200px'}}>
    //           <Dropdown.Item></Dropdown.Item>
    //           <Dropdown.Item href="#/action-1" onClick={handleLogout}>Logout</Dropdown.Item>

    //         </Dropdown.Menu>
    //       </Dropdown>
    //     </div>
    //   );
    // }
  };

  return (
    <header className="p-3 text-white Navbar" style={{ background: "#121212" }}>
      <div className="container">
        <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
          <a
            href="/"
            className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none"
          >
            <h3>Brook Book</h3>
          </a>

          <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 ms-5">
            <li>
              <a href="/" className="nav-link px-3 text-white">
                หน้าหลัก
              </a>
            </li>
            <li>
              <a href="movies" className="nav-link px-3 text-white">
                ภาพยนต์
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-3 text-white">
                ซีรีส์
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-3 text-white">
                ข่าวสาร
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-3 text-white">
                ติดต่อเรา
              </a>
            </li>
          </ul>

          <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
            <input
              type="search"
              className="form-control form-control-dark"
              placeholder="Search..."
              aria-label="Search"
            />
          </form>
          <div className="text-end">{check_login()}</div>
          {/* <div className="text-end">
          <a href="/login" className='btn btn-outline-light me-2'>{check_login()}</a>
          <a href="/signup" className="btn btn-warning">Sign Up</a>
        </div> */}
        </div>
      </div>
    </header>
  );
}
export { AuthContext };
export default AppNavbar;

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

function AppNavbar() {
  const [user_login, setUser_login] = useState(null);
  const token = localStorage.getItem("token");
  const fetchAPI_LOGIN_TOKEN = () => {
    fetch(`http://localhost:3333/authen`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "ok") {
          console.log("success", data);
          setUser_login({email:data.decoded.email,username:data.decoded.username});
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  console.log(user_login);
  // const fetchAPI_USERS = async ()=>{
  //   const response = await axios.get('http://localhost:3333/users',{
  //     headers:{
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     }
  //   });
  //   setUser_profile(response.data.data[0].email)
  // }
  // console.log(user_profile);


  const handleLogout = ()=>{
    localStorage.removeItem('token');
    window.location ='/home'
  }
  useEffect(() => {
    fetchAPI_LOGIN_TOKEN();
  
  }, []);

  const check_login = () => {

    if(!!user_login){
       return (
        <div
          className="rounded-circle bg-warning d-flex justify-content-center align-items-center"
          style={{ width: "40px", height: "40px" }}
        >
          <Dropdown className="rounded-circle">
            <Dropdown.Toggle variant="Warning"  
            id="dropdown-basic" 
            className="rounded-circle user_icon"
            style={{ width: "40px", height: "40px" }}
          
            >
            <a className="text-light text-center text-decoration-none">
            <strong>{user_login.username.toUpperCase().substring(0, 1)}</strong>
          </a>
            </Dropdown.Toggle>

            <Dropdown.Menu className="dropdown-menu dropdown-menu-end dropdown-menu-lg-start" style={{width:'200px'}}>
            <Dropdown.Header className="d-flex flex-column">
            <strong className="text-dark h5">{user_login.username}</strong>
            <p className="text-gray d_header_email">{user_login.email}</p>
            </Dropdown.Header>
            <div className="line"></div>
              <Dropdown.Item  className="mt-0" href="#/action-1" onClick={handleLogout}>Logout</Dropdown.Item>
              
            </Dropdown.Menu>
          </Dropdown>
        </div>
       )
    }
    else{
      return (
            <div className="text-end">
              <a href="/login" className="btn btn-outline-light me-2">
                Login
              </a>
              <a href="/signup" className="btn btn-warning">
                Sign Up
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
                Home
              </a>
            </li>
            <li>
              <a href="movies" className="nav-link px-3 text-white">
                Movies
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-3 text-white">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-3 text-white">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="nav-link px-3 text-white">
                About
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

export default AppNavbar;

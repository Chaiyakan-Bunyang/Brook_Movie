import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import "../css/AppNavbar.css"
import {BrowserRouter,Routes,Route, useLocation} from 'react-router-dom'
import Home from './Home';
import Login from './Login';
import SignUp from './SignUp';
import { useState } from "react";


function AppNavbar() {

 

  return (
    <header className="p-3 text-white Navbar" style={{background:'#121212'}}>
    <div className="container">
      <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" className="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <h3>Brook Book</h3> 
        </a>

        <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 ms-5">
          <li><a href="/" className="nav-link px-3 text-white">Home</a></li>
          <li><a href="movies" className="nav-link px-3 text-white">Movies</a></li>
          <li><a href="#" className="nav-link px-3 text-white">Pricing</a></li>
          <li><a href="#" className="nav-link px-3 text-white">FAQs</a></li>
          <li><a href="#" className="nav-link px-3 text-white">About</a></li>
        </ul>

        <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" className="form-control form-control-dark" placeholder="Search..." aria-label="Search"/>
        </form>

        <div className="text-end">
          <a href="/login" className='btn btn-outline-light me-2'>Login</a>
          <a href="/signup" className="btn btn-warning">Sign Up</a>
        </div>
      </div>
    </div>
  </header>
  );
}

export default AppNavbar;
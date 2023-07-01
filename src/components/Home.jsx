import React, { useEffect, useReducer, useState } from "react";
import CarouselsMain from "./CarouselsMain";
import MainContainer from "./MainContainer";
import Footer from "./footer";
import Context from "./Context";
import AppNavbar from "./AppNavbar";

// function reducer(state,action){
//   if(action.type ==='login') {
//     return {email}
//   }
//   if(action.type ==='logout'){
//     return null;
//   }
//   return state;
// }

export const AuthContext = React.createContext();

const Home = () => {

//  const[authState,authDispatch] = useReducer(reducer,null)

  const email = "leonadorbill"
  // const fetchAPI_LOGIN_TOKEN = () => {
  //   const token = localStorage.getItem("token");
  //   fetch(`http://localhost:3333/authen`, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.status === "ok") {
  //         console.log("success", data);
  //       } else {
  //         alert("authen fail");
  //         window.location = "/login";
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("error", error);
  //     });
  // };
  // useEffect(() => {
  //   fetchAPI_LOGIN_TOKEN();
  // }, []);
  return (
   
  <div>
     <CarouselsMain />
      <MainContainer />
  </div>
     
   
  );
};

export default Home;


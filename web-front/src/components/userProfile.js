
import { Link } from 'react-router-dom';
import React, { Component, useEffect, useState } from "react";

import '../css/profile.css'

import Header from './Header';
import Footer from './Footer';

function Account() {
  const [userData, setUserData] = useState("");
  const [admin, setAdmin] = useState(false);

  const [userId, setUserId] = useState(null);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const parsedToken = parseJwt(token);
      if (parsedToken) {
        setUserId(parsedToken.userId);
      } else {
        alert("Invalid token");
      }
    } else {
      alert("Please login before using our service");
      window.location.href = "/sign-in";
    }
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split("")
          .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
          .join("")
      );
      return JSON.parse(jsonPayload);
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    fetch("http://localhost:5000/userData", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        token: window.localStorage.getItem("token"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        if (data.data.userType == "Admin") {
          setAdmin(true);
        }

        setUserData(data.data);

        if (data.data == "token expired") {
          alert("Token expired login again");
          window.localStorage.clear();
          window.location.href = "./sign-in";
        }
      });
  }, []);
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };

  return (
    <div>
      <Header />
        <h1 className='account_header'>My Account</h1>
        <form>
          <div className='userdata' style={ {marginBottom:20} }>
            <div className="userdata-container">
              <p>Name : {userData.fname} {userData.lname}</p>
              <p>Email : {userData.email}</p>
            </div>
          </div>
        </form>
        <menuButton>
            <button onClick={logOut} className='button_logOut' style={ {marginBottom:203 } }>Log out</button>
        </menuButton>
        <br />
      <Footer />
    </div>
  );
}

export default Account
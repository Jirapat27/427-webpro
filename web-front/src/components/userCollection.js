import React, { Component, useEffect, useState } from "react";
import { Link } from 'react-router-dom'

// style
import '../css/collection.css'

// component
import Header from './Header'
import Footer from './Footer'

function Collection() {
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
  const [data, setData] = useState([]);
  const getMouse = () => {
    fetch("http://localhost:5000/getMouse", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };

  useEffect(() => {
    getMouse();
  }, []);

  return (
    <div>
        <Header />
        <h1 className='collection_header' style={{paddingTop:20,color:"#fff"}}>Mouse List</h1>
        <div className='collection-container'>
        {data.map((i) => {
          return (
          <div className='collection_n'>
            <img src={i.image} />
            <p className='collection_name'>Brand: {i.brand}</p>
            <p className='collection_name'>Series: {i.name}</p>
            <p className='collection_name'>Sensor: {i.sensor}</p>
          </div>
          );
          })}
        </div>
        <Footer />
    </div>
  )
}

export default Collection
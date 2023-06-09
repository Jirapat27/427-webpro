import React, { Component, useEffect, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRef } from "react";
import '../css/adminHome.css';

export default function AdminHome({ userData }) {

  //setting state
  const [data, setData] = useState([]);
  const [limit,setLimit]=useState(5);
  const [pageCount,setPageCount]=useState(1);
  const currentPage=useRef();



  useEffect(() => {
    currentPage.current=1;
    // getAllUser();
    getPaginatedUsers();
  }, []);


  //fetching all user
  const getAllUser = () => {
    fetch("http://localhost:5000/getAllUser", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setData(data.data);
      });
  };



//logout
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };


  //deleting user
  const deleteUser = (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}`)) {
      fetch("http://localhost:5000/deleteUser", {
        method: "POST",
        crossDomain: true,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          userid: id,
        }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.data);
          getAllUser();
        });
    } else {
    }
  };

  function getPaginatedUsers(){
    fetch(`http://localhost:5000/paginatedUsers?page=${currentPage.current}&limit=${limit}`, {
      method: "GET",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userData");
        setPageCount(data.pageCount);
        setData(data.result)
      });

  }

  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [sensor, setSensor] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(image ,brand, name, sensor);
    fetch("http://localhost:5000/addmouse", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        image,
        brand,
        name,
        sensor,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "Added catalog") {
          alert("Added to the list");
          window.location.href = "./homepage";
        } else {
          alert("Something went wrong");
          window.location.href = "./homepage";
        }
      });
  };

  return (
    <div className="auth-wrapper" style={{ height: "auto" }}>
      <div className="auth-inner" style={{ width: "auto" }}>
        <h3>Admin</h3>
        <table style={{ width: 500, backgroundColor:"#fff"}}>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Delete</th>
          </tr>
          {data.map((i) => {
            return (
              <tr>
                <td>{i.fname}</td>
                <td>{i.email}</td>
                <td>{i.userType}</td>
                <td>
                  <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => deleteUser(i._id, i.fname)}
                  />
                </td>
              </tr>
            );
          })}
        </table>
          

        <form className="form" onSubmit={handleSubmit}>
          <h2 style={{marginTop:30, color:"#fff"}}>Mouse Adder</h2>
          <div className="from-bg">
          <div>
          </div>
          <div className="mb-4">
            <label>Mouse's Image</label>
            <input
              type="text"
              className="form-control"
              placeholder="url"
              onChange={(e) => setImage(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label>Mouse's Brand</label>
            <input
              type="text"
              className="form-control"
              placeholder="brand"
              onChange={(e) => setBrand(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label>Mouse's Series</label>
            <input
              type="text"
              className="form-control"
              placeholder="series"
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label>Mouse's Sensor</label>
            <input
              type="text"
              className="form-control"
              placeholder="sensor"
              onChange={(e) => setSensor(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button type="submit" className="button-add">
              Add item
            </button>
          </div>
          </div>
        </form>
        <div className="logout">
          <button onClick={logOut} className="button-logout">
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

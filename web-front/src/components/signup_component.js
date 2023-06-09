import React, { Component, useState } from "react";

export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCpassword] = useState("");
  const [secretKey, setSecretKey] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(fname, lname, email, password);
    fetch("http://localhost:5000/register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        fname,
        email,
        lname,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status === "ok") {
          alert("Signed Up");
          window.location.href = "./sign-in";
        } else if (data.status === "us") {
          alert("Email has already been used");
          window.location.href = "./sign-up";
        } else {
          alert("Error. Try again");
          window.location.href = "./sign-up";
        }
      });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
      <form onSubmit={handleSubmit}>
        <div className="textheader" style={{paddingBottom:40}}>
        <h3 style={{fontSize:50, color:"#D9D9D9",width:500,textAlign:"center"}}>Create new Account</h3>
          <p style={{color:"#D9D9D9", fontSize:20}}>
                      Fill the info to create your InwID Already Registered? <a href="/sign-in">Login</a>
          </p>
        </div>
          <div>
          </div>
          <div className="mb-3">

            <input
              type="text"
              className="form-control"
              placeholder="First name"
              onChange={(e) => setFname(e.target.value)}
            />
          </div>

          <div className="mb-3">
 
            <input
              type="text"
              className="form-control"
              placeholder="Last name"
              onChange={(e) => setLname(e.target.value)}
            />
          </div>

          <div className="mb-3">

            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


          <div className="d-grid">
            <button type="submit" className="btns">
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

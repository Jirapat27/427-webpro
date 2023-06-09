import React, { Component, useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    console.log(email, password);
    fetch("http://localhost:5000/login-user", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data, "userRegister");
        if (data.status == "ok") {
          alert("Login success");
          window.localStorage.setItem("token", data.data);
          window.localStorage.setItem("loggedIn", true);

          window.location.href = "./homepage";
        }
        else{
          alert("Invalid email or password");
        }
      });
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleSubmit}>
        <div className="textheader" style={{paddingBottom:40}}>
        <h3 style={{fontSize:50, color:"#D9D9D9",width:500,textAlign:"center"}}>Login</h3>
          <p style={{color:"#D9D9D9", fontSize:20}}>No InwId yet? <a href="/sign-up">Register here</a>
          </p>
        </div>

          <div className="mb-3">

            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-3">

            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>



          <div className="d-grid">
            <button type="submit" className="btns">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

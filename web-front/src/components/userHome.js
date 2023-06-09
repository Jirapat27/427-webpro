import React, { Component, useEffect, useState } from "react";
import Header from './Header'
import Footer from './Footer'
import Banner from "./Banner"
export default function UserHome({ userData }) {
  const logOut = () => {
    window.localStorage.clear();
    window.location.href = "./sign-in";
  };
  return (
    <div>
      <Header />
      <Banner/>
        



    <Footer />
    </div>
  );
}

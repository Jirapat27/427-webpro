import React from 'react'
import { Link } from 'react-router-dom'

// style
import '../css/banner.css'

const Banner = () => {
  return (
    <section className="containerban">
          <div className="item">
          <h1 className="title">
          Discover
          </h1>
          <p className="desc">
          The world full of gaming mice
          </p>
          <Link to="/Collection"><button className='buttons'><span>Get Started</span></button></Link>
          </div>
        <div className="item">
          <img src="https://cdn.discordapp.com/attachments/445928139021877259/1116285078474076272/6.png" alt="" className="imgb" />
        </div>
        
    </section>
  )
}

export default Banner
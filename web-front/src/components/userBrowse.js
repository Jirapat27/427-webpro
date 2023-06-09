import React from 'react'
import { Link } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'

import './Banner.css'

function Browse() {
  return (
    <div>
        <Header />
        <h1 className='browse_header'>Browse</h1>
        <div className='ads'>
          <div className='ads-container'>
            <p>Brand new mouse</p>
            <img src="https://cdn.discordapp.com/attachments/445928139021877259/1116285078474076272/6.png" alt="" className="img-ads"/>
          </div>
        </div>
        <div className='search'>
          <div className='search-container'>
            <input type="text" className="search_box" placeholder="search here..." />
            <button className="button-search">search</button>
          </div>
        </div>
        <div className="item">
          <div className="item-container">
            <div className="grid">
              <div className="item">
                <div className="content">
                  <img src='' alt=''/>
                  <p></p>
                </div>
              </div>
              <div className="item">
                <div className="content">
                  <img src='' alt=''/>
                  <p></p>
                </div>
              </div>
              <div className="item">
                <div className="content">
                  <img src='' alt=''/>
                  <p></p>
                </div>
              </div>
              <div className="item">
                <div className="content">
                  <img src='' alt=''/>
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to='/' className='text-link'>Back to homepage</Link>
        <Footer />
    </div>
  )
}

export default Browse
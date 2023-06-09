import React from 'react';
import { Link } from 'react-router-dom';

// style
import '../css/component.css'
const logOut = () => {
  window.localStorage.clear();
  window.location.href = "./sign-in";
};
const Header = () => {
  
  return (
    <header>
      <nav>
        <p><Link to='/homepage' className='header-text-link'>InwMouse</Link></p>
        <div>
          <ul className='navbar'>
            <li><Link to='/Collection' className='header-text-link'>Collection</Link></li>
            <li><Link to='/Account' className='header-text-link'>Profile</Link></li>
            <li><Link to='/sign-in' className='header-text-link'> <button className='btn btn-danger' onClick={logOut}>Logout</button></Link></li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;

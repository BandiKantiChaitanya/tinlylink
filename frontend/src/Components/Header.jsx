import React from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import '../App.css'

function Header({ onOpen }) {
  const navigate = useNavigate();
  return (
    <header>
      <nav className='navbar navbar-expand-lg navbar-dark bg-dark fixed-top'>
        <div className="container">
          <span className="navbar-brand" style={{cursor:'pointer'}} onClick={() => navigate('/')}> <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Bit.ly_Logo.svg/1200px-Bit.ly_Logo.svg.png" alt="" style={{width:'auto',height:'60px', padding:'4px'}} /> </span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className='navbar-nav ms-auto'>
              <li className='nav-item'><NavLink to='/' className='nav-link'>Home</NavLink></li>
              <li className='nav-item'><span className='nav-link btn btn-link text-decoration-none' style={{cursor:'pointer'}} onClick={onOpen}>Create Link</span></li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;

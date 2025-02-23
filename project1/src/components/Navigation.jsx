import React from 'react';
import './Navigation.css';

const Navigation = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <a href="/">
        <img className="logo" src="/public/logo.png" alt="logo" />
        </a>
      </div>
      <ul className="navbar-links">
        <li><a href="/">Home</a></li>
        <li><a href="/">Schedule</a></li>
      </ul>
    </nav>
  );
}

export default Navigation;
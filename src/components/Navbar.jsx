import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled glass' : ''}`}>
      <div className="container nav-container">
        <Link to="/" className="logo">
          <span className="logo-icon">🐝</span>
          <span className="logo-text text-gradient">The Buzz Hive</span>
        </Link>
        
        <ul className="nav-links">
          <li>
            <NavLink to="/products" className={({isActive}) => isActive ? 'active' : ''}>
              Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/about" className={({isActive}) => isActive ? 'active' : ''}>
              About
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({isActive}) => isActive ? 'active' : ''}>
              Visit Us
            </NavLink>
          </li>
        </ul>

        <div className="nav-actions">
          <Link to="/contact" className="btn btn-primary">Get Directions</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

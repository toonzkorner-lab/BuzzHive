import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer id="location" className="footer">
      <div className="container footer-grid">
        <div className="footer-brand">
          <a href="#" className="logo">
            <span className="logo-icon">🐝</span>
            <span className="logo-text text-gradient">The Buzz Hive</span>
          </a>
          <p className="footer-tagline">
            Your premium destination for the finest smoke, vape, and lifestyle products in San Antonio.
          </p>
        </div>

        <div className="footer-info">
          <h4 className="footer-heading">Visit Us</h4>
          <p>10718 Perrin Beitel Rd</p>
          <p>San Antonio, TX 78217</p>
          <p className="footer-phone">
            <a href="tel:2102513265">(210) 251-3265</a>
          </p>
        </div>

        <div className="footer-hours">
          <h4 className="footer-heading">Store Hours</h4>
          <ul>
            <li><span>Mon - Thu:</span> 10:00 AM - 9:00 PM</li>
            <li><span>Fri - Sat:</span> 10:00 AM - 10:00 PM</li>
            <li><span>Sunday:</span> 11:00 AM - 8:00 PM</li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} The Buzz Hive. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

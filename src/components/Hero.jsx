import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-bg-pattern"></div>
      <div className="container hero-content">
        <div className="hero-text animate-fade-up">
          <span className="badge">San Antonio, TX</span>
          <h1 className="hero-title">
            Find Your Perfect <br />
            <span className="text-gradient">Buzz</span>
          </h1>
          <p className="hero-subtitle delay-1">
            San Antonio's premier destination for premium THC-A flower, vapes, hookah, and kratom. 
            Experience quality products and exceptional service at The Buzz Hive.
          </p>
          <div className="hero-buttons delay-2">
            <Link to="/products" className="btn btn-primary">Explore Products</Link>
            <Link to="/contact" className="btn btn-outline">Visit the Hive</Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React from 'react';
import { Link } from 'react-router-dom';
import { productsData } from '../data/products';
import './Products.css';

const Products = () => {
  return (
    <section id="products" className="products-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Our Premium <span className="text-gradient">Selection</span></h2>
          <p className="section-subtitle">We carry only the highest quality products tailored to your needs.</p>
        </div>
        
        <div className="products-grid">
          {productsData.map((product) => (
            <Link to={`/products/${product.id}`} key={product.id} className="product-card glass block-link">
              <div className="product-icon">{product.icon}</div>
              <h3 className="product-title">{product.title}</h3>
              <p className="product-desc">{product.description}</p>
              <div className="mt-4">
                <span className="text-primary font-bold hover-underline">Learn More &rarr;</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;

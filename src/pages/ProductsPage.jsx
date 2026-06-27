import React from 'react';
import Products from '../components/Products';
import FAQ from '../components/FAQ';
import './PageDefaults.css';

const ProductsPage = () => {
  return (
    <div className="page-wrapper pt-32">
      <div className="container">
        <h1 className="page-title text-gradient">Our Full Selection</h1>
        <p className="page-subtitle">Browse through our premium categories and find exactly what you need.</p>
      </div>
      <Products />
      <div className="pb-16">
        <FAQ />
      </div>
    </div>
  );
};

export default ProductsPage;

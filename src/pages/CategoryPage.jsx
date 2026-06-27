import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsData } from '../data/products';
import './PageDefaults.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  
  // Find the category from our data
  const category = productsData.find(c => c.id === categoryId);

  // If the category doesn't exist, show a simple 404-like message
  if (!category) {
    return (
      <div className="page-wrapper pt-32 text-center">
        <div className="container">
          <h1 className="page-title text-gradient">Category Not Found</h1>
          <p className="page-subtitle mb-4">We couldn't find the product category you're looking for.</p>
          <Link to="/products" className="btn btn-primary">Back to All Products</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-wrapper pt-32">
      <div className="container">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4" style={{fontSize: '4rem'}}>{category.icon}</div>
          <h1 className="page-title text-gradient">{category.title}</h1>
        </div>
        
        <div className="glass content-card mt-8 animate-fade-up">
          <p className="text-xl mb-6">
            {category.longDescription}
          </p>
          <div className="mt-8 pt-6 border-t" style={{borderTop: '1px solid rgba(255,255,255,0.1)'}}>
            <h3 className="text-primary font-bold text-xl mb-4">Interested in {category.title}?</h3>
            <p className="mb-4">Visit our San Antonio store to check out our full inventory and let our knowledgeable staff help you find exactly what you need.</p>
            <Link to="/contact" className="btn btn-primary">Get Directions</Link>
          </div>
        </div>
        
        <div className="mt-12 text-center animate-fade-up delay-1">
          <Link to="/products" className="btn btn-outline">&larr; Back to Categories</Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsData } from '../data/products';
import { getProductsByCategory } from '../data/localDb';
import { FaArrowLeft } from 'react-icons/fa';
import '../components/PageDefaults.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const category = productsData.find(c => c.id === categoryId);

  useEffect(() => {
    // Scroll to top on mount
    window.scrollTo(0, 0);
    
    // Fetch from localDb
    setLoading(true);
    try {
      const data = getProductsByCategory(categoryId);
      setItems(data);
    } catch (error) {
      console.error("Error fetching items:", error);
    }
    setLoading(false);
  }, [categoryId]);

  if (!category) {
    return (
      <div className="page-wrapper pt-32 text-center">
        <h1 className="text-3xl font-bold mb-4">Category Not Found</h1>
        <Link to="/products" className="text-primary hover:underline">Return to Products</Link>
      </div>
    );
  }

  return (
    <div className="page-wrapper pt-32 pb-16">
      <div className="container">
        
        {/* Header */}
        <div className="mb-12">
          <Link to="/products" className="inline-flex items-center gap-2 text-gray-400 hover:text-primary transition-colors mb-6">
            <FaArrowLeft /> Back to all categories
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <span className="text-5xl">{category.icon}</span>
            <h1 className="text-4xl md:text-5xl font-bold text-gradient">{category.title}</h1>
          </div>
          <p className="text-xl text-gray-300 max-w-3xl">{category.longDescription}</p>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-400">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
            Loading products...
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.length === 0 ? (
              <div className="col-span-full text-center py-20 glass rounded-2xl">
                <p className="text-xl text-gray-400 mb-2">No products available in this category yet.</p>
                <p className="text-gray-500">Check back soon for updates!</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="glass rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group flex flex-col">
                  <div className="aspect-[4/3] bg-black/50 overflow-hidden relative">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold text-white pr-4">{item.name}</h3>
                      <span className="text-primary font-bold bg-primary/10 px-3 py-1 rounded-full whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                    <p className="text-gray-400 text-sm flex-grow mb-4">{item.description}</p>
                    <button className="w-full btn btn-outline mt-auto py-2 hover:bg-primary hover:text-black transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

      </div>
    </div>
  );
};

export default CategoryPage;

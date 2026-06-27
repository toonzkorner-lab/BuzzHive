import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { productsData } from '../data/products';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './PageDefaults.css';

const CategoryPage = () => {
  const { categoryId } = useParams();
  const categoryData = productsData.find(c => c.id === categoryId);
  
  const [firebaseItems, setFirebaseItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryItems = async () => {
      try {
        const q = query(collection(db, "products"), where("category", "==", categoryId));
        const querySnapshot = await getDocs(q);
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        setFirebaseItems(items);
      } catch (err) {
        console.log("Firebase not configured or no items found. Using local placeholders if any.");
      } finally {
        setLoading(false);
      }
    };
    fetchCategoryItems();
  }, [categoryId]);

  if (!categoryData) {
    return (
      <div className="page-wrapper pt-32 flex flex-col items-center justify-center text-center">
        <h1 className="page-title text-gradient">Category Not Found</h1>
        <Link to="/products" className="btn btn-primary mt-8">Back to Products</Link>
      </div>
    );
  }

  // Combine firebase items with local items for display
  const itemsToDisplay = firebaseItems.length > 0 ? firebaseItems : (categoryData.items || []);

  return (
    <div className="page-wrapper pt-32">
      <div className="container max-w-5xl">
        <div className="text-center mb-16 animate-fade-up">
          <div className="text-6xl mb-6">{categoryData.icon}</div>
          <h1 className="page-title text-gradient">{categoryData.title}</h1>
          <p className="page-subtitle max-w-3xl mx-auto">{categoryData.longDescription}</p>
        </div>

        <div className="product-grid animate-fade-up delay-1">
          {loading ? (
            <p className="text-center text-gray-400">Loading products...</p>
          ) : itemsToDisplay.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {itemsToDisplay.map((item, idx) => (
                <div key={item.id || idx} className="glass p-4 rounded-xl flex flex-col group">
                  <div className="relative w-full h-48 mb-4 rounded-lg overflow-hidden bg-black/40">
                    {item.imageUrl || item.image ? (
                      <img 
                        src={item.imageUrl || item.image} 
                        alt={item.title || item.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">No Image</div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-2">{item.title || item.name}</h3>
                  {item.price && <p className="text-primary font-bold mb-2">{item.price}</p>}
                  <p className="text-gray-400 text-sm flex-grow">{item.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center p-12 glass rounded-xl">
              <h3 className="text-2xl font-bold mb-4">No products listed yet</h3>
              <p className="text-gray-400">Check back soon or visit our store to see our full selection of {categoryData.title}!</p>
            </div>
          )}
        </div>

        <div className="mt-16 text-center animate-fade-up delay-2">
          <Link to="/products" className="btn btn-outline">← Back to All Categories</Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;

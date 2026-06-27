import React, { useState, useEffect } from 'react';
import { getProductsByCategory, addProduct, deleteProduct } from '../../data/localDb';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('thc-a');

  // New product form state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const fetchProducts = () => {
    setLoading(true);
    try {
      const data = getProductsByCategory(selectedCategory);
      setProducts(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    try {
      addProduct({
        categoryId: selectedCategory,
        name,
        price,
        description,
        image: image || '/logo.png', // Fallback to logo if empty
      });
      // Reset form
      setName('');
      setPrice('');
      setDescription('');
      setImage('');
      // Refresh list
      fetchProducts();
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDelete = (id) => {
    if(window.confirm('Are you sure you want to delete this product?')) {
      try {
        deleteProduct(id);
        fetchProducts();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <div className="p-6 text-white min-h-screen pt-24">
      <h1 className="text-3xl font-bold mb-6 text-primary">Manage Products (Local)</h1>
      
      <div className="mb-6 flex gap-4">
        <button 
          className={`px-4 py-2 rounded ${selectedCategory === 'thc-a' ? 'bg-primary text-black' : 'bg-gray-800'}`}
          onClick={() => setSelectedCategory('thc-a')}
        >
          THC-A Flower
        </button>
        <button 
          className={`px-4 py-2 rounded ${selectedCategory === 'vapes' ? 'bg-primary text-black' : 'bg-gray-800'}`}
          onClick={() => setSelectedCategory('vapes')}
        >
          Vapes
        </button>
        <button 
          className={`px-4 py-2 rounded ${selectedCategory === 'hookah' ? 'bg-primary text-black' : 'bg-gray-800'}`}
          onClick={() => setSelectedCategory('hookah')}
        >
          Hookah
        </button>
        <button 
          className={`px-4 py-2 rounded ${selectedCategory === 'kratom' ? 'bg-primary text-black' : 'bg-gray-800'}`}
          onClick={() => setSelectedCategory('kratom')}
        >
          Kratom
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Add Product Form */}
        <div className="glass p-6 rounded-xl">
          <h2 className="text-xl font-bold mb-4">Add New Product</h2>
          <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
            <input 
              type="text" placeholder="Product Name" required
              className="bg-black/50 border border-white/10 p-2 rounded text-white"
              value={name} onChange={e => setName(e.target.value)}
            />
            <input 
              type="text" placeholder="Price (e.g. $35.00)" required
              className="bg-black/50 border border-white/10 p-2 rounded text-white"
              value={price} onChange={e => setPrice(e.target.value)}
            />
            <textarea 
              placeholder="Description" required
              className="bg-black/50 border border-white/10 p-2 rounded text-white"
              value={description} onChange={e => setDescription(e.target.value)}
            />
            <input 
              type="text" placeholder="Image URL (leave blank for default)"
              className="bg-black/50 border border-white/10 p-2 rounded text-white"
              value={image} onChange={e => setImage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary mt-2">Add Product</button>
          </form>
        </div>

        {/* Product List */}
        <div className="glass p-6 rounded-xl overflow-y-auto max-h-[600px]">
          <h2 className="text-xl font-bold mb-4">Current Products</h2>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <div className="flex flex-col gap-4">
              {products.map(product => (
                <div key={product.id} className="bg-black/40 border border-white/10 p-4 rounded flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" />
                    <div>
                      <h3 className="font-bold text-lg">{product.name}</h3>
                      <p className="text-primary">{product.price}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => handleDelete(product.id)}
                    className="text-red-500 hover:text-red-400 p-2"
                  >
                    Delete
                  </button>
                </div>
              ))}
              {products.length === 0 && <p className="text-gray-400">No products found in this category.</p>}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default AdminProducts;

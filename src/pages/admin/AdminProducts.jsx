import React, { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../firebase';
import { FiTrash2, FiPlus, FiImage } from 'react-icons/fi';
import '../PageDefaults.css';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Form state
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('vapes');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() });
      });
      setProducts(items);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching products, are your Firebase keys set?", err);
      setLoading(false);
    }
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    if (!title || !category) return;
    setIsUploading(true);

    try {
      let imageUrl = '';
      if (imageFile) {
        const storageRef = ref(storage, `products/${Date.now()}_${imageFile.name}`);
        await uploadBytes(storageRef, imageFile);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, "products"), {
        title,
        category,
        price,
        description,
        imageUrl,
        createdAt: new Date().toISOString()
      });

      // Reset form
      setTitle(''); setPrice(''); setDescription(''); setImageFile(null);
      fetchProducts();
    } catch (err) {
      console.error("Error adding product:", err);
      alert("Failed to add product. Check console and Firebase rules.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        fetchProducts();
      } catch (err) {
        console.error("Error deleting:", err);
      }
    }
  };

  return (
    <div className="page-wrapper pt-32">
      <div className="container max-w-6xl">
        <h1 className="page-title text-gradient mb-8">Manage Products</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Add Product Form */}
          <div className="glass p-6 rounded-xl h-fit">
            <h2 className="text-xl font-bold mb-4">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="flex flex-col gap-4">
              <div>
                <label className="block mb-1 text-sm text-gray-300">Title</label>
                <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} required className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-300">Category</label>
                <select value={category} onChange={(e)=>setCategory(e.target.value)} className="w-full bg-black/50 border border-white/10 rounded p-2 text-white">
                  <option value="thc-a">THC-A Flower</option>
                  <option value="vapes">Vapes</option>
                  <option value="hookah">Hookah & Shisha</option>
                  <option value="kratom">Kratom</option>
                </select>
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-300">Price (Optional)</label>
                <input type="text" value={price} onChange={(e)=>setPrice(e.target.value)} placeholder="$25.00" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white" />
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-300">Description</label>
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} rows="3" className="w-full bg-black/50 border border-white/10 rounded p-2 text-white"></textarea>
              </div>
              <div>
                <label className="block mb-1 text-sm text-gray-300 flex items-center gap-2"><FiImage /> Product Image</label>
                <input type="file" accept="image/*" onChange={(e)=>setImageFile(e.target.files[0])} className="w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-black hover:file:bg-yellow-500" />
              </div>
              <button type="submit" disabled={isUploading} className="btn btn-primary mt-2">
                {isUploading ? 'Uploading...' : <><FiPlus className="inline mr-1" /> Add Product</>}
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="lg:col-span-2 glass p-6 rounded-xl">
            <h2 className="text-xl font-bold mb-4">Inventory</h2>
            {loading ? (
              <p>Loading products...</p>
            ) : products.length === 0 ? (
              <p className="text-gray-400">No products found. Add one to get started.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="p-3">Image</th>
                      <th className="p-3">Title</th>
                      <th className="p-3">Category</th>
                      <th className="p-3">Price</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(p => (
                      <tr key={p.id} className="border-b border-white/5 hover:bg-white/5">
                        <td className="p-3">
                          {p.imageUrl ? <img src={p.imageUrl} alt={p.title} className="w-12 h-12 object-cover rounded" /> : <div className="w-12 h-12 bg-black/50 rounded flex items-center justify-center text-xs text-gray-500">No Img</div>}
                        </td>
                        <td className="p-3 font-semibold">{p.title}</td>
                        <td className="p-3 text-gray-300 capitalize">{p.category}</td>
                        <td className="p-3 text-green-400">{p.price || '-'}</td>
                        <td className="p-3">
                          <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300 p-2"><FiTrash2 /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

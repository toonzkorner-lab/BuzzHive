import React from 'react';
import { Link } from 'react-router-dom';
import { FiBox, FiImage, FiSettings, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../../contexts/AuthContext';
import '../PageDefaults.css';

const AdminDashboard = () => {
  const { logout } = useAuth();

  return (
    <div className="page-wrapper pt-32">
      <div className="container">
        <div className="flex justify-between items-center mb-8">
          <h1 className="page-title text-gradient mb-0">Admin Dashboard</h1>
          <button onClick={logout} className="btn btn-outline flex items-center gap-2">
            <FiLogOut /> Logout
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-up">
          <Link to="/admin/products" className="glass p-6 rounded-xl hover:bg-white/5 transition flex flex-col items-center justify-center text-center group">
            <FiBox className="text-5xl text-primary mb-4 group-hover:scale-110 transition" />
            <h3 className="text-xl font-bold mb-2">Manage Products</h3>
            <p className="text-gray-400 text-sm">Add, edit, or remove products and categories from the menu.</p>
          </Link>
          
          <Link to="/admin/gallery" className="glass p-6 rounded-xl hover:bg-white/5 transition flex flex-col items-center justify-center text-center group">
            <FiImage className="text-5xl text-primary mb-4 group-hover:scale-110 transition" />
            <h3 className="text-xl font-bold mb-2">Manage Gallery</h3>
            <p className="text-gray-400 text-sm">Upload new images to the photo gallery on the About page.</p>
          </Link>

          <div className="glass p-6 rounded-xl flex flex-col items-center justify-center text-center opacity-50 cursor-not-allowed">
            <FiSettings className="text-5xl text-primary mb-4" />
            <h3 className="text-xl font-bold mb-2">Site Settings</h3>
            <p className="text-gray-400 text-sm">Manage business hours, contact info, and SEO. (Coming Soon)</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

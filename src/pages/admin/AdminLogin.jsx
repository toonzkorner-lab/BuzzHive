import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import '../PageDefaults.css';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError('');
      await login(email, password);
      navigate('/admin/dashboard');
    } catch (err) {
      setError('Failed to log in. Check your credentials.');
    }
  };

  return (
    <div className="page-wrapper pt-32 flex items-center justify-center">
      <div className="glass p-8 rounded-xl max-w-md w-full animate-fade-up">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">Admin Login</h2>
        {error && <div className="bg-red-500/20 border border-red-500 text-red-100 p-3 rounded mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block mb-2 text-sm text-gray-300">Email</label>
            <input 
              type="email" 
              required 
              className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-2 text-sm text-gray-300">Password</label>
            <input 
              type="password" 
              required 
              className="w-full bg-black/50 border border-white/10 rounded p-3 text-white focus:border-primary outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn btn-primary mt-4 py-3">Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

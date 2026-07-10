import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Panggil API Backend
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email,
        password,
      });

      // Simpan Token & Data Admin di LocalStorage
            localStorage.setItem('cms_user', JSON.stringify(response.data));
      
      // Bawa Admin ke Dashboard
      navigate('/admin');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal log masuk. Sila cuba lagi.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="bg-surface p-8 rounded-xl shadow-lg w-full max-w-md border border-slate-100">
        
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold shadow-md">
            CMS
          </div>
          <h1 className="text-2xl font-bold text-secondary mb-2">Login Sistem</h1>
          <p className="text-slate-500 text-sm">Gunakan akaun admin untuk akses panel kawalan</p>
        </div>

        {/* Paparan Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg mb-6 text-sm text-center">
            {error}
          </div>
        )}

        {/* Borang Login */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-secondary mb-1">E-mel</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-slate-50 focus:bg-white"
              placeholder="admin@company.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-secondary mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all bg-slate-50 focus:bg-white"
              placeholder="••••••••"
              required
            />
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full text-white font-medium py-3 rounded-lg transition-all flex justify-center items-center shadow-md ${
              isLoading ? 'bg-blue-400 cursor-not-allowed' : 'bg-primary hover:bg-blue-700 hover:shadow-lg'
            }`}
          >
            {isLoading ? 'Mengesahkan...' : 'Login Sekarang'}
          </button>
        </form>
      </div>
    </div>
  );
}

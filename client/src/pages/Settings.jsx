import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Settings() {
  const [formData, setFormData] = useState({
    siteName: '',
    siteDescription: '',
    contactEmail: '',
    logoUrl: ''
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  
  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/settings`);
      setFormData(response.data);
    } catch (err) {
      setError('Gagal memuat turun data tetapan.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');
    setError('');

    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/settings`, formData);
      setMessage('Tetapan sistem telah berjaya dikemas kini!');
      
      // Auto-hide success message after 4 seconds
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan tetapan.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-12 text-center text-slate-500 animate-pulse font-medium">Memuatkan tetapan...</div>;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-secondary mb-1">Tetapan Sistem</h2>
        <p className="text-slate-500">Uruskan identiti perniagaan dan rupa laman web utama anda.</p>
      </div>

      {message && (
        <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-r-lg mb-6 shadow-sm font-medium animate-in fade-in">
          ✅ {message}
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg mb-6 shadow-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-surface p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-100 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">Nama Syarikat / Laman Web</label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) => setFormData({...formData, siteName: e.target.value})}
              className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">E-mel Rasmi Pertanyaan</label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
              className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              required
            />
            <p className="text-xs text-slate-400 mt-2 font-medium">Mesej daripada borang di web akan dihantar berkaitan e-mel ini.</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">Penerangan / Moto Syarikat</label>
          <textarea
            value={formData.siteDescription}
            onChange={(e) => setFormData({...formData, siteDescription: e.target.value})}
            className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all h-28 text-slate-600 leading-relaxed"
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">Pautan Logo Laman Web (URL)</label>
          <input
            type="text"
            value={formData.logoUrl}
            onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
            className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Cth: https://res.cloudinary.com/contoh-logo.png"
          />
          {formData.logoUrl && (
            <div className="mt-4 p-5 border border-slate-100 rounded-xl bg-slate-50 inline-block shadow-inner">
              <p className="text-xs text-slate-400 mb-3 font-bold uppercase tracking-wider">Pratonton Logo</p>
              <img 
                src={formData.logoUrl} 
                alt="Pratonton Logo" 
                className="max-h-20 object-contain drop-shadow-sm" 
                onError={(e) => { e.target.style.display = 'none'; }} 
              />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-8 border-t border-slate-100">
          <button 
            type="submit" 
            disabled={isSaving} 
            className="bg-primary hover:bg-blue-700 text-white font-bold px-10 py-3.5 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isSaving ? 'Menyimpan Perubahan...' : 'Simpan Semua Tetapan'}
          </button>
        </div>
      </form>
    </div>
  );
}

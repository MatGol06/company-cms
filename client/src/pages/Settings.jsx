import { useState, useEffect } from 'react';
import axios from 'axios';
import { Settings as SettingsIcon, CheckCircle, AlertCircle } from 'lucide-react';

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
      setError('Failed to fetch data tetapan.');
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
      setMessage('System settings successfully updated!');
      
      setTimeout(() => setMessage(''), 4000);
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan tetapan.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <div className="p-12 text-center text-slate-500 animate-pulse font-medium text-sm">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
      <div className="mb-8 flex items-center gap-3">
        <SettingsIcon className="w-8 h-8 text-blue-500" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">System Settings</h2>
          <p className="text-slate-400">Manage your business identity and main website appearance.</p>
        </div>
      </div>

      {message && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-xl mb-6 flex items-center gap-3 font-medium animate-in fade-in">
          <CheckCircle className="w-5 h-5" />
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 flex items-center gap-3 font-medium">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-800 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Company / Website Name</label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) => setFormData({...formData, siteName: e.target.value})}
              className="w-full px-5 py-3 bg-slate-950 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-600"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Official Contact Email</label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
              className="w-full px-5 py-3 bg-slate-950 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-600"
              required
            />
            <p className="text-xs text-slate-500 mt-2">Messages from the website form will be related to this email.</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Company Description / Motto</label>
          <textarea
            value={formData.siteDescription}
            onChange={(e) => setFormData({...formData, siteDescription: e.target.value})}
            className="w-full px-5 py-4 bg-slate-950 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all h-28 leading-relaxed placeholder-slate-600"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Website Logo URL (Link)</label>
          <input
            type="text"
            value={formData.logoUrl}
            onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
            className="w-full px-5 py-3 bg-slate-950 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-600"
            placeholder="e.g: https://res.cloudinary.com/contoh-logo.png"
          />
          {formData.logoUrl && (
            <div className="mt-4 p-5 border border-slate-800 rounded-xl bg-slate-950/50 inline-block">
              <p className="text-xs text-slate-500 mb-3 font-semibold uppercase tracking-wider">Logo Preview</p>
              <img 
                src={formData.logoUrl} 
                alt="Logo Preview" 
                className="max-h-20 object-contain drop-shadow-md" 
                onError={(e) => { e.target.style.display = 'none'; }} 
              />
            </div>
          )}
        </div>

        <div className="flex justify-end pt-8 border-t border-slate-800">
          <button 
            type="submit" 
            disabled={isSaving} 
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-10 py-3 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none"
          >
            {isSaving ? 'Saving Changes...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

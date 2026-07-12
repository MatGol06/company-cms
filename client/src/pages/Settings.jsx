import { useState, useEffect } from 'react';
import axios from 'axios';
import { Settings as SettingsIcon, CheckCircle, AlertCircle, ImagePlus, Loader2 } from 'lucide-react';

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
  const [isUploading, setIsUploading] = useState(false);

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

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setError('');
    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setFormData({ ...formData, logoUrl: response.data.imageUrl });
    } catch (err) {
      setError('Gagal memuat naik imej logo. Sila cuba lagi.');
    } finally {
      setIsUploading(false);
    }
  };

  if (isLoading) return <div className="p-12 text-center text-slate-500 animate-pulse font-medium text-sm">Loading settings...</div>;

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
      <div className="mb-8 flex items-center gap-3">
        <SettingsIcon className="w-8 h-8 text-blue-500" />
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-1">System Settings</h2>
          <p className="text-slate-500">Manage your business identity and main website appearance.</p>
        </div>
      </div>

      {message && (
        <div className="bg-green-500/10 border border-green-500/20 text-green-400 p-4 rounded-2xl mb-6 flex items-center gap-3 font-medium animate-in fade-in">
          <CheckCircle className="w-5 h-5" />
          {message}
        </div>
      )}

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-2xl mb-6 flex items-center gap-3 font-medium">
          <AlertCircle className="w-5 h-5" />
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-slate-100 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Company / Website Name</label>
            <input
              type="text"
              value={formData.siteName}
              onChange={(e) => setFormData({...formData, siteName: e.target.value})}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-400"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Official Contact Email</label>
            <input
              type="email"
              value={formData.contactEmail}
              onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-400"
              required
            />
            <p className="text-xs text-slate-500 mt-2">Messages from the website form will be related to this email.</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Company Description / Motto</label>
          <textarea
            value={formData.siteDescription}
            onChange={(e) => setFormData({...formData, siteDescription: e.target.value})}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all h-28 leading-relaxed placeholder-slate-400"
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Company Logo</label>
          <div className="flex items-center gap-6">
            {/* Logo Preview Area */}
            <div className="w-32 h-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl flex items-center justify-center overflow-hidden shrink-0 relative group">
              {formData.logoUrl ? (
                <img 
                  src={formData.logoUrl} 
                  alt="Company Logo" 
                  className="w-full h-full object-contain p-2"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              ) : (
                <ImagePlus className="w-8 h-8 text-slate-300" />
              )}
              {isUploading && (
                <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center">
                  <Loader2 className="w-6 h-6 text-blue-500 animate-spin" />
                </div>
              )}
            </div>

            {/* Upload Button */}
            <div className="flex-1">
              <label className="relative cursor-pointer bg-white border border-slate-200 text-slate-700 font-medium px-6 py-2.5 rounded-xl hover:bg-slate-50 transition-colors shadow-sm inline-flex items-center gap-2 mb-3">
                <ImagePlus className="w-4 h-4" />
                <span>Upload Logo</span>
                <input 
                  type="file" 
                  className="hidden" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </label>
              
              <div className="space-y-3">
                <p className="text-xs text-slate-500 font-medium">Or paste image URL directly:</p>
                <input
                  type="text"
                  value={formData.logoUrl}
                  onChange={(e) => setFormData({...formData, logoUrl: e.target.value})}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 text-slate-800 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all text-sm placeholder-slate-400"
                  placeholder="https://example.com/logo.png"
                  disabled={isUploading}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-8 border-t border-slate-100">
          <button 
            type="submit" 
            disabled={isSaving} 
            className="bg-[#1f1f1f] hover:bg-black text-white font-medium px-10 py-3 rounded-2xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none"
          >
            {isSaving ? 'Saving Changes...' : 'Save All Settings'}
          </button>
        </div>
      </form>
    </div>
  );
}

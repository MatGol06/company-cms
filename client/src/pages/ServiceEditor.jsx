import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function ServiceEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    imageUrl: '',
    order: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (!isNew) {
      fetchServiceData();
    }
  }, [id]);

  const fetchServiceData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
      const service = response.data.find(s => s._id === id);
      
      if (service) {
        setFormData({
          title: service.title,
          description: service.description,
          icon: service.icon || '',
          imageUrl: service.imageUrl || '',
          order: service.order
        });
      }
    } catch (err) {
      setError('Failed to fetch data servis dari pangkalan data.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const config = {};

      if (isNew) {
        await axios.post(`${import.meta.env.VITE_API_URL}/services`, formData, config);
      } else {
        await axios.put(`${import.meta.env.VITE_API_URL}/services/${id}`, formData, config);
      }
      
      navigate('/admin/services');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan rekod servis.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-700">
      
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/admin/services')} 
          className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-800 shadow-sm transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">
            {isNew ? 'Create New Service' : `Update: ${formData.title}`}
          </h2>
          <p className="text-slate-400">Fill in the details for the service offering.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-4 rounded-xl mb-6 flex items-start gap-3 font-medium">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-slate-900 p-8 rounded-2xl shadow-sm border border-slate-800 space-y-6">
        
        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Service Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-5 py-3 bg-slate-950 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-600"
            placeholder="e.g: Custom Web Development"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Full Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-5 py-4 bg-slate-950 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all h-32 leading-relaxed placeholder-slate-600"
            placeholder="Describe the service in detail..."
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Image URL (Optional)</label>
          <input
            type="text"
            value={formData.imageUrl}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            className="w-full px-5 py-3 bg-slate-950 border border-slate-800 text-white rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-600"
            placeholder="https://example.com/image.jpg"
          />
          {formData.imageUrl && (
             <div className="mt-4 rounded-xl overflow-hidden border border-slate-800 max-w-sm">
                <img src={formData.imageUrl} alt="Preview" className="w-full h-40 object-cover" />
             </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-950/50 p-6 rounded-xl border border-slate-800/50">
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Icon Class (Optional)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({...formData, icon: e.target.value})}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-600"
              placeholder="e.g: fas fa-laptop"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wider">Display Order (Number)</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
              className="w-full px-4 py-2 bg-slate-900 border border-slate-800 text-white rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-600"
              placeholder="1"
            />
            <p className="text-xs text-slate-500 mt-2">Determines which service is displayed first.</p>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-800">
          <button 
            type="submit" 
            disabled={isLoading} 
            className="bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-3 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none"
          >
            {isLoading ? 'Saving...' : (isNew ? 'Publish Service' : 'Save Changes')}
          </button>
        </div>
      </form>
    </div>
  );
}

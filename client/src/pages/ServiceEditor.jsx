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
          className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 shadow-sm transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-1">
            {isNew ? 'Create New Service' : `Update: ${formData.title}`}
          </h2>
          <p className="text-slate-500">Fill in the details for the service offering.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-2xl mb-6 flex items-start gap-3 font-medium">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
        
        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Service Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-5 py-3 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-400"
            placeholder="e.g: Custom Web Development"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Full Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all h-32 leading-relaxed placeholder-slate-400"
            placeholder="Describe the service in detail..."
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Image URL (Optional)</label>
          <input
            type="text"
            value={formData.imageUrl}
            onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
            className="w-full px-5 py-3 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-400"
            placeholder="https://example.com/image.jpg"
          />
          {formData.imageUrl && (
             <div className="mt-4 rounded-2xl overflow-hidden border border-slate-100 max-w-sm">
                <img src={formData.imageUrl} alt="Preview" className="w-full h-40 object-cover" />
             </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Icon Class (Optional)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({...formData, icon: e.target.value})}
              className="w-full px-4 py-2 bg-white border border-slate-100 text-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-400"
              placeholder="e.g: fas fa-laptop"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Display Order (Number)</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
              className="w-full px-4 py-2 bg-white border border-slate-100 text-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-400"
              placeholder="1"
            />
            <p className="text-xs text-slate-500 mt-2">Determines which service is displayed first.</p>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100">
          <button 
            type="submit" 
            disabled={isLoading} 
            className="bg-[#1f1f1f] hover:bg-black text-white font-medium px-8 py-3 rounded-2xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none"
          >
            {isLoading ? 'Saving...' : (isNew ? 'Publish Service' : 'Save Changes')}
          </button>
        </div>
      </form>
    </div>
  );
}

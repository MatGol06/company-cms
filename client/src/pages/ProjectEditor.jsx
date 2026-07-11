import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, AlertCircle, Upload, Loader2 } from 'lucide-react';

export default function ProjectEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    clientName: '',
    category: '',
    imageUrl: '',
    externalLink: '',
    order: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState('');
  
  useEffect(() => {
    if (!isNew) {
      fetchProjectData();
    }
  }, [id]);

  const fetchProjectData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
      const project = response.data.find(s => s._id === id);
      
      if (project) {
        setFormData({
          title: project.title,
          description: project.description,
          clientName: project.clientName || '',
          category: project.category || '',
          imageUrl: project.imageUrl || '',
          externalLink: project.externalLink || '',
          order: project.order || 0
        });
      }
    } catch (err) {
      setError('Failed to fetch data project dari pangkalan data.');
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const uploadData = new FormData();
    uploadData.append('image', file);

    try {
      setIsUploading(true);
      setError('');
      // Need to include credentials if routes are protected
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/upload`, uploadData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      
      // Determine base URL (remove /api/v1 from the end of the VITE_API_URL)
      let fullImageUrl = res.data.imageUrl;
      if (!fullImageUrl.startsWith('http')) {
        const backendUrl = import.meta.env.VITE_API_URL.replace(/\/api\/v1\/?$/, '');
        fullImageUrl = `${backendUrl}${fullImageUrl}`;
      }
      
      setFormData(prev => ({ ...prev, imageUrl: fullImageUrl }));
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal memuat naik gambar. Pastikan saiz bawah 5MB.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const config = {};

      if (isNew) {
        await axios.post(`${import.meta.env.VITE_API_URL}/projects`, formData, config);
      } else {
        await axios.put(`${import.meta.env.VITE_API_URL}/projects/${id}`, formData, config);
      }
      
      navigate('/admin/projects');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan rekod projek.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto animate-in fade-in duration-700">
      
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/admin/projects')} 
          className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 shadow-sm transition-all"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-1">
            {isNew ? 'Create New Project' : `Update: ${formData.title}`}
          </h2>
          <p className="text-slate-500">Fill in the details for the portfolio project.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-2xl mb-6 flex items-start gap-3 font-medium">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Project Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-400"
              placeholder="e.g: E-Commerce Redesign"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Category</label>
            <input
              type="text"
              value={formData.category}
              onChange={(e) => setFormData({...formData, category: e.target.value})}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-400"
              placeholder="e.g: Web Design, Branding"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Project Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all h-32 leading-relaxed placeholder-slate-400"
            placeholder="Describe the challenge and the solution provided..."
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Cover Image</label>
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <input
                type="text"
                value={formData.imageUrl}
                onChange={(e) => setFormData({...formData, imageUrl: e.target.value})}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-400 mb-2"
                placeholder="https://example.com/portfolio.jpg"
              />
              <p className="text-xs text-slate-500">You can paste an external URL or upload a file from your computer.</p>
            </div>
            
            <div className="relative">
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageUpload} 
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer disabled:cursor-not-allowed"
                disabled={isUploading}
              />
              <button 
                type="button" 
                className="bg-[#1f1f1f] hover:bg-slate-700 text-slate-800 font-medium px-6 py-3 rounded-2xl transition-all border border-transparent flex items-center gap-2 h-[50px]"
                disabled={isUploading}
              >
                {isUploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-5 h-5 text-blue-600" />}
                {isUploading ? 'Uploading...' : 'Upload File'}
              </button>
            </div>
          </div>

          {formData.imageUrl && (
             <div className="mt-4 rounded-2xl overflow-hidden border border-slate-100 max-w-sm">
                <img src={formData.imageUrl} alt="Preview" className="w-full h-40 object-cover" />
             </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Client Name (Optional)</label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({...formData, clientName: e.target.value})}
              className="w-full px-4 py-2 bg-white border border-slate-100 text-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-400"
              placeholder="e.g: TechCorp Ltd."
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">External Link (Live Site)</label>
            <input
              type="text"
              value={formData.externalLink}
              onChange={(e) => setFormData({...formData, externalLink: e.target.value})}
              className="w-full px-4 py-2 bg-white border border-slate-100 text-slate-800 rounded-lg focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-400"
              placeholder="https://"
            />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100">
          <button 
            type="submit" 
            disabled={isLoading} 
            className="bg-[#1f1f1f] hover:bg-black text-white font-medium px-8 py-3 rounded-2xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none"
          >
            {isLoading ? 'Saving...' : (isNew ? 'Publish Project' : 'Save Changes')}
          </button>
        </div>
      </form>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, AlertCircle } from 'lucide-react';

export default function PageEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isNew = slug === 'new';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '{\n  "heading": "Welcome to the Our Company",\n  "description": "We offer the best services for you."\n}'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isNew) {
      fetchPageData();
    }
  }, [slug]);

  const fetchPageData = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/pages/${slug}`);
      setFormData({
        title: response.data.title,
        slug: response.data.slug,
        content: JSON.stringify(response.data.content, null, 2)
      });
    } catch (err) {
      setError('Failed to fetch data halaman dari server.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const parsedContent = JSON.parse(formData.content);
      const config = {};

      const payload = {
        title: formData.title,
        slug: formData.slug,
        content: parsedContent
      };

      if (isNew) {
        await axios.post(`${import.meta.env.VITE_API_URL}/pages`, payload, config);
      } else {
        await axios.put(`${import.meta.env.VITE_API_URL}/pages/${slug}`, payload, config);
      }
      
      navigate('/admin/pages');
    } catch (err) {
      if (err instanceof SyntaxError) {
        setError('Error! Format JSON dalam kotak kandungan tidak sah. Pastikan ada " " untuk setiap kunci (key) dan nilai (value).');
      } else {
        setError(err.response?.data?.message || 'Gagal menyimpan rekod halaman.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-700">
      
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/admin/pages')} 
          className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all shadow-sm"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-1">
            {isNew ? 'Create New Page' : `Update: ${formData.title}`}
          </h2>
          <p className="text-slate-500">Modify the content and structure of this page.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-2xl mb-6 flex items-start gap-3 font-medium">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Page Title</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-400"
              placeholder="e.g: Home"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">URL Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              className="w-full px-5 py-3 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-400 disabled:bg-slate-50/50 disabled:text-slate-500 disabled:border-slate-100"
              placeholder="e.g: about-us"
              required
              disabled={!isNew}
            />
            {!isNew && <p className="text-xs text-orange-400 mt-2 font-medium">Warning: URL slug cannot be changed after creation.</p>}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Content Structure (JSON Editor)</label>
          </div>
          <div className="bg-[#0f111a] rounded-2xl overflow-hidden border border-slate-100 focus-within:border-blue-500/50 transition-colors shadow-inner">
            <div className="bg-[#1a1d27] px-4 py-2 flex gap-2 border-b border-slate-100">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
            </div>
            <textarea
              value={formData.content}
              onChange={(e) => setFormData({...formData, content: e.target.value})}
              className="w-full h-80 p-5 bg-transparent text-[#9CDCFE] font-mono text-sm leading-relaxed focus:outline-none resize-y selection:bg-blue-500/30"
              required
              spellCheck="false"
            />
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#1f1f1f] hover:bg-black text-white font-medium px-8 py-3 rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none"
          >
            {isLoading ? 'Saving...' : (isNew ? 'Publish Page' : 'Save Changes')}
          </button>
        </div>
      </form>
    </div>
  );
}

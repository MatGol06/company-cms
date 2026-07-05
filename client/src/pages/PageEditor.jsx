import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function PageEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isNew = slug === 'new';

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    // Nilai permulaan default (JSON Boilerplate)
    content: '{\n  "heading": "Selamat Datang ke Syarikat Kami",\n  "description": "Kami menawarkan perkhidmatan terbaik untuk anda."\n}'
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('cms_token');

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
      setError('Gagal memuat turun data halaman dari server.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Validate JSON (supaya DB tak rosak)
      const parsedContent = JSON.parse(formData.content);

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

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
        setError('Ralat! Format JSON dalam kotak kandungan tidak sah. Pastikan ada " " untuk setiap kunci (key) dan nilai (value).');
      } else {
        setError(err.response?.data?.message || 'Gagal menyimpan rekod halaman.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Top Navigation */}
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/admin/pages')} 
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-secondary hover:bg-slate-50 transition-all shadow-sm"
          title="Kembali"
        >
          &larr;
        </button>
        <div>
          <h2 className="text-3xl font-bold text-secondary">
            {isNew ? 'Cipta Halaman Baru' : `Kemas Kini: ${formData.title}`}
          </h2>
          <p className="text-slate-500 mt-1">Ubah maklumat dan struktur kandungan (JSON) halaman ini.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg mb-6 shadow-sm">
          <p className="font-medium">{error}</p>
        </div>
      )}

      {/* Editor Form */}
      <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-2xl shadow-sm border border-slate-100 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">Tajuk Halaman (Title)</label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              placeholder="Contoh: Utama (Home)"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">URL Rujukan (Slug)</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({...formData, slug: e.target.value})}
              className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all disabled:bg-slate-50 disabled:text-slate-500"
              placeholder="contoh: home (Tanpa jarak)"
              required
              disabled={!isNew}
            />
            {!isNew && <p className="text-xs text-orange-500 mt-2 font-medium">Amaran: Slug URL kekal tidak boleh diubah selepas dicipta.</p>}
          </div>
        </div>

        <div>
          <div className="flex justify-between items-end mb-2">
            <label className="block text-sm font-bold text-secondary uppercase tracking-wide">Struktur Kandungan (Editor JSON)</label>
          </div>
          <div className="bg-[#1E1E1E] rounded-xl overflow-hidden border-2 border-transparent focus-within:border-primary transition-colors shadow-inner">
            {/* Fake Window Header untuk nampak macam Code Editor */}
            <div className="bg-[#2D2D2D] px-4 py-2 flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
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
            className="bg-primary hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isLoading ? 'Menyimpan Rekod...' : (isNew ? 'Terbitkan Halaman' : 'Simpan Kemas Kini')}
          </button>
        </div>
      </form>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, AlertCircle, Plus, Trash2, GripVertical, Type, Heading, Image as ImageIcon } from 'lucide-react';

export default function PageEditor() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const isNew = slug === 'new';

  const [formData, setFormData] = useState({
    title: '',
    slug: ''
  });
  
  const [blocks, setBlocks] = useState([
    { id: Date.now().toString(), type: 'heading', content: '' }
  ]);
  
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
        slug: response.data.slug
      });
      // Jika content adalah array, kita anggap ia adalah senarai blocks
      if (Array.isArray(response.data.content)) {
        setBlocks(response.data.content);
      } else if (response.data.content && response.data.content.blocks) {
        setBlocks(response.data.content.blocks);
      }
    } catch (err) {
      setError('Failed to fetch data halaman dari server.');
    }
  };

  const addBlock = (type) => {
    setBlocks([...blocks, { id: Date.now().toString(), type, content: '' }]);
  };

  const removeBlock = (id) => {
    setBlocks(blocks.filter(b => b.id !== id));
  };

  const updateBlock = (id, content) => {
    setBlocks(blocks.map(b => b.id === id ? { ...b, content } : b));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const payload = {
        title: formData.title,
        slug: formData.slug,
        content: blocks // Simpan blocks terus ke database sebagai content
      };

      if (isNew) {
        await axios.post(`${import.meta.env.VITE_API_URL}/pages`, payload);
      } else {
        await axios.put(`${import.meta.env.VITE_API_URL}/pages/${slug}`, payload);
      }
      
      navigate('/admin/pages');
    } catch (err) {
      setError(err.response?.data?.message || 'Gagal menyimpan rekod halaman.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-700 pb-20">
      
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
          <p className="text-slate-500">Visual Page Builder - Build your page block by block</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-600 p-4 rounded-2xl mb-6 flex items-start gap-3 font-medium">
          <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Page Meta Info */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Page Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-5 py-3 bg-slate-50 border border-slate-100 text-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all placeholder-slate-400"
                placeholder="e.g: About Us"
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
              {!isNew && <p className="text-xs text-orange-400 mt-2 font-medium">Warning: URL slug cannot be changed.</p>}
            </div>
          </div>
        </div>

        {/* Content Builder */}
        <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-slate-800">Page Content</h3>
            <p className="text-sm text-slate-500">Add and arrange content blocks for this page.</p>
          </div>

          <div className="space-y-4 mb-8">
            {blocks.map((block, index) => (
              <div key={block.id} className="group relative bg-slate-50 border border-slate-100 rounded-2xl p-4 flex gap-4 transition-all hover:border-blue-300">
                <div className="mt-2 text-slate-400 cursor-move hover:text-slate-600">
                  <GripVertical className="w-5 h-5" />
                </div>
                
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-2 mb-2">
                    {block.type === 'heading' && <span className="bg-purple-100 text-purple-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1"><Heading className="w-3 h-3"/> Heading</span>}
                    {block.type === 'paragraph' && <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1"><Type className="w-3 h-3"/> Paragraph</span>}
                    {block.type === 'image' && <span className="bg-emerald-100 text-emerald-700 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wider flex items-center gap-1"><ImageIcon className="w-3 h-3"/> Image URL</span>}
                  </div>
                  
                  {block.type === 'paragraph' ? (
                    <textarea 
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none resize-y min-h-[120px]"
                      placeholder="Write your paragraph here..."
                      required
                    />
                  ) : (
                    <input 
                      type="text"
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, e.target.value)}
                      className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none"
                      placeholder={block.type === 'heading' ? 'Type your heading here...' : 'Paste image URL here...'}
                      required
                    />
                  )}
                </div>

                <button 
                  type="button" 
                  onClick={() => removeBlock(block.id)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>

          {/* Add Block Controls */}
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => addBlock('heading')} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" /> Add Heading
            </button>
            <button type="button" onClick={() => addBlock('paragraph')} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" /> Add Paragraph
            </button>
            <button type="button" onClick={() => addBlock('image')} className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium px-4 py-2 rounded-xl transition-colors flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" /> Add Image
            </button>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-[#1f1f1f] hover:bg-black text-white font-medium px-10 py-4 rounded-2xl transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0 disabled:shadow-none text-lg"
          >
            {isLoading ? 'Saving...' : (isNew ? 'Publish Page' : 'Save Changes')}
          </button>
        </div>
      </form>
    </div>
  );
}

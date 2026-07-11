import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Plus, Edit2, FileText } from 'lucide-react';

export default function PagesList() {
  const [pages, setPages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPages();
  }, []);

  const fetchPages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/pages`);
      setPages(response.data);
    } catch (error) {
      console.error('Gagal mendapatkan senarai halaman:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
             <FileText className="w-8 h-8 text-blue-500" />
             Pages Management
          </h2>
          <p className="text-slate-500">Manage the public-facing pages for your website.</p>
        </div>
        <Link 
          to="/admin/pages/new" 
          className="bg-[#1f1f1f] hover:bg-black text-white px-5 py-2.5 rounded-lg transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Create New Page</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/50 border-b border-slate-100">
                <th className="px-6 py-5 font-semibold text-slate-500 uppercase tracking-wider text-xs">Page Title</th>
                <th className="px-6 py-5 font-semibold text-slate-500 uppercase tracking-wider text-xs">URL (Slug)</th>
                <th className="px-6 py-5 font-semibold text-slate-500 uppercase tracking-wider text-xs">Last Updated</th>
                <th className="px-6 py-5 font-semibold text-slate-500 uppercase tracking-wider text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500 animate-pulse text-sm">Loading database...</td></tr>
              ) : pages.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500 text-sm">No pages recorded. Please create a new one.</td></tr>
              ) : (
                pages.map((page) => (
                  <tr key={page._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5 font-medium text-slate-800">{page.title}</td>
                    <td className="px-6 py-5">
                      <span className="bg-[#1f1f1f] text-slate-700 px-3 py-1 rounded-md text-xs font-mono border border-transparent">
                        /{page.slug}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-slate-500 text-sm">
                      {new Date(page.updatedAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link 
                        to={`/admin/pages/${page.slug}`} 
                        className="text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 text-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit Content
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

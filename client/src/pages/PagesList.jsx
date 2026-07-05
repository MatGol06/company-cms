import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-secondary mb-1">Pengurusan Halaman</h2>
          <p className="text-slate-500">Uruskan kandungan muka depan (Home, About) web syarikat anda.</p>
        </div>
        <Link 
          to="/admin/pages/new" 
          className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <span>+ Cipta Halaman Baru</span>
        </Link>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 font-bold text-slate-500 uppercase tracking-wider text-xs">Tajuk Halaman</th>
                <th className="px-6 py-5 font-bold text-slate-500 uppercase tracking-wider text-xs">URL (Slug)</th>
                <th className="px-6 py-5 font-bold text-slate-500 uppercase tracking-wider text-xs">Kemaskini Terakhir</th>
                <th className="px-6 py-5 font-bold text-slate-500 uppercase tracking-wider text-xs text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500 animate-pulse">Memuatkan pangkalan data...</td></tr>
              ) : pages.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500">Tiada halaman direkodkan setakat ini. Sila cipta yang pertama.</td></tr>
              ) : (
                pages.map((page) => (
                  <tr key={page._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5 font-semibold text-secondary">{page.title}</td>
                    <td className="px-6 py-5">
                      <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-md text-sm font-mono border border-slate-200">
                        /{page.slug}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-slate-500 text-sm">
                      {new Date(page.updatedAt).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <Link 
                        to={`/admin/pages/${page.slug}`} 
                        className="text-primary hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors inline-block"
                      >
                        Edit Kandungan
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

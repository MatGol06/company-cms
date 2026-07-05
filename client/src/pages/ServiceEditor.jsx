import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ServiceEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    order: 0
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const token = localStorage.getItem('cms_token');

  useEffect(() => {
    if (!isNew) {
      fetchServiceData();
    }
  }, [id]);

  const fetchServiceData = async () => {
    try {
      // Dapatkan data servis (Kita pinjam API get semua dan cari ID)
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
      const service = response.data.find(s => s._id === id);
      
      if (service) {
        setFormData({
          title: service.title,
          description: service.description,
          icon: service.icon || '',
          order: service.order
        });
      }
    } catch (err) {
      setError('Gagal memuat turun data servis dari pangkalan data.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const config = {
        headers: { Authorization: `Bearer ${token}` }
      };

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
    <div className="max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/admin/services')} 
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-secondary shadow-sm transition-all hover:bg-slate-50"
        >
          &larr;
        </button>
        <div>
          <h2 className="text-3xl font-bold text-secondary">
            {isNew ? 'Tambah Servis Baru' : `Kemas Kini: ${formData.title}`}
          </h2>
          <p className="text-slate-500 mt-1">Lengkapkan maklumat perkhidmatan di bawah.</p>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg mb-6 shadow-sm font-medium">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-surface p-8 rounded-2xl shadow-sm border border-slate-100 space-y-6">
        
        <div>
          <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">Tajuk Servis</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({...formData, title: e.target.value})}
            className="w-full px-5 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            placeholder="Cth: Pembangunan Web Custom"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-bold text-secondary mb-2 uppercase tracking-wide">Penerangan Penuh (Description)</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({...formData, description: e.target.value})}
            className="w-full px-5 py-4 border border-slate-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all h-32 leading-relaxed text-slate-600"
            placeholder="Terangkan secara terperinci tentang servis ini..."
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-xl border border-slate-100">
          <div>
            <label className="block text-sm font-bold text-secondary mb-2">Pautan Ikon (Boleh Kosong)</label>
            <input
              type="text"
              value={formData.icon}
              onChange={(e) => setFormData({...formData, icon: e.target.value})}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary transition-all"
              placeholder="Cth: fas fa-laptop / URL gambar"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-secondary mb-2">Urutan Paparan (Nombor)</label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({...formData, order: parseInt(e.target.value) || 0})}
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-primary transition-all"
              placeholder="1"
            />
            <p className="text-xs text-slate-400 mt-1">Menentukan servis mana dipaparkan dahulu.</p>
          </div>
        </div>

        <div className="flex justify-end pt-6 border-t border-slate-100">
          <button 
            type="submit" 
            disabled={isLoading} 
            className="bg-primary hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl shadow-md transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isLoading ? 'Menyimpan...' : (isNew ? 'Terbitkan Servis' : 'Simpan Kemas Kini')}
          </button>
        </div>
      </form>
    </div>
  );
}

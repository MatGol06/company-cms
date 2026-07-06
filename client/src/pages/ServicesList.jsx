import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function ServicesList() {
  const [services, setServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/services`);
      setServices(response.data);
    } catch (error) {
      console.error('Gagal memuatkan servis', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Adakah anda pasti mahu membuang rekod servis ini secara kekal?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/services/${id}`);
        fetchServices(); // Refresh senarai selepas padam
      } catch (error) {
        alert('Ralat! Gagal memadam servis dari pangkalan data.');
      }
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-secondary mb-1">Pengurusan Servis</h2>
          <p className="text-slate-500">Uruskan senarai perkhidmatan yang ditawarkan oleh syarikat.</p>
        </div>
        <Link 
          to="/admin/services/new" 
          className="bg-primary hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <span>+ Tambah Servis Baru</span>
        </Link>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 font-bold text-slate-500 uppercase text-xs w-24">Urutan</th>
                <th className="px-6 py-5 font-bold text-slate-500 uppercase text-xs">Tajuk Servis</th>
                <th className="px-6 py-5 font-bold text-slate-500 uppercase text-xs">Penerangan</th>
                <th className="px-6 py-5 font-bold text-slate-500 uppercase text-xs text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500 animate-pulse">Memuatkan data dari awan...</td></tr>
              ) : services.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500">Tiada perkhidmatan direkodkan. Sila tambah yang pertama.</td></tr>
              ) : (
                services.map((service) => (
                  <tr key={service._id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-5 font-bold text-slate-400 text-center bg-slate-50 border-r border-slate-100">
                      #{service.order}
                    </td>
                    <td className="px-6 py-5 font-semibold text-secondary">{service.title}</td>
                    <td className="px-6 py-5 text-slate-500 text-sm">
                      {service.description.length > 60 ? `${service.description.substring(0, 60)}...` : service.description}
                    </td>
                    <td className="px-6 py-5 text-right space-x-2 whitespace-nowrap">
                      <Link 
                        to={`/admin/services/${service._id}`} 
                        className="text-primary hover:text-blue-700 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors inline-block"
                      >
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(service._id)}
                        className="text-red-600 hover:text-red-800 font-medium bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors inline-block"
                      >
                        Buang
                      </button>
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

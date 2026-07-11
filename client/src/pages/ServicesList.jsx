import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Wrench, Plus, Edit2, Trash2 } from 'lucide-react';

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
    if (window.confirm('Are you sure you want to permanently delete this service?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/services/${id}`);
        fetchServices();
      } catch (error) {
        alert('Error! Gagal memadam servis dari pangkalan data.');
      }
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
             <Wrench className="w-8 h-8 text-blue-500" />
             Services Management
          </h2>
          <p className="text-slate-500">Manage the list of services offered by the company.</p>
        </div>
        <Link 
          to="/admin/services/new" 
          className="bg-[#1f1f1f] hover:bg-black text-white px-5 py-2.5 rounded-lg transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Service</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/50 border-b border-slate-100">
                <th className="px-6 py-5 font-semibold text-slate-500 uppercase text-xs w-24">Order</th>
                <th className="px-6 py-5 font-semibold text-slate-500 uppercase text-xs">Service Title</th>
                <th className="px-6 py-5 font-semibold text-slate-500 uppercase text-xs">Description</th>
                <th className="px-6 py-5 font-semibold text-slate-500 uppercase text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500 animate-pulse text-sm">Loading data from cloud...</td></tr>
              ) : services.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500 text-sm">No services recorded. Please add your first service.</td></tr>
              ) : (
                services.map((service) => (
                  <tr key={service._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5 font-bold text-slate-500 text-center bg-white/30 border-r border-slate-100">
                      #{service.order}
                    </td>
                    <td className="px-6 py-5 font-medium text-slate-800">{service.title}</td>
                    <td className="px-6 py-5 text-slate-500 text-sm">
                      {service.description.length > 60 ? `${service.description.substring(0, 60)}...` : service.description}
                    </td>
                    <td className="px-6 py-5 text-right space-x-2 whitespace-nowrap">
                      <Link 
                        to={`/admin/services/${service._id}`} 
                        className="text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 text-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(service._id)}
                        className="text-red-600 hover:text-red-800 font-medium bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 text-sm"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete
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

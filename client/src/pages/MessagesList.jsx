import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function MessagesList() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error('Gagal memuatkan mesej', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Adakah anda pasti mahu membuang mesej ini secara kekal?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/messages/${id}`);
        fetchMessages();
      } catch (error) {
        alert('Ralat! Gagal memadam mesej.');
      }
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-secondary mb-1">Peti Masuk (Inbox)</h2>
        <p className="text-slate-500">Baca dan balas pertanyaan dari klien atau pelawat web anda.</p>
      </div>

      <div className="bg-surface rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-5 font-bold text-slate-500 uppercase text-xs">Status</th>
                <th className="px-6 py-5 font-bold text-slate-500 uppercase text-xs">Pengirim</th>
                <th className="px-6 py-5 font-bold text-slate-500 uppercase text-xs">Perkara (Subject)</th>
                <th className="px-6 py-5 font-bold text-slate-500 uppercase text-xs">Tarikh</th>
                <th className="px-6 py-5 font-bold text-slate-500 uppercase text-xs text-right">Tindakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-500 animate-pulse">Memuatkan peti masuk...</td></tr>
              ) : messages.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-500">Peti masuk kosong. Tiada mesej buat masa ini.</td></tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg._id} className={`transition-colors ${!msg.isRead ? 'bg-blue-50/40 hover:bg-blue-50' : 'hover:bg-slate-50'}`}>
                    <td className="px-6 py-5">
                      {!msg.isRead ? (
                        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider">Baru</span>
                      ) : (
                        <span className="bg-slate-100 text-slate-500 px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wider">Dibaca</span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <p className={`font-semibold ${!msg.isRead ? 'text-secondary' : 'text-slate-700'}`}>{msg.name}</p>
                      <p className="text-sm text-slate-500">{msg.email}</p>
                    </td>
                    <td className={`px-6 py-5 ${!msg.isRead ? 'font-bold text-secondary' : 'text-slate-600'}`}>
                      {msg.subject.length > 50 ? `${msg.subject.substring(0, 50)}...` : msg.subject}
                    </td>
                    <td className="px-6 py-5 text-slate-500 text-sm whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString('ms-MY', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 text-right space-x-2 whitespace-nowrap">
                      <Link 
                        to={`/admin/messages/${msg._id}`} 
                        className="text-primary hover:text-blue-700 font-medium bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 px-4 py-2 rounded-lg transition-colors inline-block shadow-sm"
                      >
                        Baca
                      </Link>
                      <button 
                        onClick={() => handleDelete(msg._id)}
                        className="text-red-600 hover:text-red-800 font-medium bg-red-50 hover:bg-red-100 px-4 py-2 rounded-lg transition-colors inline-block"
                      >
                        Padam
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

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Inbox, Eye, Trash2 } from 'lucide-react';

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
    if (window.confirm('Are you sure you want to permanently delete this message?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/messages/${id}`);
        fetchMessages();
      } catch (error) {
        alert('Error! Gagal memadam mesej.');
      }
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="mb-8 flex items-center gap-3">
        <Inbox className="w-8 h-8 text-blue-500" />
        <div>
          <h2 className="text-3xl font-bold text-white mb-1">Inbox</h2>
          <p className="text-slate-400">Read and reply to inquiries from your clients or website visitors.</p>
        </div>
      </div>

      <div className="bg-slate-900 rounded-xl shadow-sm border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/50 border-b border-slate-800">
                <th className="px-6 py-5 font-semibold text-slate-400 uppercase text-xs">Status</th>
                <th className="px-6 py-5 font-semibold text-slate-400 uppercase text-xs">Sender</th>
                <th className="px-6 py-5 font-semibold text-slate-400 uppercase text-xs">Subject</th>
                <th className="px-6 py-5 font-semibold text-slate-400 uppercase text-xs">Date</th>
                <th className="px-6 py-5 font-semibold text-slate-400 uppercase text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {isLoading ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-500 animate-pulse text-sm">Loading inbox...</td></tr>
              ) : messages.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-12 text-center text-slate-500 text-sm">Inbox is empty. No messages at the moment.</td></tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg._id} className={`transition-colors group ${!msg.isRead ? 'bg-blue-600/5 hover:bg-blue-600/10' : 'hover:bg-slate-800/30'}`}>
                    <td className="px-6 py-5">
                      {!msg.isRead ? (
                        <span className="bg-blue-500/20 text-blue-400 px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider border border-blue-500/30 shadow-[0_0_10px_rgba(37,99,235,0.2)]">New</span>
                      ) : (
                        <span className="bg-slate-800 text-slate-400 px-3 py-1 rounded-md text-xs font-medium uppercase tracking-wider border border-slate-700">Read</span>
                      )}
                    </td>
                    <td className="px-6 py-5">
                      <p className={`text-sm ${!msg.isRead ? 'font-bold text-white' : 'font-medium text-slate-300'}`}>{msg.name}</p>
                      <p className="text-xs text-slate-500 mt-1">{msg.email}</p>
                    </td>
                    <td className={`px-6 py-5 text-sm ${!msg.isRead ? 'font-medium text-slate-200' : 'text-slate-400'}`}>
                      {msg.subject.length > 50 ? `${msg.subject.substring(0, 50)}...` : msg.subject}
                    </td>
                    <td className="px-6 py-5 text-slate-500 text-sm whitespace-nowrap">
                      {new Date(msg.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-5 text-right space-x-2 whitespace-nowrap">
                      <Link 
                        to={`/admin/messages/${msg._id}`} 
                        className="text-blue-400 hover:text-blue-300 font-medium bg-slate-800 hover:bg-slate-700 border border-slate-700 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 text-sm"
                      >
                        <Eye className="w-4 h-4" />
                        Read
                      </Link>
                      <button 
                        onClick={() => handleDelete(msg._id)}
                        className="text-red-400 hover:text-red-300 font-medium bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 text-sm"
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

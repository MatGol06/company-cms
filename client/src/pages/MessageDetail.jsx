import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function MessageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');
  const token = localStorage.getItem('cms_token');

  useEffect(() => {
    fetchMessage();
  }, [id]);

  const fetchMessage = async () => {
    try {
      // Backend auto-set isRead kepada true bila GET dipanggil
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setMessage(response.data);
    } catch (err) {
      setError('Gagal memuat turun butiran mesej. Mungkin mesej telah dipadam.');
    }
  };

  if (error) {
    return (
      <div className="max-w-3xl mx-auto animate-in fade-in">
        <div className="bg-red-50 text-red-600 p-8 rounded-2xl text-center font-medium shadow-sm border border-red-100">
          {error}
          <div className="mt-4">
            <button onClick={() => navigate('/admin/messages')} className="text-primary underline">Kembali ke Peti Masuk</button>
          </div>
        </div>
      </div>
    );
  }

  if (!message) {
    return <div className="p-12 text-center text-slate-500 animate-pulse font-medium">Membuka mesej...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/admin/messages')} 
          className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500 hover:text-secondary shadow-sm transition-all hover:bg-slate-50"
          title="Kembali"
        >
          &larr;
        </button>
        <h2 className="text-3xl font-bold text-secondary">Butiran Mesej</h2>
      </div>

      <div className="bg-surface p-8 sm:p-10 rounded-2xl shadow-sm border border-slate-100">
        
        {/* Header Mesej */}
        <div className="border-b border-slate-100 pb-8 mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-secondary mb-6 leading-tight">{message.subject}</h3>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xl uppercase shadow-sm">
                {message.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-secondary text-lg">{message.name}</p>
                <a href={`mailto:${message.email}`} className="text-primary hover:underline">{message.email}</a>
              </div>
            </div>
            
            <div className="text-sm font-medium text-slate-500 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
              {new Date(message.createdAt).toLocaleString('ms-MY', { 
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' 
              })}
            </div>
          </div>
        </div>

        {/* Kandungan Mesej */}
        <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-lg">
          {message.content.split('\n').map((paragraph, index) => (
             <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
        
        {/* Tindakan (Balas) */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end">
           <a 
              href={`mailto:${message.email}?subject=RE: ${message.subject}`}
              className="bg-primary hover:bg-blue-700 text-white font-bold px-8 py-3 rounded-xl transition-all shadow-md flex items-center gap-3 hover:-translate-y-0.5"
           >
             <span>Balas E-mel Terus</span>
           </a>
        </div>
      </div>
    </div>
  );
}

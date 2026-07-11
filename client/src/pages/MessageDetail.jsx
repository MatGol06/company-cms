import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Reply } from 'lucide-react';

export default function MessageDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState('');
  
  useEffect(() => {
    fetchMessage();
  }, [id]);

  const fetchMessage = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/messages/${id}`);
      setMessage(response.data);
    } catch (err) {
      setError('Failed to fetch butiran mesej. Mungkin mesej telah dipadam.');
    }
  };

  if (error) {
    return (
      <div className="max-w-3xl mx-auto animate-in fade-in duration-700">
        <div className="bg-red-500/10 text-red-600 p-8 rounded-[2rem] text-center font-medium shadow-sm border border-red-500/20">
          {error}
          <div className="mt-4">
            <button onClick={() => navigate('/admin/messages')} className="text-blue-600 hover:text-blue-800 underline underline-offset-4">Back to Inbox</button>
          </div>
        </div>
      </div>
    );
  }

  if (!message) {
    return <div className="p-12 text-center text-slate-500 animate-pulse font-medium text-sm">Opening message...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto animate-in fade-in duration-700">
      
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={() => navigate('/admin/messages')} 
          className="w-10 h-10 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-all shadow-sm"
          title="Back"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h2 className="text-3xl font-bold text-slate-800">Message Details</h2>
      </div>

      <div className="bg-white p-8 sm:p-10 rounded-[2rem] shadow-sm border border-slate-100">
        
        {/* Header Mesej */}
        <div className="border-b border-slate-100 pb-8 mb-8">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-6 leading-tight">{message.subject}</h3>
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-blue-50 border border-blue-500/20 flex items-center justify-center text-blue-600 font-bold text-xl uppercase shadow-sm">
                {message.name.charAt(0)}
              </div>
              <div>
                <p className="font-bold text-slate-800 text-lg">{message.name}</p>
                <a href={`mailto:${message.email}`} className="text-blue-600 hover:text-blue-800 hover:underline text-sm font-medium">{message.email}</a>
              </div>
            </div>
            
            <div className="text-xs font-semibold tracking-wider text-slate-500 bg-slate-50 px-4 py-2.5 rounded-lg border border-slate-100 uppercase">
              {new Date(message.createdAt).toLocaleString('en-US', { 
                weekday: 'short', year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' 
              })}
            </div>
          </div>
        </div>

        {/* Kandungan Mesej */}
        <div className="prose prose-invert prose-slate max-w-none text-slate-700 leading-relaxed text-lg">
          {message.content.split('\n').map((paragraph, index) => (
             <p key={index} className="mb-4">{paragraph}</p>
          ))}
        </div>
        
        {/* Actions (Balas) */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-end">
           <a 
              href={`mailto:${message.email}?subject=RE: ${message.subject}`}
              className="bg-[#1f1f1f] hover:bg-black text-white font-medium px-8 py-3 rounded-2xl transition-all shadow-md hover:shadow-lg flex items-center gap-2 hover:-translate-y-0.5"
           >
             <Reply className="w-5 h-5" />
             <span>Reply via Email</span>
           </a>
        </div>
      </div>
    </div>
  );
}

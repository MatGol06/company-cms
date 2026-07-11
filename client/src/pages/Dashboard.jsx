import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowUpRight, ArrowDownRight, RefreshCcw, FileText, Wrench, Briefcase, Inbox, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [stats, setStats] = useState({
    pagesCount: 0,
    servicesCount: 0,
    projectsCount: 0,
    totalMessages: 0,
    unreadMessages: 0
  });
  const [recentMessages, setRecentMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const [pagesRes, servicesRes, messagesRes, projectsRes] = await Promise.all([
        axios.get(`${import.meta.env.VITE_API_URL}/pages`),
        axios.get(`${import.meta.env.VITE_API_URL}/services`),
        axios.get(`${import.meta.env.VITE_API_URL}/messages`),
        axios.get(`${import.meta.env.VITE_API_URL}/projects`)
      ]);

      const messages = messagesRes.data;
      const unread = messages.filter(m => !m.isRead).length;

      setStats({
        pagesCount: pagesRes.data.length,
        servicesCount: servicesRes.data.length,
        projectsCount: projectsRes.data.length,
        totalMessages: messages.length,
        unreadMessages: unread
      });

      // Ambil 5 mesej terbaru untuk jadual
      setRecentMessages(messages.slice(0, 5));
    } catch (error) {
      console.error("Gagal memuatkan data dashboard", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 space-y-6">
      
      {/* 4 Metrics Cards (Mengikut Design Premium Light UI) */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Kad Gelap (Dark Card) */}
        <div className="bg-[#1f1f1f] rounded-[2rem] p-6 text-white shadow-md relative overflow-hidden">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-white/10 rounded-xl"><Inbox className="w-4 h-4" /></div>
             <p className="text-slate-300 text-sm font-medium">Unread Messages</p>
          </div>
          <h3 className="text-4xl font-semibold mb-2">{stats.unreadMessages}</h3>
          <div className={`flex items-center gap-1 text-xs font-medium ${stats.unreadMessages > 0 ? 'text-red-400' : 'text-green-400'}`}>
             {stats.unreadMessages > 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
             {stats.unreadMessages > 0 ? 'Requires attention' : 'All caught up!'}
          </div>
        </div>

        {/* Kad Putih 1 */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-slate-100 rounded-xl text-slate-600"><Briefcase className="w-4 h-4" /></div>
             <p className="text-slate-500 text-sm font-medium">Total Projects</p>
          </div>
          <h3 className="text-4xl font-semibold text-slate-800 mb-2">{stats.projectsCount}</h3>
          <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
             Active in portfolio
          </div>
        </div>

        {/* Kad Putih 2 */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-slate-100 rounded-xl text-slate-600"><Wrench className="w-4 h-4" /></div>
             <p className="text-slate-500 text-sm font-medium">Active Services</p>
          </div>
          <h3 className="text-4xl font-semibold text-slate-800 mb-2">{stats.servicesCount}</h3>
          <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
             Published offerings
          </div>
        </div>

        {/* Kad Putih 3 */}
        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-slate-100">
          <div className="flex items-center gap-3 mb-4">
             <div className="p-2 bg-slate-100 rounded-xl text-slate-600"><FileText className="w-4 h-4" /></div>
             <p className="text-slate-500 text-sm font-medium">Total Pages</p>
          </div>
          <h3 className="text-4xl font-semibold text-slate-800 mb-2">{stats.pagesCount}</h3>
          <div className="flex items-center gap-1 text-xs text-slate-400 font-medium">
             Live web pages
          </div>
        </div>
      </div>

      {/* Bottom Table: Recent Messages */}
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-800">Recent Messages</h3>
          <div className="flex gap-2">
            <button onClick={fetchDashboardData} className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-colors border border-slate-100">
              <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
            <Link to="/admin/messages" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-blue-600 transition-colors border border-slate-100">
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 font-medium text-sm">
                <th className="pb-4 font-semibold uppercase tracking-wider text-xs">Sender Info</th>
                <th className="pb-4 font-semibold uppercase tracking-wider text-xs">Subject</th>
                <th className="pb-4 font-semibold uppercase tracking-wider text-xs">Date Received</th>
                <th className="pb-4 font-semibold uppercase tracking-wider text-xs text-right pr-4">Status</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr><td colSpan="4" className="py-8 text-center text-slate-400 text-sm animate-pulse">Loading messages...</td></tr>
              ) : recentMessages.length === 0 ? (
                <tr><td colSpan="4" className="py-8 text-center text-slate-500 text-sm">No messages received yet.</td></tr>
              ) : (
                recentMessages.map(msg => (
                  <tr key={msg._id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-bold uppercase shadow-inner">
                        {msg.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800 text-sm">{msg.name}</p>
                        <p className="text-xs text-slate-500">{msg.email}</p>
                      </div>
                    </td>
                    <td className="py-4 text-sm font-medium text-slate-700 max-w-[200px] truncate">{msg.subject}</td>
                    <td className="py-4 text-sm text-slate-500">
                      {new Date(msg.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="py-4 text-right pr-2">
                      <Link to={`/admin/messages/${msg._id}`}>
                        <span className={`inline-flex items-center gap-1 text-xs font-bold px-4 py-1.5 rounded-full transition-all hover:scale-105 ${
                          !msg.isRead 
                            ? 'bg-[#1f1f1f] text-white shadow-md' 
                            : 'bg-slate-100 text-slate-500'
                        }`}>
                          {!msg.isRead ? 'New' : 'Read'}
                        </span>
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-6 text-center">
           <Link to="/admin/messages" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
             View All Messages
           </Link>
        </div>
      </div>

    </div>
  );
}

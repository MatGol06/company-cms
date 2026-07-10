import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FileText, Wrench, Inbox, Bell, ArrowRight, Plus, Settings } from 'lucide-react';

export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('cms_user') || '{}');
  
  const [stats, setStats] = useState({
    pagesCount: 0,
    servicesCount: 0,
    totalMessages: 0,
    unreadMessages: 0,
    recentMessages: []
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [pagesRes, servicesRes, messagesRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/pages`),
          axios.get(`${import.meta.env.VITE_API_URL}/services`),
          axios.get(`${import.meta.env.VITE_API_URL}/messages`)
        ]);

        const messages = messagesRes.data || [];
        const unread = messages.filter(m => !m.isRead).length;
        const recent = messages.slice(0, 5);

        setStats({
          pagesCount: pagesRes.data.length || 0,
          servicesCount: servicesRes.data.length || 0,
          totalMessages: messages.length,
          unreadMessages: unread,
          recentMessages: recent
        });
      } catch (err) {
        console.error("Gagal mendapatkan data dashboard", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  return (
    <div className="animate-in fade-in duration-700">
      <header className="mb-8">
        <h2 className="text-3xl font-bold text-white tracking-tight mb-2">Welcome Back, {user.name}</h2>
        <p className="text-slate-400">Here is the overview of your company's digital presence today.</p>
      </header>
      
      {isLoading ? (
        <div className="flex items-center justify-center min-h-[40vh]">
           <div className="text-slate-500 animate-pulse text-sm font-medium">Loading metrics...</div>
        </div>
      ) : (
        <>
          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-between group hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Pages</h3>
                 <FileText className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </div>
              <p className="text-4xl font-bold text-white">{stats.pagesCount}</p>
            </div>

            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-between group hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Services</h3>
                 <Wrench className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </div>
              <p className="text-4xl font-bold text-white">{stats.servicesCount}</p>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 p-6 rounded-xl flex flex-col justify-between group hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between mb-4">
                 <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Messages</h3>
                 <Inbox className="w-5 h-5 text-slate-500 group-hover:text-blue-400 transition-colors" />
              </div>
              <p className="text-4xl font-bold text-white">{stats.totalMessages}</p>
            </div>

            <div className={`p-6 rounded-xl border flex flex-col justify-between transition-all ${stats.unreadMessages > 0 ? 'bg-blue-600/10 border-blue-500/30 shadow-[0_0_15px_rgba(37,99,235,0.15)]' : 'bg-slate-900 border-slate-800'}`}>
              <div className="flex items-center justify-between mb-4">
                 <h3 className={`text-xs font-semibold uppercase tracking-wider ${stats.unreadMessages > 0 ? 'text-blue-400' : 'text-slate-400'}`}>Unread Messages</h3>
                 <Bell className={`w-5 h-5 ${stats.unreadMessages > 0 ? 'text-blue-400 animate-bounce' : 'text-slate-500'}`} />
              </div>
              <p className={`text-4xl font-bold ${stats.unreadMessages > 0 ? 'text-white' : 'text-white'}`}>{stats.unreadMessages}</p>
            </div>

          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Recent Messages */}
            <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center bg-slate-900/50">
                <h3 className="font-semibold text-white">Recent Messages</h3>
                <Link to="/admin/messages" className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1">
                  View All <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
              <div className="p-0">
                {stats.recentMessages.length === 0 ? (
                  <div className="p-8 text-center text-slate-500 text-sm">No messages found.</div>
                ) : (
                  <ul className="divide-y divide-slate-800/50">
                    {stats.recentMessages.map((msg) => (
                      <li key={msg._id} className="hover:bg-slate-800/30 transition-colors">
                        <Link to={`/admin/messages/${msg._id}`} className="block px-6 py-4">
                          <div className="flex justify-between items-start mb-1.5">
                            <span className={`text-sm ${!msg.isRead ? 'font-semibold text-white' : 'font-medium text-slate-300'}`}>{msg.name}</span>
                            <span className="text-xs text-slate-500">{new Date(msg.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className={`text-sm ${!msg.isRead ? 'font-medium text-slate-200' : 'text-slate-400'}`}>{msg.subject}</p>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl h-fit">
               <div className="px-6 py-5 border-b border-slate-800 bg-slate-900/50">
                  <h3 className="font-semibold text-white">Quick Actions</h3>
               </div>
               <div className="p-4 space-y-2">
                 <Link to="/admin/services/new" className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-all group">
                    <div className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/20 transition-colors">
                       <Plus className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-200">Add Service</h4>
                      <p className="text-xs text-slate-500">Create a new offering</p>
                    </div>
                 </Link>
                 <Link to="/admin/pages/new" className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-all group">
                    <div className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/20 transition-colors">
                       <Plus className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-200">Add Page</h4>
                      <p className="text-xs text-slate-500">Create a dynamic page</p>
                    </div>
                 </Link>
                 <Link to="/admin/settings" className="flex items-center gap-4 p-3 rounded-lg hover:bg-slate-800/50 transition-all group">
                    <div className="w-8 h-8 rounded-md bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-slate-700 transition-colors">
                       <Settings className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-slate-200">System Settings</h4>
                      <p className="text-xs text-slate-500">Update company profile</p>
                    </div>
                 </Link>
               </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}

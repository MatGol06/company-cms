import { Navigate, Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { LayoutDashboard, FileText, Wrench, Inbox, Settings, LogOut, Hexagon, Briefcase } from 'lucide-react';

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const token = localStorage.getItem('cms_token');
  const user = JSON.parse(localStorage.getItem('cms_user') || '{}');

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/logout`);
    } catch (err) { console.error(err); }
    localStorage.removeItem('cms_user');
    navigate('/login');
  };

  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Pages', path: '/admin/pages', icon: FileText },
    { name: 'Services', path: '/admin/services', icon: Wrench },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Inbox', path: '/admin/messages', icon: Inbox },
    { name: 'System Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-300 flex font-sans selection:bg-blue-500/30">
      
      {/* Sidebar Kiri */}
      <aside className="w-64 bg-slate-950 border-r border-slate-800 flex-col hidden md:flex z-10">
        <div className="p-6 border-b border-slate-800/50">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
            <Hexagon className="w-7 h-7 text-blue-500 fill-blue-500/20" />
            Company CMS
          </h2>
        </div>
        
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 font-medium text-sm ${
                  isActive 
                    ? 'bg-blue-600/10 text-blue-400 font-semibold' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-500'}`} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="p-4 border-t border-slate-800/50">
           <div className="px-3 py-2 flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{user.name}</p>
                <p className="text-xs text-slate-500 capitalize">{user.role}</p>
              </div>
           </div>
        </div>
      </aside>

      {/* Ruang Kanan (Content) */}
      <main className="flex-1 flex flex-col min-w-0 bg-slate-950">
        
        {/* Navbar Atas */}
        <header className="h-16 bg-slate-950/80 backdrop-blur-md border-b border-slate-800 flex items-center justify-between px-6 sticky top-0 z-20">
          <h1 className="text-sm font-medium text-slate-400">Admin Control Panel</h1>
          
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" className="text-sm font-medium text-slate-400 hover:text-white transition-colors">
              View Site ↗
            </a>
            <div className="h-4 w-px bg-slate-800"></div>
            <button 
              onClick={handleLogout} 
              className="text-sm font-medium text-red-400 hover:text-red-300 flex items-center gap-2 transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="p-6 md:p-8 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

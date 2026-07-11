import { Navigate, Outlet, useNavigate, Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { 
  Home, FileText, Wrench, Briefcase, Inbox, 
  Settings, LogOut, Search, Hexagon
} from 'lucide-react';

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

  // Menu yang berasaskan fungsi CMS kita
  const navItems = [
    { name: 'Dashboard', path: '/admin', icon: Home },
    { name: 'Pages', path: '/admin/pages', icon: FileText },
    { name: 'Services', path: '/admin/services', icon: Wrench },
    { name: 'Projects', path: '/admin/projects', icon: Briefcase },
    { name: 'Inbox', path: '/admin/messages', icon: Inbox },
  ];

  return (
    <div className="min-h-screen bg-[#e5e7eb] text-slate-800 flex font-sans">
      
      {/* White Sidebar */}
      <aside className="w-[280px] bg-white flex-col hidden md:flex z-10 shrink-0 shadow-sm border-r border-slate-100">
        <div className="p-8">
          <h2 className="text-3xl font-black tracking-tight text-slate-900 flex items-center gap-2">
            <Hexagon className="w-8 h-8 text-blue-600 fill-blue-600/20" />
            Company
          </h2>
        </div>
        
        <nav className="flex-1 px-6 py-2 space-y-3 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== '/admin' && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <Link 
                key={item.path} 
                to={item.path} 
                className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-200 text-[15px] ${
                  isActive 
                    ? 'text-slate-900 font-bold bg-slate-50' 
                    : 'text-slate-500 hover:text-slate-900 font-medium'
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-slate-900' : 'text-slate-400'}`} strokeWidth={isActive ? 2.5 : 2} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Bottom Actions (Settings & Logout) */}
        <div className="p-6 space-y-2 mb-4 border-t border-slate-50">
           <Link to="/admin/settings" className="flex items-center gap-4 px-4 py-2.5 text-[15px] text-slate-500 hover:text-slate-900 font-medium transition-colors">
             <Settings className="w-5 h-5 text-slate-400" /> Settings
           </Link>
           <button onClick={handleLogout} className="w-full flex items-center gap-4 px-4 py-2.5 text-[15px] text-slate-500 hover:text-red-600 font-medium transition-colors">
             <LogOut className="w-5 h-5 text-slate-400" /> Log out
           </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#e5e7eb] px-10 py-8">
        
        {/* Top Header Row */}
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-800">Welcome back, {user.name}</h1>
            <p className="text-sm text-slate-500 font-medium mt-1">Manage your website content efficiently.</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search..." 
                className="pl-12 pr-4 py-3 bg-white rounded-full text-sm font-medium focus:outline-none w-64 shadow-sm border border-slate-100"
              />
            </div>
            <a href="/" target="_blank" className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm relative text-slate-600 hover:text-blue-600 hover:bg-slate-50 transition-colors border border-slate-100" title="View Public Site">
               <Home className="w-5 h-5" />
            </a>
            <div className="w-12 h-12 rounded-full overflow-hidden shadow-sm border-2 border-white bg-slate-200">
              <img src={`https://ui-avatars.com/api/?name=${user.name}&background=random`} alt="Profile" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* Dynamic Page Content */}
        <div className="overflow-y-auto pb-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

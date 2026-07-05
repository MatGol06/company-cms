export default function Dashboard() {
  const user = JSON.parse(localStorage.getItem('cms_user') || '{}');

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-3xl font-bold text-secondary mb-2">Selamat Kembali, {user.name}! 👋</h2>
      <p className="text-slate-500 mb-8">Ini adalah ringkasan sistem syarikat anda setakat hari ini.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Kad 1 */}
        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Status Sistem</h3>
          <div className="flex items-end gap-3">
            <p className="text-4xl font-black text-secondary">Aktif</p>
            <span className="w-3 h-3 bg-green-500 rounded-full mb-2 animate-pulse"></span>
          </div>
        </div>

        {/* Kad 2 */}
        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Peranan (Role)</h3>
          <p className="text-4xl font-black text-primary capitalize">{user.role}</p>
        </div>
        
        {/* Kad 3 (Boleh letak jumlah visitors/mesej nanti) */}
        <div className="bg-surface p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow bg-gradient-to-br from-primary to-blue-700 text-white border-none">
          <h3 className="text-sm font-bold text-blue-200 uppercase tracking-wider mb-2">Peti Masuk (Akan Datang)</h3>
          <p className="text-4xl font-black">0 Mesej</p>
        </div>

      </div>
    </div>
  );
}

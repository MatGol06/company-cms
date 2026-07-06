export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] animate-in fade-in zoom-in-95 duration-700 px-4">
      <div className="text-center mt-20">
        <span className="bg-blue-100 text-blue-700 font-bold px-4 py-1.5 rounded-full text-sm uppercase tracking-wider mb-6 inline-block">
          Sedia Untuk Dilancarkan
        </span>
        <h1 className="text-5xl md:text-7xl font-bold text-secondary mb-6 tracking-tight leading-tight">
          Selamat Datang ke <br/><span className="text-primary bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-400">Laman Awam</span>
        </h1>
        <p className="text-xl text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed">
          Ini adalah tapak permulaan (placeholder) untuk muka depan laman web sebenar. Kandungan ini akan ditarik dari sistem CMS sebentar lagi.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-primary hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-full shadow-lg shadow-primary/30 transition-all hover:-translate-y-1">
            Teroka Servis
          </button>
          <button className="bg-white hover:bg-slate-50 text-secondary border border-slate-200 font-bold px-8 py-3.5 rounded-full shadow-sm transition-all hover:-translate-y-1">
            Hubungi Kami
          </button>
        </div>
      </div>
    </div>
  );
}

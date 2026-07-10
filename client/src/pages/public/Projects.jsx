import { useState, useEffect } from 'react';
import axios from 'axios';
import { ArrowUpRight, Loader2, Briefcase } from 'lucide-react';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="animate-in fade-in duration-700 bg-slate-50 min-h-screen">
      {/* Header */}
      <section className="pt-32 pb-16 px-4 text-center border-b border-slate-100 bg-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 mb-6 shadow-sm border border-blue-100">
            <Briefcase className="w-8 h-8" />
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-6 tracking-tighter">My Work</h1>
          <p className="text-xl text-slate-500 leading-relaxed max-w-2xl mx-auto">
            A showcase of our finest engineering and design. We blend strategy and technology to build digital solutions that drive results.
          </p>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {isLoading ? (
          <div className="flex flex-col justify-center items-center py-20 text-blue-500">
             <Loader2 className="w-12 h-12 animate-spin mb-4" />
             <p className="text-slate-500 font-medium">Loading portfolio...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-3xl border border-slate-100 shadow-sm">
            <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-slate-700 mb-2">No Projects Yet</h3>
            <p className="text-slate-500 text-lg">We are currently crafting new case studies. Check back soon.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {projects.map((project) => (
              <div key={project._id} className="group relative rounded-3xl overflow-hidden bg-white shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full border border-slate-100 hover:border-blue-100 hover:-translate-y-2">
                <div className="relative h-72 overflow-hidden bg-slate-100">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/40 transition-colors z-10 duration-500"></div>
                  {project.imageUrl ? (
                    <img src={project.imageUrl} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-300 font-bold text-2xl">No Cover Image</div>
                  )}
                  
                  {project.externalLink && (
                    <a href={project.externalLink} target="_blank" rel="noreferrer" className="absolute top-6 right-6 z-20 w-12 h-12 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 hover:bg-blue-600 hover:text-white shadow-lg">
                      <ArrowUpRight className="w-5 h-5" />
                    </a>
                  )}
                  
                  {project.category && (
                    <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                      <span className="bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                        {project.category}
                      </span>
                    </div>
                  )}
                </div>

                <div className="p-8 flex-grow flex flex-col relative bg-white">
                  {project.clientName && (
                    <div className="text-sm font-semibold text-blue-600 mb-3 tracking-wide uppercase">
                      Client: {project.clientName}
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight">{project.title}</h3>
                  <p className="text-slate-500 leading-relaxed text-base flex-grow">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

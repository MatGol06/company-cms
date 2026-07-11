import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Briefcase, Plus, Edit2, Trash2 } from 'lucide-react';

export default function ProjectsList() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/projects`);
      setProjects(response.data);
    } catch (error) {
      console.error('Gagal memuatkan projek', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this project?')) {
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/projects/${id}`);
        fetchProjects();
      } catch (error) {
        alert('Error! Gagal memadam projek dari pangkalan data.');
      }
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-slate-800 mb-2 flex items-center gap-3">
             <Briefcase className="w-8 h-8 text-blue-500" />
             Projects & Portfolio
          </h2>
          <p className="text-slate-500">Manage the list of past projects and client portfolios.</p>
        </div>
        <Link 
          to="/admin/projects/new" 
          className="bg-[#1f1f1f] hover:bg-black text-white px-5 py-2.5 rounded-lg transition-all font-medium shadow-md hover:shadow-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Project</span>
        </Link>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/50 border-b border-slate-100">
                <th className="px-6 py-5 font-semibold text-slate-500 uppercase text-xs">Project Info</th>
                <th className="px-6 py-5 font-semibold text-slate-500 uppercase text-xs">Category</th>
                <th className="px-6 py-5 font-semibold text-slate-500 uppercase text-xs">Client</th>
                <th className="px-6 py-5 font-semibold text-slate-500 uppercase text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500 animate-pulse text-sm">Loading data from cloud...</td></tr>
              ) : projects.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-12 text-center text-slate-500 text-sm">No projects recorded. Please add your first project.</td></tr>
              ) : (
                projects.map((project) => (
                  <tr key={project._id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-6 py-5">
                      <p className="font-medium text-slate-800">{project.title}</p>
                      <p className="text-slate-500 text-xs mt-1 truncate max-w-[250px]">{project.description}</p>
                    </td>
                    <td className="px-6 py-5 text-slate-700 text-sm">
                      <span className="bg-[#1f1f1f] px-3 py-1 rounded-full text-xs border border-transparent">{project.category || 'Uncategorized'}</span>
                    </td>
                    <td className="px-6 py-5 text-slate-500 text-sm">
                      {project.clientName || '-'}
                    </td>
                    <td className="px-6 py-5 text-right space-x-2 whitespace-nowrap">
                      <Link 
                        to={`/admin/projects/${project._id}`} 
                        className="text-blue-600 hover:text-blue-800 font-medium bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 text-sm"
                      >
                        <Edit2 className="w-4 h-4" />
                        Edit
                      </Link>
                      <button 
                        onClick={() => handleDelete(project._id)}
                        className="text-red-600 hover:text-red-800 font-medium bg-red-500/10 hover:bg-red-500/20 px-4 py-2 rounded-lg transition-colors inline-flex items-center gap-2 text-sm"
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

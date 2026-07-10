import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

export default function DynamicPage() {
  const { slug } = useParams();
  const [pageData, setPageData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchPage = async () => {
      setIsLoading(true);
      setError(false);
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/pages/${slug}`);
        setPageData(response.data);
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPage();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-slate-500 text-lg animate-pulse">Loading page content...</div>
      </div>
    );
  }

  if (error || !pageData) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 text-center">
        <h1 className="text-5xl font-bold text-secondary mb-4">404</h1>
        <h2 className="text-2xl font-bold text-slate-700 mb-4">Page Not Found</h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">The page you are looking for does not exist or has been removed.</p>
        <Link to="/" className="bg-primary hover:bg-blue-700 text-white font-bold px-8 py-3.5 rounded-full transition-all shadow-md hover:shadow-lg">
          Return to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in duration-700 min-h-screen py-16 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-secondary mb-12 text-center">
          {pageData.title}
        </h1>
        
        {/* Render JSON blocks content */}
        <div className="prose prose-lg prose-slate max-w-none">
          {pageData.blocks && pageData.blocks.map((block, index) => {
            if (block.type === 'paragraph') {
              return <p key={index} className="text-slate-600 leading-relaxed mb-6">{block.content}</p>;
            }
            if (block.type === 'heading') {
              return <h2 key={index} className="text-2xl font-bold text-secondary mt-10 mb-4">{block.content}</h2>;
            }
            if (block.type === 'image') {
              return (
                <div key={index} className="my-10 rounded-2xl overflow-hidden shadow-sm border border-slate-100">
                  <img src={block.content} alt="Content" className="w-full h-auto object-cover" />
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
}

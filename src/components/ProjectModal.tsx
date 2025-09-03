import { useEffect } from "react";
import { LuX } from "react-icons/lu";

interface Project {
  slug: string;
  name: string;
  icon: string;
  description: string;
  link: string;
  image: string;
  tools: string[];
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  isDarkTheme: boolean;
}

const ProjectModal = ({ project, isOpen, onClose, isDarkTheme }: ProjectModalProps) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-lg rounded-lg transition-all duration-300 ${
        isDarkTheme 
          ? "bg-black border border-gray-800" 
          : "bg-white border border-gray-200"
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-3 right-3 p-1 transition-colors duration-200 ${
            isDarkTheme 
              ? "text-white/60 hover:text-white" 
              : "text-black/60 hover:text-black"
          }`}
        >
          <LuX className="w-4 h-4" />
        </button>

        {/* Content */}
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <img 
              src={project.icon} 
              alt={project.name}
              className="w-6 h-6"
            />
            <h2 className={`text-xl font-mono font-semibold transition-colors duration-300 capitalize ${
              isDarkTheme ? "text-white" : "text-black"
            }`}>
              {project.name}
            </h2>
          </div>

          {/* Image */}
          <div className="mb-4">
            <img 
              src={project.image} 
              alt={project.name}
              className="w-full h-fit object-contain rounded"
            />
          </div>

          {/* Description */}
          {project.description && (
            <p className={`text-sm font-mono leading-relaxed mb-4 transition-colors duration-300 ${
              isDarkTheme ? "text-white/70" : "text-black/70"
            }`}>
              {project.description}
            </p>
          )}

          {/* Tools */}
          {project.tools && project.tools.length > 0 && (
            <div className="mb-4">
              <div className="flex flex-wrap gap-1">
                {project.tools.map((tool, index) => (
                  <span 
                    key={index}
                    className={`px-2 py-1 rounded text-xs font-mono transition-colors duration-300 ${
                      isDarkTheme 
                        ? "bg-[#2f2f2f] text-white/80" 
                        : "bg-[#f3f4f6] text-[#364153]"
                    }`}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Project Link Button */}
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-2 px-4 py-2 rounded font-mono text-sm transition-all duration-300 hover:scale-105 ${
              isDarkTheme 
                ? "bg-white text-black hover:bg-gray-200" 
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            view project
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;

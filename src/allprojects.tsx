import { useEffect, useState, useMemo } from 'react';
import { TiArrowSortedUp } from 'react-icons/ti';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import CachedImage from './components/CachedImage';

import concrete from './assets/concrete.webp';
import bento from './assets/bento.webp';
import foresty from './assets/Foresty.webp';
import finance from './assets/Finance.webp';
import aaargh from './assets/Aaargh.webp';
import mana from './assets/Mana.webp';
import surgeon from './assets/surgeon.webp';
import cognify from './assets/Cognify.webp';
import holostry from './assets/Holostry.webp';
import Sentiment from './assets/Sentiment.webp';
import Colorizer from './assets/Colorizer.webp';
import Revo from './assets/Revo.webp';
import knowabout from './assets/knowabout.webp';
import payback from './assets/payback.webp';

type Project = {
  image: string;
  name: string;
  desc: string;
  link: string;
  keywords: string[];
};

const PROJECTS: Project[] = [
  {
    image: concrete,
    name: 'Concrete Damage Detector',
    desc: 'Built a YOLO-powered damage detector to spot and segment cracks in concrete — keeping buildings strong, one frame at a time.',
    link: 'https://github.com/MaybeTarun/Concrete-Damage-Detector',
    keywords: ['machine learning', 'computer vision', 'yolo', 'yolov8', 'python', 'ai', 'detection', 'roboflow', 'cv2', 'ultralytics', 'supervision', 'object detection', 'image processing', 'deep learning', 'neural networks', 'opencv', 'computer vision', 'construction', 'damage assessment', 'segmentation', 'real-time', 'inference']
  },
  {
    image: bento,
    name: 'BentoGen',
    desc: 'Designed a tool that generates bento-style UI layouts with live previews and exportable code templates.',
    link: 'https://bento-gen.vercel.app/',
    keywords: ['bento', 'grid', 'design', 'web', 'web development', 'react', 'typescript', 'tailwindcss', 'generator', 'responsive', 'frontend', 'component library', 'design system', 'css framework', 'modern web', 'developer tools', 'code generation', 'preview', 'templates', 'design inspiration']
  },
  {
    image: foresty,
    name: 'Foresty',
    desc: 'Created a user-friendly platform that helps users easily discover vulnerabilities—such as open ports and other security risks—on their websites, empowering them to secure their online presence.',
    link: 'https://github.com/MaybeTarun/Foresty',
    keywords: ['security', 'vulnerability', 'web', 'web development', 'scanning', 'cybersecurity', 'pentesting', 'penetration testing', 'network security', 'port scanning', 'security audit', 'web security', 'ethical hacking', 'security tools', 'vulnerability assessment', 'threat detection', 'security scanner', 'network analysis', 'security testing', 'web application security', 'infrastructure security', 'security monitoring', 'html']
  },
  {
    image: finance,
    name: 'Finance Tracker',
    desc: 'A full-featured MERN stack application for tracking personal finances. Includes intuitive dashboards, transaction management, and uses Clerk for secure user authentication and management.',
    link: 'https://financetracker-neon.vercel.app/',
    keywords: ['mern', 'finance', 'web', 'web development', 'react', 'node', 'mongodb', 'authentication', 'fullstack', 'javascript', 'express', 'financial management', 'dashboard', 'transaction tracking', 'budgeting', 'personal finance', 'clerk', 'user management', 'database', 'api', 'rest api', 'state management', 'responsive design', 'modern web app', 'financial dashboard']
  },
  {
    image: aaargh,
    name: 'Aaargh!!',
    desc: 'A voice-controlled game inspired by Flappy Bird, where you guide the player by making weird noises like "aaaah" or "aargh". Fun, chaotic, and a great way to test your vocal skills!',
    link: 'https://aaargh.vercel.app/',
    keywords: ['game', 'voice control', 'web', 'web development', 'react', 'audio', 'interactive', 'fun', 'gaming', 'voice recognition', 'speech processing', 'audio processing', 'web audio api', 'game development', 'browser game', 'voice commands', 'audio visualization', 'sound detection', 'real-time audio', 'web game', 'interactive entertainment', 'voice interface', 'audio games', 'speech detection']
  },
  {
    image: mana,
    name: 'Mana House',
    desc: 'A service-based startup that creates 3D projects for brands and agencies. We build games, 3D models, animations, and more to help businesses stand out with immersive digital experiences.',
    link: 'https://www.manahouse.in/',
    keywords: ['3d', 'gaming', 'animation', 'branding', 'startup', 'business', 'immersive', '3d modeling', '3d animation', 'game development', 'brand identity', 'digital marketing', 'creative agency', '3d rendering', 'visual effects', 'digital art', 'brand development', '3d visualization', 'interactive 3d', '3d design', 'digital experiences', 'creative services', '3d graphics', 'brand strategy', 'immersive technology', 'web', 'web development', 'react', 'typescript']
  },
  {
    image: surgeon,
    name: 'Portfolio for a Surgeon',
    desc: 'A modern, responsive portfolio website designed and developed for a doctor as part of my freelance work. Highlights expertise, services, and achievements in a clean, professional layout.',
    link: 'https://www.surgeonrkl.com/',
    keywords: ['portfolio', 'medical', 'freelance', 'responsive', 'professional', 'healthcare', 'web', 'web development', 'react', 'typescript', 'medical website', 'doctor portfolio', 'healthcare marketing', 'professional website', 'medical services', 'responsive design', 'modern design', 'clean layout', 'medical branding', 'healthcare design', 'professional portfolio', 'medical marketing', 'healthcare website', 'medical portfolio']
  },
  {
    image: cognify,
    name: 'Cognify',
    desc: 'A cloud-based learning platform built with Kotlin and XML that automates and personalizes learning. Integrates OpenAI to make understanding new topics easy and engaging for users.',
    link: 'https://github.com/MaybeTarun/Cognify',
    keywords: ['android', 'android development', 'kotlin', 'learning', 'ai', 'openai', 'education', 'personalization', 'mobile app', 'xml', 'android studio', 'machine learning', 'adaptive learning', 'educational technology', 'mobile development', 'xml', 'ai integration', 'learning platform', 'personalized education', 'android application', 'educational app', 'ai-powered learning', 'mobile learning', 'adaptive algorithms', 'educational software']
  },
  {
    image: holostry,
    name: 'Holostry',
    desc: 'Developed for a 24hr hackathon (MOZOHACK), Holostry lets students visualize 3D holographic models of carbon compounds, making chemistry interactive and easier to understand.',
    link: 'https://github.com/MaybeTarun/Holostry',
    keywords: ['hackathon', '3d', 'chemistry', 'education', 'android', 'blender', 'android development', 'flutter', 'holographic', '3d visualization', 'molecular modeling', 'chemistry education', 'holographic display', '3d rendering', 'educational technology', 'molecular visualization', '3d graphics', 'chemistry learning', 'holographic technology', '3d modeling', 'educational app', 'molecular structures', 'chemistry visualization', '3d chemistry', 'holographic models', 'molecular graphics']
  },
  {
    image: Sentiment,
    name: 'Sentiment Analyzer',
    desc: 'A Python application with a Tkinter GUI that uses Amazon Comprehend (via Boto3) to analyze the sentiment of text. Instantly see if your content is positive, negative, or neutral.',
    link: 'https://github.com/MaybeTarun/SentimentAnalyzer',
    keywords: ['python', 'sentiment analysis', 'aws', 'cloud', 'boto3', 'tkinter', 'nlp', 'gui', 'natural language processing', 'text analysis', 'amazon comprehend', 'aws services', 'cloud computing', 'python gui', 'tkinter application', 'sentiment detection', 'text processing', 'aws integration', 'cloud ai', 'python desktop app', 'nlp tools', 'text sentiment', 'aws sdk', 'python tkinter', 'sentiment classifier', 'text classification']
  },
  {
    image: Colorizer,
    name: 'Image Colorizer',
    desc: 'A web app that colorizes black and white photos using a machine learning model by Rich Zhang. Upload your old photos and bring them to life with vibrant colors!',
    link: 'https://github.com/MaybeTarun/ImageColorizer',
    keywords: ['machine learning', 'image processing', 'colorization', 'ai', 'web', 'web development', 'ml model', 'python', 'flask', 'html', 'deep learning', 'computer vision', 'image restoration', 'neural networks', 'color restoration', 'black and white', 'photo enhancement', 'ai colorization', 'image ai', 'web application', 'image editing', 'color reconstruction', 'photo processing', 'ai tools', 'image enhancement', 'color restoration', 'photo colorization', 'ai image processing']
  },
  {
    image: Revo,
    name: 'Revo',
    desc: 'A custom React project setup tool built on top of Vite. Streamlines your workflow with a clean project structure, pre-configured with Tailwind CSS and Framer Motion.',
    link: 'https://www.npmjs.com/package/create-revo',
    keywords: ['npm', 'npm package', 'package', 'react', 'vite', 'tailwind', 'framer motion', 'boilerplate', 'javascript', 'typescript', 'cli tool', 'project generator', 'react boilerplate', 'vite template', 'tailwind css', 'framer motion', 'project setup', 'developer tools', 'react template', 'modern react', 'react starter', 'project scaffolding', 'react cli', 'vite boilerplate', 'tailwind template', 'motion template']
  },
  {
    image: knowabout,
    name: 'Know-About',
    desc: 'An NPM package that gives you info about people when you run the command "npx know-about [name]". Currently features a few profiles—DM me on Twitter to add yours!',
    link: 'https://www.npmjs.com/package/know-about',
    keywords: ['npm', 'npm package', 'package', 'cli', 'social', 'people', 'command line', 'terminal', 'javascript', 'node', 'command line tool', 'social networking', 'people search', 'cli application', 'terminal tool', 'npm cli', 'social tool', 'people directory', 'command line interface', 'terminal application', 'social networking tool', 'people finder', 'cli utility', 'social directory', 'people lookup', 'command line utility']
  },
  {
    image: payback,
    name: 'Payback-to-ya',
    desc: 'A playful NPM package for web devs: if your client doesn\'t pay on time, add Payback-to-ya to their site and watch it slowly disappear over 7 days. ShIk sHaK ShOk!',
    link: 'https://www.npmjs.com/package/payback-to-ya',
    keywords: ['npm', 'npm package', 'package', 'fun', 'revenge', 'disappearing', 'client', 'javascript', 'node', 'client management', 'payment reminder', 'funny package', 'web tool', 'client tool', 'payment tool', 'fun package', 'web utility', 'client utility', 'payment utility', 'funny tool', 'web package', 'client package', 'payment package', 'funny utility', 'web utility']
  }
];

const CATEGORIES = ['All', 'Web Development', 'Android Development', 'Python', 'NPM Packages', 'Cloud Computing', 'AI'];

const AllProjects = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const getInitialPage = () => {
    if (location.state && typeof location.state.page === 'number') {
      return location.state.page;
    }
    return 2;
  };
  const [page, setPage] = useState(getInitialPage);

  const filteredProjects = useMemo(() => {
    return PROJECTS.filter(project => {
      const matchesSearch = searchQuery === '' || 
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.keywords.some(keyword => 
          keyword.toLowerCase().includes(searchQuery.toLowerCase())
        );
      
      const matchesCategory = selectedCategory === 'All' || 
        (selectedCategory === 'Web Development' && project.keywords.some(keyword => keyword === 'web')) ||
        (selectedCategory === 'Android Development' && project.keywords.some(keyword => keyword === 'android')) ||
        (selectedCategory === 'Python' && project.keywords.some(keyword => keyword === 'python')) ||
        (selectedCategory === 'NPM Packages' && project.keywords.some(keyword => keyword === 'npm')) ||
        (selectedCategory === 'Cloud Computing' && project.keywords.some(keyword => keyword === 'cloud')) ||
        (selectedCategory === 'AI' && project.keywords.some(keyword => keyword === 'ai'));
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handlePrevPage = () => {
    if (page === 1) return;
    if (page === 2) {
      navigate('/', { state: { page: 1 } });
    } else {
      setPage(page - 1);
    }
  };

  const handleNextPage = () => {
    if (page === 1) {
      navigate('/projects', { state: { page: 2 } });
    } else {
      setPage(page + 1);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <motion.div
      initial={{ x: '100vw', opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: '100vw', opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full min-h-screen flex flex-col items-center bg-white px-4"
    >
      <div className="w-full bg-white pt-4 flex flex-col items-center justify-center z-10">
        <h1 className="w-fit text-2xl md:text-3xl font-bold gaegu-bold text-black border-2 md:border-4 border-black bg-white px-6 py-2 mb-2 md:mb-4 text-center z-20 relative">
          #PROJECTS
        </h1>
        
        <div className="w-full md:w-[80vw] mx-auto flex flex-col md:flex-row gap-4 mb-6 bg-white py-4 z-20 relative">
          <div className="w-full md:w-48">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-3 cursor-pointer border-2 border-black font-mono text-sm bg-white text-black focus:outline-none focus:ring-1 focus:ring-black"
            >
              {CATEGORIES.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
          
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search projects by name, description, or keywords"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 border-2 border-black font-mono text-sm bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-black"
            />
          </div>
        </div>
      </div>

      <div className="w-full md:w-[80vw] mx-auto">
        {filteredProjects.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl font-mono text-gray-600">No projects found matching your search criteria.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center justify-center md:p-2 mb-8 md:mb-16">
            {filteredProjects.map((proj, idx) => (
              <div
                key={idx}
                className="w-full relative flex items-center justify-center group overflow-hidden border-4 border-black"
              >
                <div className="absolute top-2 left-2 md:left-4 z-20 gaegu-bold uppercase text-base md:text-2xl font-bold text-white">
                  {proj.name}
                </div>
                <CachedImage
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-auto object-contain bg-white transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 pointer-events-none bg-black opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10" />
                <div className="absolute top-10 md:top-16 left-2 md:left-4 flex flex-col items-start opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 w-[80%]">
                  <p className="text-base md:text-2xl text-white mb-4 md:mb-8 w-full gaegu-regular">
                    {proj.desc}
                  </p>
                  {/* <div className="flex flex-wrap gap-2 mb-4 md:mb-8">
                    <span className="text-sm md:text-lg text-white gaegu-bold">
                      Tech used:
                    </span>
                    {proj.keywords.slice(0, 4).map((keyword, keywordIdx) => (
                      <span
                        key={keywordIdx}
                        className="inline-block text-base md:text-xl text-white gaegu-regular capitalize"
                      >
                        {keyword}{keywordIdx < Math.min(proj.keywords.length, 4) - 1 ? ',' : ''}
                      </span>
                    ))}
                  </div> */}
                  <a
                    href={proj.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm md:text-base px-2 py-1 md:px-4 md:py-2 bg-white text-black font-mono border-2 border-black hover:bg-black hover:text-white transition-colors duration-200"
                  >
                    View Project
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <PageNumberControl
        page={page}
        totalPages={2}
        onPrev={handlePrevPage}
        onNext={handleNextPage}
        disablePrev={page === 1}
        disableNext={page === 2}
      />
    </motion.div>
  );
};

export default AllProjects;

function PageNumberControl({ page, totalPages, onPrev, onNext, disablePrev, disableNext }: {
  page: number;
  totalPages: number;
  onPrev: () => void;
  onNext: () => void;
  disablePrev: boolean;
  disableNext: boolean;
}) {
  return (
    <div className="flex flex-row items-center justify-center gap-4 mb-8 md:mb-16">
      <button
        onClick={onPrev}
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black bg-white text-2xl font-bold disabled:opacity-30"
        disabled={disablePrev}
        aria-label="Previous Page"
      >
        <TiArrowSortedUp style={{ transform: 'rotate(-90deg)' }} />
      </button>
      <div className="px-6 py-2 border-2 border-black bg-white text-lg gaegu-bold">
        Page {page} of {totalPages}
      </div>
      <button
        onClick={onNext}
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black bg-white text-2xl font-bold disabled:opacity-30"
        disabled={disableNext}
        aria-label="Next Page"
      >
        <TiArrowSortedUp style={{ transform: 'rotate(90deg)' }} />
      </button>
    </div>
  );
} 
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TiArrowSortedUp } from 'react-icons/ti';
import concrete from './assets/concrete.png';
import bento from './assets/bento.png';
import foresty from './assets/Foresty.png';
import finance from './assets/Finance.png';
import aaargh from './assets/Aaargh.png';
import mana from './assets/Mana.png';
import surgeon from './assets/surgeon.png';
import cognify from './assets/cognify.png';
import holostry from './assets/Holostry.png';
import Sentiment from './assets/Sentiment.png';
import Colorizer from './assets/Colorizer.png';
import Revo from './assets/Revo.png';
import knowabout from './assets/knowabout.png';
import payback from './assets/payback.png';
// import downloads from './assets/500.png';
import { AnimatePresence, motion } from 'framer-motion';

const TABS = [
  { key: 'web', label: 'Web Development' },
  { key: 'android', label: 'Android Development' },
  { key: 'python', label: 'Python' },
  { key: 'npm', label: 'NPM Packages' },
  // { key: 'cloud', label: 'Cloud Computing' },
  { key: 'uiux', label: 'UI/UX' },
] as const;

type TabKey = typeof TABS[number]['key'];

type Project = {
  image: string;
  name: string;
  desc: string;
  link: string;
};

const PROJECTS = {
  concrete: {
    image: concrete,
    name: 'Concrete Damage Detector',
    desc: 'Built a YOLO-powered damage detector to spot and segment cracks in concrete — keeping buildings strong, one frame at a time.',
    link: 'https://github.com/MaybeTarun/Concrete-Damage-Detector',
  },
  bento: {
    image: bento,
    name: 'Bento Grid Generator',
    desc: 'Designed a tool that generates bento-style UI layouts with live previews and exportable code templates.',
    link: 'https://bento-gen.vercel.app/',
  },
  foresty: {
    image: foresty,
    name: 'Foresty',
    desc: 'Created a user-friendly platform that helps users easily discover vulnerabilities—such as open ports and other security risks—on their websites, empowering them to secure their online presence.',
    link: 'https://github.com/MaybeTarun/Foresty',
  },
  finance: {
    image: finance,
    name: 'Finance Tracker',
    desc: 'A full-featured MERN stack application for tracking personal finances. Includes intuitive dashboards, transaction management, and uses Clerk for secure user authentication and management.',
    link: 'https://financetracker-neon.vercel.app/',
  },
  aaargh: {
    image: aaargh,
    name: 'Aaargh!!',
    desc: 'A voice-controlled game inspired by Flappy Bird, where you guide the player by making weird noises like "aaaah" or "aargh". Fun, chaotic, and a great way to test your vocal skills!',
    link: 'https://www.maybetarun.in/projects/aaargh', 
  },
  mana: {
    image: mana,
    name: 'Mana House',
    desc: 'A service-based startup that creates 3D projects for brands and agencies. We build games, 3D models, animations, and more to help businesses stand out with immersive digital experiences.',
    link: 'https://www.manahouse.in/', 
  },
  surgeon: {
    image: surgeon,
    name: 'Surgeon Portfolio',
    desc: 'A modern, responsive portfolio website designed and developed for a doctor as part of my freelance work. Highlights expertise, services, and achievements in a clean, professional layout.',
    link: 'https://www.surgeonrkl.com/', 
  },
  cognify: {
    image: cognify,
    name: 'Cognify',
    desc: 'A cloud-based learning platform built with Kotlin and XML that automates and personalizes learning. Integrates OpenAI to make understanding new topics easy and engaging for users.',
    link: 'https://github.com/MaybeTarun/Cognify', 
  },
  holostry: {
    image: holostry,
    name: 'Holostry',
    desc: 'Developed for a 24hr hackathon (MOZOHACK), Holostry lets students visualize 3D holographic models of carbon compounds, making chemistry interactive and easier to understand.',
    link: 'https://github.com/MaybeTarun/Holostry', 
  },
  sentiment: {
    image: Sentiment,
    name: 'Sentiment Analyzer',
    desc: 'A Python application with a Tkinter GUI that uses Amazon Comprehend (via Boto3) to analyze the sentiment of text. Instantly see if your content is positive, negative, or neutral.',
    link: 'https://github.com/MaybeTarun/SentimentAnalyzer', 
  },
  colorizer: {
    image: Colorizer,
    name: 'Image Colorizer',
    desc: 'A web app that colorizes black and white photos using a machine learning model by Rich Zhang. Upload your old photos and bring them to life with vibrant colors!',
    link: 'https://github.com/MaybeTarun/ImageColorizer', 
  },
  revo: {
    image: Revo,
    name: 'Revo',
    desc: 'A custom React project setup tool built on top of Vite. Streamlines your workflow with a clean project structure, pre-configured with Tailwind CSS and Framer Motion.',
    link: 'https://www.npmjs.com/package/create-revo', 
  },
  knowabout: {
    image: knowabout,
    name: 'Know-About',
    desc: 'An NPM package that gives you info about people when you run the command "npx know-about [name]". Currently features a few profiles—DM me on Twitter to add yours!',
    link: 'https://www.npmjs.com/package/know-about', 
  },
  payback: {
    image: payback,
    name: 'Payback-to-ya',
    desc: 'A playful NPM package for web devs: if your client doesn’t pay on time, add Payback-to-ya to their site and watch it slowly disappear over 7 days. ShIk sHaK ShOk!',
    link: 'https://www.npmjs.com/package/payback-to-ya', 
  },
};

const DUMMY_PROJECTS: Record<TabKey, Project[]> = {
  web: [
    PROJECTS.bento,
    PROJECTS.foresty,
    PROJECTS.finance,
    PROJECTS.aaargh,
    PROJECTS.mana,
    PROJECTS.surgeon,
  ],
  android: [PROJECTS.cognify, PROJECTS.holostry],
  python: [PROJECTS.concrete, PROJECTS.sentiment, PROJECTS.colorizer],
  npm: [PROJECTS.revo, PROJECTS.knowabout, PROJECTS.payback],
  // cloud: [PROJECTS.concrete, PROJECTS.bento, PROJECTS.concrete, PROJECTS.bento],
  uiux: [PROJECTS.bento, PROJECTS.concrete, PROJECTS.bento, PROJECTS.concrete, PROJECTS.bento, PROJECTS.concrete],
};

const AllProjects = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [activeTab, setActiveTab] = useState<TabKey>('web');
  const [tabKey, setTabKey] = useState(0);

  const handleTabChange = (tab: TabKey) => {
    setTabKey(prev => prev + 1);
    setActiveTab(tab);
  };

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
        <div className="w-full md:w-[80vw] mx-auto grid grid-cols-2 md:grid-cols-5 gap-2 md:gap-4 mb-2 md:mb-4 bg-white py-2 md:p-2 z-20 relative">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => handleTabChange(tab.key)}
              className={`w-full p-2 border-2 border-black font-mono text-[0.8rem] md:text-base transition-colors duration-200 ${activeTab === tab.key ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab + '-' + tabKey}
          initial={{ y: -1000 }}
          animate={{ y: 0 }}
          exit={{ y: -1200 }}
          transition={{ duration: 0.5 }}
          className="w-full h-full z-0"
        >
          {activeTab === 'web' ? (
            <div className="w-full md:w-[80vw] mx-auto flex flex-col gap-0 md:gap-4 items-center justify-center md:flex-row md:p-2 -mb-24">
              <div className="flex flex-col gap-4 w-full md:w-1/2">
                {DUMMY_PROJECTS[activeTab].slice(0, 3).map((proj, idx) => {
                  let clip = '';
                  if (idx === 0) {
                    clip = 'polygon(0 0, 100% 0, 100% 80%, 5% 100%)';
                  } else if (idx === 1) {
                    clip = 'polygon(5% 20%, 100% 0, 100% 95%, 5% 90%)';
                  } else {
                    clip = 'polygon(5% 10%, 100% 15%, 100% 100%, 0% 100%)';
                  }
                  return (
                    <div
                      key={idx}
                      className={`w-full relative flex items-center justify-center ${idx === 1 ? 'project-shiftL' : ''} ${idx === 2 ? 'project-shiftL2' : ''}`}
                      style={{
                        clipPath: clip,
                        background: 'black',
                        padding: '4px',
                      }}
                    >
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-auto object-contain bg-white cursor-pointer"
                        onClick={() => window.open(proj.link, '_blank')}
                        style={{
                          clipPath: clip,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-4 w-full md:w-1/2 -mt-[4.5rem] md:mt-0">
                {DUMMY_PROJECTS[activeTab].slice(3, 6).map((proj, idx) => {
                  let clip = '';
                  if (idx === 0) {
                    clip = 'polygon(0 0, 100% 0, 95% 100%, 0 70%)';
                  } else if (idx === 1) {
                    clip = 'polygon(0 0, 95% 30%, 95% 90%, 0% 100%)';
                  } else {
                    clip = 'polygon(0 10%, 95% 0, 100% 100%, 0% 100%)';
                  }
                  return (
                    <div
                      key={idx}
                      className={`w-full relative flex items-center justify-center ${idx === 1 ? 'project-shiftR' : ''} ${idx === 2 ? 'project-shiftR2' : ''}`}
                      style={{
                        clipPath: clip,
                        background: 'black',
                        padding: '4px',
                      }}
                    >
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-auto object-contain bg-white cursor-pointer"
                        onClick={() => window.open(proj.link, '_blank')}
                        style={{
                          clipPath: clip,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : activeTab === 'uiux' ? (
            <div className="w-full md:w-[80vw] mx-auto flex flex-col gap-0 md:gap-4 items-center justify-center md:flex-row md:p-2 -mb-24">
              <div className="flex flex-col gap-4 w-full md:w-1/2">
                {DUMMY_PROJECTS[activeTab].slice(0, 3).map((proj, idx) => {
                  let clip = '';
                  if (idx === 0) {
                    clip = 'polygon(0 0, 100% 0, 100% 80%, 0% 100%)';
                  } else if (idx === 1) {
                    clip = 'polygon(0 20%, 100% 0, 100% 95%, 0% 90%)';
                  } else {
                    clip = 'polygon(0 10%, 100% 15%, 100% 100%, 0% 100%)';
                  }
                  return (
                    <div
                      key={idx}
                      className={`w-full relative flex items-center justify-center ${idx === 1 ? 'project-shiftL' : ''} ${idx === 2 ? 'project-shiftL2' : ''}`}
                      style={{
                        clipPath: clip,
                        background: 'black',
                        padding: '4px',
                      }}
                    >
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-auto object-contain bg-white cursor-pointer"
                        onClick={() => window.open(proj.link, '_blank')}
                        style={{
                          clipPath: clip,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-4 w-full md:w-1/2 -mt-[4.5rem] md:mt-0">
                {DUMMY_PROJECTS[activeTab].slice(3, 6).map((proj, idx) => {
                  let clip = '';
                  if (idx === 0) {
                    clip = 'polygon(0 0, 100% 0%, 100% 100%, 0 70%)';
                  } else if (idx === 1) {
                    clip = 'polygon(0 0, 100% 30%, 100% 90%, 0% 100%)';
                  } else {
                    clip = 'polygon(0 10%, 100% 0, 100% 100%, 0% 100%)';
                  }
                  return (
                    <div
                      key={idx}
                      className={`w-full relative flex items-center justify-center ${idx === 1 ? 'project-shiftR' : ''} ${idx === 2 ? 'project-shiftR2' : ''}`}
                      style={{
                        clipPath: clip,
                        background: 'black',
                        padding: '4px',
                      }}
                    >
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-auto object-contain bg-white cursor-pointer"
                        onClick={() => window.open(proj.link, '_blank')}
                        style={{
                          clipPath: clip,
                        }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : activeTab === 'android' ? (
            <div className="w-full md:w-[80vw] mx-auto flex flex-col md:flex-row gap-4 items-center justify-center mb-16">
              {DUMMY_PROJECTS.android.map((proj, idx) => {
                const clip = idx === 0
                  ? 'polygon(5% 0, 100% 0, 100% 90%, 0% 100%)'
                  : 'polygon(0 10%, 100% 0, 95% 100%, 0% 100%)';
                return (
                  <div
                    key={idx}
                    className={`w-full md:w-1/2 relative flex items-center justify-center ${idx === 0 ? 'md:-mb-12' : '-mt-6 md:mt-0'}`}
                    style={{
                      clipPath: clip,
                      background: 'black',
                      padding: '4px',
                    }}
                  >
                    <img
                      src={proj.image}
                      alt={proj.name}
                      className="w-full h-auto object-contain bg-white cursor-pointer"
                      onClick={() => window.open(proj.link, '_blank')}
                      style={{
                        clipPath: clip,
                      }}
                    />
                  </div>
                );
              })}
            </div>
          ) : activeTab === 'python' ? (
            <div className="w-full md:w-[80vw] mx-auto flex flex-col gap-0 md:gap-4 items-center justify-center md:flex-row md:p-2 -mb-32">
              <div className="flex flex-col gap-4 w-full md:w-1/2">
                {(DUMMY_PROJECTS.python as Project[]).slice(0, 1).map((proj: Project, idx: number) => {
                  const clip = 'polygon(0 0, 100% 10%, 100% 100%, 5% 100%)';
                  return (
                    <div
                      key={idx}
                      className="w-full relative flex items-center justify-center project-shiftL3"
                      style={{
                        background: 'black',
                        padding: '4px',
                        clipPath: clip,
                      }}
                    >
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full object-contain bg-white cursor-pointer"
                        onClick={() => window.open(proj.link, '_blank')}
                        style={{ height: '150%', clipPath: clip }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-4 w-full md:w-1/2 -mt-[3rem] md:mt-0">
                {(DUMMY_PROJECTS.python as Project[]).slice(1, 3).map((proj: Project, idx: number) => {
                  const clip = idx === 0
                    ? 'polygon(0 0, 100% 0%, 100% 70%, 0 80%)'
                    : 'polygon(0 30%, 100% 20%, 90% 100%, 0% 100%)';
                  return (
                    <div
                      key={idx}
                      className={`w-full relative flex items-center justify-center ${idx === 1 ? 'project-shiftR3' : 'project-shiftR4'}`}
                      style={{
                        background: 'black',
                        padding: '4px',
                        clipPath: clip,
                      }}
                    >
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-auto object-contain bg-white cursor-pointer"
                        onClick={() => window.open(proj.link, '_blank')}
                        style={{ clipPath: clip }}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ) : activeTab === 'npm' ? (
            <div className="w-full md:w-[80vw] mx-auto flex flex-col-reverse md:flex-row gap-0 md:gap-4 items-center justify-center md:p-2 -mb-32">
              <div className="flex flex-col gap-4 w-full md:w-1/2 -mt-[3rem] md:mt-0">
                {(DUMMY_PROJECTS.npm as Project[]).slice(1, 3).map((proj: Project, idx: number) => {
                  const clip = idx === 0
                    ? 'polygon(0 0, 100% 0%, 100% 70%, 0 80%)'
                    : 'polygon(0 30%, 100% 20%, 100% 100%, 10% 100%)';
                  return (
                    <div
                      key={idx}
                      className={`w-full relative flex items-center justify-center ${idx === 1 ? 'project-shiftR3' : 'project-shiftR4'}`}
                      style={{
                        background: 'black',
                        padding: '4px',
                        clipPath: clip,
                      }}
                    >
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full h-auto object-contain bg-white cursor-pointer"
                        onClick={() => window.open(proj.link, '_blank')}
                        style={{ clipPath: clip }}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-col gap-4 w-full md:w-1/2">
                {(DUMMY_PROJECTS.npm as Project[]).slice(0, 1).map((proj: Project, idx: number) => {
                  const clip = 'polygon(0 0, 95% 10%, 100% 100%, 0% 100%)';
                  return (
                    <div
                      key={idx}
                      className="w-full relative flex items-center justify-center project-shiftL3 overflow-visible"
                      style={{
                        background: 'black',
                        padding: '4px',
                        clipPath: clip,
                      }}
                    >
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="w-full object-contain bg-white cursor-pointer"
                        onClick={() => window.open(proj.link, '_blank')}
                        style={{ height: '150%', clipPath: clip }}
                      />
                      {/* <img className='absolute -top-6 -left-6 h-16 z-50' src={downloads}/> */}
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="w-full md:w-[80vw] mx-auto flex flex-col gap-4 items-center justify-center">
              {(DUMMY_PROJECTS[activeTab as TabKey] as Project[]).map((proj: Project, idx: number) => (
                <img
                  key={idx}
                  src={proj.image}
                  alt={proj.name}
                  className="w-full h-auto object-contain bg-white border border-black rounded-xl cursor-pointer"
                  onClick={() => window.open(proj.link, '_blank')}
                />
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <PageNumberControl />
    </motion.div>
  );
};

export default AllProjects; 

function PageNumberControl() {
  const navigate = useNavigate();
  const location = useLocation();
  const isProjects = location.pathname === '/projects';
  const page = isProjects ? 2 : 1;
  const totalPages = 2;
  const handlePrev = () => {
    if (page === 2) navigate('/', { state: { scrollTo: 'bottom' } });
  };
  const handleNext = () => {
    if (page === 1) navigate('/projects');
  };
  return (
    <div className="flex flex-row items-center justify-center gap-4 mb-16">
      <button
        onClick={handlePrev}
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black bg-white text-2xl font-bold disabled:opacity-30"
        disabled={page === 1}
        aria-label="Previous Page"
      >
        <TiArrowSortedUp style={{ transform: 'rotate(-90deg)' }} />
      </button>
      <div className="px-6 py-2 rounded-lg border-2 border-black bg-white text-lg font-mono font-bold">
        Page {page} of {totalPages}
      </div>
      <button
        onClick={handleNext}
        className="w-10 h-10 flex items-center justify-center rounded-full border-2 border-black bg-white text-2xl font-bold disabled:opacity-30"
        disabled={page === totalPages}
        aria-label="Next Page"
      >
        <TiArrowSortedUp style={{ transform: 'rotate(90deg)' }} />
      </button>
    </div>
  );
} 
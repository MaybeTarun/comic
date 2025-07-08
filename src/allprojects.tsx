import { useState } from 'react';
import concrete from './assets/concrete.png';
import bento from './assets/bento.png';

const TABS = [
  { key: 'web', label: 'Web Development' },
  { key: 'android', label: 'Android Development' },
  { key: 'python', label: 'Python' },
  { key: 'npm', label: 'NPM Packages' },
  { key: 'cloud', label: 'Cloud Computing' },
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
};

const DUMMY_PROJECTS: Record<TabKey, Project[]> = {
  web: [PROJECTS.concrete, PROJECTS.bento, PROJECTS.concrete, PROJECTS.bento, PROJECTS.concrete, PROJECTS.bento],
  android: [PROJECTS.concrete, PROJECTS.bento],
  python: [PROJECTS.concrete, PROJECTS.bento, PROJECTS.concrete],
  npm: [PROJECTS.bento, PROJECTS.concrete, PROJECTS.bento],
  cloud: [PROJECTS.concrete, PROJECTS.bento, PROJECTS.concrete, PROJECTS.bento],
  uiux: [PROJECTS.bento, PROJECTS.concrete, PROJECTS.bento, PROJECTS.concrete, PROJECTS.bento, PROJECTS.concrete],
};

const AllProjects = () => {
  const [activeTab, setActiveTab] = useState<TabKey>('web');

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white p-4">
      <h1 className="w-fit text-2xl md:text-3xl font-bold gaegu-bold text-black border-2 md:border-4 border-black bg-white px-6 py-2 mb-2 md:mb-4 text-center">
        #PROJECTS
      </h1>
      <div className="w-full md:w-[80vw] mx-auto grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 mb-2 md:mb-4 bg-white py-2 md:p-2">
        {TABS.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full p-2 border-2 border-black font-mono text-[0.8rem] md:text-base transition-colors duration-200 ${activeTab === tab.key ? 'bg-black text-white' : 'bg-white text-black hover:bg-black hover:text-white'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {activeTab === 'web' ? (
        <div className="w-full md:w-[80vw] mx-auto flex flex-col gap-0 md:gap-4 items-center justify-center md:flex-row md:p-2">
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
                    className="w-full h-auto object-contain bg-white"
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
                    className="w-full h-auto object-contain bg-white"
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
        <div className="w-full md:w-[80vw] mx-auto flex flex-col gap-0 md:gap-4 items-center justify-center md:flex-row md:p-2">
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
                    className="w-full h-auto object-contain bg-white"
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
                    className="w-full h-auto object-contain bg-white"
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
        <div className="w-full md:w-[80vw] mx-auto flex flex-col md:flex-row gap-4 items-center justify-center">
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
                  className="w-full h-auto object-contain bg-white"
                  style={{
                    clipPath: clip,
                  }}
                />
              </div>
            );
          })}
        </div>
      ) : activeTab === 'cloud' ? (
        <div className="w-full md:w-[80vw] mx-auto flex flex-col gap-0 md:gap-4 items-center justify-center md:flex-row md:p-2">
          <div className="flex flex-col gap-4 w-full md:w-1/2">
            {DUMMY_PROJECTS.cloud.slice(0, 2).map((proj, idx) => {
              let clip = '';
              if (idx === 0) {
                clip = 'polygon(5% 0, 100% 0, 100% 80%, 0% 100%)';
              } else {
                clip = 'polygon(0 30%, 100% 10%, 100% 100%, 5% 100%)';
              }
              return (
                <div
                  key={idx}
                  className={`w-full relative flex items-center justify-center ${idx === 1 ? 'project-shiftR' : ''}`}
                  style={{
                    clipPath: clip,
                    background: 'black',
                    padding: '4px',
                  }}
                >
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-auto object-contain bg-white"
                    style={{
                      clipPath: clip,
                    }}
                  />
                </div>
              );
            })}
          </div>
          <div className="flex flex-col gap-4 w-full md:w-1/2 -mt-[3rem] md:mt-0">
            {DUMMY_PROJECTS.cloud.slice(2, 4).map((proj, idx) => {
              let clip = '';
              if (idx === 0) {
                clip = 'polygon(0 0, 95% 0%, 100% 100%, 0 70%)';
              } else {
                clip = 'polygon(0 0, 100% 30%, 95% 100%, 0% 100%)';
              }
              return (
                <div
                  key={idx}
                  className={`w-full relative flex items-center justify-center ${idx === 1 ? 'project-shiftR' : ''}`}
                  style={{
                    clipPath: clip,
                    background: 'black',
                    padding: '4px',
                  }}
                >
                  <img
                    src={proj.image}
                    alt={proj.name}
                    className="w-full h-auto object-contain bg-white"
                    style={{
                      clipPath: clip,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : activeTab === 'python' ? (
        <div className="w-full md:w-[80vw] mx-auto flex flex-col gap-0 md:gap-4 items-center justify-center md:flex-row md:p-2">
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
                    className="w-full object-contain bg-white"
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
                    className="w-full h-auto object-contain bg-white"
                    style={{ clipPath: clip }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      ) : activeTab === 'npm' ? (
        <div className="w-full md:w-[80vw] mx-auto flex flex-col-reverse md:flex-row gap-0 md:gap-4 items-center justify-center md:p-2">
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
                    className="w-full h-auto object-contain bg-white"
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
                    className="w-full object-contain bg-white"
                    style={{ height: '150%', clipPath: clip }}
                  />
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
              className="w-full h-auto object-contain bg-white border border-black rounded-xl"
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllProjects; 
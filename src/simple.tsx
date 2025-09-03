import { useState, useEffect } from "react";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { LuSun, LuMoon, LuFileSpreadsheet } from "react-icons/lu";
import LogoLoop from "./components/LogoLoop";
import ProjectModal from "./components/ProjectModal";
import mhImg from "./assets/Mana.webp";
import aaImg from "./assets/Aaargh.webp";
import cogImg from "./assets/Cognify.webp";
import bentoImg from "./assets/bento.webp";
import crackImg from "./assets/concrete.webp";
import knowImg from "./assets/knowabout.webp";
import bbIcon from "./assets/bbIcon.png";
import bibIcon from "./assets/bibIcon.png";
import niIcon from "./assets/niIcon.png";
import mhIcon from "./assets/mhIcon.png";
import aaIcon from "./assets/aaIcon.png";
import cogIcon from "./assets/cogIcon.png";
import bentoIcon from "./assets/bentoIcon.png";
import crackIcon from "./assets/crackIcon.png";
import knowIcon from "./assets/knowIcon.png";

const LoadingAnimation = ({ visible }: { visible: boolean }) => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    setAnimationStarted(true);
  }, []);

  const rectangles = Array.from({ length: 4 }, (_, i) => (
    <div
      key={i}
      className={`absolute top-0 bg-black transition-transform duration-[800ms] ease-out ${
        animationStarted ? "translate-y-0" : "-translate-y-full"
      }`}
      style={{
        left: `${(i * 100) / 4}%`,
        width: `${100 / 4}%`,
        height: "100vh",
        transitionDelay: `${i * 300}ms`,
      }}
    />
  ));

  return (
    <div
      className={`fixed inset-0 bg-white transition-opacity duration-1000 pointer-events-none z-10 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {rectangles}
    </div>
  );
};

const Simple = ({ visible }: { visible: boolean }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const skills = [
    { src: "https://skillicons.dev/icons?i=react", href: "https://react.dev/", alt: "ReactJs" },
    { src: "https://skillicons.dev/icons?i=next", href: "https://nextjs.org/", alt: "NextJs" },
    { src: "https://skillicons.dev/icons?i=express", href: "https://expressjs.com/", alt: "ExpressJs" },
    { src: "https://skillicons.dev/icons?i=nodejs", href: "https://nodejs.org/en/", alt: "NodeJs" },
    { src: "https://skillicons.dev/icons?i=firebase", href: "https://firebase.google.com/", alt: "Firebase" },
    { src: "https://skillicons.dev/icons?i=threejs", href: "https://threejs.org/", alt: "ThreeJs" },
    { src: "https://skillicons.dev/icons?i=html", href: "https://developer.mozilla.org/docs/Web/HTML", alt: "HTML" },
    { src: "https://skillicons.dev/icons?i=css", href: "https://developer.mozilla.org/docs/Web/CSS", alt: "CSS" },
    { src: "https://skillicons.dev/icons?i=js", href: "https://developer.mozilla.org/docs/Web/JavaScript", alt: "Javascript" },
    { src: "https://skillicons.dev/icons?i=ts", href: "https://www.typescriptlang.org/", alt: "Typescript" },
    { src: "https://skillicons.dev/icons?i=tailwind", href: "https://tailwindcss.com/", alt: "TailwindCSS" },
    { src: "https://skillicons.dev/icons?i=mysql", href: "https://www.mysql.com/", alt: "MySQL" },
    { src: "https://skillicons.dev/icons?i=react", href: "https://reactnative.dev/", alt: "ReactNative" },
    { src: "https://skillicons.dev/icons?i=kotlin", href: "https://kotlinlang.org/", alt: "Kotlin" },
    { src: "https://skillicons.dev/icons?i=flutter", href: "https://flutter.dev/", alt: "Flutter" },
    { src: "https://skillicons.dev/icons?i=mongodb", href: "https://www.mongodb.com/", alt: "MongoDB" },
    { src: "https://skillicons.dev/icons?i=aws", href: "https://aws.amazon.com/", alt: "AWS" },
    { src: "https://skillicons.dev/icons?i=kubernetes", href: "https://kubernetes.io/", alt: "Kubernetes" },
    { src: "https://skillicons.dev/icons?i=azure", href: "https://azure.microsoft.com/en-in", alt: "Azure" },
    { src: "https://skillicons.dev/icons?i=python", href: "https://www.python.org/", alt: "Python" },
    { src: "https://skillicons.dev/icons?i=cpp", href: "https://isocpp.org/", alt: "C++" },
    { src: "https://skillicons.dev/icons?i=java", href: "https://www.java.com/", alt: "Java" },
    { src: "https://skillicons.dev/icons?i=latex", href: "https://www.latex-project.org/", alt: "Latex" },
    { src: "https://skillicons.dev/icons?i=solidity", href: "https://docs.soliditylang.org/", alt: "Solidity" },
    { src: "https://skillicons.dev/icons?i=figma", href: "https://www.figma.com/", alt: "Figma" },
    { src: "https://skillicons.dev/icons?i=ps", href: "https://www.adobe.com/products/photoshop.html", alt: "Photoshop" },
    { src: "https://skillicons.dev/icons?i=ai", href: "https://www.adobe.com/products/illustrator.html", alt: "Illustrator" },
    { src: "https://skillicons.dev/icons?i=blender", href: "https://www.blender.org/", alt: "Blender" }
  ];

  const projects = [
    {
      slug: "cracks",
      name: "concrete crack detection",
      icon: crackIcon,
      description: "AI-powered computer vision system that automatically detects and analyzes cracks in concrete structures using deep learning models. Built with YOLOv8 architecture for real-time detection and classification.",
      link: "https://github.com/MaybeTarun/Concrete-Damage-Detector",
      image: crackImg,
      tools: ["Ultralytics", "Numpy", "Supervision", "Roboflow"]
    },
    {
      slug: "aaargh",
      name: "aaargh!",
      icon: aaIcon,
      description: "A fun and interactive web game that helps users express their frustrations in a creative way. It is like a voice controlled flappy bird game and the voice is just screaming.",
      link: "https://aaargh.vercel.app/",
      image: aaImg,
      tools: ["React.js", "Javacript", "TailwindCSS"]
    },
    {
      slug: "bento",
      name: "bento grid generator",
      icon: bentoIcon,
      description: "Customizable grid layout generator inspired by the popular bento box design. Allows users to create random responsive grid layouts with just a click.",
      link: "https://bento-gen.vercel.app/",
      image: bentoImg,
      tools: ["React.js", "Typescript", "TailwindCSS"]
    },
    {
      slug: "mana",
      name: "mana house",
      icon: mhIcon,
      description: "Creative agency specializing in 3D modeling, game development, and animation services for clients. Delivers high-quality visual content and interactive experiences across various industries.",
      link: "https://www.manahouse.in/",
      image: mhImg,
      tools: ["React.js", "Typescript", "TailwindCSS"]
    },
    {
      slug: "cognify",
      name: "cognify",
      icon: cogIcon,
      description: "AI-powered Android application that provides users with various tested learning techniques and methodologies. Features intelligent study plans, progress tracking, and personalized recommendations to help users learn and grasp complex topics more effectively.",
      link: "https://github.com/MaybeTarun/Cognify",
      image: cogImg,
      tools: ["Kotlin", "HTML", "CSS", "OpenAI"]
    },
    {
      slug: "know-about",
      name: "know-about NPM package",
      icon: knowIcon,
      description: "Utility NPM package that provides comprehensive information about people using just a simple command. Features a growing database of developer profiles and allows community contributions. If you want to add your own profile, feel free to reach out to me.",
      link: "https://www.npmjs.com/package/know-about",
      image: knowImg,
      tools: ["Node.js", "Javacript"]
    }
  ];

  const experience = [
    {
      name: "freelancing",
      icon: null
    },
    {
      name: "build in bharat",
      icon: bibIcon
    },
    {
      name: "mana house",
      icon: mhIcon
    },
    {
      name: "betbolt",
      icon: bbIcon
    },
    {
      name: "neuronexus innovations",
      icon: niIcon
    }
  ];

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const openModal = (project: typeof projects[0]) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div 
      className={`w-full min-h-screen flex justify-center items-center transition-all duration-1000 px-4 ${
        visible ? "opacity-100" : "opacity-0"
      } ${
        isDarkTheme ? "bg-black" : "bg-white"
      }`}
    >
      <div className="w-full md:w-[650px] h-full flex flex-col bg-transparent">

        <div className="flex justify-between items-center px-0 md:px-6 py-4 transition-colors duration-300">
          <button 
            onClick={() => window.location.href = '/'}
            className={`flex justify-center items-center gap-1 hover:opacity-70 transition-opacity duration-300 font-mono ${
              isDarkTheme ? "text-white" : "text-black"
            }`}
          >
            <FaArrowRightToBracket className="text-base scale-x-[-1] -mt-[2px]" />
            <span>back</span>
          </button>
          
          <div className="flex gap-2">
            <button 
              onClick={() => window.location.href = '/resume'}
              className={`hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-600 p-2 rounded-md ${
                isDarkTheme ? "text-white" : "text-black"
              }`}
            >
              <LuFileSpreadsheet className="text-sm" />
            </button>
            
            <button 
              onClick={toggleTheme}
              className={`hover:scale-105 transition-all duration-300 cursor-pointer border border-gray-600 p-2 rounded-md ${
                isDarkTheme ? "text-white" : "text-black"
              }`}
            >
              {isDarkTheme ? <LuSun className="text-sm border-gray-600" /> : <LuMoon className="text-sm border-gray-300" />}
            </button>
          </div>
        </div>

        <div className="flex-1 md:px-6">

          <div className="space-y-2 mb-4">
            <h1 className={`text-5xl md:text-7xl leading-[45px] md:leading-[60px] tracking-tight font-bold font-mono transition-colors duration-300 ${
              isDarkTheme ? "text-white" : "text-black/90"
            }`}>
              hey, i'm<br/>tarun gupta
            </h1>
            <p className={`text-xl md:text-3xl font-mono transition-colors duration-300 ${
              isDarkTheme ? "text-white/80" : "text-black/70"
            }`}>
              developer / engineer
            </p>
          </div>

          <button onClick={() => window.location.href = 'https://freelance.maybetarun.in/'} className="flex items-center gap-2 border border-green-500 w-fit px-4 py-1 rounded-full cursor-pointer bg-green-500/10 hover:bg-green-500/20">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className={`text-xs font-mono transition-colors duration-300 ${
              isDarkTheme ? "text-white" : "text-black"
            }`}>
              available for work
            </span>
          </button>

          <p className={`text-base font-mono leading-relaxed transition-colors duration-300 mt-4 ${
            isDarkTheme ? "text-white/80" : "text-black/70"
          }`}>
            cracked at almost everything <br className="block md:hidden"/>- you name it i build it.
          </p>

          <div className="">
            <LogoLoop 
              logos={skills}
              speed={60}
              direction="left"
              logoHeight={20}
              gap={12}
              showNames={true}
              isDarkTheme={isDarkTheme}
              pauseOnHover={true}
              fadeOut={false}
              className="py-4"
            />
          </div>

          <div className="space-y-2 mb-4 -mt-2">
            <h2 className={`text-lg font-mono transition-colors duration-300 mt-2 ${
              isDarkTheme ? "text-white/90" : "text-black/90"
            }`}>
              some of my projects -
            </h2>
            <div className="flex flex-wrap gap-2">
              {projects.map((project) => (
                <div 
                  key={project.slug}
                  onClick={() => openModal(project)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold text-sm font-mono transition-colors duration-300 cursor-pointer hover:scale-105 ${
                    isDarkTheme 
                      ? "bg-[#2f2f2f] text-white/80 hover:bg-[#3a3a3a]"
                      : "bg-[#f3f4f6] text-[#364153] hover:bg-[#e5e7eb]"
                  }`}
                >
                  <img src={project.icon} alt={project.name} className="w-6 h-6" />
                  <span>{project.slug}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2 mb-6">
            <h2 className={`text-lg font-mono transition-colors duration-300 mt-2 ${
              isDarkTheme ? "text-white/90" : "text-black/90"
            }`}>
              where i have worked so far -
            </h2>
            <div className={`text-sm font-mono transition-colors duration-300 flex items-center flex-wrap ${
              isDarkTheme ? "text-white/70" : "text-black/70"
            }`}>
              {experience.map((company, index) => (
                <span key={company.name} className="flex items-center gap-1 leading-6 md:leading-7">
                  {company.icon && <img src={company.icon} alt={company.name} className="w-5 md:w-6 h-5 md:h-6" />}
                  <span>{company.name}</span>
                  {index < experience.length - 1 && <span className="mx-1">,</span>}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 mb-1">
            <p className={`text-base font-mono transition-colors duration-300 ${
              isDarkTheme ? "text-white/90" : "text-black/90"
            }`}>
              open to opportunities, projects, gifts or just connecting.
            </p>
            <p className={`text-base font-mono transition-colors duration-300 ${
              isDarkTheme ? "text-white/90" : "text-black/90"
            }`}>
              feel free to reach out — <a href="mailto:tarun234.tg@gmail.com"><span className="decoration-1 underline-offset-2 cursor-pointer underline">send an email</span></a>
            </p>
          </div>

          <div className="flex justify-start items-center my-2">
            <div className="flex gap-4">
              <a 
                href="https://twitter.com/maybetarun" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-sm font-mono cursor-pointer hover:opacity-100 transition-opacity duration-100 ${
                  isDarkTheme ? "text-white opacity-90" : "text-black opacity-90"
                }`}
              >
                x
              </a>
              <a 
                href="https://linkedin.com/in/maybetarun" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-sm font-mono cursor-pointer hover:opacity-100 transition-opacity duration-100 ${
                  isDarkTheme ? "text-white opacity-90" : "text-black opacity-90"
                }`}
              >
                linkedin
              </a>
              <a 
                href="https://github.com/maybetarun" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-sm font-mono cursor-pointer hover:opacity-100 transition-opacity duration-100 ${
                  isDarkTheme ? "text-white opacity-90" : "text-black opacity-90"
                }`}
              >
                github
              </a>
              <a 
                href="/resume" 
                target="_blank" 
                rel="noopener noreferrer"
                className={`text-sm font-mono cursor-pointer hover:opacity-100 transition-opacity duration-100 ${
                  isDarkTheme ? "text-white opacity-90" : "text-black opacity-90"
                }`}
              >
                resume
              </a>
            </div>
          </div>

        </div>
      </div>

      {/* Project Modal */}
      <ProjectModal 
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
        isDarkTheme={isDarkTheme}
      />
    </div>
  );
};

const Portfolio = () => {
  const [showPage, setShowPage] = useState(false);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    const pageTimer = setTimeout(() => setShowPage(true), 1000);
    const loadingTimer = setTimeout(() => setShowLoading(false), 2000);

    return () => {
      clearTimeout(pageTimer);
      clearTimeout(loadingTimer);
    };
  }, []);

  return (
    <>
      <Simple visible={showPage} />
      <LoadingAnimation visible={showLoading} />
    </>
  );
};

export default Portfolio;

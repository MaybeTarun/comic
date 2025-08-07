import { useState, useEffect } from "react";
import { FaLinkedin, FaXTwitter, FaGithub, FaEnvelope } from "react-icons/fa6";
import skill from './assets/skill.webp';
import DarkVeil from "./components/Backgrounds/DarkVeil/DarkVeil";
import bug from './assets/bug.webp';
import TextType from "./components/TextAnimations/TextType/TextType";

const Tooltip = ({
  children,
  text,
  variant = "right",
}: {
  children: React.ReactNode;
  text: string;
  variant?: "right" | "left";
}) => {
  const [show, setShow] = useState(false);

  const boxPosition =
    variant === "right"
      ? "top-full mt-2 left-2/3"
      : "top-full mt-2 right-1/3";

  const trianglePosition =
    variant === "right"
      ? "absolute -top-1 left-[10%] w-3 h-3 bg-[#1e1e1e] rotate-45"
      : "absolute -top-1 right-[10%] w-3 h-3 bg-[#1e1e1e] rotate-45";

  return (
    <span className="relative inline-block">
      <span
        onMouseEnter={() => setShow(true)}
        onMouseLeave={() => setShow(false)}
        className="underline-offset-2 underline cursor-pointer"
      >
        {children}
      </span>

      {show && (
        <div
          className={`absolute ${boxPosition} bg-[#1e1e1e] text-white text-sm px-3 py-2 rounded-md z-[100] whitespace-nowrap font-mono`}
        >
          <div className={trianglePosition} />
          {text}
        </div>
      )}
    </span>
  );
};

const LoadingAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    setAnimationStarted(true);
    
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1400);

    return () => {
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  const rectangles = Array.from({ length: 4 }, (_, i) => (
    <div
      key={i}
      className={`absolute top-0 bg-black transition-transform duration-[800ms] ease-out ${
        animationStarted ? 'translate-y-0' : '-translate-y-full'
      }`}
      style={{
        left: `${(i * 100) / 4}%`,       
        width: `${100 / 4}%`,            
        height: '100vh',                
        transitionDelay: `${i * 300}ms`,
      }}
    />
  ));

  return (
    <div className="fixed inset-0 z-[9999] bg-white">
      {rectangles}
    </div>
  );
};

const Simple = () => (
  <div className="h-screen w-screen overflow-hidden text-white select-text relative alegreya-regular animate-fadeIn">
    <div className="absolute inset-0 z-0">
      <DarkVeil/>
    </div>
    
    <div className="relative z-50 h-full w-full max-w-[700px] mx-auto flex flex-col p-2 sm:p-4">

      <div className="flex justify-between items-center mb-8">
        <a 
          href="/" 
          className="w-8 md:w-10 h-8 md:h-10 cursor-pointer hover:scale-105 transition-transform duration-100"
        >
          <img 
            src={bug} 
            alt="bug logo" 
            className="w-full h-full object-contain" 
          />
        </a>
        <a 
          href="https://drive.google.com/file/d/15owSoVRzK790PvYEza7jn6GHOUDquUAf/view" 
          target="_blank" 
          rel="noopener noreferrer"
          className="text-sm text-white hover:text-black hover:bg-white transition-colors border border-white px-4 py-2"
        >
          View Resume
        </a>
      </div>

      <div className="mb-8 text-center">
        <h2 className="text-4xl sm:text-5xl font-bold mb-1">Tarun Gupta</h2>
        <p className="text-white/70 text-base sm:text-2xl leading-relaxed">
          <a href="/projects">
            <Tooltip text="certified by my projects" variant="left">
              Software Developer
            </Tooltip>
          </a>
          {" "}and{" "}
          <a 
            href="https://www.credly.com/badges/712255f1-8bbc-4878-b80a-8282844ec96f/public_url" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <Tooltip text="certified by AWS" variant="right">
              Cloud Solutions Architect
            </Tooltip>
          </a>
          <br />
          <span className="text-sm sm:text-xl">&lt; proficient in <TextType text={["react.js", "typescript", "aws", "python", "everything tbh"]} cursorCharacter="_"/>&gt;</span>
        </p>
      </div>

      <div className="mb-6 text-center">
        <p className="text-white text-sm sm:text-lg mb-2">
          reach out to me on any of the following platforms
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-xl sm:text-2xl text-white/70">
          <a 
            href="https://linkedin.com/in/maybetarun" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white cursor-pointer transition-colors"
          >
            <FaLinkedin />
          </a>
          <a 
            href="https://twitter.com/maybetarun" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white cursor-pointer transition-colors"
          >
            <FaXTwitter />
          </a>
          <a 
            href="https://github.com/maybetarun" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:text-white cursor-pointer transition-colors"
          >
            <FaGithub />
          </a>
          <a 
            href="mailto:tarun234.tg@gmail.com"
            className="hover:text-white cursor-pointer transition-colors"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center min-h-0 mt-2">
        <div className="relative w-full h-full flex items-start justify-center">
          <img 
            src={skill}
            alt="skill diagram" 
            className="w-full h-auto max-h-full object-contain select-none"
          />
        </div>
      </div>

    </div>
  </div>
);


const Portfolio = () => {
  const [loading, setLoading] = useState(true);

  const handleAnimationComplete = () => {
    setLoading(false);
  };

  return (
    <>
      {loading && <LoadingAnimation onComplete={handleAnimationComplete} />}
      {!loading && <Simple />}
    </>
  );
};

export default Portfolio;
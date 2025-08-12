import { useState, useEffect } from "react";
import { FaLinkedin, FaXTwitter, FaGithub, FaEnvelope } from "react-icons/fa6";
import skill from './assets/skill.webp';
import experience from './assets/experience.webp';
import DarkVeil from "./components/Backgrounds/DarkVeil/DarkVeil";
import bug from './assets/bug.webp';
import TextType from "./components/TextAnimations/TextType/TextType";

const Tooltip = ({
  children,
  text,
}: {
  children: React.ReactNode;
  text: string;
}) => {
  const [show, setShow] = useState(false);

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
          className="absolute top-full mt-2 left-1/3 bg-[#111111] text-white text-sm px-3 py-2 rounded-md z-[100] whitespace-nowrap font-mono"
        >
          <div className="absolute -top-1 left-[10%] w-3 h-3 bg-[#111111] rotate-45" />
          {text}
        </div>
      )}
    </span>
  );
};

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
      className={`fixed inset-0 bg-white transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      {rectangles}
    </div>
  );
};

const Simple = ({ visible }: { visible: boolean }) => {
  return (
    <div
      className={`min-h-dvh w-dvw bg-black text-white select-text relative alegreya-regular transition-opacity duration-1000 ${
        visible ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="fixed inset-0 z-0 opacity-70">
        <DarkVeil speed={1} />
      </div>

      <nav className="fixed top-0 left-0 w-full z-50 bg-transparent px-4 py-3">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <a
            href="/"
            className="w-8 md:w-10 h-8 md:h-10 cursor-pointer hover:scale-105 transition-transform"
          >
            <img src={bug} alt="bug logo" className="w-full h-full object-contain" />
          </a>
          <a
            href="https://drive.google.com/file/d/15owSoVRzK790PvYEza7jn6GHOUDquUAf/view"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm sm:text-base hover:text-black hover:bg-white transition-colors border border-white px-4 py-2"
          >
            View Resume
          </a>
        </div>
      </nav>

      <main className="relative z-10 flex flex-col sm:flex-row items-center justify-center sm:gap-8 px-4 sm:px-8 pt-[80px] min-h-dvh max-w-[1400px] mx-auto">
        
        <div className="flex flex-col items-center text-center w-full max-w-lg flex-shrink-0">
          <div className="mb-6">
            <h2 className="text-4xl sm:text-5xl font-bold mb-1">Tarun Gupta</h2>
            <p className="text-white/90 text-base sm:text-xl leading-relaxed flex flex-wrap gap-2 justify-center">
              <a href="/projects">
                <Tooltip text="certified by my projects">
                  Software Developer
                </Tooltip>
              </a>
              and
              <a
                href="https://www.credly.com/badges/712255f1-8bbc-4878-b80a-8282844ec96f/public_url"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Tooltip text="certified by AWS">
                  Cloud Solutions Architect
                </Tooltip>
              </a>
            </p>
            <p className="text-sm sm:text-xl text-white/90">
              &lt; proficient in{" "}
              <TextType
                text={["react.js", "typescript", "aws", "python", "everything tbh"]}
                cursorCharacter="_"
              />
              &gt;
            </p>

            <div className="mt-4 sm:mt-6">
              <p className="text-sm sm:text-xl mb-2">
                reach out to me on any of the following platforms
              </p>
              <div className="flex gap-6 text-xl sm:text-2xl text-white/70 justify-center">
                <a href="https://linkedin.com/in/maybetarun" target="_blank" className="hover:text-white hover:-translate-y-1 transition-all duration-200">
                  <FaLinkedin />
                </a>
                <a href="https://twitter.com/maybetarun" target="_blank" className="hover:text-white hover:-translate-y-1 transition-all duration-200">
                  <FaXTwitter />
                </a>
                <a href="https://github.com/maybetarun" target="_blank" className="hover:text-white hover:-translate-y-1 transition-all duration-200">
                  <FaGithub />
                </a>
                <a href="mailto:tarun234.tg@gmail.com" className="hover:text-white hover:-translate-y-1 transition-all duration-200">
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>

          <div className="w-full max-w-xl mt-0 sm:mt-12">
            <img
              src={experience}
              alt="Experience"
              className="w-full h-auto object-contain select-none"
            />
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center w-full max-w-xl mb-6 sm:mb-0">
          <img
            src={skill}
            alt="skill diagram"
            className="w-full h-auto max-h-[70vh] object-contain select-none"
          />
        </div>
      </main>
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

import test from './assets/test.jpg';
import flyingTarun from './assets/flyingTarun.png';
import { SpeechBox, SpeechBoxR, SpeechBoxL, SpeechBoxLL, SpeechBoxSolid } from './components/SpeechBox';
import { AvatarCircles } from "./components/AvatarCircles";
import skillbg from './assets/skillbg.jpg';
import concrete from './assets/concrete.png';
import cognify from './assets/cognify.png';
import bento from './assets/bento.png';
import aaargh from './assets/img4.mp4';
import arrow from './assets/arrow.png';
import link from './assets/link.svg';
import LinkedinLogo from './assets/LinkedinLogo.svg';
import XLogo from './assets/XLogo.svg';
import GithubLogo from './assets/GithubLogo.svg';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { useEffect, useState } from 'react';
import Lenis from '@studio-freight/lenis';

const webDevAvatars = [
  { imageUrl: "https://skillicons.dev/icons?i=react", profileUrl: "https://react.dev/" },
  { imageUrl: "https://skillicons.dev/icons?i=next", profileUrl: "https://nextjs.org/" },
  { imageUrl: "https://skillicons.dev/icons?i=express", profileUrl: "https://expressjs.com/" },
  { imageUrl: "https://skillicons.dev/icons?i=nodejs", profileUrl: "https://nodejs.org/en/" },
  { imageUrl: "https://skillicons.dev/icons?i=firebase", profileUrl: "https://firebase.google.com/" },
  { imageUrl: "https://skillicons.dev/icons?i=threejs", profileUrl: "https://threejs.org/" },
  { imageUrl: "https://skillicons.dev/icons?i=html", profileUrl: "https://developer.mozilla.org/docs/Web/HTML" },
  { imageUrl: "https://skillicons.dev/icons?i=css", profileUrl: "https://developer.mozilla.org/docs/Web/CSS" },
  { imageUrl: "https://skillicons.dev/icons?i=js", profileUrl: "https://developer.mozilla.org/docs/Web/JavaScript" },
  { imageUrl: "https://skillicons.dev/icons?i=ts", profileUrl: "https://www.typescriptlang.org/" },
  { imageUrl: "https://skillicons.dev/icons?i=tailwind", profileUrl: "https://tailwindcss.com/" },
  { imageUrl: "https://skillicons.dev/icons?i=mysql", profileUrl: "https://www.mysql.com/" },
];

const androidDevAvatars = [
  { imageUrl: "https://skillicons.dev/icons?i=kotlin", profileUrl: "https://kotlinlang.org/" },
  { imageUrl: "https://skillicons.dev/icons?i=flutter", profileUrl: "https://flutter.dev/" },
  { imageUrl: "https://skillicons.dev/icons?i=mongodb", profileUrl: "https://www.mongodb.com/" },
];

const cloudAvatars = [
  { imageUrl: "https://skillicons.dev/icons?i=aws", profileUrl: "https://aws.amazon.com/" },
  { imageUrl: "https://skillicons.dev/icons?i=kubernetes", profileUrl: "https://kubernetes.io/" },
  { imageUrl: "https://skillicons.dev/icons?i=azure", profileUrl: "https://azure.microsoft.com/en-in" },
];

const programmingAvatars = [
  { imageUrl: "https://skillicons.dev/icons?i=python", profileUrl: "https://www.python.org/" },
  { imageUrl: "https://skillicons.dev/icons?i=cpp", profileUrl: "https://isocpp.org/" },
  { imageUrl: "https://skillicons.dev/icons?i=java", profileUrl: "https://www.java.com/" },
  { imageUrl: "https://skillicons.dev/icons?i=latex", profileUrl: "https://www.latex-project.org/" },
  { imageUrl: "https://skillicons.dev/icons?i=solidity", profileUrl: "https://docs.soliditylang.org/" },
];

const uiuxAvatars = [
  { imageUrl: "https://skillicons.dev/icons?i=figma", profileUrl: "https://www.figma.com/" },
  { imageUrl: "https://skillicons.dev/icons?i=ps", profileUrl: "https://www.adobe.com/products/photoshop.html" },
  { imageUrl: "https://skillicons.dev/icons?i=ai", profileUrl: "https://www.adobe.com/products/illustrator.html" },
  { imageUrl: "https://skillicons.dev/icons?i=blender", profileUrl: "https://www.blender.org/" },
];

function App() {
  const [showSpeech, setShowSpeech] = useState(false);
  const { scrollY } = useViewportScroll();
  const imgParallaxY = useTransform(scrollY, value => -value * 0.09);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const timer = setTimeout(() => {
      document.body.style.overflow = '';
      setShowSpeech(true);
    }, 2000);
    return () => {
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2,
      smoothWheel: true,
      wheelMultiplier: 1.0, 
      touchMultiplier: 2.0,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="w-full h-full bg-white flex items-center justify-center flex-col">
      {/* page 1 */}
      <section className="relative w-[60vw] max-w-[90vw] mt-16" aria-label="Introduction">
        <motion.img
          src={test}
          alt="Tarun Gupta - Full Stack Developer Portfolio Introduction"
          className="border-4 border-black w-full h-auto"
          loading="lazy"
          initial={{ scale: 2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        />
        {showSpeech && (
          <SpeechBoxR className="absolute -left-[10%] -bottom-16">
            Since birth, Tarun showed signs of becoming<br/>something more than human... <span className="gaegu-bold text-4xl">a Developer.</span>
          </SpeechBoxR>
        )}
      </section>

      {/* page 2 */}
      <section className="relative w-full h-[30vh] mt-60" aria-label="Development Journey">
        <img
          src={test}
          alt="Tarun Gupta's development journey and training in coding"
          className="border-y-4 border-black w-full h-full object-cover"
          loading="lazy"
        />
        <SpeechBoxL className="absolute -bottom-28 right-16">
          He trained in the sacred arts of code,<br/>logic, and late-night debugging.
        </SpeechBoxL>
      </section>

      <section className="relative w-full h-[45vh] mt-40 mb-16" aria-label="Developer Skills">
        <img
          src={test}
          alt="Tarun Gupta showcasing developer skills and expertise"
          className="border-y-4 border-black w-full h-full object-cover relative"
          loading="lazy"
        />
        <img src={flyingTarun} alt="Tarun Gupta flying character illustration" className="absolute h-36 w-auto -rotate-12 top-0 left-8" loading="lazy" />
        <div className='absolute -rotate-[20deg] top-[40%] left-[25%] text-6xl gaegu-regular text-[#FFD403]'><span className=''>W</span><span className='text-7xl'>O</span><span className='text-8xl'>O</span><span className='text-8xl'>!</span></div>
      </section>

      {/* page 3 */}
      <section className="w-full h-fit flex items-center justify-center bg-white my-16" aria-label="Technical Skills">
          <div className="flex-1 flex items-center justify-center -mt-32 relative">
            <SpeechBox className="relative">
              his arsenal only grew bigger
            </SpeechBox>
            <img 
              src={arrow} 
              alt="Arrow pointing to skills section" 
              className="absolute -bottom-20 right-8 w-32 h-auto rotate-45"
              loading="lazy"
            />
          </div>
          <div className="flex-1 flex items-center justify-end">
            <div
              className="w-full border-4 border-r-0 border-black p-6 ml-20 flex flex-col gap-6 bg-white relative"
              style={{
                backgroundImage: `url(${skillbg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            >
              <h2 className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white border-2 border-black px-8 py-2 text-2xl font-bold gaegu-bold">
                #SKILLS
              </h2>
              <div className="flex items-center gap-4 border-2 border-black px-8 py-4 bg-white text-black text-left text-xl font-mono capitalize rounded-xl">
                <span className="flex-1">web development</span>
                <AvatarCircles avatarUrls={webDevAvatars} numPeople={99} />
              </div>
              <div className="flex items-center gap-4 border-2 border-black px-8 py-4 bg-white text-black text-left text-xl font-mono capitalize rounded-xl">
                <span className="flex-1">android development</span>
                <AvatarCircles avatarUrls={androidDevAvatars} numPeople={99} />
              </div>
              <div className="flex items-center gap-4 border-2 border-black px-8 py-4 bg-white text-black text-left text-xl font-mono capitalize rounded-xl">
                <span className="flex-1">cloud computing</span>
                <AvatarCircles avatarUrls={cloudAvatars} numPeople={99} />
              </div>
              <div className="flex items-center gap-4 border-2 border-black px-8 py-4 bg-white text-black text-left text-xl font-mono capitalize rounded-xl">
                <span className="flex-1">programming languages</span>
                <AvatarCircles avatarUrls={programmingAvatars} numPeople={99} />
              </div>
              <div className="flex items-center gap-4 border-2 border-black px-8 py-4 bg-white text-black text-left text-xl font-mono capitalize rounded-xl">
                <span className="flex-1">ui/ux designing</span>
                <AvatarCircles avatarUrls={uiuxAvatars} numPeople={99} />
              </div>
            </div>
        </div>
      </section>

      {/* page 4 */}
      <section className="w-full h-fit flex items-center justify-start bg-white my-16" aria-label="Project Journey">
        <div className="w-1/2 flex items-center justify-center relative">
          <img
            src={test}
            alt="Tarun Gupta embarking on development projects and challenges"
            className="relative w-full h-auto border-4 border-l-0 border-black"
            loading="lazy"
          />
          <SpeechBoxLL className="absolute top-[20rem] -right-[50%]">
            With his powers now honed, Tarun<br/>sets off on <span className='gaegu-bold'>quests</span> that tests both<br/>his logic and caffeine limits.
          </SpeechBoxLL>
        </div>
        <div className="w-1/2"></div>
      </section>

            {/* page 5 */}
      <section className="w-full min-h-screen flex items-center justify-center bg-white my-32 relative" aria-label="Portfolio Projects">
        <div className="flex flex-row gap-8">
          <div className="flex flex-col gap-8 mt-12 relative">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 z-10">
              <h2 className="text-3xl font-bold gaegu-bold text-black border-4 border-black bg-white px-6 py-2">
                #QUESTS
              </h2>
            </div>
            <article>
              <div className="relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-10 h-10 bg-black pointer-events-none" />
                  <div
                    className="absolute top-0 right-0 pointer-events-none"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '40px solid #fff', 
                      borderLeft: '40px solid transparent',
                    }}
                  />
                </div>
                <a
                  href="https://github.com/MaybeTarun/Concrete-Damage-Detector"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-0 right-0 z-30"
                  aria-label="View Concrete Damage Detector project on GitHub"
                >
                  <img
                    src={link}
                    alt="Link to Concrete Damage Detector project"
                    className="w-10 h-10"
                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                    loading="lazy"
                  />
                </a>
                <SpeechBoxSolid className="absolute left-1/2 bottom-4 -translate-x-1/2 w-2/3 px-4 py-2 z-10 m-0 text-xs font-mono text-center transition duration-500 group-hover:translate-y-[150%]">
                  <h3 className="font-bold font-mono text-base capitalize text-center">Concrete Damage Detector</h3>
                  <p className="text-sm font-mono normal-case text-justify">Built a YOLO-powered damage detector to spot and segment cracks in concrete — keeping buildings strong, one frame at a time.</p>
                </SpeechBoxSolid>
                <div className="max-w-[40vw] h-auto border-4 border-black overflow-hidden">
                  <img
                    src={concrete}
                    alt="Concrete Damage Detector - AI-powered crack detection system for infrastructure monitoring"
                    className="w-full h-auto transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            </article>
                        <article>
              <div className="relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-10 h-10 bg-black pointer-events-none" />
                  <div
                    className="absolute top-0 right-0 pointer-events-none"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '40px solid #fff', 
                      borderLeft: '40px solid transparent',
                    }}
                  />
                </div>
                <a
                  href="https://bento-gen.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-0 right-0 z-30"
                  aria-label="View Bento Grid Generator project"
                >
                  <img
                    src={link}
                    alt="Link to Bento Grid Generator project"
                    className="w-10 h-10"
                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                    loading="lazy"
                  />
                </a>
                <SpeechBoxSolid className="absolute left-1/2 bottom-4 -translate-x-1/2 w-2/3 px-4 py-2 z-10 m-0 text-xs font-mono text-center transition duration-500 group-hover:translate-y-[150%]">
                  <h3 className="font-bold font-mono text-base capitalize text-center">Bento Grid Generator</h3>
                  <p className="text-sm font-mono normal-case text-justify">Designed a tool that generates bento-style UI layouts with live previews and exportable code templates.</p>
                </SpeechBoxSolid>
                <div className="max-w-[40vw] h-auto border-4 border-black overflow-hidden">
                  <img
                    src={bento}
                    alt="Bento Grid Generator - UI layout tool for creating bento-style designs with live previews"
                    className="w-full h-auto transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            </article>
          </div>
                    <div className="flex flex-col gap-8 -mt-12 relative">
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 z-10">
              <a 
                href="https://maybetarun.in/projects" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black text-white border-4 border-black px-6 py-3 font-bold gaegu-regular hover:bg-white hover:text-black transition-colors duration-300 text-xl whitespace-nowrap inline-block"
              >
                Check out more quests/projects
              </a>
            </div>
            <article>
              <div className="relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-10 h-10 bg-black pointer-events-none" />
                  <div
                    className="absolute top-0 right-0 pointer-events-none"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '40px solid #fff',
                      borderLeft: '40px solid transparent',
                    }}
                  />
                </div>
                <a
                  href="https://github.com/MaybeTarun/Cognify"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-0 right-0 z-30"
                  aria-label="View Cognify project on GitHub"
                >
                  <img
                    src={link}
                    alt="Link to Cognify project"
                    className="w-10 h-10"
                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                    loading="lazy"
                  />
                </a>
                <SpeechBoxSolid className="absolute left-1/2 bottom-4 -translate-x-1/2 w-2/3 px-4 py-2 z-10 m-0 text-xs font-mono text-center transition duration-500 group-hover:translate-y-[150%]">
                  <h3 className="font-bold font-mono text-base capitalize text-center">Cognify</h3>
                  <p className="text-sm font-mono normal-case text-justify">Developed an Android learning platform with Kotlin and OpenAI to simplify how users learn and understand new concepts.</p>
                </SpeechBoxSolid>
                <div className="max-w-[40vw] h-auto border-4 border-black overflow-hidden">
                  <img
                    src={cognify}
                    alt="Cognify - Android learning platform with AI-powered concept explanation"
                    className="w-full h-auto transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
              </div>
            </article>
            <article>
              <div className="relative group overflow-hidden">
                <div className="absolute top-0 right-0 w-10 h-10 pointer-events-none">
                  <div className="absolute top-0 right-0 w-10 h-10 bg-black pointer-events-none" />
                  <div
                    className="absolute top-0 right-0 pointer-events-none"
                    style={{
                      width: 0,
                      height: 0,
                      borderTop: '40px solid #fff', 
                      borderLeft: '40px solid transparent',
                    }}
                  />
                </div>
                <a
                  href="https://aaargh.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="absolute top-0 right-0 z-30"
                  aria-label="View AAARGH!! game project"
                >
                  <img
                    src={link}
                    alt="Link to AAARGH!! game project"
                    className="w-10 h-10"
                    style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
                    loading="lazy"
                  />
                </a>
                <SpeechBoxSolid className="absolute left-1/2 bottom-4 -translate-x-1/2 w-2/3 px-4 py-2 z-10 m-0 text-xs font-mono text-center transition duration-500 group-hover:translate-y-[150%]">
                  <h3 className="font-bold font-mono text-base capitalize text-center">AAARGH!!</h3>
                  <p className="text-sm font-mono normal-case text-justify">Built a game where screaming 'aaaargh' actually makes you fly — no tapping, just weird noises.</p>
                </SpeechBoxSolid>
                <video
                  src={aaargh}
                  className="max-w-[40vw] h-auto border-4 border-black"
                  controls
                  muted
                  playsInline
                  title="AAARGH!! - Voice-controlled flying game demonstration"
                />
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* page 6 */}
      <section className="w-full h-[60vh] mt-32 mb-16 relative">
        <img
          src={test}
          alt="Tarun Gupta's development journey and achievements"
          className="w-full h-full object-cover border-y-4 border-black"
          loading="lazy"
        />
        <SpeechBoxR className="absolute right-[20%] -bottom-[28rem]">
          Now, he's bored and on the<br/>lookout for the next challenge.
        </SpeechBoxR>
        <motion.img
          style={{ y: imgParallaxY }}
          src={test}
          alt="Tarun Gupta looking for new challenges"
          className="absolute top-72 left-16 w-48 h-48 border-4 border-black object-cover"
          loading="lazy"
        />
      </section>

      {/* page 7 */}
      <section className="w-full h-fit my-32 flex flex-col items-center justify-center bg-white">
        <div className="flex flex-row gap-16">
          <div className="flex flex-col items-center">
            <a
              href="https://drive.google.com/file/d/15owSoVRzK790PvYEza7jn6GHOUDquUAf/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="box-button"
            >
              <div className="button">
                <span className="text-2xl font-bold gaegu-regular">Resume</span>
              </div>
            </a>
            <span className="text-base font-mono text-black mt-2"></span>
          </div>
          <div className="flex flex-col items-center">
            <a
              href="mailto:tarun234.tg@gmail.com"
              className="box-button"
            >
              <div className="button">
                <span className="text-2xl font-bold gaegu-regular">Email Me</span>
              </div>
            </a>
            <span className="text-base font-mono text-black mt-2">[or send me a pigeon]</span>
          </div>
        </div>
        <div className="flex flex-row justify-center items-center gap-6 mb-16 mt-8">
          <a href="https://linkedin.com/in/maybetarun" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <img src={LinkedinLogo} alt="LinkedIn" className="w-12 h-12 hover:scale-105 transition-opacity duration-200" loading="lazy" />
          </a>
          <a href="https://github.com/maybetarun" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <img src={GithubLogo} alt="GitHub" className="w-12 h-12 hover:scale-105 transition-opacity duration-200" loading="lazy" />
          </a>
          <a href="https://twitter.com/maybetarun" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <img src={XLogo} alt="X (Twitter)" className="w-12 h-12 hover:scale-105 transition-opacity duration-200" loading="lazy" />
          </a>
        </div>
      </section>
    </div>
  );
}

export default App;

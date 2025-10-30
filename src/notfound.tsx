import Lottie from 'react-lottie';
import animationData from './assets/notfound.json';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const NotFound = () => {
  const [showPopup, setShowPopup] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <div className="w-full h-dvh flex justify-center items-center p-4 bg-white text-black">
      <div
        className="relative aspect-square border-2 border-black rounded-3xl overflow-hidden"
        style={{
          width: 'min(calc(100vw - 2rem), calc(100dvh - 2rem))',
          height: 'min(calc(100vw - 2rem), calc(100dvh - 2rem))',
        }}
      >
        <Lottie
          options={defaultOptions}
          style={{
            pointerEvents: 'none',
            width: '100%',
            height: '100%',
          }}
        />

        {/* Buttons and Text at Top */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 flex flex-col gap-3 items-center z-10">
          <button
            onClick={() => (window.location.href = '/')}
            className="px-5 py-2 md:px-8 md:py-3 text-lg md:text-xl font-semibold rounded-full border border-black bg-black text-white hover:bg-white hover:text-black transition-all duration-200"
          >
            Check Out Portfolio
          </button>

          <p
            onClick={() => setShowPopup(true)}
            className="text-lg md:text-xl font-medium underline-offset-4 cursor-pointer hover:underline transition-all duration-200"
          >
            Play a Game Meanwhile
          </p>
        </div>

        {/* Popup */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              className="absolute inset-0 flex justify-center items-center bg-white/60 backdrop-blur-sm z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={(e) => {
                if (e.target === e.currentTarget) setShowPopup(false);
              }}
            >
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                className="bg-white border-2 border-black rounded-2xl p-6 flex flex-col gap-3 items-center"
              >
                <p className="text-lg md:text-xl font-semibold mb-2">Choose a Game</p>

                <button
                  onClick={() => (window.location.href = 'https://aaargh.vercel.app/')}
                  className="px-5 py-2 md:px-8 md:py-3 text-lg md:text-xl font-semibold rounded-full border border-black bg-white hover:bg-gray-100 transition-all duration-200"
                >
                  Aaargh
                </button>

                <button
                  onClick={() => (window.location.href = '/shooter')}
                  className="px-5 py-2 md:px-8 md:py-3 text-lg md:text-xl font-semibold rounded-full border border-black bg-white hover:bg-gray-100 transition-all duration-200"
                >
                  Shooter
                </button>

                <button
                  onClick={() => setShowPopup(false)}
                  className="mt-2 text-sm underline hover:text-red-500"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default NotFound;

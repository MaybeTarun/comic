import Lottie from 'react-lottie';
import animationData from './assets/notfound.json';

const NotFound = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <div className="w-full h-dvh flex justify-center items-center p-4">
      <Lottie
        options={defaultOptions}
        height="100%"
        width="auto"
        style={{ border: "2px solid black" }}
      />
    </div>
  );
};

export default NotFound;
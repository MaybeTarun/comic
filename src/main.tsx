import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import AllProjects from './allprojects';
import Simple from './simple';
import NotFound from './notfound.tsx';
import Shooter from './components/ShooterGame/canvas.tsx';
// import Shooter from './components/shooter.tsx';
import { AuthProvider } from './context/AuthContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>  
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<App />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/simple" element={<Simple />} />
          <Route path="/shooter" element={<Shooter />} />
          {/* <Route path="/shooter" element={<Shooter isOpen={true} onClose={() => {}} highScore={0} onHighScoreUpdate={() => {}} />} /> */}
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);

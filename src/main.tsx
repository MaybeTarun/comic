import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css';

import App from './App.tsx';
import AllProjects from './allprojects';
import Simple from './simple';
import NotFound from './notfound.tsx';
import Shooter from './components/ShooterGame/canvas.tsx';
import { AuthProvider } from './context/AuthContext';
import Redirect from './redirect.tsx';

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
          <Route path="/resume" element={<Redirect href="https://drive.google.com/file/d/15owSoVRzK790PvYEza7jn6GHOUDquUAf/view?usp=sharing" />} />
          <Route path="/freelance" element={<Redirect href="https://freelance.maybetarun.in" />} />
          <Route path="/github" element={<Redirect href="https://github.com/maybetarun" />} />
          <Route path="/twitter" element={<Redirect href="https://twitter.com/maybetarun" />} />
          <Route path="/linkedin" element={<Redirect href="https://linkedin.com/in/maybetarun" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import AllProjects from './allprojects';
import Simple from './simple';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}/>
      <Route path="/projects" element={<AllProjects />}/>
      <Route path="/simple" element={<Simple />} />
    </Routes>
    </BrowserRouter>
  </StrictMode>,
)
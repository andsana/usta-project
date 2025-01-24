import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { BrowserRouter } from 'react-router-dom';
import { PrismicProvider } from '@prismicio/react';
import PrismicClient from './prismicClient.ts';
import { LanguageProvider } from './components/context/LanguageContext.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <BrowserRouter>
        <PrismicProvider client={PrismicClient}>
          <App />
        </PrismicProvider>
      </BrowserRouter>
    </LanguageProvider>
  </StrictMode>,
);

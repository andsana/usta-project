import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { BrowserRouter } from 'react-router-dom';
import { PrismicProvider } from '@prismicio/react';
import PrismicClient from './prismicClient.ts';
import { LanguageProvider } from './app/contexts/LanguageContext.tsx';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <PrismicProvider client={PrismicClient}>
          <App />
        </PrismicProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);

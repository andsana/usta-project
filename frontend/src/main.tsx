import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { PrismicProvider } from '@prismicio/react';
import PrismicClient from './prismicClient.ts';
import { LanguageProvider } from './app/contexts/LanguageContext.tsx';
import { LoadingProvider } from './app/contexts/LoadingContext.tsx';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <LanguageProvider>
        <LoadingProvider>
          <PrismicProvider client={PrismicClient}>
            <App />
          </PrismicProvider>
        </LoadingProvider>
      </LanguageProvider>
    </BrowserRouter>
  </StrictMode>,
);

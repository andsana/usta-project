import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { PrismicProvider } from '@prismicio/react';
import PrismicClient from './prismicClient.ts';
import App from './App.tsx';
import { LanguageProvider } from './app/contexts/LanguageContext.tsx';
import './index.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <LanguageProvider>
          <PrismicProvider client={PrismicClient}>
            <App />
          </PrismicProvider>
        </LanguageProvider>
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
);

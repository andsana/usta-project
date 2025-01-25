import React, { useContext } from 'react';
import { LoadingContext } from '../../app/contexts/LoadingContext.tsx';
import './Loader.css';

const Loader: React.FC = () => {
  const loadingContext = useContext(LoadingContext);

  if (!loadingContext) {
    throw new Error('LoadingContext must be used within a LoadingProvider');
  }

  const { isLoading } = loadingContext;

  if (!isLoading) return null;

  return (
    <div className="loader">
      <div className="loader__spinner"></div>
    </div>
  );
};

export default Loader;

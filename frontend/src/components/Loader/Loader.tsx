import React from 'react';
import { useLoading } from '../../app/hooks/useLoading.ts';
import './Loader.css';

const Loader: React.FC = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loader">
      <div className="loader__spinner"></div>
    </div>
  );
};

export default Loader;

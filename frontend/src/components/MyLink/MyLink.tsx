import { Link } from 'react-router-dom';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { ReactNode } from 'react';
import { Card } from '../Projects/ProjectCard/ProjectCard.tsx';

interface MyLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
  state?: {
    projectData: Card;
  };
}

const MyLink = ({ to, children, className, state }: MyLinkProps) => {
  const { language } = useLanguage();

  const prefixedTo =
    language === 'en-us' ? (to === '/' ? '/en' : `/en${to}`) : to;

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link
      to={prefixedTo}
      className={className}
      state={state}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

export default MyLink;

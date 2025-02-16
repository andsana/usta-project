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
  onClick?: () => void;
}

const MyLink = ({ to, children, className, state, onClick }: MyLinkProps) => {
  const { language } = useLanguage();

  const prefixedTo =
    language === 'en-us' ? (to === '/' ? '/en' : `/en${to}`) : to;

  return (
    <Link to={prefixedTo} className={className} state={state} onClick={onClick}>
      {children}
    </Link>
  );
};

export default MyLink;

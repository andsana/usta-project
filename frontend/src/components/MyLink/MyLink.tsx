import { Link } from 'react-router-dom';
import { useLanguage } from '../../app/hooks/useLanguage.ts';
import { ReactNode } from 'react';

interface MyLinkProps {
  to: string;
  children: ReactNode;
  className?: string;
}

const MyLink = ({ to, children, className }: MyLinkProps) => {
  const { language } = useLanguage();

  const prefixedTo = language === 'en-us' ? (to === '/' ? '/en' : `/en${to}`) : to;

  return (
    <Link to={prefixedTo} className={className}>
      {children}
    </Link>
  );
};

export default MyLink;
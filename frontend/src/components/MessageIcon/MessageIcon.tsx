import { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { IoMdChatboxes } from 'react-icons/io';
import { useOutsideClick } from '../../app/hooks/useOutsideClick.ts';
import SocialLinks from '../ SocialLinks/ SocialLinks.tsx';
import './MessageIcon.css';

const MessageIcon = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIcon = () => {
    setIsOpen((prev) => !prev);
  };

  const closeMessageIcon = () => setIsOpen(false);
  const ref = useOutsideClick<HTMLDivElement>(closeMessageIcon);

  return (
    <div className="message-icon__wrapper" ref={ref}>
      {isOpen && (
        <div className="social-links__wrapper">
          <SocialLinks className="social-links-vertical" />
        </div>
      )}
      <button
        className={`message-icon__button ${isOpen ? 'rotated' : ''}`}
        onClick={toggleIcon}
      >
        {isOpen ? (
          <RxCross1 className="message-icon" />
        ) : (
          <IoMdChatboxes className="message-icon" />
        )}
      </button>
    </div>
  );
};

export default MessageIcon;

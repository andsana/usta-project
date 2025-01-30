import React, { useState } from 'react';
import { useOutsideClick } from '../../app/hooks/useOutsideClick.ts';
import './CustomSelect.css';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const CustomSelect: React.FC<CustomSelectProps> = ({ options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useOutsideClick(() => setIsOpen(false));

  const handleOptionClick = (option: string) => {
    onChange(option);
    setIsOpen(false);
  };

  return (
    <div className="custom-select" ref={ref}>
      <div className="custom-select__selected" onClick={() => setIsOpen(!isOpen)}>
        {value}
      </div>

      {isOpen && (
        <div className="custom-select__options">
          {options.map((option, index) => (
            <div
              key={index}
              className="custom-select__option"
              onClick={() => handleOptionClick(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;



// DarkModeToggle.tsx
import React from 'react';
import { Button } from 'react-bootstrap';

interface DarkModeToggleProps {
  darkMode: boolean;
  onClick: () => void;
}

export const DarkModeToggle: React.FC<DarkModeToggleProps> = ({ darkMode, onClick }) => {
  return (
    <Button
      className={`toggle-dark-mode-btn ${darkMode ? 'dark-mode-icon' : 'light-mode-icon'}`}
      onClick={onClick}
    >
      {darkMode ? '🌞' : '🌙'}
    </Button>
  );
};

export default DarkModeToggle;

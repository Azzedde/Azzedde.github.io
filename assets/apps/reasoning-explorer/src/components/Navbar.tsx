import React from 'react';

interface NavbarProps {
  setActiveView: (view: 'survey' | 'atlas') => void;
}

const Navbar: React.FC<NavbarProps> = ({ setActiveView }) => {
  return (
    <nav className="navbar">
      <button onClick={() => setActiveView('survey')}>Research Survey</button>
      <button onClick={() => setActiveView('atlas')}>Definitions Atlas</button>
    </nav>
  );
};

export default Navbar;
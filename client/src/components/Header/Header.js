import React from 'react';
import './Header.css'; // Import your CSS file for styling
import Nav from './Nav/Nav'; // Import the Nav component

function Header({ onSectionChange }) {
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <h1>Bundle Spares</h1>
        </div>
        <div className="header-right">
          <Nav onSectionChange={onSectionChange} /> {/* Pass the prop here */}
        </div>
      </div>
    </header>
  );
}

export default Header;
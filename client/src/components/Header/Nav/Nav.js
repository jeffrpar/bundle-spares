import React from 'react';
import './Nav.css'; // Import CSS file for styling
import Auth from '../../../utils/auth';

function Nav(props) {
  const { activeSection, onSectionChange } = props;

  return (
    <nav className="nav">
      <ul className="nav-list">
        <li className={`nav-item ${activeSection === 'Home' ? 'active' : ''}`}>
          <button onClick={() => onSectionChange('Home')}>Home</button>
        </li>
        <li className={`nav-item ${activeSection === 'Wishlist' ? 'active' : ''}`}>
          <button onClick={() => onSectionChange('Wishlist')}>Wishlist</button>
        </li>
        <li className={`nav-item ${activeSection === 'Cart' ? 'active' : ''}`}>
          <button onClick={() => onSectionChange('Cart')}>Cart</button>
        </li>
        <li className={`nav-item ${activeSection === 'Login' ? 'active' : ''}`}>
          <button onClick={() => onSectionChange('Login')}>Login</button>
        </li>
        <li className={`nav-item ${activeSection === 'Register' ? 'active' : ''}`}>
          <button onClick={() => onSectionChange('Register')}>Register</button>
        </li>
        <li className={`nav-item ${activeSection === 'Logout' ? 'active' : ''}`}>
          <button onClick={(Auth.logout)}>Logout</button>
        </li>

      </ul>
    </nav>
  );
}

export default Nav;
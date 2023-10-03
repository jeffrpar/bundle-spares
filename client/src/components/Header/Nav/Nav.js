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

        {Auth.loggedIn() ?
          (
            <>
              <li className={`nav-item ${activeSection === 'Logout' ? 'active' : ''}`}>
                <button onClick={(Auth.logout)}>Logout</button>
              </li>
              <li className={`nav-item ${activeSection === 'Wishlist' ? 'active' : ''}`}>
                <button onClick={() => onSectionChange('Wishlist')}><i class="fa-solid fa-heart"></i></button>
              </li>
              <li className={`nav-item ${activeSection === 'User' ? 'active' : ''}`}>
                <button onClick={() => onSectionChange('User')}>User</button>
              </li>
            </>)
          :

          (
            <>
              <li className={`nav-item ${activeSection === 'Login' ? 'active' : ''}`}>
                <button onClick={() => onSectionChange('Login')}>Login</button>
              </li>
              <li className={`nav-item ${activeSection === 'Register' ? 'active' : ''}`}>
                <button onClick={() => onSectionChange('Register')}>Register</button>
              </li>
            </>)}
            
        <li className={`nav-item ${activeSection === 'Cart' ? 'active' : ''}`}>
          <button onClick={() => onSectionChange('Cart')}><i class="fa-solid fa-cart-shopping"></i></button>
        </li>

      </ul>
    </nav>
  );
}

export default Nav;
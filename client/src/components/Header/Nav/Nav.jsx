import React, { useState } from 'react';
import './Nav.css'; // Import CSS file for styling
import Auth from '../../../utils/auth';
import { QUERY_ME } from '../../../utils/queries';
import { useQuery } from '@apollo/client';

function Nav(props) {
  const { activeSection, onSectionChange } = props;







  const [action, setAction] = useState(false);

  const handleClick = () => {
    setAction(!action);
  };


  const { loading, data } = useQuery(QUERY_ME);

  if (loading) {
    return <div>Loading...</div>;
  }


  return (
    <nav className="nav">
      <div id='hamburger'>
        <i id='ham'
          onClick={handleClick}
          className={action ? 'fa fa-times' : 'fa fa-bars'}></i>
      </div>
      <ul className={action ? 'nav-list active' : 'nav-list'} onClick={handleClick}>

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
                <button className='cart-q' onClick={() => onSectionChange('Wishlist')}>
                  <i class="fa-solid fa-heart"></i>
                  <div className='cart-quantity'>{data.me.savedCount || null}</div>
                </button>
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

        {Auth.loggedIn() ? (

          <>
            <li className={`nav-item ${activeSection === 'Cart' ? 'active' : ''}`}>
              <button className='cart-q' onClick={() => onSectionChange('Cart')}>
                <i class="fa-solid fa-cart-shopping"></i>
                <div className='cart-quantity'>{data.me.cartCount || null}</div>
              </button>
            </li>
          </>) : (
          <>
            <li className={`nav-item ${activeSection === 'Cart' ? 'active' : ''}`}>
              <button onClick={() => onSectionChange('Cart')}>
                <i class="fa-solid fa-cart-shopping"></i>
              </button>
            </li>
          </>
        )}

        <li className={`nav-item ${activeSection === 'Donate' ? 'active' : ''}`}>
          <button onClick={() => onSectionChange('Donate')}>Donate
            <i class="fa-solid fa-circle-dollar-to-slot"></i>
          </button>
        </li>

        {Auth.loggedIn() ? (
          <li className={`nav-item ${activeSection === 'User' ? 'active' : ''}`}>
            <button onClick={() => onSectionChange('User')}><i class="fa-solid fa-user"></i> {data.me.username}</button>
          </li>
        ) : (<div style={{ display: "none" }}>Log IN</div>)}

        < img className='ham-pic' alt={`wolf`} src='https://www.svgrepo.com/show/277719/wolf.svg' ></img>
      </ul>
    </nav >
  );
}

export default Nav;
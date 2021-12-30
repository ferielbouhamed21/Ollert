import React, { useState } from 'react';
import { Button } from './Button';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css';
import Dropdown from './Dropdown';
import Ddp from './Ddp';
import axios from 'axios';
function Navbar(props) {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const [dd, setDd] = useState(false);
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const [user, setUser] = React.useState(props.user);
  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };
  const MouseEnter = () => {
    if (window.innerWidth < 960) {
      setDd(false);
    } else {
      setDd(true);
    }
  };
  const MouseLeave = () => {
    if (window.innerWidth < 960) {
      setDd(false);
    } else {
      setDd(false);
    }
  };
  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  return (
    <>
      <nav className='navbar'>
        <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
          Ollert
          <i class="fas fa-tasks"></i>
        </Link>
        <div className='menu-icon' onClick={handleClick}>
          <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
          <li className='nav-item'>
            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li
            className='nav-item'
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
          >
            <Link
              to='/projets'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Projets <i className='fas fa-caret-down' />
            </Link>
            {dropdown && <Dropdown />}
          </li>

          <li className='nav-item'>
            <Link
              to='/contact'
              className='nav-links'
              onClick={closeMobileMenu}
            >
              Contacter nous
            </Link>
          </li>


          <li className='nav-item'>
            <Link
              to='/profile'
              className='nav-links-media'
              onClick={closeMobileMenu}
            >
              Profile
            </Link>
          </li>



          <li
            className='nav-item'
            onMouseEnter={() => console.log('TO FIX MOUSE ENTER')}
            onMouseLeave={MouseLeave}
          >{user && <Link
            to='/profile'
            className='nav-links-profile-des'
            onClick={closeMobileMenu}
          >

            <img className='pro' width="65px" height="65px" style={{ borderRadius: '50%' }} src='/api/users/profilePicture/' />
            <i className='fas fa-caret-down' />
          </Link>
            }{(dd && <Ddp />)}

          </li>





          <li>{!user && <Link
            to='/login'
            className='nav-links-mobile'
            onClick={closeMobileMenu}
          >
            Connexion
          </Link>}

          </li>


        </ul>
        <Button />
      </nav>
    </>
  );
}

export default Navbar;

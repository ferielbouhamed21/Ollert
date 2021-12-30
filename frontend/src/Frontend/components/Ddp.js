import React, { useState } from 'react';
import '../styles/Dropdown.css';
import { Link } from 'react-router-dom';
import { Mip } from './Mip';
import { useNavigation } from '@react-navigation/native';

import axios from 'axios';
function Ddp() {
  const [click, setClick] = useState(false);
  const navigation = useNavigation();
  const handleClick = () => setClick(!click);
  const handleLogout = () => {
      axios.get('/api/users/logout').then((response) => {
          console.log('Successfully logged out');
      });
      navigation.navigate('/');
      window.location.reload();
  }
  const verif = (props) => {
    
  };
  return (
    <>
      <ul
        onClick={handleClick}
        className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}
      >
        {Mip.map((item, index) => {
          return (
            <li key={index}>
              <Link
                className={item.cName}
                to={item.path}
                onClick={() => setClick(false)}
                onClick={ item.cName=='logout' ? handleLogout : verif }
              >
                {item.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Ddp;
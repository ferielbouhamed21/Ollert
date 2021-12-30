import React from 'react';
import '../styles/Button.css';
import { Link } from 'react-router-dom';

export function Button() {
  return (
    <Link to='login'>
      <button className='btn'>Connexion</button>
    </Link>
  );
}

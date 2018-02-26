import React from 'react';
import burgerPngSrc from '../../assets/burger-logo.png';
import styleClasses from './Logo.css';

const logo = props => (
  <div className={styleClasses.Logo}>
    <img src={burgerPngSrc} alt="Burger" />
  </div>
);

export default logo;

import React from 'react';
import styleClasses from './NaviItems.css';
import NaviItem from './NaviItem';

const naviItems = props => (
  <ul className={styleClasses.NaviItems}>
    <NaviItem link="/" active>Burger builder</NaviItem>
    <NaviItem link="/">Checkout</NaviItem>
  </ul>
);

export default naviItems;

import React from 'react';
import styleClasses from './NaviItems.css';
import NaviItem from './NaviItem';

const naviItems = props => (
  <ul className={styleClasses.NaviItems}>
    <NaviItem link="/">Burger builder</NaviItem>
    <NaviItem link="/orders">Orders</NaviItem>
  </ul>
);

export default naviItems;

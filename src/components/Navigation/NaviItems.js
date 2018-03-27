import React from 'react';
import styleClasses from './NaviItems.css';
import NaviItem from './NaviItem';

const naviItems = props => (
  <ul className={styleClasses.NaviItems}>
    <NaviItem link="/">Burger builder</NaviItem>
    {props.isAuth && <NaviItem link="/orders">Orders</NaviItem>}
    {props.isAuth ? (
      <NaviItem link="/logout">Logout</NaviItem>
    ) : (
      <NaviItem link="/login">Login</NaviItem>
    )}
  </ul>
);

export default naviItems;

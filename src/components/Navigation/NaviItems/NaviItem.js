import React from 'react';
import { NavLink } from 'react-router-dom';
import styleClasses from './NaviItem.css';

const naviItem = props => (
  <li className={styleClasses.NaviItem}>
    <NavLink to={props.link} activeClassName={styleClasses.active}>{props.children}</NavLink>
  </li>
);

export default naviItem;

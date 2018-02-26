import React from 'react';
import styleClasses from './NaviItem.css';

const naviItem = props => (
  <li className={styleClasses.NaviItem}>
    <a 
      href={props.link}
      className={props.active ? styleClasses.active : null}
    >
      {props.children}
    </a>
  </li>
);

export default naviItem;

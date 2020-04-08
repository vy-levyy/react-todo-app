import React from 'react';
import './style.css';

function Logo(props) {
  return <h1 className={props.className + ' logo justify-content-center'}>todos</h1>;
}

export default Logo;

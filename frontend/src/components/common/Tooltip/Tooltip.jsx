import React from 'react';
import './style.sass';

function Tooltip(props) {
  return (
    <div className="app-tooltip-container">
      <div className={`app-tooltip ${props.show ? '' : 'd-none'}`}>
        {props.children}
      </div>
    </div>
  );
}

export default Tooltip;

import React from 'react';
import './style.sass';

function UserEmail({ children }) {
  let renderedComponent = null;

  if (children !== null) {
    renderedComponent = <div className="user-email">{ children }</div>;
  }

  return renderedComponent;
}

export default UserEmail;
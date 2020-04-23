import React from 'react';
import './style.sass';

function LogoutButton({ children }) {

  const handleClick = () => {
    localStorage.removeItem('token');
    window.location = '/authorization';
  }

  return (
    <button
      className="logout-button"
      onClick={ handleClick }
    >
      { children }
    </button>
  );
}

export default LogoutButton;
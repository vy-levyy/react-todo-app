import React from 'react';
import { userApi } from '../../controller/api';
import './style.sass';

function LogoutButton({ children }) {
  return (
    <button
      className="logout-button"
      onClick={ userApi.logout }
    >
      { children }
    </button>
  );
}

export default LogoutButton;

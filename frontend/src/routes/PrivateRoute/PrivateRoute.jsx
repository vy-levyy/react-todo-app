import React from 'react';
import {
  Route,
  Redirect
} from "react-router-dom";

function PrivateRoute ({ component: Component, isLoggedIn, setNotification, ...rest }) {
  let renderedComponent = null;

  if (isLoggedIn !== null) {
    const renderFunction = (props) => {
      return isLoggedIn
        ? <Component setNotification={ setNotification } { ...props } />
        : <Redirect to="/authorization" />
    }

    renderedComponent = <Route { ...rest } render={ renderFunction } />;
  }

  return renderedComponent;
};

export default PrivateRoute;

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Home from './components/pages/Home/Home.jsx';
import Authorization from './components/pages/Authorization/Authorization.jsx';
import Registration from './components/pages/Registration/Registration.jsx';
import TodoHandlers from './controller/TodoHandlers';

function isAuthentification() {
  let isAuth = null;

  (() => {
    (async () => {
      console.log(412)
      isAuth = await TodoHandlers.handleAuthentification();
      console.log(413)
    })();
  })();

  return isAuth;
}

function PrivateRoute(props) {
  let renderedComponent = null;
  const isf = isAuthentification()
  console.log(isf)
  if (isf) {
    renderedComponent = <Route path={props.path}>{props.children}</Route>
  } else {
    renderedComponent = <Redirect to={props.redirect} />;
  }

  return renderedComponent;
}

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/authorization">
          <Authorization />
        </Route>
        <Route path="/registration">
          <Registration />
        </Route>
        {/* <PrivateRoute path="/" redirect="/authorization">
          <Home />
        </PrivateRoute> */}
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

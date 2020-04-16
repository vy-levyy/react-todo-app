import React from 'react';
import {BrowserRouter as Router,  Switch, Route} from "react-router-dom";
import Home from './components/pages/Home/Home.jsx';
import Authorization from './components/pages/Authorization/Authorization.jsx';
import Registration from './components/pages/Registration/Registration.jsx';

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
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
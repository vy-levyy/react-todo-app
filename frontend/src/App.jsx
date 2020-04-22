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

const PrivateRoute = ({component: Component, isLoggedIn, ...rest}) => {
  let renderedComponent = null;

  if (isLoggedIn !== null) {
    renderedComponent = (
      <Route
        {...rest}
        render={
          (props) => (isLoggedIn ? <Component {...props} /> : <Redirect to="/authorization" />)
        }
      />
    );
  }

  return renderedComponent;
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: null
    };
  }

  async componentDidMount() {
    const isLoggedIn = await this.isAuth();

    this.setState({ isLoggedIn });
  }

  isAuth = () => {
    return TodoHandlers.handleAuthentification();
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/authorization" exact>
            <Authorization />
          </Route>
          <Route path="/registration" exact>
            <Registration />
          </Route>
          <PrivateRoute
            path="/"
            isLoggedIn={this.state.isLoggedIn}
            component={Home}
            exact
          />
        </Switch>
      </Router>
    );
  }
}

export default App;

import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/pages/Home/Home.jsx';
import Authorization from './components/pages/Authorization/Authorization.jsx';
import Registration from './components/pages/Registration/Registration.jsx';
import RequestHandlers from './controller/RequestHandlers';
import PrivateRoute from './components/common/PrivateRoute/PrivateRoute.jsx';
import NotificationList from './components/NotificationList/NotificationList.jsx';
import { userApi } from './controller/api';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: null,
      notification: null
    };
  }

  async componentDidMount() {
    const isLoggedIn = await userApi.isAuth();

    this.setState({ isLoggedIn });
  }

  setNotification = (notification) => {
    this.setState({ notification });
  }

  render() {
    return (
      <React.Fragment>
        <NotificationList>{this.state.notification}</NotificationList>
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
              setNotification={this.setNotification}
              exact
            />
          </Switch>
        </Router>
      </React.Fragment>
    );
  }
}

export default App;

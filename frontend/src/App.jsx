import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './components/pages/Home/Home.jsx';
import Authorization from './components/pages/Authorization/Authorization.jsx';
import Registration from './components/pages/Registration/Registration.jsx';
import PrivateRoute from './routes/PrivateRoute/PrivateRoute.jsx';
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
    if (window.location.pathname === '/') {
      const response = await userApi.isAuth();

      this.setState({ isLoggedIn: response.success });
    }
  }

  setNotification = (notification) => {
    this.setState({ notification });
  }

  render() {
    return (
      <React.Fragment>
        <NotificationList isDownPosition={window.location.pathname === '/'}>
          {this.state.notification}
        </NotificationList>
        <Router>
          <Switch>
            <Route path="/authorization" exact>
              <Authorization setNotification={ this.setNotification } />
            </Route>
            <Route path="/registration" exact>
              <Registration setNotification={ this.setNotification } />
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

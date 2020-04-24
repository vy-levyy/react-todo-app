import React from 'react';
import notification from '../../../javaScript/notification';
import ContentWrap from '../../ContentWrap/ContentWrap.jsx';
import LoginForm from '../../LoginForm/LoginForm.jsx';

class Authorization extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('signup')) {
      this.props.setNotification(notification.success(localStorage.getItem('signup')));
      localStorage.removeItem('signup');
    }
  }
  
  render() {
    return (
      <div>
        <ContentWrap>
          <LoginForm
            className="container"
            mode="authorization"
            setNotification = { this.props.setNotification }
          />
        </ContentWrap>
      </div>
    );
  }
}

export default Authorization;

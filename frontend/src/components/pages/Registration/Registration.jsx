import React from 'react';
import ContentWrap from '../../ContentWrap/ContentWrap.jsx';
import LoginForm from '../../LoginForm/LoginForm.jsx';

function Registration({ setNotification }) {
  return (
    <div>
      <ContentWrap>
        <LoginForm
          className="container"
          mode="registration"
          setNotification = { setNotification }
        />
      </ContentWrap>
    </div>
  );
}

export default Registration;

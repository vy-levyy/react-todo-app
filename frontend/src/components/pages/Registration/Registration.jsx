import React from 'react';
import ContentWrap from '../../ContentWrap/ContentWrap.jsx';
import LoginForm from '../../LoginForm/LoginForm.jsx';

function Registration() {
  return (
    <div>
      <ContentWrap>
        <LoginForm className="container" mode="registration"/>
      </ContentWrap>
    </div>
  );
}

export default Registration;
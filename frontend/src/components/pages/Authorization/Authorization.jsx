import React from 'react';
import ContentWrap from '../../ContentWrap/ContentWrap.jsx';
import LoginForm from '../../LoginForm/LoginForm.jsx';

function Authorization() {
  return (
    <div>
      <ContentWrap>
        <LoginForm className="container" mode="authorization"/>
      </ContentWrap>
    </div>
  );
}

export default Authorization;

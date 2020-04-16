import React from 'react';
import './style.sass';

function ContentWrap(props) {
  return (
    <div className="container content-wrap">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default ContentWrap;

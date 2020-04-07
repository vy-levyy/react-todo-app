import React from 'react';
import './style.css';

function TodoNotification(props) {
  return (
    <div className={props.className}>
      <div className="col alert alert-success todo-notification-list-item">
        {props.children}
      </div>
    </div>
  );
}

export default TodoNotification;

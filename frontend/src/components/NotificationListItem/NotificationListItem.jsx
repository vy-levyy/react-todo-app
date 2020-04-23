import React from 'react';
import './style.css';

function NotificationListItem(props) {
  return (
    <div className={props.className}>
      <div className={`col alert alert-${props.status} notification-list-item`}>
        {props.children}
      </div>
    </div>
  );
}

export default NotificationListItem;

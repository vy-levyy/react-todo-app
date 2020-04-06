import React from 'react';
import './TodoNotificationListItem.css';

class TodoNotification extends React.Component {
  render() {
    return (
      <div className={this.props.className}>
        <div className="col alert alert-success todo-notification-list-item">
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default TodoNotification;

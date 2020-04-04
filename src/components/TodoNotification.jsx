import React from 'react';

class TodoNotification extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default TodoNotification;

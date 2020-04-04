import React from 'react';

class ListItemDeleteButton extends React.Component {
  handleClick = () => {
    this.props.onRemoveTaskChange(this.props.taskId);
  }

  render() {
    return <button onClick={this.handleClick}>&#10006;</button>;
  }
}

export default ListItemDeleteButton;
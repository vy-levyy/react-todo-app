import React from 'react';

class ClearCompletedItemsButton extends React.Component {
  handleClick = () => {
    this.props.onRemoveCompletedTasksChange();
  }

  render() {
    return (
      <button onClick={this.handleClick}>Clear completed</button>
    );
  }
}

export default ClearCompletedItemsButton;
import React from 'react';
import './ClearCompletedItemsButton.css'

class ClearCompletedItemsButton extends React.Component {
  handleClick = () => {
    this.props.onRemoveCompletedTasksChange();
  }

  render() {
    return (
      <button
        className="clear-completed-items-button"
        onClick={this.handleClick}
      >
        Clear completed
      </button>
    );
  }
}

export default ClearCompletedItemsButton;

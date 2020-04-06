import React from 'react';
import './ListItemDeleteButton.css';

class ListItemDeleteButton extends React.Component {
  handleClick = () => {
    this.props.onRemoveTaskChange(this.props.taskId);
  }

  render() {
    const displayButtonClass = this.props.shouldShowButton ? '' : 'd-none';

    return (
      <button
        className={
          this.props.className
          + " list-item-delete-button text-danger "
          + displayButtonClass
        }
        onClick={this.handleClick}
      >
        &#10006;
      </button>
    );
  }
}

export default ListItemDeleteButton;

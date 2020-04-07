import React from 'react';
import './style.css'

function ClearCompletedItemsButton(props) {
  const handleClick = () => {
    props.onRemoveCompletedTasksChange();
  }

  return (
    <button
      className="clear-completed-items-button"
      onClick={handleClick}
    >
      Clear completed
    </button>
  );
}

export default ClearCompletedItemsButton;

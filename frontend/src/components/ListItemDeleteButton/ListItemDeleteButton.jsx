import React from 'react';
import './style.css';

function ListItemDeleteButton(props) {
  const handleClick = () => {
    props.onRemoveTaskChange(props.taskId);
  }

  const displayButtonClass = props.shouldShowButton ? '' : 'd-none';

  return (
    <button
      className={
        props.className
        + " list-item-delete-button text-danger "
        + displayButtonClass
      }
      onClick={handleClick}
    >
      &#10006;
    </button>
  );
}

export default ListItemDeleteButton;

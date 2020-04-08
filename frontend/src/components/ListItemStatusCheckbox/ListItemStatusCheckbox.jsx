import React from 'react';
import './style.css';

function ListItemStatusCheckbox(props) {
  const handleChange = () => {
    props.onChangeTaskMarkChange(props.taskId);
  }

  const {isChecked} = props;
  const active = ' active-list-item-status-checkbox';
  const className = 'list-item-status-checkbox' + (isChecked ? active : '');
  const mark = isChecked ? <React.Fragment>&#10003;</React.Fragment> : '';

  return (
    <label className={`${className} ${props.className}`}>
      <input
        className="d-none"
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
      />
      {mark}
    </label>
  );
}

export default ListItemStatusCheckbox;

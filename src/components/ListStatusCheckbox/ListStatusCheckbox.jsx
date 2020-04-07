import React from 'react';
import './style.css';

function ListStatusCheckbox(props) {
  const handleChange = () => {
    props.onChangeAllTaskMarksChange();
  }

  const labelClassName = (
    'list-status-checkbox-label'
    + (props.isChecked ? ' active-list-status-checkbox-label' : '')
  );

  return (
    <label className={labelClassName}>
      <input
        className="d-none"
        type="checkbox"
        checked={props.isChecked}
        onChange={handleChange}
      />
    </label>
  );
}

export default ListStatusCheckbox;

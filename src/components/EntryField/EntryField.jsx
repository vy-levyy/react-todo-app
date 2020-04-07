import React from 'react';
import './style.css';

function EntryField(props) {
  const handleKeyPress = (e) => {
    const {value} = e.target;

    if (e.key === 'Enter') {
      if (value.trim() !== '') {
        props.onAddTaskChange(value);
        e.target.value = '';
      }
    }
  }

  return (
    <input
      className={props.className + " entry-field"}
      type="text"
      placeholder="What needs to be done?"
      onKeyPress={handleKeyPress}
      autoFocus
    />
  );
}

export default EntryField;

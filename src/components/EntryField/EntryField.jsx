import React from 'react';
import './EntryField.css';

class EntryField extends React.Component {
  handleKeyPress = (e) => {
    const {value} = e.target;

    if (e.key === 'Enter') {
      if (value.trim() !== '') {
        this.props.onAddTaskChange(value);
        e.target.value = '';
      }
    }
  }

  render() {
    return (
      <input
        className={this.props.className + " entry-field"}
        type="text"
        placeholder="What needs to be done?"
        onKeyPress={this.handleKeyPress}
        autoFocus
      />
    );
  }
}

export default EntryField;

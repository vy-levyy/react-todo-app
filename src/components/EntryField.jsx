import React from 'react';

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
        type="text"
        placeholder="What needs to be done?"
        onKeyPress={this.handleKeyPress}
        autoFocus
      />
    );
  }
}

export default EntryField;

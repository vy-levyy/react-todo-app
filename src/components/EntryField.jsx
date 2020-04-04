import React from 'react';

class EntryField extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // TODO можно так же использовать деструктуризацию const {value} = e.target
    if (e.key === 'Enter') {
      if (e.target.value.trim() !== '') {
        this.props.onAddTaskChange(e.target.value);
        e.target.value = '';
      }
    }
  }

  render() {
    return (
      <input
        type="text"
        placeholder="What needs to be done?"
        onKeyPress={this.handleChange}
        autoFocus
      />
    );
  }
}

export default EntryField;

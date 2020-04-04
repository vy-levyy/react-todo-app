import React from 'react';

class ListStatusCheckbox extends React.Component {
  handleChange = () => {
    this.props.onChangeAllTaskMarksChange();
  }

  render() {
    return (
      <input
        type="checkbox"
        checked={this.props.isChecked}
        onChange={this.handleChange}
      />
    );
  }
}

export default ListStatusCheckbox;
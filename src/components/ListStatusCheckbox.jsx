import React from 'react';

class ListStatusCheckbox extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
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
import React from 'react';
import './ListStatusCheckbox.css';

class ListStatusCheckbox extends React.Component {
  handleChange = () => {
    this.props.onChangeAllTaskMarksChange();
  }

  render() {
    const labelClassName = (
      'list-status-checkbox-label'
      + (this.props.isChecked ? ' active-list-status-checkbox-label' : '')
    );

    return (
      <label className={labelClassName}>
        <input
          className="d-none"
          type="checkbox"
          checked={this.props.isChecked}
          onChange={this.handleChange}
        />
      </label>
    );
  }
}

export default ListStatusCheckbox;

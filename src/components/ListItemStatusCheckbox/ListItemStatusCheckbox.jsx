import React from 'react';
import './ListItemStatusCheckbox.css';

class ListItemStatusCheckbox extends React.Component {
  handleChange = () => {
    this.props.onChangeTaskMarkChange(this.props.taskId);
  }

  render() {
    const {isChecked} = this.props;
    const active = ' active-list-item-status-checkbox';
    const className = 'list-item-status-checkbox' + (isChecked ? active : '');
    const mark = isChecked ? <React.Fragment>&#10003;</React.Fragment> : '';

    return (
      <label className={`${className} ${this.props.className}`}>
        <input
          className="d-none"
          type="checkbox"
          checked={isChecked}
          onChange={this.handleChange}
        />
        {mark}
      </label>
    );
  }
}

export default ListItemStatusCheckbox;

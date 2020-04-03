import React from 'react';

class ListItemDeleteButton extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onRemoveTaskChange(this.props.taskId);
  }

  render() {
    return <button onClick={this.handleChange}>&#10006;</button>;
  }
}

export default ListItemDeleteButton;
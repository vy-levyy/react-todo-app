import React from 'react';

class ClearCompletedItemsButton extends React.Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    this.props.onRemoveCompletedTasksChange();
  }

  render() {
    return (
      <button onClick={this.handleChange}>Clear completed</button>
    );
  }
}

export default ClearCompletedItemsButton;
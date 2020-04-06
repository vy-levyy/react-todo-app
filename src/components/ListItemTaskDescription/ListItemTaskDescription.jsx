import React from 'react';
import './ListItemTaskDescription.css';

class ListItemTaskDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: this.props.task.description,
    };
  }

  handleDoubleClick = () => {
    this.props.onIsEditTaskChange(true);
  }

  handleBlur = (e) => {
    const value = e.target.value.trim();

    this.props.onIsEditTaskChange(false);

    if (value !== '') {
      this.props.onChangeTaskDescriptionChange(this.props.task.id, value);

      this.setState({
        description: value
      });
    } else {
      this.props.onRemoveTaskChange(this.props.task.id);
    }
  }

  handleChange = (e) => {
    this.setState({
      description: e.target.value
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.onChangeTaskDescriptionChange(this.props.task.id, e.target.value);

      e.target.blur();
      
      this.setState({
        description: e.target.value.trim()
      });
    }
  }

  render() {
    const className = this.props.className + ' list-item-task-description';

    let tag = (
      <div
        className={className  + (this.props.task.isDone ? ' checked-list-item-task-description' : '')}
        onDoubleClick={this.handleDoubleClick}
      >
        {this.state.description}
      </div>
    );

    if (this.props.isEdit) {
      tag = (
        <input
          className={className + ' list-item-task-description-input'}
          type="text"
          value={this.state.description}
          onBlur={this.handleBlur}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          autoFocus
        />
      );
    }

    return tag;
  }
}

export default ListItemTaskDescription;

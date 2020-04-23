import React from 'react';
import './style.css';

class ListItemTaskDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      descriptionBeforeEdit: this.props.task.description,
      description: this.props.task.description,
    };
  }

  handleDoubleClick = () => {
    this.props.onIsEditTaskChange(true);
  }

  handleBlur = () => {
    const value = this.state.description.trim();

    this.props.onIsEditTaskChange(false);

    if (value !== '') {
      if (value !== this.state.descriptionBeforeEdit) {
        this.props.onChangeTaskDescriptionChange(this.props.task.id, value);

        this.setState({
          descriptionBeforeEdit: value,
          description: value
        });
      }
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
      e.target.blur();
      
      this.setState({
        description: e.target.value.trim()
      });
    }
  }

  getHtml() {
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
          maxLength="255"
          autoFocus
        />
      );
    }

    return tag;
  }
  
  render() {
    return this.getHtml();
  }
}

export default ListItemTaskDescription;

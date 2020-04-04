import React from 'react';

class ListItemTaskDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: this.props.description,
      isEdit: false
    };
  }

  handleDoubleClick = () => {
    this.setState({
      isEdit: true
    });
  }

  handleBlur = (e) => {
    this.setState({
      isEdit: false
    });

    this.props.onChangeTaskDescriptionChange(this.props.taskId, e.target.value);

    this.setState({
      description: e.target.value.trim()
    });
  }

  handleChange = (e) => {
    this.setState({
      description: e.target.value
    });
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.props.onChangeTaskDescriptionChange(this.props.taskId, e.target.value);

      e.target.blur();
      
      this.setState({
        description: e.target.value.trim()
      });
    }
  }

  render() {
    let tag = <div onDoubleClick={this.handleDoubleClick}>{this.state.description}</div>;

    if (this.state.isEdit) {
      tag = (
        <input
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
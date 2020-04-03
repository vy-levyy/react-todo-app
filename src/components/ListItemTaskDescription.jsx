import React from 'react';

class ListItemTaskDescription extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      description: this.props.description,
      isEdit: false
    };

    this.handleDoubleClick = this.handleDoubleClick.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleDoubleClick() {
    this.setState({
      isEdit: true
    });
  }

  handleBlur(e) {
    this.setState({
      isEdit: false
    });

    this.props.onChangeTaskDescriptionChange(this.props.taskId, e.target.value);
  }

  handleChange(e) {
    this.setState({
      description: e.target.value
    })
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.props.onChangeTaskDescriptionChange(this.props.taskId, e.target.value);
      e.target.blur();
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
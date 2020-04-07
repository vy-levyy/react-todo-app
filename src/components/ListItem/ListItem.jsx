import React from 'react';
import ListItemStatusCheckbox from '../ListItemStatusCheckbox/ListItemStatusCheckbox.jsx';
import ListItemTaskDescription from '../ListItemTaskDescription/ListItemTaskDescription.jsx';
import ListItemDeleteButton from '../ListItemDeleteButton/ListItemDeleteButton.jsx';
import './ListItem.css';

class ListItem extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      hasMouseOver: false,
      isEditTask: false,
    };
  }
  // TODO  можно заменить одной функцией
  /*
  toogleMouseOver = () => {
    const { hasMouseOver } = this.state;
    this.setState({ hasMouseOver: !hasMouseOver });
  }
  */
  onMouseOver = () => {
    this.setState({
      hasMouseOver: true
    });
  }

  onMouseOut = () => {
    this.setState({
      hasMouseOver: false
    });
  }

  handleIsEditTaskChange = (isEditTask) => {
    this.setState({isEditTask});
  }

  render() {
    const { task } = this.props;

    return (
      <li
        className={this.props.className + " list-item"}
        onMouseOver={this.onMouseOver}
        onMouseOut={this.onMouseOut}
      >
        <div className="col-1">
          <ListItemStatusCheckbox
            className={this.state.isEditTask ? 'd-none' : ''}
            taskId={task.id}
            isChecked={task.isDone}
            onChangeTaskMarkChange={this.props.handleChangeTaskMarkChange}
          />
        </div>
        <ListItemTaskDescription
          className="col"
          task={task}
          onChangeTaskDescriptionChange={this.props.handleChangeTaskDescriptionChange}
          onRemoveTaskChange={this.props.handleRemoveTaskChange}
          isEdit={this.state.isEditTask}
          onIsEditTaskChange={this.handleIsEditTaskChange}
        />
        <div className="col-1">
          <ListItemDeleteButton
            className={this.state.isEditTask ? 'd-none' : ''}
            taskId={task.id}
            onRemoveTaskChange={this.props.handleRemoveTaskChange}
            shouldShowButton={this.state.hasMouseOver}
          />
        </div>
      </li>
    );
  }
}

export default ListItem;

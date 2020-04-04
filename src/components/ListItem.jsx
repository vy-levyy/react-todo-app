import React from 'react';
import ListItemStatusCheckbox from './ListItemStatusCheckbox';
import ListItemTaskDescription from './ListItemTaskDescription';
import ListItemDeleteButton from './ListItemDeleteButton';

class ListItem extends React.Component {
  render() {
    const { task } = this.props;

    return (
      <li>
        <ListItemStatusCheckbox
          taskId={task.id}
          isChecked={task.isDone}
          onChangeTaskMarkChange={this.props.handleChangeTaskMarkChange}
        />
        <ListItemTaskDescription
          taskId={task.id}
          description={task.description}
          onChangeTaskDescriptionChange={this.props.handleChangeTaskDescriptionChange}
          onRemoveTaskChange={this.props.handleRemoveTaskChange}
        />
        <ListItemDeleteButton 
          taskId={task.id}
          onRemoveTaskChange={this.props.handleRemoveTaskChange}
        />
      </li>
    );
  }
}

export default ListItem;

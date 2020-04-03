import React from 'react';
import ListItem from './ListItem.jsx';

class List extends React.Component {
  // constructor(props) {
  //   super(props);


  // }

  render() {
    const taskList = this.props.taskList;
    const listItems = taskList.map((task) => {
      return (
        <ListItem 
          task={task}
          key={task.id}
          handleChangeTaskMarkChange={this.props.handleChangeTaskMarkChange}
          handleRemoveTaskChange={this.props.handleRemoveTaskChange}
          handleChangeTaskDescriptionChange={this.props.handleChangeTaskDescriptionChange}
        />
      );
    });

    return <ul>{listItems}</ul>;
  }
}

export default List;
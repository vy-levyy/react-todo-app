import React from 'react';
import ListItem from './ListItem/ListItem.jsx';

class List extends React.Component {
  render() {
    const {taskList} = this.props;
    
    const listItems = taskList.map((task) => {
      return (
        <ListItem
          className="row align-items-center"
          task={task}
          key={task.id}
          handleChangeTaskMarkChange={this.props.handleChangeTaskMarkChange}
          handleRemoveTaskChange={this.props.handleRemoveTaskChange}
          handleChangeTaskDescriptionChange={this.props.handleChangeTaskDescriptionChange}
        />
      );
    });

    const listStyle={
      paddingLeft: '0',
    };

    return (
      <ul
        className={this.props.className}
        style={listStyle}
      >
        <div className="col">
          {listItems}
        </div>
      </ul>
    );
  }
}

export default List;

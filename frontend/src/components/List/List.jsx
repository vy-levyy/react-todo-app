import React from 'react';
import ListItem from '../ListItem/ListItem.jsx';
import './style.css';

function List(props) {
  const {taskList} = props;
  
  const listItems = taskList.map((task) => {
    return (
      <ListItem
        className="row align-items-center"
        task={task}
        key={task.id}
        handleChangeTaskMarkChange={props.handleChangeTaskMarkChange}
        handleRemoveTaskChange={props.handleRemoveTaskChange}
        handleChangeTaskDescriptionChange={props.handleChangeTaskDescriptionChange}
      />
    );
  });

  return (
    <ul className={props.className + ' list'}>
      <div className="col">
        {listItems}
      </div>
    </ul>
  );
}

export default List;

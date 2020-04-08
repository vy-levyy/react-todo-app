import React from 'react';
import EntryField from '../EntryField/EntryField.jsx';
import ListStatusCheckbox from '../ListStatusCheckbox/ListStatusCheckbox.jsx'
import './style.css';

function TodoHeader(props) {
  let listStatusCheckbox = '';

  if (props.shouldShowListStatusCheckbox) {
    listStatusCheckbox = (
      <ListStatusCheckbox
        isChecked={props.shouldActiveListStatusCheckbox}
        onChangeAllTaskMarksChange={props.handleChangeAllTaskMarksChange}
      />
    );
  }

  return (
    <div className={props.className + " todo-header"}>
      <div className="col-1">{listStatusCheckbox}</div>
      <EntryField className = "col" onAddTaskChange={props.handleAddTaskChange}/>
    </div>
  );
}

export default TodoHeader;

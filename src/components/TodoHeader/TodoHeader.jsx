import React from 'react';
import EntryField from '../EntryField/EntryField.jsx';
import ListStatusCheckbox from '../ListStatusCheckbox/ListStatusCheckbox.jsx'
import './TodoHeader.css';

class TodoHeader extends React.Component {
  render() {
    let listStatusCheckbox = '';

    if (this.props.shouldShowListStatusCheckbox) {
      listStatusCheckbox = (
        <ListStatusCheckbox
          isChecked={this.props.shouldActiveListStatusCheckbox}
          onChangeAllTaskMarksChange={this.props.handleChangeAllTaskMarksChange}
        />
      );
    }

    return (
      <div className={this.props.className + " todo-header"}>
        <div className="col-1">{listStatusCheckbox}</div>
        <EntryField className = "col" onAddTaskChange={this.props.handleAddTaskChange}/>
      </div>
    );
  }
}

export default TodoHeader;

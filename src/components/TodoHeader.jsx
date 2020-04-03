import React from 'react';
import EntryField from './EntryField.jsx';
import ListStatusCheckbox from './ListStatusCheckbox.jsx'

class TodoHeader extends React.Component {
  render() {

    let listStatusCheckbox = '';
    if (this.props.shouldShowListStatusCheckbox) {
      listStatusCheckbox = (
        <ListStatusCheckbox
          isChecked={this.props.shouldActiveListStatusCheckbox}
          onChangeAllTaskMarksChange={this.props.handlerChangeAllTaskMarksChange}
        />
      );
    }

    return (
      <div>
        <div>{listStatusCheckbox}</div>
        <EntryField onAddTaskChange={this.props.handleAddTaskChange}/>
      </div>
    );
  }
}

export default TodoHeader;
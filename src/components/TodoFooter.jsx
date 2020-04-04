import React from 'react';
import Counter from './Counter.jsx';
import Filter from './Filter.jsx';
import ClearCompletedItemsButton from './ClearCompletedItemsButton.jsx';

class TodoFooter extends React.Component {
  render() {
    let clearCompletedItemsButton = '';
    
    if (this.props.shouldShowClearCompletedItemsButton) {
      clearCompletedItemsButton = 
        <ClearCompletedItemsButton 
          onRemoveCompletedTasksChange={this.props.handleRemoveCompletedTasksChange}
        />
    }
    
    return (
      <div>
        <Counter value={this.props.activeItemsCounter}/>
        <Filter
          filter={this.props.filter}
          onChangeFilterChange={this.props.handleChangeFilterChange}
        />
        {clearCompletedItemsButton}
      </div>
    );
  }
}

export default TodoFooter;
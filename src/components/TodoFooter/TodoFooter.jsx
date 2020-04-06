import React from 'react';
import Counter from '../Counter.jsx';
import Filter from '../Filter/Filter.jsx';
import ClearCompletedItemsButton from '../ClearCompletedItemsButton/ClearCompletedItemsButton.jsx';
import './TodoFooter.css';

class TodoFooter extends React.Component {
  render() {
    let clearCompletedItemsButton = <div className="col-3" />;
    
    if (this.props.shouldShowClearCompletedItemsButton) {
      clearCompletedItemsButton = (
        <div className="col-12 col-sm-3 clear-completed-items-button-wrap text-center">
          <ClearCompletedItemsButton
            onRemoveCompletedTasksChange={this.props.handleRemoveCompletedTasksChange}
          />
        </div>
      );
    }
    
    return (
      <div className={this.props.className + " todo-footer"}>
        <div className="col">
          <div className="row justify-content-center counter-row">
            <Counter className="col-3 text-center" value={this.props.itemsCounter}> items</Counter>
            <Counter className="col-3 text-center" value={this.props.activeItemsCounter}> items left</Counter>
            <Counter className="col-3 text-center" value={this.props.completedItemsCounter}> items completed</Counter>
          </div>
          <div className="row justify-content-center filter-row">
            <div className="col" />
            <Filter
              className="col-12 col-sm-6 text-center"
              filter={this.props.filter}
              onChangeFilterChange={this.props.handleChangeFilterChange}
            />
            {clearCompletedItemsButton}
          </div>
        </div>
      </div>
    );
  }
}

export default TodoFooter;

import React from 'react';
import Counter from '../Counter/Counter.jsx';
import Filter from '../Filter/Filter.jsx';
import ClearCompletedItemsButton from '../ClearCompletedItemsButton/ClearCompletedItemsButton.jsx';
import './style.css';

function TodoFooter(props) {
  let clearCompletedItemsButton = <div className="col-3" />;
  
  if (props.shouldShowClearCompletedItemsButton) {
    clearCompletedItemsButton = (
      <div className="col-12 col-sm-3 clear-completed-items-button-wrap text-center">
        <ClearCompletedItemsButton
          onRemoveCompletedTasksChange={props.handleRemoveCompletedTasksChange}
        />
      </div>
    );
  }
  
  return (
    <div className={props.className + " todo-footer"}>
      <div className="col">
        <div className="row justify-content-center counter-row">
          <Counter className="col-3 text-center" value={props.itemsCounter}> items</Counter>
          <Counter className="col-3 text-center" value={props.activeItemsCounter}> items left</Counter>
          <Counter className="col-3 text-center" value={props.completedItemsCounter}> items completed</Counter>
        </div>
        <div className="row justify-content-center filter-row">
          <div className="col" />
          <Filter
            className="col-12 col-sm-6 text-center"
            filter={props.filter}
            onChangeFilterChange={props.handleChangeFilterChange}
          />
          {clearCompletedItemsButton}
        </div>
      </div>
    </div>
  );
}

export default TodoFooter;

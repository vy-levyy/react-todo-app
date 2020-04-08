import React from 'react';
import './style.css';

function Filter(props) {
  const handleChange = (e) => {
    props.onChangeFilterChange(e.target.value);
  }

  const {filter} = props;

  return (
    <div className={props.className}>
      <label className={"filter-button" + (filter === 'All' ? " active-filter-button" : "")}>
        <input
          className="filter"
          type="radio"
          name="filter"
          id="allItems"
          checked={filter === 'All'}
          onChange={handleChange}
          value="All"
        />
        All
      </label>
      <label className={"filter-button" + (filter === 'Active' ? " active-filter-button" : "")}>
        <input
          className="filter"
          type="radio"
          name="filter"
          id="activeItems"
          checked={filter === 'Active'}
          onChange={handleChange}
          value="Active"
        />
        Active
      </label>
      <label className={"filter-button" + (filter === 'Completed' ? " active-filter-button" : "")}>
        <input
          className="filter"
          type="radio"
          name="filter"
          id="completedItems"
          checked={filter === 'Completed'}
          onChange={handleChange}
          value="Completed"
        />
        Completed
      </label>
    </div>
  );
}

export default Filter;

import React from 'react';

class Filter extends React.Component {
  handleChange = (e) => {
    this.props.onChangeFilterChange(e.target.value);
  }

  render() {
    const {filter} = this.props;

    return (
      <div>
        <label>
          <input
            type="radio"
            name="filter"
            id="allItems"
            checked={filter === 'All'}
            onChange={this.handleChange}
            value="All"
          />
          All
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            id="activeItems"
            checked={filter === 'Active'}
            onChange={this.handleChange}
            value="Active"
          />
          Active
        </label>
        <label>
          <input
            type="radio"
            name="filter"
            id="completedItems"
            checked={filter === 'Completed'}
            onChange={this.handleChange}
            value="Completed"
          />
          Completed
        </label>
      </div>
    );
  }
}

export default Filter;

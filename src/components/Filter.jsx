import React from 'react';

class Filter extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChangeFilterChange(e.target.value);
  }

  render() {
    return (
      <div>
        <label>
          <input
            type="radio"
            name="filter"
            id="allItems"
            checked={this.props.filter === 'All'}
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
            checked={this.props.filter === 'Active'}
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
            checked={this.props.filter === 'Completed'}
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
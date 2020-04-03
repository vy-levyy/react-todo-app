import React from 'react';

class Counter extends React.Component {
  render() {
    return <div>{this.props.value} items left</div>;
  }
}

export default Counter;
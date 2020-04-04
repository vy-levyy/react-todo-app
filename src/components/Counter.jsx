import React from 'react';

class Counter extends React.Component {
  render() {
    return <div>{this.props.value} {this.props.children}</div>;
  }
}

export default Counter;

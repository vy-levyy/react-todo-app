import React from 'react';

function Counter(props) {
  return (
    <div className={props.className}>
      {props.value} {props.children}
    </div>
  );
}

export default Counter;

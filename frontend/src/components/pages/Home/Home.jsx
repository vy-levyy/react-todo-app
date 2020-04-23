import React from 'react';
import TodoApp from '../../TodoApp/TodoApp.jsx';

function Home(props) {
  return <TodoApp { ...props } className="container"/>;
}

export default Home;

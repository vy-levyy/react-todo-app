import React from 'react';
//import './style.sass';

function AppInput(props) {
  const { id, context } = props;

  return (
    <input
      id={id}
      type={props.type}
      className="form-control"
      placeholder={props.placeholder}
      onChange={context.handleInputChange}
      onFocus={context.handleFocus}
      onBlur={context.handleFocus}
      maxLength={props.maxlength || 100}
      success={context.isValidInput(id).toString()}
      danger={(!context.isValidInput(id) && !context.isEmptyInput(id)).toString()}
    />
  );
}

export default AppInput;
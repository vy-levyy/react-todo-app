import React from 'react';

function AppInput({ id, type, placeholder, context, maxLength = 100, autoFocus = false }) {
  return (
    <input
      id={id}
      type={type}
      className="form-control"
      placeholder={placeholder}
      onChange={context.handleInputChange}
      onFocus={context.handleFocus}
      onBlur={context.handleFocus}
      maxLength={maxLength}
      success={context.isValidInput(id).toString()}
      danger={(!context.isValidInput(id) && !context.isEmptyInput(id)).toString()}
      autoFocus={autoFocus}
    />
  );
}

export default AppInput;

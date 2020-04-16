import React from 'react';
import yupSchemasMap from './yupSchemasMap';
import './style.sass';
import { Link } from "react-router-dom";

function InputField(tooltip) {
  return {
    tooltip,
    value: '',
    isValid: false,
    shouldShowTooltip: false
  }
}

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      mode: this.props.mode,
      email: new InputField('example: tester@test.com'),
      password: new InputField('6 min, 1 up, 1 low, 1 number, 1 spec'),
      confirmedPassword: new InputField('passwords must match'),
      isValidForm: false
    };
  }

  handleInputChange = async (event) => {
    const inputFieldName = event.target.id;
    const inputField = this.state[inputFieldName];

    inputField.value = event.target.value;

    if (inputFieldName !== 'confirmedPassword') {
      const schema = yupSchemasMap.get(inputFieldName);
      inputField.isValid = await schema.isValid(inputField.value);

      if (inputFieldName === 'password' && this.state.confirmedPassword.value !== '')
        this.state.confirmedPassword.isValid = this.isPasswordsMatch();
    } else {
      if (this.state.password.value !== '')
        inputField.isValid = this.isPasswordsMatch();
    }

    inputField.shouldShowTooltip = !inputField.isValid

    this.setState({
      [inputFieldName]: inputField,
      isValidForm: this.isValidForm()
    });
  }

  handleFocus = (event) => {
    const inputFieldName = event.target.id;
    const inputField = this.state[inputFieldName];
    const truthMap = new Map([
      ['focus', true],
      ['blur', false]
    ]);

    if (!inputField.isValid) {
      inputField.shouldShowTooltip = truthMap.get(event.type);

      this.setState({
        [inputFieldName]: inputField
      });
    }
  }

  handleSubmit(event) {
    console.log('Отправлено');
    event.preventDefault();
  }

  isPasswordsMatch() {
    return this.state.password.value === this.state.confirmedPassword.value;
  }

  isValidForm() {
    const { email, password } = this.state;

    if (this.isAuthorizationMode())
      return email.isValid && password.isValid;

    const { confirmedPassword } = this.state;

    return email.isValid && password.isValid && confirmedPassword.isValid;
  }

  isAuthorizationMode() {
    return this.state.mode === 'authorization';
  }

  getComnfirmedPasswordElement() {
    if (this.isAuthorizationMode()) {
      return null;
    } else {
      return (
        <ElementWrap>
          <input
            id='confirmedPassword'
            type="password"
            className="form-control"
            placeholder="confirm password"
            onChange={this.handleInputChange}
            onFocus={this.handleFocus}
            onBlur={this.handleFocus}
            maxLength="25"
            success={this.state.confirmedPassword.isValid.toString()}
          />
          <div className="login-form-tooltip-container">
            <Tooltip show={this.state.confirmedPassword.shouldShowTooltip}>
              {this.state.confirmedPassword.tooltip}
            </Tooltip>
          </div>
        </ElementWrap>
      );
    }
  }

  getLinkElement() {
    const isAuthorizationMode = this.isAuthorizationMode();
    const link = isAuthorizationMode ? '/registration' : '/authorization';
    const linkName = isAuthorizationMode ? 'Registration' : 'Login';

    return (
      <ElementWrap>
        <Link to={link} className="link">
            {linkName}
        </Link>
      </ElementWrap>
    );
  }

  render() {
    const buttonName = this.isAuthorizationMode() ? 'Login' : 'Register';

    return (
      <form
        className="container login-form"
        onSubmit={this.handleSubmit}
      >
        <div className="row">
          <div className="col">
            <ElementWrap>
              <input
                id='email'
                type="text"
                className="form-control"
                placeholder="email"
                onChange={this.handleInputChange}
                onFocus={this.handleFocus}
                onBlur={this.handleFocus}
                success={this.state.email.isValid.toString()}
              />
              <div className="login-form-tooltip-container">
                <Tooltip show={this.state.email.shouldShowTooltip}>
                  {this.state.email.tooltip}
                </Tooltip>
              </div>
            </ElementWrap>

            <ElementWrap>
              <input
                id='password'
                type="password"
                className="form-control"
                placeholder="password"
                onChange={this.handleInputChange}
                onFocus={this.handleFocus}
                onBlur={this.handleFocus}
                maxLength="25"
                success={this.state.password.isValid.toString()}
              />
              <div className="login-form-tooltip-container">
                <Tooltip show={this.state.password.shouldShowTooltip}>
                  {this.state.password.tooltip}
                </Tooltip>
              </div>
            </ElementWrap>

            {this.getComnfirmedPasswordElement()}

            <div className="form-group">
                <input
                  type="submit"
                  className="submit-button"
                  value={buttonName}
                  enabled={this.state.isValidForm.toString()}
                />
            </div>

            {this.getLinkElement()}
          </div>
        </div>
      </form>
    );
  }
}

function ElementWrap(props) {
  return (
    <div className="row justify-content-center">
      <div className="col-10 col-lg-8 form-group">
        {props.children}
      </div>
    </div>
  );
}

function Tooltip(props) {
  return (
    <div className={`login-form-tooltip ${props.show ? '' : 'd-none'}`}>
      {props.children}
    </div>
  );
}

export default LoginForm;
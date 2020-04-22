import React from 'react';
import AppInput from '../common/AppInput/AppInput.jsx';
import Tooltip from '../common/Tooltip/Tooltip.jsx';
import validationSchemasMap from './validationSchemasMap';
import tooltipMaps from './tooltipMaps';
import './style.sass';
import { Link } from "react-router-dom";
import axios from 'axios';

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
      const schema = validationSchemasMap.get(inputFieldName);
      inputField.isValid = await schema.isValid(inputField.value);

      if (inputFieldName === 'password' && this.state.confirmedPassword.value !== '') {
        const isPasswordsMatch = this.isPasswordsMatch();
        this.state.confirmedPassword.isValid = isPasswordsMatch;
        this.state.confirmedPassword.shouldShowTooltip = !isPasswordsMatch;
      }
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

    if ((event.type === 'blur' && this.isEmptyInput(inputFieldName)) || inputField.isValid) {
      inputField.shouldShowTooltip = false;
    } else {
      inputField.tooltip = tooltipMaps[inputFieldName].get(event.type)
      inputField.shouldShowTooltip = true;
    }

    this.setState({
      [inputFieldName]: inputField
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    const endPoint = !this.isAuthorizationMode() ? 'signup' : 'signin';

    try {
      const response = await axios.post(`${process.env.REACT_APP_SERVER_HOST}/${endPoint}`, {
        email: this.state.email.value,
        password: this.state.password.value
      });

      if (this.isAuthorizationMode()) {
        if (response.data.accessToken) {
          localStorage.setItem('token', response.data.accessToken);
          window.location = '/';
        }
      } else {
        window.location = '/authorization';
      }
    } catch(error) {
      console.log(error.response);
    }
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

  isValidInput(inputFieldName) {
    return this.state[inputFieldName].isValid;
  }

  isEmptyInput(inputFieldName) {
    return this.state[inputFieldName].value === '';
  }

  getComnfirmedPasswordElement() {
    if (this.isAuthorizationMode()) {
      return null;
    } else {
      return (
        <ElementWrap>
          <AppInput
            id="confirmedPassword"
            type="password"
            placeholder="confirm password"
            maxLength="25"
            context={this}
          />
          <Tooltip show={this.state.confirmedPassword.shouldShowTooltip}>
            {this.state.confirmedPassword.tooltip}
          </Tooltip>
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
              <AppInput
                id="email"
                type="email"
                placeholder="email"
                context={this}
              />
              <Tooltip show={this.state.email.shouldShowTooltip}>
                {this.state.email.tooltip}
              </Tooltip>
            </ElementWrap>

            <ElementWrap>
              <AppInput
                id="password"
                type="password"
                placeholder="password"
                maxLength="25"
                context={this}
              />
              <Tooltip show={this.state.password.shouldShowTooltip}>
                {this.state.password.tooltip}
              </Tooltip>
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

export default LoginForm;
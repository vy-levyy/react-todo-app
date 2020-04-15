import React from 'react';
import './style.css';

class LoginForm extends React.Component {
  render() {
    return (
      <div className="container login-container">
        <div className="row">
          <div className="col-md-6 login-form-1">
            <form>
              <div className="form-group">
                  <input type="text" className="form-control" placeholder="Your Email *" value="" />
              </div>
              <div className="form-group">
                  <input type="password" className="form-control" placeholder="Your Password *" value="" />
              </div>
              <div className="form-group">
                  <input type="submit" className="btnSubmit" value="Login" />
              </div>
              <div class="form-group">
                  <a href="#" className="ForgetPwd">Forget Password?</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginForm;
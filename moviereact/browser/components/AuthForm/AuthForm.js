import React from 'react';
import PropTypes from 'prop-types';

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleChange(e) {
    this.props.handleAuthNameChange(e.target.value);
  }

  handleRegister(e) {
    this.props.handleRegister(e);
  }

  handleLogin(e) {
    this.props.handleLogin(e);
  }

  render() {
    return (
      <div className="row justify-content-center">
        <div className="col-11 col-md-9 col-lg-4">
          <div className="panel">
            <h3 className="mint">{this.props.register ? 'Register' : 'Sign in'}</h3>
            <form
              onSubmit={this.props.register ? this.handleRegister : this.handleLogin}
              method="post"
              className="mb-2"
            >
              <div className="form-group">
                <label htmlFor="username" className="mt-2">
                  <strong>User</strong>
                </label>
                <input
                  type="input"
                  className="form-control"
                  id="username"
                  name="username"
                  placeholder="username"
                  autoComplete="off"
                  value={this.props.authName}
                  onChange={this.handleChange}
                />
                <small id="access-warn" />
              </div>
              <button
                id="access-btn"
                type="submit"
                className="btn btn-primary mb-2"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AuthForm.propTypes = {
  register: PropTypes.bool,
  handleAuthNameChange: PropTypes.func,
  handleRegister: PropTypes.func,
  handleLogin: PropTypes.func,
  authName: PropTypes.string,
};

export { AuthForm as default };

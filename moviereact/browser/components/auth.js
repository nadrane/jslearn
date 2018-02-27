import React from 'react';
import PropTypes from 'prop-types';
import { BSRow, BSCol } from './layout';

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.handleAuthNameChange(e.target.value);
  }

  render() {
    return (
      <BSRow>
        <BSCol colClass="col-11 col-md-9 col-lg-4">
          <div className="panel">
            <h3 className="mint">{this.props.register ? 'Register' : 'Sign in'}</h3>
            <form
              onSubmit={this.props.register ? this.props.handleRegister : this.props.handleLogin}
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
        </BSCol>
      </BSRow>
    );
  }
}

Auth.propTypes = {
  register: PropTypes.bool,
};

export { Auth as default };

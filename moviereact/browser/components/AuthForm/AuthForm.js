import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class AuthForm extends React.Component {
  render() {
    const {
      handleAuthNameChange, handleRegister, handleLogin, session, register, authName,
    } = this.props;
    if (session) {
      return <Redirect to='/movies'/>;
    }
    return (
      <div className="row justify-content-center">
        <div className="col-11 col-md-9 col-lg-4">
          <div className="panel">
            <h3 className="mint">{register ? 'Register' : 'Sign in'}</h3>
            <form
              onSubmit={register ? handleRegister : handleLogin}
            >
              <div className="form-group">
                <label htmlFor="username">
                  <strong>User</strong>
                </label>
                <input
                  className="form-control"
                  name="username"
                  placeholder="username"
                  autoComplete="off"
                  value={authName}
                  onChange={handleAuthNameChange}
                />
              </div>
              <button className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

AuthForm.propTypes = {
  handleAuthNameChange: PropTypes.func,
  handleRegister: PropTypes.func,
  handleLogin: PropTypes.func,
  session: PropTypes.object,
  register: PropTypes.bool,
  authName: PropTypes.string,
};

export { AuthForm as default };

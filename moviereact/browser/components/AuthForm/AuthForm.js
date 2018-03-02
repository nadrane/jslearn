import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

class AuthForm extends React.Component {
  render() {
    const {
      handleAuthNameChange,
      handleRegister,
      handleLogin,
      session,
      register,
      authName,
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
              className="mb-2"
            >
              <div className="form-group">
                <label htmlFor="username" className="mt-2">
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
                <small id="access-warn" />
              </div>
              <button className="btn btn-primary mb-2">
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
  session: PropTypes.object,
  handleAuthNameChange: PropTypes.func,
  handleRegister: PropTypes.func,
  handleLogin: PropTypes.func,
  authName: PropTypes.string,
};

export { AuthForm as default };

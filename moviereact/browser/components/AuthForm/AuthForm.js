import React from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

const initialState = { username: '' };

class AuthForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  handleChange(e) {
    this.setState({ username: e.target.value });
  }

  submit(e) {
    e.preventDefault();
    const { username } = this.state;
    const { isRegister, handleSubmit } = this.props;
    if (username) {
      this.setState(initialState);
      handleSubmit([isRegister, username]);
    }
  }

  render() {
    const { session, isRegister } = this.props;
    const { username } = this.state;
    if (session) {
      return <Redirect to='/movies'/>;
    }
    return (
      <div className="row justify-content-center">
        <div className="col-11 col-md-9 col-lg-4">
          <div className="panel">
            <h3 className="mint">{isRegister ? 'Register' : 'Sign in'}</h3>
            <form
              onSubmit={this.submit}
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
                  value={username}
                  onChange={this.handleChange}
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
  session: PropTypes.object,
  handleSubmit: PropTypes.func,
  isRegister: PropTypes.bool,
};

export { AuthForm as default };

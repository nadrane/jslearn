import React from 'react';
import PropTypes from 'prop-types';
import { BSRow, BSCol } from './layout';

const Auth = props => (
  <BSRow>
    <BSCol colClass="col-11 col-md-9 col-lg-4">
      <div className="panel">
        <h3 className="mint">{props.register ? 'Register' : 'Sign in'}</h3>
        <form
          action={props.register ? '/auth/register' : '/auth/login'}
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

Auth.propTypes = {
  register: PropTypes.bool,
};

export { Auth as default };

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const NavMenu = props => (
  props.session ? (
  <ul className="navbar-nav mr-auto">
    <li>
      <Link className="white mr-5"
        to={`/user/${props.session.id}`}>
        {props.session.username}
      </Link>
    </li>
    <li>
      <Link to="/"
        className="mint my-2 my-sm-0"
        onClick={props.onLogout}>
        Logout
      </Link>
    </li>
  </ul>
  ) : (
    <ul className="navbar-nav mr-auto">
      <li>
          <Link className="mint my-2 mx-2 my-sm-0" to="/auth/login">
            Sign In
          </Link>
      </li>
      <li>
          <a className="mint my-2 mx-2 my-sm-0" href="/auth/register">
            Register
          </a>
      </li>
    </ul>
  )
);

NavMenu.propTypes = {
  session: PropTypes.object,
  onLogout: PropTypes.func,
};

export { NavMenu as default };

import PropTypes from 'prop-types';
import React from 'react';

const BSRow = props => (
  <div className="row justify-content-center">
    {props.children}
  </div>
);

const BSCol = props => (
  <div className={props.colClass}>
    {props.children}
  </div>
);

const NavMenu = props => (
  props.session ? (
  <ul className="navbar-nav mr-auto">
    <li>
      <a className="white mr-5"
        href={`/user/${props.session.id}`}>
        {props.session.username}
      </a>
    </li>
    <li>
      <button
        className="mint my-2 my-sm-0 btn-link"
        href="/auth/logout"
        onClick={props.onLogout}>
        Logout
      </button>
    </li>
  </ul>
  ) : (
    <ul className="navbar-nav mr-auto">
      <li>
          <a className="mint my-2 mx-2 my-sm-0" href="/auth/session">
            Sign In
          </a>
      </li>
      <li>
          <a className="mint my-2 mx-2 my-sm-0" href="/auth/register">
            Register
          </a>
      </li>
    </ul>
  )
);

const NavBar = props => (
<nav className="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
  <div className="container">
      <a id="brand" className="navbar-brand" href="/">Movietown!</a>
  </div>
    <NavMenu session={props.session} onLogout={props.onLogout} />
</nav>
);

BSRow.propTypes = {
  children: PropTypes.object,
};
BSCol.propTypes = {
  colClass: PropTypes.string.isRequired,
  children: PropTypes.object,
};
NavMenu.propTypes = {
  session: PropTypes.object,
  onLogout: PropTypes.func,
};
NavBar.propTypes = {
  session: PropTypes.object,
  onLogout: PropTypes.func,
};

export { BSRow, BSCol, NavBar };

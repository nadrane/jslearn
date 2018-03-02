import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// components
import NavMenu from './NavMenu';

const NavBar = props => (
  <nav className="navbar navbar-expand-md navbar-dark bg-dark">
    <div className="container">
        <Link id="brand" className="navbar-brand" to="/">Movietown!</Link>
    </div>
      <NavMenu session={props.session} onLogout={props.onLogout} />
  </nav>
);

NavBar.propTypes = {
  session: PropTypes.object,
  onLogout: PropTypes.func,
};

export { NavBar as default };

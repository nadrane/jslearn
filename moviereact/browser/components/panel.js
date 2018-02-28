import PropTypes from 'prop-types';
import React from 'react';

const Panel = props => (
  <div className="row justify-content-center">
    <div className="col-sm-12 col-lg-5">
      <div className="panel">
        <h1>{props.header}</h1>
        {props.panelInfo}
      </div>
    </div>
  </div>
);

Panel.propTypes = {
  header: PropTypes.string,
  panelInfo: PropTypes.object,
};

export { Panel as default };

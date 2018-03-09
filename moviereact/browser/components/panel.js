import PropTypes from 'prop-types';
import React from 'react';

const Panel = (props) => {
  let stats;
  if (props.stats) {
    stats = props.stats.map(([field, value], i) => (
      <div key={i}><strong>{field}:</strong> {value}</div>
    ));
  }
  return (
  <div className="row justify-content-center">
    <div className="col-sm-12 col-lg-5">
      <div className="panel">
        <h1>{props.header}</h1>
        {props.message}
        <div className="panel-info">
          <hr/>
          {stats}
          {props.text}
          {props.session ? props.user : props.guest}
        </div>
      </div>
    </div>
  </div>
  );
};

Panel.propTypes = {
  session: PropTypes.object,
  header: PropTypes.string,
  message: PropTypes.string,
  stats: PropTypes.array,
  text: PropTypes.object,
  user: PropTypes.object,
  guest: PropTypes.object,
};

export { Panel as default };

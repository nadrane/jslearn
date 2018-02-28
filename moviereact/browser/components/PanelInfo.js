import PropTypes from 'prop-types';
import React from 'react';

const PanelInfo = (props) => {
  let stats;
  if (props.stats) {
    stats = props.stats.map(([field, value], i) => (
      <div key={i}><strong>{field}:</strong> {value}</div>
    ));
  }
  return (
    <div className="panel-info">
      <hr/>
      {stats}
      {props.text}
      {props.session ? props.user : props.guest}
    </div>
  );
};

PanelInfo.propTypes = {
  text: PropTypes.object,
  stats: PropTypes.array,
  session: PropTypes.object,
  user: PropTypes.object,
  guest: PropTypes.object,
};


export { PanelInfo as default };

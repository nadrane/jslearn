import PropTypes from 'prop-types';
import React from 'react';

// components
import Panel from '../Panel';

const DirectorPanel = (props) => {
  const { session, director, count } = props;
  return (
    <Panel
      session={session}
      header={director.name}
      text={(
        <span>
          <strong>{director.name} </strong>
          has released
          <strong> {count} </strong> film(s) on Movietown.
        </span>
      )}
    />
  );
};

DirectorPanel.propTypes = {
  session: PropTypes.object,
  director: PropTypes.object,
  count: PropTypes.number,
};

export { DirectorPanel as default };

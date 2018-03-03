import PropTypes from 'prop-types';
import React from 'react';

// components
import Panel from '../Panel';
import PanelInfo from '../PanelInfo';

const DirectorPanel = (props) => {
  const { session, director, count } = props;
  return (
    <Panel
      header={director.name}
      panelInfo={(
        <PanelInfo
          text={(
            <span>
              <strong>{director.name} </strong>
              has released
              <strong> {count} </strong> film(s) on Movietown.
            </span>
          )}
          session={session}
        />
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

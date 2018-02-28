import PropTypes from 'prop-types';
import React from 'react';

// components
import Panel from '../Panel';
import PanelInfo from '../PanelInfo';

const DirectorPanel = (props) => {
  const { session, panelData } = props;
  let panelHeader;
  let panelInfo;
  if (panelData) {
    panelHeader = panelData.director.name;
    panelInfo = (
      <PanelInfo
        text={(
          <span>
            <strong>{panelData.director.name} </strong>
            has released
            <strong> {panelData.count} </strong> film(s) on Movietown.
          </span>
        )}
        session={session}
      />
    );
  }

  return (
    <Panel header={panelHeader} panelInfo={panelInfo} />
  );
};

DirectorPanel.propTypes = {
  panelData: PropTypes.object,
  session: PropTypes.object,
};

export { DirectorPanel as default };

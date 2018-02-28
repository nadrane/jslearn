import PropTypes from 'prop-types';
import React from 'react';

// components
import Panel from '../Panel';
import PanelInfo from '../PanelInfo';

const UserReviewsPanel = (props) => {
  const { session, panelData } = props;
  let panelHeader;
  let panelInfo;
  if (panelData) {
    panelHeader = panelData.user.username;
    panelInfo = (
      <PanelInfo
        text={(
          <span>
            <strong>{panelData.user.username} </strong>
            has posted
            <strong> {panelData.count} </strong>review(s) on Movietown.
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

UserReviewsPanel.propTypes = {
  panelData: PropTypes.object,
  session: PropTypes.object,
};

export { UserReviewsPanel as default };

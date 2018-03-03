import PropTypes from 'prop-types';
import React from 'react';

// components
import Panel from '../Panel';
import PanelInfo from '../PanelInfo';

const UserReviewsPanel = (props) => {
  const { session, user, count } = props;
  return (
    <Panel
      header={user.username}
      panelInfo={(
        <PanelInfo
          text={(
            <span>
              <strong>{user.username} </strong>
              has posted
              <strong> {count} </strong>review(s) on Movietown.
            </span>
          )}
          session={session}
        />
      )}
    />
  );
};

UserReviewsPanel.propTypes = {
  session: PropTypes.object,
  user: PropTypes.object,
  count: PropTypes.number,
};

export { UserReviewsPanel as default };

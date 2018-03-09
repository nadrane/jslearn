import PropTypes from 'prop-types';
import React from 'react';

// components
import Panel from '../Panel';

const UserReviewsPanel = (props) => {
  const { session, user, count } = props;
  return (
    <Panel
      session={session}
      header={user.username}
      text={(
        <span>
          <strong>{user.username} </strong>
            has posted
          <strong> {count} </strong>review(s) on Movietown.
        </span>
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

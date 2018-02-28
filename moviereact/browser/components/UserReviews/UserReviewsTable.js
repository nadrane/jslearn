import PropTypes from 'prop-types';
import React from 'react';

// components
import Table from '../Table';
import UserReviewsRow from './UserReviewsRow';

const UserReviewsTable = props => (
  <Table
    headers={['Movie', 'Rating (★★★★★)', 'Review', 'Posted']}
    RowClass={UserReviewsRow}
    rows={props.rows}
  />
);

UserReviewsTable.propTypes = {
  rows: PropTypes.array,
};

export { UserReviewsTable as default };

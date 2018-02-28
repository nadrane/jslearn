import PropTypes from 'prop-types';
import React from 'react';

// components
import Table from '../Table';
import MovieReviewsRow from './MovieReviewsRow';

// import MoviesRow component itself and pass in

const MovieReviewsTable = props => (
  <Table
    headers={['User', 'Rating (★★★★★)', 'Review', 'Posted']}
    RowClass={MovieReviewsRow}
    rows={props.rows}
  />
);

MovieReviewsTable.propTypes = {
  rows: PropTypes.array,
};

export { MovieReviewsTable as default };

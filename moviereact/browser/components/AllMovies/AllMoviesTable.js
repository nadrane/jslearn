import PropTypes from 'prop-types';
import React from 'react';

// components
import Table from '../Table';
import AllMoviesRow from './AllMoviesRow';

const AllMoviesTable = props => (
  <Table
    headers={['Movie', 'Director', 'Year']}
    RowClass={AllMoviesRow}
    rows={props.rows}
  />
);

AllMoviesTable.propTypes = {
  rows: PropTypes.array,
};

export { AllMoviesTable as default };

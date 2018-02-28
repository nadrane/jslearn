import PropTypes from 'prop-types';
import React from 'react';

// components
import Table from '../Table';
import DirectorRow from './DirectorRow';

const DirectorTable = props => (
  <Table
    headers={['Movie', 'Released']}
    RowClass={DirectorRow}
    rows={props.rows}
  />
);

DirectorTable.propTypes = {
  rows: PropTypes.array,
};

export { DirectorTable as default };

import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// components
import Table from '../Table';

const MovieReviewsTable = (props) => {
  const { rows } = props;
  const headers = ['User', 'Rating (★★★★★)', 'Review', 'Posted'];
  return (
    <div className="row justify-content-center">
      <div className="col-sm-12 col-lg-8">
        <Table headers={headers}>
          {rows ? rows.map(row => (
            <tr key={row.id}>
              <td>
                <Link className="mint" to={`/user/${row.user.id}`}>
                  {row.user.username}
                </Link>
              </td>
              <td>{'★'.repeat(row.stars)}</td>
              <td>{row.comment}</td>
              <td>{row.ago}</td>
            </tr>
          )) : [<tr key={0}><td colSpan={headers.length} align="center">Loading...</td></tr>]}
        </Table>
      </div>
    </div>
  );
};

MovieReviewsTable.propTypes = {
  rows: PropTypes.array,
};

export { MovieReviewsTable as default };

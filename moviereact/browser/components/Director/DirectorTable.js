import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// components
import Table from '../Table';

const DirectorTable = (props) => {
  const { rows } = props;
  const headers = ['Movie', 'Released'];
  return (
    <div className="row justify-content-center">
      <div className="col-sm-12 col-lg-8">
        <Table headers={headers}>
          {rows ? rows.map(row => (
            <tr key={row.id}>
              <td>
                <h6>
                  <Link className="mint" to={`/movies/film/${row.id}`}>
                    {row.title}
                  </Link>
                </h6>
              </td>
              <td>{row.year}</td>
            </tr>
          )) : [<tr key={0}><td colSpan={headers.length} align="center">Loading...</td></tr>]}
        </Table>
      </div>
    </div>
  );
};

DirectorTable.propTypes = {
  rows: PropTypes.array,
};

export { DirectorTable as default };

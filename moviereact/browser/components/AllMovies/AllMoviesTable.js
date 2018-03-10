import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// components
import Table from '../Table';

const AllMoviesTable = (props) => {
  const { rows } = props;
  const headers = ['Movie', 'Director', 'Year'];
  return (
    <div className="row justify-content-center">
      <div className="col-sm-12 col-lg-8">
        <Table headers={headers}>
          {rows ? rows.map(row => (
            <tr key={row.id}>
              <td>
                <h6>
                  <Link to={`/movies/film/${row.id}`} className="mint">
                    {row.title}
                  </Link>
                </h6>
              </td>
              <td>
                <Link to={`/director/${row.director.id}`} className="white">
                  {row.director.name}
                </Link>
              </td>
              <td>{row.year}</td>
            </tr>
          )) : [<tr key={0}><td colSpan={headers.length} align="center">Loading...</td></tr>]}
        </Table>
      </div>
    </div>
  );
};

AllMoviesTable.propTypes = {
  rows: PropTypes.array,
};

export { AllMoviesTable as default };

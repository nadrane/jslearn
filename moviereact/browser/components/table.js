import React from 'react';
import PropTypes from 'prop-types';

const Table = (props) => {
  const { headers, RowClass, rows } = props;

  return (
    <div className="row justify-content-center">
      <div className="col-sm-12 col-lg-8">
          <table className="table table-dark">
            <thead className="thead-light">
              <tr>
                {headers.map((header, i) => (
                  <th key={i} scope="col">
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows ? (
                rows.map(row => (
                  <RowClass
                    row={row}
                    key={row.id}
                    id={row.id} />
                  ))
              ) : (<tr><td colSpan={headers.length} align="center">Loading...</td></tr>)}
            </tbody>
          </table>
      </div>
    </div>
  );
};

Table.propTypes = {
  headers: PropTypes.array,
  RowClass: PropTypes.func,
  rows: PropTypes.array,
};

export { Table as default };

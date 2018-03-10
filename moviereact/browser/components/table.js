import React from 'react';
import PropTypes from 'prop-types';

const Table = (props) => {
  const { headers } = props;

  return (
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
        {props.children}
      </tbody>
    </table>
  );
};

Table.propTypes = {
  headers: PropTypes.array,
  children: PropTypes.array,
};

export { Table as default };

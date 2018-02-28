import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const DirectorRow = props => (
  <tr>
    <td>
      <h6>
        <Link className="mint" to={`/movies/film/${props.row.id}`}>
          {props.row.title}
        </Link>
      </h6>
    </td>
    <td>{props.row.year}</td>
  </tr>
);

DirectorRow.propTypes = {
  row: PropTypes.object.isRequired,
  id: PropTypes.number,
};

export { DirectorRow as default };

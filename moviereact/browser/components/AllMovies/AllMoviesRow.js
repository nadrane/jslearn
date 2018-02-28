import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const AllMoviesRow = props => (
  <tr>
    <td>
      <h6>
        <Link to={`/movies/film/${props.id}`} className="mint">
          {props.row.title}
        </Link>
      </h6>
    </td>
    <td>
      <Link to={`/director/${props.row.director.id}`} className="white">
        {props.row.director.name}
      </Link>
    </td>
    <td>{props.row.year}</td>
  </tr>
);

AllMoviesRow.propTypes = {
  row: PropTypes.object.isRequired,
  id: PropTypes.number,
};

export { AllMoviesRow as default };

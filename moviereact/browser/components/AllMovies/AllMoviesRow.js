import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const AllMoviesRow = props => (
  <tr>
    <td>
      <h6>
        <a href={`/movies/film/${props.id}`}>
          {props.row.title}
        </a>
      </h6>
    </td>
    <td>
      <a href={`/director/${props.row.director.id}`} className="white">
        {props.row.director.name}
      </a>
    </td>
    <td>{props.row.year}</td>
  </tr>
);

AllMoviesRow.propTypes = {
  row: PropTypes.object.isRequired,
  id: PropTypes.number,
  handleMovieLink: PropTypes.func,
};

export { AllMoviesRow as default };
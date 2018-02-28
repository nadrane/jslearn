import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const UserReviewsRow = props => (
  <tr>
    <td>
      <Link className="mint" to={`/movies/film/${props.row.movie.id}`}>
        {props.row.movie.title}
      </Link>
    </td>
    <td>{'★'.repeat(props.row.stars)}</td>
    <td>{props.row.comment}</td>
    <td>{props.row.ago}</td>
  </tr>
);

UserReviewsRow.propTypes = {
  row: PropTypes.object.isRequired,
  id: PropTypes.number,
};

export { UserReviewsRow as default };

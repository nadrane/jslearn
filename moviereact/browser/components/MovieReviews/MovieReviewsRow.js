import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const MovieReviewsRow = props => (
  <tr>
    <td>
      <Link className="mint" to={`/user/${props.row.user.id}`}>
        {props.row.user.username}
      </Link>
    </td>
    <td>{'★'.repeat(props.row.stars)}</td>
    <td>{props.row.comment}</td>
    <td>{props.row.ago}</td>
  </tr>
);

MovieReviewsRow.propTypes = {
  row: PropTypes.object.isRequired,
  id: PropTypes.number,
};

export { MovieReviewsRow as default };

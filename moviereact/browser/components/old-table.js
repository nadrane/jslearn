import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

const MoviesRow = props => (
  <tr>
    <td>
      <h6>
        <Link to={`/movies/film/${props.id}`}>
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

const UserRow = props => (
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

const ReviewsRow = props => (
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

const Table = (props) => {
  let headers;
  let RowClass;
  const { type, rows } = props;

  if (type === 'allMovies') {
    headers = ['Movie', 'Director', 'Year'];
    RowClass = MoviesRow;
  } else if (type === 'userReviews') {
    headers = ['Movie', 'Rating (★★★★★)', 'Review', 'Posted'];
    RowClass = UserRow;
  } else if (type === 'director') {
    headers = ['Movie', 'Released'];
    RowClass = DirectorRow;
  } else if (type === 'movieReviews') {
    headers = ['User', 'Rating (★★★★★)', 'Review', 'Posted'];
    RowClass = ReviewsRow;
  }

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

DirectorRow.propTypes = {
  row: PropTypes.object.isRequired,
};
MoviesRow.propTypes = {
  row: PropTypes.object.isRequired,
  id: PropTypes.number,
};
UserRow.propTypes = {
  row: PropTypes.object.isRequired,
};
ReviewsRow.propTypes = {
  row: PropTypes.object.isRequired,
};
Table.propTypes = {
  type: PropTypes.string,
  rows: PropTypes.array,
};

export { MoviesRow, UserRow, DirectorRow, ReviewsRow, Table };

// import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { BSRow, BSCol } from './layout';

const MoviesRow = props => (
  <tr>
    <td>
      <h6>
        <a onClick={props.handleMovieLink} href="/" id={props.id}>
          {props.row.title}
        </a>
      </h6>
    </td>
    <td>
      <a className="white" href={`/director/${props.row.director.id}`}>
        {props.row.director.name}
      </a>
    </td>
    <td>{props.row.year}</td>
  </tr>
);

const UserRow = props => (
  <tr>
    <td>
      <a className="mint" href={`/movies/film/${props.row.movie.id}`}>
        {props.row.movie.title}
      </a>
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
        <a className="mint" href={`/movies/film/${props.row.id}`}>
          {props.row.title}
        </a>
      </h6>
    </td>
    <td>{props.row.year}</td>
  </tr>
);

const ReviewsRow = props => (
  <tr>
    <td>
      <a className="mint" href={`/user/${props.row.user.id}`}>
        {props.row.user.username}
      </a>
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
    <BSRow>
      <BSCol colClass="col-sm-12 col-lg-8">
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
                    handleMovieLink={props.handleMovieLink}
                    row={row}
                    key={row.id}
                    id={row.id} />
                  ))
              ) : (<tr><td colSpan={headers.length} align="center">Loading...</td></tr>)}
            </tbody>
          </table>
      </BSCol>
    </BSRow>
  );
};

DirectorRow.propTypes = {
  row: PropTypes.object.isRequired,
};
MoviesRow.propTypes = {
  row: PropTypes.object.isRequired,
  id: PropTypes.number,
  handleMovieLink: PropTypes.func,
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
  handleMovieLink: PropTypes.func,
};

export { MoviesRow, UserRow, DirectorRow, ReviewsRow, Table };

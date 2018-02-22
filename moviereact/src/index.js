import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

function MovieRow(props) {
  return (
    <tr>
      <th scope="row">
        <h6><a className="mint" href={`/movies/film/${props.movie.id}`}>{props.movie.title}</a></h6>
      </th>
      <td>
        <a className="white" href={`/director/${props.movie.director.id}`}>{props.movie.director.name}</a>
      </td>
      <td>{props.movie.year}</td>
    </tr>
  );
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: props.tableData,
      tableType: props.tableType,
    };
  }
  render() {
    let headers;
    let rows;
    if (this.state.tableType === 'movies') {
      headers = ['Movie', 'Director', 'Year'];
      rows = this.state.tableData.map(movie => <MovieRow movie={movie} key={movie.id} />);
    } else if (this.state.type === 'reviews') {
      headers = ['User', 'Stars', 'Review'];
      // get userRows
    }

    return (
      <table className="table table-dark">
          <thead className="thead-light">
              <tr>
                  {headers.map((header, i) => <th key={i} scope="col">{header}</th>)}
              </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
      </table>
    );
  }
}

function Panel() {
  return (
      <div className="panel">
          <h1>Thank you for watching movies.</h1>
          <button
            type="button"
            className="btn movie-btn add-btn mx-1"
            data-toggle="modal"
            data-target="#modal2">
            + Add Director
          </button>
          <button
            type="button"
            className="btn movie-btn add-btn mx-1"
            data-toggle="modal"
            data-target="#modal1">
            + Add Film
          </button>
          <h6 className="mint my-2">Sign in to add a movie, director, or review.</h6>
      </div>
  );
}

MovieRow.propTypes = {
  movie: PropTypes.object.isRequired,
};

Table.propTypes = {
  tableData: PropTypes.array.isRequired,
  tableType: PropTypes.string.isRequired,
};

axios.get('http://localhost:8080/movies')
  .then((resp) => {
    ReactDOM.render(
      <Panel />,
      document.getElementById('panelRoot'),
    );
    ReactDOM.render(
      <Table
        tableData={resp.data.movies}
        tableType={'movies'}
      />,
      document.getElementById('tableRoot'),
    );
  })
  .catch(e => console.log(e));

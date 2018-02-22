import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

function MovieRow(props) {
  return (
    <tr>
      <td>
        <h6>
          <a className="mint" href={`/movies/film/${props.row.id}`}>
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
}

function ReviewRow(props) {
  return (
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
}

function DirectorRow(props) {
  return (
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
}

class Table extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tableData: props.tableData,
    };
  }

  render() {
    let headers;
    let RowClass;
    const { tableType } = this.props;
    const { tableData } = this.state;

    if (tableType === 'movie') {
      headers = ['Movie', 'Director', 'Year'];
      RowClass = MovieRow;
    } else if (tableType === 'review') {
      headers = ['Movie', 'Rating', 'Review (★★★★★)', 'Posted'];
      RowClass = ReviewRow;
    } else if (tableType === 'director') {
      headers = ['Movie', 'Released'];
      RowClass = DirectorRow;
    }

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
          {tableData ? (
            tableData.map(row => (<RowClass row={row} key={row.id} />))
          ) : (<tr><td>Loading...</td></tr>)}
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

DirectorRow.propTypes = {
  row: PropTypes.object.isRequired,
};
MovieRow.propTypes = {
  row: PropTypes.object.isRequired,
};
ReviewRow.propTypes = {
  row: PropTypes.object.isRequired,
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
        tableType={'movie'}
      />,
      document.getElementById('tableRoot'),
    );
  })
  .catch(e => console.log(e));

// axios.get('http://localhost:8080/user/2')
//   .then((resp) => {
//     ReactDOM.render(
//       <Panel />,
//       document.getElementById('panelRoot'),
//     );
//     ReactDOM.render(
//       <Table
//         tableData={resp.data.user.reviews}
//         tableType={'review'}
//       />,
//       document.getElementById('tableRoot'),
//     );
//   })
//   .catch(e => console.log(e));

// axios.get('http://localhost:8080/director/6')
//   .then((resp) => {
//     ReactDOM.render(
//       <Panel />,
//       document.getElementById('panelRoot'),
//     );
//     ReactDOM.render(
//       <Table
//         tableData={resp.data.director.movies}
//         tableType={'director'}
//       />,
//       document.getElementById('tableRoot'),
//     );
//   })
//   .catch(e => console.log(e));

import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import './index.css';

function MovieRow(props) {
  return (
    <tr>
      <td>
        <h6><a className="mint" href={`/movies/film/${props.data.id}`}>{props.data.title}</a></h6>
      </td>
      <td>
        <a className="white" href={`/director/${props.data.director.id}`}>{props.data.director.name}</a>
      </td>
      <td>{props.data.year}</td>
    </tr>
  );
}

function ReviewRow(props) {
  return (
    <tr>
      <td><a className="mint" href={`/movies/film/${props.data.movie.id}`}>{props.data.movie.title}</a></td>
      <td>{'★'.repeat(props.data.stars)}</td>
      <td>{props.data.comment}</td>
      <td>{props.data.ago}</td>
    </tr>
  );
}

function DirectorRow(props) {
  return (
    <tr>
      <td><h6><a className="mint" href={`/movies/film/${props.data.id}`}>{props.data.title}</a></h6></td>
      <td>{props.data.year}</td>
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
    const type = this.state.tableType;
    let RowClass;

    if (type === 'movie') {
      headers = ['Movie', 'Director', 'Year'];
      RowClass = MovieRow;
    } else if (type === 'review') {
      headers = ['Movie', 'Rating', 'Review (★★★★★)', 'Posted'];
      RowClass = ReviewRow;
    } else if (type === 'director') {
      headers = ['Movie', 'Released'];
      RowClass = DirectorRow;
    }
    const rows = this.state.tableData.map(obj => <RowClass data={obj} key={obj.id} />);
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

DirectorRow.propTypes = {
  data: PropTypes.object.isRequired,
};
MovieRow.propTypes = {
  data: PropTypes.object.isRequired,
};
ReviewRow.propTypes = {
  data: PropTypes.object.isRequired,
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

// axios.get('http://localhost:8080/director/5')
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

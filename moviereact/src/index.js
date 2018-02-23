import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { BrowserRouter as Router, Link, Route } from 'react-router-dom';
import './index.css';

// const hi = ({ match }) => (
//   <div>
//     {match.params.id}
//   </div>
// );

function MovieRow(props) {
  return (
    <tr>
      <td>
        <h6>
          <Link to={`/movie/${props.id}`}>
            {props.row.title}
          </Link>
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
    // ive read that its bad to set state from props, or that you dont need constructor call??
    this.state = {
      rows: null,
    };
  }

  componentDidMount() {
    axios.get(this.props.fetchUrl)
      .then(this.props.fetchFormat)
      .then((rows) => {
        this.setState({
          rows,
        });
      }).catch(e => console.log(e));
  }

  render() {
    let headers;
    let RowClass;
    const { type } = this.props;
    const { rows } = this.state;

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
                rows.map(row => (<RowClass row={row} key={row.id} id={row.id} />))
              ) : (<tr><td colSpan={headers.length} align="center">Loading...</td></tr>)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function Panel() {
  return (
    <div className="row justify-content-center">
      <div className="col-sm-12 col-lg-4">
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
      </div>
    </div>
  );
}

// class App extends React.Component {
function App() {
  return (
    <Router>
      <div>
        <Panel />
        <Route path='/movie' render={() => (
          <Table
            type={'movie'}
            fetchUrl={'http://localhost:8080/movies'}
            fetchFormat={resp => resp.data.movies}
          />
        )}/>
        <Route path='/user' render={() => (
          <Table
            type={'review'}
            fetchUrl={'http://localhost:8080/user/4'}
            fetchFormat={resp => resp.data.user.reviews}
          />
        )}/>
      </div>
    </Router>
  );
}

DirectorRow.propTypes = {
  row: PropTypes.object.isRequired,
};
MovieRow.propTypes = {
  row: PropTypes.object.isRequired,
  id: PropTypes.number,
};
ReviewRow.propTypes = {
  row: PropTypes.object.isRequired,
};

Table.propTypes = {
  type: PropTypes.string.isRequired,
  rows: PropTypes.array,
  fetchUrl: PropTypes.string,
  fetchFormat: PropTypes.func,
};

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);

// ReactDOM.render(
//   <Table
//     tableType={'review'}
//     url={'http://localhost:8080/user/2'}
//   />,
//   document.getElementById('tableRoot'),
// );

// ReactDOM.render(
//   <Table
//     tableType={'director'}
//     url={'http://localhost:8080/director/6'}
//   />,
//   document.getElementById('tableRoot'),
// );

// axios.get('http://localhost:8080/movies')
//   .then((resp) => {
//     ReactDOM.render(
//       <Panel />,
//       document.getElementById('panelRoot'),
//     );
//     ReactDOM.render(
//       <Table
//         rows={resp.data.movies}
//         tableType={'movie'}
//       />,
//       document.getElementById('tableRoot'),
//     );
//   })
//   .catch(e => console.log(e));

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

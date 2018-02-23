import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import config from './config';
import './index.css';

const BSRow = props => (
    <div className="row justify-content-center" {...props} />
);

const BSCol = props => (
    <div className={props.colClass}>
      {props.value}
    </div>
);

const MoviesRow = props => (
    <tr>
      <td>
        <h6>
          <a href={`/movies/film/${props.id}`}>
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

const Panel = props => (
    <BSRow>
      <BSCol
        colClass="col-sm-12 col-lg-4"
        value={(
          <div className="panel">
            <h1>{props.h1}</h1>
            <button
              type="button"
              className="btn movie-btn add-btn mx-1"
              data-toggle="modal"
              data-target="#modal2">
              {props.b1}
            </button>
            <button
              type="button"
              className="btn movie-btn add-btn mx-1"
              data-toggle="modal"
              data-target="#modal1">
              {props.b2}
            </button>
            <h6 className="mint my-2">{props.h6}</h6>
          </div>
        )}
      />
    </BSRow>
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
      <BSCol
        colClass="col-sm-12 col-lg-8"
        value={(
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
        )}
      />
    </BSRow>
  );
};

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rows: null,
    };
  }

  componentDidMount() {
    const { fetchPath, fetchFormat } = this.props;
    let fetchUrl = `${config.fetchRoot}/${fetchPath}`;
    if (this.props.matchId) {
      fetchUrl = `${fetchUrl}/${this.props.matchId}`;
    }
    axios.get(fetchUrl)
      .then(fetchFormat)
      .then((rows) => {
        this.setState({
          rows,
        });
      }).catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <Panel
          h1='ok!'
          b1='fuck '
          b2='yrd'
          h6='geee'
          h7={this.state.hi}
        />
        <Table
          type={this.props.type}
          rows={this.state.rows}
        />
      </div>
    );
  }
}

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/' render={() => (
          <Redirect to='/movies'/>
        )}/>
        <Route exact path='/movies' render={() => (
          <Main
            {...config.allMovies}
          />
        )}/>
        <Route exact path='/movies/film/:id' render={({ match }) => (
          <Main
            {...config.movieReviews}
            matchId={match.params.id}
          />
        )}/>
        <Route exact path='/user/:id' render={({ match }) => (
          <Main
            {...config.userReviews}
            matchId={match.params.id}
          />
        )}/>
        <Route exact path='/director/:id' render={({ match }) => (
          <Main
            {...config.director}
            matchId={match.params.id}
          />
        )}/>
        <Route render={() => (
          <Panel h1='404!' />
        )}/>
      </Switch>
    </Router>
  );
}

BSCol.propTypes = {
  colClass: PropTypes.string.isRequired,
  value: PropTypes.object,
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

Panel.propTypes = {
  h1: PropTypes.string,
  b1: PropTypes.string,
  b2: PropTypes.string,
  h6: PropTypes.string,
};

Table.propTypes = {
  type: PropTypes.string,
  rows: PropTypes.array,
};

Main.propTypes = {
  matchId: PropTypes.string,
  type: PropTypes.string,
  fetchPath: PropTypes.string,
  fetchFormat: PropTypes.func,
};

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);

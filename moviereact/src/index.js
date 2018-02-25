import { BrowserRouter as Router, Redirect, Route, Switch, Link } from 'react-router-dom';
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

const Nav = props => (
  <nav className="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
    <div className="container">
        <a id="brand" className="navbar-brand" href="/">Movietown!</a>
    </div>
      {props.session ? (
        <ul className="navbar-nav mr-auto">
          <li>
              <a className="white mr-5"
                href={`/user/${props.session.id}`}>
                {props.session.username}
              </a>
          </li>
          <li>
              <button
                className="mint my-2 my-sm-0 btn-link"
                href="/auth/logout"
                onClick={props.onLogout}>
                Logout
              </button>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav mr-auto">
          <li>
              <a className="mint my-2 mx-2 my-sm-0" href="/auth/session">
                Sign In
              </a>
          </li>
          <li>
              <a className="mint my-2 mx-2 my-sm-0" href="/auth/register">
                Register
              </a>
          </li>
        </ul>
      )}
  </nav>
);

const MoviesRow = props => (
    <tr>
      <td>
        <h6>
          <Link to={`/movies/film/${props.id}`}>
            {props.row.title}
          </Link>
          {/* <a href={`/movies/film/${props.id}`}>
            {props.row.title}
          </a> */}
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

const PanelInfo = (props) => {
  let stats;
  if (props.stats) {
    stats = props.stats.map((stat, i) => (
      <div key={i}><strong>{stat[0]}:</strong> {stat[1]}</div>
    ));
  }
  return (
    <div className="panel-info">
      <hr/>
      {stats}
      {props.text}
      {props.session ? props.user : props.guest}
    </div>
  );
};

const Panel = (props) => {
  let panelHeader = props.msg || '...';
  let panelInfo;
  const { type, data, session } = props;

  if (data) {
    if (type === 'allMovies') {
      panelHeader = 'All Movies';
      panelInfo = (
        <PanelInfo
          session={session}
          user={(
            <span>
              <button type="button"
                className="btn movie-btn add-btn mx-2"
                data-toggle="modal"
                data-target="#modal2">
                + Add Director
              </button>
              <button type="button"
                className="btn movie-btn add-btn mx-2"
                data-toggle="modal"
                data-target="#modal1">
                + Add Film
              </button>
            </span>
          )}
          guest={(
            <h6 className="mint">
              Sign in to add directors and movies.
            </h6>
          )}
        />
      );
    } else if (type === 'userReviews') {
      panelHeader = data.user.username;
      panelInfo = (
        <PanelInfo
          session={session}
          text={(
            <span>
              <strong>{data.user.username} </strong>
              has posted
              <strong> {data.count} </strong>review(s) on Movietown.
            </span>
          )}
        />
      );
    } else if (type === 'director') {
      panelHeader = data.director.name;
      panelInfo = (
        <PanelInfo
          session={session}
          text={(
            <span>
              <strong>{data.director.name} </strong>
              has released
              <strong> {data.count} </strong> film(s) on Movietown.
            </span>
          )}
        />
      );
    } else if (type === 'movieReviews') {
      panelHeader = data.movie.title;
      panelInfo = (
        <PanelInfo
          session={session}
          stats={[
            ['Avg. Score', `${data.avg} ★`],
            ['Released', data.movie.year],
            ['Director', (<a key={0} href={`/director/${data.movie.director.id}`}>{data.movie.director.name}</a>)],
          ]}
          user={(
            <button type="button"
              className="btn movie-btn add-btn"
              data-toggle="modal"
              data-target="#modal1">
              + Add Review
            </button>
          )}
        />
      );
    }
  }

  return (
    <BSRow>
      <BSCol
        colClass="col-sm-12 col-lg-5"
        value={(
          <div className="panel">
            <h1>{panelHeader}</h1>
            {panelInfo}
          </div>
        )}
      />
    </BSRow>
  );
};

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
      panelData: null,
      rows: null,
    };
  }

  componentDidMount() {
    let rows;
    let panelData;
    const { fetchPath, rowFormat } = this.props;
    let fetchUrl = `${config.fetchRoot}/${fetchPath}`;

    if (this.props.matchId) {
      fetchUrl = `${fetchUrl}/${this.props.matchId}`;
    }

    axios.get(fetchUrl)
      .then((resp) => {
        panelData = resp.data;
        rows = rowFormat(panelData);
        this.setState({
          rows,
          panelData,
        });
      }).catch(e => console.log(e));
  }

  render() {
    const { type, session } = this.props;
    return (
      <div>
        {/* <Nav session={session}/> */}
        <div className="container-fluid">
          <Panel
            data={this.state.panelData}
            type={type}
            session={session}
          />
          <Table
            rows={this.state.rows}
            type={type}
          />
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: {
        id: 1,
        username: 'david',
      },
    };
  }

  handleLogout() {
    this.setState({ session: null });
  }

  render() {
    return (
      <Router>
        <div>
          <Nav session={this.state.session} onLogout={() => this.handleLogout()}/>
          <Switch>
            <Route exact path='/' render={() => (
              <Redirect to='/movies'/>
            )}/>
            <Route exact path='/movies' render={() => (
              <Main
                {...config.allMovies}
                session={this.state.session}
              />
            )}/>
            <Route exact path='/movies/film/:id' render={({ match }) => (
              <Main
                {...config.movieReviews}
                matchId={match.params.id}
                session={this.state.session}
              />
            )}/>
            <Route exact path='/user/:id' render={({ match }) => (
              <Main
                {...config.userReviews}
                matchId={match.params.id}
                session={this.state.session}
              />
            )}/>
            <Route exact path='/director/:id' render={({ match }) => (
              <Main
                {...config.director}
                matchId={match.params.id}
                session={this.state.session}
              />
            )}/>
            <Route render={() => (
              <Panel msg='404!' />
            )}/>
          </Switch>
        </div>
      </Router>
    );
  }
}

BSCol.propTypes = {
  colClass: PropTypes.string.isRequired,
  value: PropTypes.object,
};
Nav.propTypes = {
  session: PropTypes.object,
  onLogout: PropTypes.func,
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
PanelInfo.propTypes = {
  text: PropTypes.object,
  stats: PropTypes.array,
  session: PropTypes.object,
  user: PropTypes.object,
  guest: PropTypes.object,
};
Panel.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
  msg: PropTypes.string,
  session: PropTypes.object,
};
Table.propTypes = {
  type: PropTypes.string,
  rows: PropTypes.array,
};
Main.propTypes = {
  matchId: PropTypes.string,
  type: PropTypes.string,
  fetchPath: PropTypes.string,
  rowFormat: PropTypes.func,
  session: PropTypes.object,
};

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);

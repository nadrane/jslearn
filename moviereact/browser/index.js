import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

// components
import { AllMoviesPage, MoviePage, UserPage, DirectorPage } from './components/page';
import Auth from './components/auth';
import { NavBar } from './components/layout';
import { Panel } from './components/panel';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: null,
      authName: '',
      redirect: false,
    };
    this.handleAuthNameChange = this.handleAuthNameChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleAuthNameChange(value) {
    this.setState({ authName: value });
  }

  handleLogin(e) {
    e.preventDefault();
    this.setState({ authName: '' });
    console.log('posting here')
    axios.post('http://localhost:3000/auth/login', {
      username: this.state.authName,
    }).then((resp) => {
      if (resp.data.uid) {
        this.setState({
          redirect: true,
          session: {
            id: resp.data.uid,
            username: resp.data.username,
          },
        });
      }
    }).catch(err => console.log(err));
  }

  handleRegister(e) {
    e.preventDefault();
    this.setState({ authName: '' });
    axios.post('http://localhost:8080/auth/register', {
      username: this.state.authName,
    }).then((resp) => {
      if (resp.data.uid) {
        this.setState({
          redirect: true,
          session: {
            id: resp.data.uid,
            username: resp.data.username,
          },
        });
      }
    }).catch(err => console.log(err));
  }

  handleLogout(e) {
    e.preventDefault();
    this.setState({ session: null });
  }

  render() {
    if (this.state.redirect) {
      this.setState({ redirect: false });
      return (
        <Router>
          <Redirect to='/movies'/>
        </Router>
      );
    }
    return (
      <Router>
        <div>
          <NavBar session={this.state.session} onLogout={this.handleLogout}/>
          <Switch>
            <Route exact path='/' render={() => (
              <Redirect to='/movies'/>
            )}/>
            <Route exact path='/movies' render={() => (
              <AllMoviesPage
                session={this.state.session}
              />
            )}/>
            <Route exact path='/movies/film/:id' render={({ match }) => (
              <MoviePage
                matchId={match.params.id}
                session={this.state.session}
              />
            )}/>
            <Route exact path='/user/:id' render={({ match }) => (
              <UserPage
                matchId={match.params.id}
                session={this.state.session}
              />
            )}/>
            <Route exact path='/director/:id' render={({ match }) => (
              <DirectorPage
                matchId={match.params.id}
                session={this.state.session}
              />
            )}/>
            <Route exact path='/auth/login' render={() => (
              <Auth handleLogin={this.handleLogin} authName={this.state.authName} handleAuthNameChange={this.handleAuthNameChange} />
            )}/>
            <Route exact path='/auth/register' render={() => (
              <Auth register={true} handleRegister={this.handleRegister} authName={this.state.authName} handleAuthNameChange={this.handleAuthNameChange} />
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

ReactDOM.render(
  <App/>,
  document.getElementById('root'),
);

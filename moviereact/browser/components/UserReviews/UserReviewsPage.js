import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fetchRoot } from '../../config';

// components
import UserReviewsPanel from './UserReviewsPanel';
import UserReviewsTable from './UserReviewsTable';
import Panel from '../Panel';

class UserReviewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      rows: null,
      err: null,
    };
  }

  componentDidMount() {
    axios.get(`${fetchRoot}/user/${this.props.matchId}`)
      .then(resp => this.setState({
        user: resp.data.user,
        rows: resp.data.user.reviews,
      }))
      .catch((err) => {
        const { status } = err.response;
        if (status === 404 || status === 500) {
          this.setState({
            err: { header: 'Not found!', message: "That user doesn't exist." },
          });
        }
      });
  }

  render() {
    const { session } = this.props;
    const { user, rows, err } = this.state;
    if (err) {
      return (<Panel header={err.header} message={err.message} />);
    }
    if (user) {
      return (
        <div>
          <div className="container-fluid">
            <UserReviewsPanel
              session={session}
              user={user}
              count={user.reviews.length}
            />
            <UserReviewsTable rows={rows} />
          </div>
        </div>
      );
    } return null;
  }
}

UserReviewsPage.propTypes = {
  matchId: PropTypes.string,
  session: PropTypes.object,
};

export { UserReviewsPage as default };

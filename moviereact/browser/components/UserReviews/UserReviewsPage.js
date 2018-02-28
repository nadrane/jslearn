import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fetchRoot } from '../../config';

// components
import UserReviewsPanel from './UserReviewsPanel';
import UserReviewsTable from './UserReviewsTable';

class UserReviewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panelData: null,
      rows: null,
    };
  }

  componentDidMount() {
    axios.get(`${fetchRoot}/user/${this.props.matchId}`)
      .then((resp) => {
        this.setState({
          panelData: resp.data,
          rows: resp.data.user.reviews,
        });
      }).catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <UserReviewsPanel session={this.props.session} panelData={this.state.panelData} />
          <UserReviewsTable rows={this.state.rows} />
        </div>
      </div>
    );
  }
}

UserReviewsPage.propTypes = {
  matchId: PropTypes.string,
  session: PropTypes.object,
};

export { UserReviewsPage as default };

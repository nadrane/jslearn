import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { fetchRoot } from '../../config';

// components
import DirectorPanel from './DirectorPanel';
import DirectorTable from './DirectorTable';

class DirectorPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      panelData: null,
      rows: null,
    };
  }

  componentDidMount() {
    axios.get(`${fetchRoot}/director/${this.props.matchId}`)
      .then((resp) => {
        this.setState({
          panelData: resp.data,
          rows: resp.data.director.movies,
        });
      }).catch(e => console.log(e));
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <DirectorPanel session={this.props.session} panelData={this.state.panelData} />
          <DirectorTable rows={this.state.rows} />
        </div>
      </div>
    );
  }
}

DirectorPage.propTypes = {
  matchId: PropTypes.string,
  session: PropTypes.object,
};

export { DirectorPage as default };

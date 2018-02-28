import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

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
    const { session, type, modals } = this.props;
    const { panelData, rows } = this.state;
    if (panelData) {
      return (
        <div>
          <div className="container-fluid">
            <Panel
              panelData={panelData}
              type={type}
              session={session}
            />
            <Table
              rows={rows}
              type={type}
            />
          </div>
          {modals}
        </div>
      );
    } return null;
  }
}
Main.propTypes = {
  matchId: PropTypes.string,
  type: PropTypes.string,
  fetchPath: PropTypes.string,
  rowFormat: PropTypes.func,
  session: PropTypes.object,
  modals: PropTypes.object,
};
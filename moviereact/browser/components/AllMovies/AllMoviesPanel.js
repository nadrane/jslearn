import PropTypes from 'prop-types';
import React from 'react';

// components
import Panel from '../Panel';
import PanelInfo from '../PanelInfo';
import { ModalButtons } from '../modal';

const AllMoviesPanel = (props) => {
  const { session } = props;
  const panelHeader = 'All Movies';
  const panelInfo = (
    <PanelInfo
      session={session}
      user={(
        <ModalButtons
          buttons={[
            ['+ Add Director', 'addDirector'],
            ['+ Add Film', 'addMovie'],
          ]}
        />
      )}
      guest={(
        <h6 className="mint">
          Sign in to add directors and movies.
        </h6>
      )}
    />
  );

  return (
    <Panel header={panelHeader} panelInfo={panelInfo} />
  );
};

AllMoviesPanel.propTypes = {
  type: PropTypes.string,
  panelData: PropTypes.object,
  msg: PropTypes.string,
  session: PropTypes.object,
};

export { AllMoviesPanel as default };

import PropTypes from 'prop-types';
import React from 'react';

// components
import Panel from '../Panel';

const AllMoviesPanel = (props) => {
  const { session, handleOpenModal } = props;
  return (
    <Panel
      session={session}
      header="All Movies"
      user={(
        <span>
          <button
              name="addDirectorBtn"
              onClick={handleOpenModal}
              type="button"
              className="btn movie-btn control-btn mx-2">
            + Add Director
          </button>
          <button
              name="addMovieBtn"
              onClick={handleOpenModal}
              type="button"
              className="btn movie-btn control-btn mx-2">
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
};

AllMoviesPanel.propTypes = {
  session: PropTypes.object,
  handleOpenModal: PropTypes.func,
};

export { AllMoviesPanel as default };

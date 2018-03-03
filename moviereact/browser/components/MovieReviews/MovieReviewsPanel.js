import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// components
import Panel from '../Panel';
import PanelInfo from '../PanelInfo';

const MovieReviewsPanel = (props) => {
  const {
    session, movie, avg, handleOpenModal,
  } = props;
  const dirLink = (
    <Link to={`/director/${movie.director.id}`}>{movie.director.name}</Link>
  );
  return (
    <Panel
      header={movie.title}
      panelInfo={(
        <PanelInfo
          stats={[
            ['Avg. Score', `${avg} ★`],
            ['Released', movie.year],
            ['Director', dirLink],
          ]}
          session={session}
          user={(
            <button
                onClick={handleOpenModal}
                type="button"
                className="btn movie-btn add-btn mx-2">
              + Add Review
            </button>
          )}
        />
      )}
    />
  );
};

MovieReviewsPanel.propTypes = {
  movie: PropTypes.object,
  avg: PropTypes.string,
  session: PropTypes.object,
  handleOpenModal: PropTypes.func,
};

export { MovieReviewsPanel as default };

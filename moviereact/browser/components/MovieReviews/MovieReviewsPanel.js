import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// components
import Panel from '../Panel';
import PanelInfo from '../PanelInfo';

const MovieReviewsPanel = (props) => {
  const { session, movie, handleOpenModal } = props;
  let panelHeader;
  let panelInfo;
  if (movie) {
    panelHeader = movie.title;
    panelInfo = (
      <PanelInfo
        stats={[
          ['Avg. Score', `${movie.avg} ★`],
          ['Released', movie.year],
          [
            'Director',
            (
              <Link key={0} to={`/director/${movie.director.id}`}>
                {movie.director.name}
              </Link>
            ),
          ],
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
    );
  }

  return (
    <Panel header={panelHeader} panelInfo={panelInfo} />
  );
};

MovieReviewsPanel.propTypes = {
  movie: PropTypes.object,
  session: PropTypes.object,
  handleOpenModal: PropTypes.func,
};

export { MovieReviewsPanel as default };

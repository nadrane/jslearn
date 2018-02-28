import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

// components
import Panel from '../Panel';
import PanelInfo from '../PanelInfo';
import { ModalButtons } from '../modal';

const MovieReviewsPanel = (props) => {
  const { session, panelData } = props;
  let panelHeader;
  let panelInfo;
  if (panelData) {
    panelHeader = panelData.movie.title;
    panelInfo = (
      <PanelInfo
        stats={[
          ['Avg. Score', `${panelData.avg} ★`],
          ['Released', panelData.movie.year],
          [
            'Director',
            (
              <Link key={0} to={`/director/${panelData.movie.director.id}`}>
                {panelData.movie.director.name}
              </Link>
            ),
          ],
        ]}
        session={session}
        user={(
          <ModalButtons buttons={[['+ Add Review', 'addReview']]} />
        )}
      />
    );
  }

  return (
    <Panel header={panelHeader} panelInfo={panelInfo} />
  );
};

MovieReviewsPanel.propTypes = {
  panelData: PropTypes.object,
  session: PropTypes.object,
};

export { MovieReviewsPanel as default };

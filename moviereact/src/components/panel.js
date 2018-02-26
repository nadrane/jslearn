import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import { BSRow, BSCol } from './layout';
import { ModalButtons } from './modal';

const PanelInfo = (props) => {
  let stats;
  if (props.stats) {
    stats = props.stats.map(([field, value], i) => (
      <div key={i}><strong>{field}:</strong> {value}</div>
    ));
  }
  return (
    <div className="panel-info">
      <hr/>
      {stats}
      {props.text}
      {props.session ? props.user : props.guest}
    </div>
  );
};
PanelInfo.propTypes = {
  text: PropTypes.object,
  stats: PropTypes.array,
  session: PropTypes.object,
  user: PropTypes.object,
  guest: PropTypes.object,
};

const Panel = (props) => {
  let panelHeader = props.msg || '...';
  let panelInfo;
  const { type, panelData, session } = props;

  if (panelData) {
    if (type === 'allMovies') {
      panelHeader = 'All Movies';
      panelInfo = (
        <PanelInfo
          session={session}
          user={(
            <ModalButtons buttons={[['+ Add Director', 'addDirector'], ['+ Add Film', 'addMovie']]} />
          )}
          guest={(
            <h6 className="mint">
              Sign in to add directors and movies.
            </h6>
          )}
        />
      );
    } else if (type === 'userReviews') {
      panelHeader = panelData.user.username;
      panelInfo = (
        <PanelInfo
          session={session}
          text={(
            <span>
              <strong>{panelData.user.username} </strong>
              has posted
              <strong> {panelData.count} </strong>review(s) on Movietown.
            </span>
          )}
        />
      );
    } else if (type === 'director') {
      panelHeader = panelData.director.name;
      panelInfo = (
        <PanelInfo
          session={session}
          text={(
            <span>
              <strong>{panelData.director.name} </strong>
              has released
              <strong> {panelData.count} </strong> film(s) on Movietown.
            </span>
          )}
        />
      );
    } else if (type === 'movieReviews') {
      panelHeader = panelData.movie.title;
      panelInfo = (
        <PanelInfo
          session={session}
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
          user={(
            <ModalButtons buttons={[['+ Add Review', 'addReview']]} />
          )}
        />
      );
    }
  }

  return (
    <BSRow>
      <BSCol colClass="col-sm-12 col-lg-5">
        <div className="panel">
          <h1>{panelHeader}</h1>
          {panelInfo}
        </div>
      </BSCol>
    </BSRow>
  );
};

Panel.propTypes = {
  type: PropTypes.string,
  panelData: PropTypes.object,
  msg: PropTypes.string,
  session: PropTypes.object,
};

export { PanelInfo, Panel };

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

const Panel = (props) => {
  let panelHeader = props.msg || '...';
  let panelInfo;
  const { type, data, session } = props;

  if (data) {
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
      panelHeader = data.user.username;
      panelInfo = (
        <PanelInfo
          session={session}
          text={(
            <span>
              <strong>{data.user.username} </strong>
              has posted
              <strong> {data.count} </strong>review(s) on Movietown.
            </span>
          )}
        />
      );
    } else if (type === 'director') {
      panelHeader = data.director.name;
      panelInfo = (
        <PanelInfo
          session={session}
          text={(
            <span>
              <strong>{data.director.name} </strong>
              has released
              <strong> {data.count} </strong> film(s) on Movietown.
            </span>
          )}
        />
      );
    } else if (type === 'movieReviews') {
      panelHeader = data.movie.title;
      panelInfo = (
        <PanelInfo
          session={session}
          stats={[
            ['Avg. Score', `${data.avg} ★`],
            ['Released', data.movie.year],
            [
              'Director',
              (
                <a key={0} href={`/director/${data.movie.director.id}`}>
                  {data.movie.director.name}
                </a>
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

PanelInfo.propTypes = {
  text: PropTypes.object,
  stats: PropTypes.array,
  session: PropTypes.object,
  user: PropTypes.object,
  guest: PropTypes.object,
};
Panel.propTypes = {
  type: PropTypes.string,
  data: PropTypes.object,
  msg: PropTypes.string,
  session: PropTypes.object,
};

export { PanelInfo, Panel };

import PropTypes from 'prop-types';
import React from 'react';

const Modal = props => (
  <div
    className="modal fade"
    id={props.modalID}
    tabIndex="-1"
    role="dialog"
    aria-labelledby="modalLabel"
    aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="modalLabel">
            {props.modalTitle}
          </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          {props.modalBody}
        </div>
      </div>
    </div>
  </div>
);

const AddReviewModal = () => (
  <Modal
    modalID="addReview"
    modalTitle="Add a review"
    modalBody={(
      <form action="/movies/film/{{ movie.id }}" method="post">
          <div className="form-group">
              <label htmlFor="user" className="mt-2"><strong>Rating ★:</strong></label>
              <select className="form-control" id="stars" name="stars">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
              </select>
          </div>
          <div className="form-group">
              <label htmlFor="comment" className="mt-2"><strong>Review:</strong></label>
              <textarea className="form-control" id="comment" name="comment" rows="3"></textarea>
          </div>
          <div className="form-group text-right">
              <button type="submit" className="btn btn-primary mr-auto movie-btn" action="submit">
                Submit
              </button>
          </div>
      </form>
    )}
  />
);

const AddDirectorModal = () => (
  <Modal
    modalID="addDirector"
    modalTitle="Add a new director:"
    modalBody={(
      <form action="/director" method="post">
          <div className="form-group">
              <label htmlFor="name" className="mt-2"><strong>Director Name:</strong></label>
              <input
                type="input"
                className="form-control"
                id="name"
                name="name"
                placeholder="e.g. Robert Altman"
                htmlautocomplete="off"
                />
          </div>
          <div className="form-group text-right">
              <button type="submit" className="btn btn-primary mr-auto movie-btn" action="submit">
                Submit
              </button>
          </div>
      </form>
    )}
  />
);

const AddMovieModal = () => (
  <Modal
    modalID="addMovie"
    modalTitle="Add a new film:"
    modalBody={(
      <form action="/movies" method="post">
          <div className="form-group">
              <label htmlFor="title" className="mt-2"><strong>Film title:</strong></label>
              <input
                type="input"
                className="form-control"
                id="title"
                name="title"
                placeholder="e.g. Gone with the Wind"
                htmlautocomplete="off"
              />
          </div>
          <div className="form-group">
              <label htmlFor="year" className="mt-2"><strong>Year of release:</strong></label>
              <input
                type="input"
                className="form-control"
                id="year"
                name="year"
                placeholder="e.g. 1940"
                htmlautocomplete="off"
              />
          </div>
          <div className="form-group">
              <label htmlFor="director" className="mt-2"><strong>Director:</strong></label>
              <select className="form-control" id="director" name="directorId">
                  <option selected disabled>Select director</option>
                  <option value="{{ director.id }}">director.name</option>
              </select>
          </div>
          <div className="form-group text-right">
              <button type="submit" className="btn btn-primary mr-auto movie-btn" action="submit">
                Submit
              </button>
          </div>
      </form>
    )}
  />
);

const ModalButtons = props => (
  <span>
    {props.buttons.map(([button, modal], i) => (
      <button
          key={i}
          type="button"
          className="btn movie-btn add-btn mx-2"
          data-toggle="modal"
          data-target={`#${modal}`}>
        {button}
      </button>
    ))}
  </span>
);

Modal.propTypes = {
  modalID: PropTypes.string,
  modalTitle: PropTypes.string,
  modalBody: PropTypes.object,
};

ModalButtons.propTypes = {
  buttons: PropTypes.array,
};

export { AddReviewModal, AddDirectorModal, AddMovieModal, ModalButtons };

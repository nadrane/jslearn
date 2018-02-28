import PropTypes from 'prop-types';
import React from 'react';
// import { AddDirectorForm, AddMovieForm } from './form';


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

const AddDirectorModal = () => (
  <Modal
    modalID="addDirector"
    modalTitle="Add a new director:"
    modalBody={(
      <AddDirectorForm />
    )}
  />
);

const AddMovieModal = () => (
  <Modal
    modalID="addMovie"
    modalTitle="Add a new film:"
    modalBody={(
      <AddMovieForm />
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

export { AddDirectorModal, AddMovieModal, ModalButtons };

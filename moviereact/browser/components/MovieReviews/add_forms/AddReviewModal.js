import React from 'react';
import PropTypes from 'prop-types';

// components
import AddReviewForm from './AddReviewForm';

const AddReviewModal = props => (
  <div
    className="modal fade"
    id="addReview"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="modalLabel"
    aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="modalLabel">
            Add a review for {props.movie.title}:
          </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <AddReviewForm userId={props.userId} />
        </div>
      </div>
    </div>
  </div>
);

AddReviewModal.propTypes = {
  movie: PropTypes.object,
  userId: PropTypes.number,
};

export { AddReviewModal as default };

import React from 'react';
import AddDirectorForm from './AddDirectorForm';

const AddDirectorModal = () => (
  <div
    className="modal fade"
    id="addDirector"
    tabIndex="-1"
    role="dialog"
    aria-labelledby="modalLabel"
    aria-hidden="true">
    <div className="modal-dialog" role="document">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title" id="modalLabel">
            Add a new director:
          </h5>
          <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="modal-body">
          <AddDirectorForm />
        </div>
      </div>
    </div>
  </div>
);

export { AddDirectorModal as default };

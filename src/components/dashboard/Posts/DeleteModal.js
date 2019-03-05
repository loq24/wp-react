import React from 'react';

const DeleteModal = ({deletePost, hideDeleteModal}) => {
    return(
        <div className="modal fade show" id="myModal" style={{display: 'block', top: '150px'}}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Confirmation</h5>
                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={ hideDeleteModal }>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Do you really want to delete this post?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={ hideDeleteModal } >Close</button>
                <button type="button" className="btn btn-danger" onClick={ deletePost }>Yes</button>
              </div>
            </div>
          </div>
        </div>
    );
}

export default DeleteModal;
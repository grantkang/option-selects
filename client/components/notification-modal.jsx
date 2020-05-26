import React from 'react';

export default class NotificationModal extends React.Component {

  render() {
    const optionButtons = this.props.modal.options.map(option => {
      return (
        <button key="option.label" className="btn btn-primary">{option.label}</button>
      );
    });

    return (
      <div id="modal-overlay">
        <div id="modal-container" className="col-lg-6 col-md-8 col-sm-10">
          <div className="card border-dark">
            <div id="modal-header" className="card-header text-white bg-dark">
              {this.props.modal.header}
            </div>
            <div id="modal-body" className="card-body">
              {this.props.modal.body}
            </div>
            <div id="modal-options" className="card-footer d-flex flex-row justify-content-end flex-wrap" onClick={this.props.close}>
              {optionButtons}
            </div>
          </div>
        </div>
      </div>
    );
  }

}

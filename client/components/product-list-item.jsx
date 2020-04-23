import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    return (
      <div className="col mb-4">
        <div className="card">
          <img className="card-img-top" src="" alt="Product Image" />
          <div className="card-body">
            <h5 className="card-title">Product Name</h5>
            <p className="card-text"><small className="text-muted">Price</small></p>
            <p className="card-text">Product Description</p>
          </div>
        </div>
      </div>
    );
  }
}

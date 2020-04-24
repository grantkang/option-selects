import React from 'react';

export default class ProductListItem extends React.Component {
  render() {
    const name = this.props.name;
    const price = `$${this.props.price / 100}`;
    const imagePath = this.props.imagePath;
    const description = this.props.description;

    return (
      <div className="col mb-4">
        <div className="card">
          <img className="card-img-top" src={imagePath} alt="Product Image" />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text"><small className="text-muted">{price}</small></p>
            <p className="card-text">{description}</p>
          </div>
        </div>
      </div>
    );
  }
}

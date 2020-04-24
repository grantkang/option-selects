import React from 'react';

export default class ProductDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: null
    };
  }

  componentDidMount() {
    fetch(`/api/products/${this.props.params.productId}`)
      .then(response => {
        return response.json();
      })
      .then(product => this.setState({ product: product }));
  }

  render() {
    const product = this.state.product;
    if (product) {
      return (
        <div className="p-4 bg-light">
          <div className="card m-4">
            <div className="card-body">
              <span className="pointer" onClick={this.props.onClick}>&#60; back to catalog</span>
              <div className="row">
                <div className="col-5">
                  <img className="card-img-top card-img my-3" src={product.image} alt=""/>
                </div>
                <div className="col-7">
                  <h3 className="card-title">{product.name}</h3>
                  <p className="card-text text-muted">{`$${(product.price / 100).toFixed(2)}`}</p>
                  <p className="card-text">{product.shortDescription}</p>
                </div>
              </div>
              <div className="row">
                <div className="col-12">
                  <p className="card-text">{product.longDescription}</p>

                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

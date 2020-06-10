import React from 'react';

export default class ProductListItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    };
  }

  render() {
    const name = this.props.name;
    const price = `$${(this.props.price / 100).toFixed(2)}`;
    const imagePath = this.props.imagePath;
    const cardClass = this.state.isHovered ? 'product-list-item-card card pointer' : 'product-list-item-card card pointer m-3';

    return (
      <div className="col-xl-4 col-md-6 col-sm-12 my-4"
        onMouseEnter={() => this.setState({ isHovered: true })}
        onMouseLeave={() => this.setState({ isHovered: false })}>
        <div className={cardClass} onClick={this.props.onClick}>
          <img className="card-img-top card-img my-3" src={imagePath} alt="Product Image" />
          <div className="card-body">
            <h5 className="card-title">{name}</h5>
            <p className="card-text">{price}</p>
          </div>
        </div>
      </div>
    );
  }
}

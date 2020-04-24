import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  componentDidMount() {
    this.getProducts();
  }

  getProducts() {
    fetch('/api/products')
      .then(response => response.json())
      .then(products => {
        this.setState({ products: products });
      });
  }

  render() {
    const productListItems = this.state.products.map(product => {
      const onClick = this.props.onClick;
      return (
        <ProductListItem
          key={product.productId}
          name={product.name}
          price={product.price}
          imagePath={product.image}
          description={product.shortDescription}
          onClick={() => onClick('details', { productId: product.productId })}/>
      );
    });
    return (
      <div className="d-flex flex-wrap justify-content-around p-4 bg-light">
        {productListItems}
      </div>
    );
  }

}

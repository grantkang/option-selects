import React from 'react';
import ProductListItem from './product-list-item';

export default class ProductList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
  }

  render() {
    const productListItems = this.state.products.map(product => {
      return (
        <ProductListItem
          key={product.productId}
          name={product.name}
          price={product.price}
          imageUrl={product.image}
          description={product.shortDescription}/>
      );
    });
    return (
      <div>
        {productListItems}
      </div>
    );
  }

}

import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProductListItem from './product-list-item';

export default function ProductList(props) {
  const [products, setProducts] = useState([]);
  const history = useHistory();

  useEffect(() => {
    fetch('/api/products')
      .then(response => response.json())
      .then(products => {
        setProducts(products);
      });
  }, []);

  const productListItems = products.map(product => {
    return (
      <ProductListItem
        key={product.productId}
        name={product.name}
        price={product.price}
        imagePath={product.image}
        description={product.shortDescription}
        onClick={() => history.push(`/products/${product.productId}`)}
      />
    );
  });
  return (
    <div className="d-flex flex-wrap justify-content-around">
      {productListItems}
    </div>
  );

}

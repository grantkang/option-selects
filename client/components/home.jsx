import ProductList from './product-list';
import Carousel from './carousel';
import React, { Fragment, useEffect, useState } from 'react';
import ProductListItem from './product-list-item';

export default function Home(props) {
  const [products, setProducts] = useState([]);

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
        product={Object.assign({}, product)}
      />
    );
  });

  const carouselItems = [
    {
      imagePath: '/images/carousel/slideshow_1.jpg',
      url: '/products/32'
    },
    {
      imagePath: '/images/carousel/slideshow_2.jpg',
      url: '/products/11'
    },
    {
      imagePath: '/images/carousel/slideshow_3.jpg',
      url: '/brands/13'
    }
  ];

  return (
    <Fragment>
      <Carousel items={carouselItems}/>
      <ProductList>
        {productListItems}
      </ProductList>
    </Fragment>

  );
}

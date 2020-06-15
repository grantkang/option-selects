import ProductList from './product-list';
import Carousel from './carousel';
import React, { Fragment } from 'react';

export default function Home(props) {
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
      <ProductList />
    </Fragment>

  );
}

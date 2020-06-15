import ProductList from './product-list';
import Carousel from './carousel';
import React, { Fragment, useEffect, useState } from 'react';
import ProductListItem from './product-list-item';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4, 0)
  },
  paper: {
    display: 'inline-block',
    padding: theme.spacing(1, 2, 1, 4),
    background: theme.palette.secondary.main
  },
  header: {
    color: theme.palette.secondary.contrastText
  }
}));

export default function Home(props) {
  const [products, setProducts] = useState([]);
  const classes = useStyles();

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
      <div className={classes.root}>
        <Paper square className={classes.paper}>
          <Typography className={classes.header} noWrap variant="h5" component="span">{'ALL PRODUCTS'}</Typography>
        </Paper>
        <ProductList>
          {productListItems}
        </ProductList>
      </div>
    </Fragment>

  );
}

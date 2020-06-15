import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ProductListItem from './product-list-item';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(4, 0),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2, 2)
    }
  }
}));

export default function ProductList(props) {
  const [products, setProducts] = useState([]);
  const history = useHistory();
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
        name={product.name}
        price={product.price}
        imagePath={product.imagePath}
        onClick={() => history.push(`/products/${product.productId}`)}
      />
    );
  });
  return (
    <Grid container direction="row" justify="space-around" spacing={4} className={classes.root}>
      {productListItems}
    </Grid>
  );

}

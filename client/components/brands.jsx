import ProductList from './product-list';
import React, { useEffect, useState } from 'react';
import ProductListItem from './product-list-item';
import { useParams } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 0)
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

export default function Brands(props) {
  const classes = useStyles();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`/api/brands/${id}`)
      .then(response => response.json())
      .then(brand => {
        setName(brand.name);
        setProducts(brand.products);
      });
  }, [id]);

  const productListItems = products.map(product => {
    return (
      <ProductListItem
        key={product.productId}
        product={Object.assign({}, product)}
      />
    );
  });

  return (
    <div className={classes.root}>
      <Paper square className={classes.paper}>
        <Typography className={classes.header} noWrap variant="h3" component="span">{`ALL ${name} PRODUCTS`}</Typography>
      </Paper>
      <ProductList>
        {productListItems}
      </ProductList>
    </div>

  );
}

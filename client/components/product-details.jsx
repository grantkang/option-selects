import React, { useEffect, useState, useContext, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import ApplicationContext from '../lib/context';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import ProductList from './product-list';
import ProductListItem from './product-list-item';

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2, 0)
  },
  paper: {
    padding: theme.spacing(2, 2)

  },
  image: {
    width: '100%',
    objectFit: 'scale-down'
  },
  mainImageContainer: {
    display: 'flex',
    justifyContent: 'center',
    height: '350px',
    margin: theme.spacing(2)
  },
  subImage: {
    padding: theme.spacing(1),
    '&:hover': {
      cursor: 'pointer'
    }
  },
  productDetails: {
    '& > *': {
      margin: theme.spacing(2, 0)
    }
  },
  colorIcon: {
    height: '30px',
    width: '30px',
    borderRadius: '50%',
    padding: theme.spacing(1, 2),
    '&:hover': {
      cursor: 'pointer'
    }
  },
  colorIconSelected: {
    height: '40px',
    width: '40px',
    padding: theme.spacing(1, 2),
    borderRadius: '50%',
    '&:hover': {
      cursor: 'pointer'
    }
  },
  header: {
    display: 'inline-block',
    padding: theme.spacing(1, 2, 1, 4),
    background: theme.palette.secondary.main
  },
  headerText: {
    color: theme.palette.secondary.contrastText
  }
}));

export default function ProductDetails(props) {
  const classes = useStyles();
  const [state, setState] = useState({
    product: null,
    imgIndex: 0,
    currentColor: null,
    currentSize: null
  });
  const { id } = useParams();
  const context = useContext(ApplicationContext);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch(`/api/products/${id}`)
      .then(response => {
        return response.json();
      })
      .then(product => {
        const newState = { ...state, product };
        newState.currentColor = product.colors.length > 0 ? product.colors[0] : null;
        newState.currentSize = product.sizes.length > 0 ? product.sizes[0] : null;
        newState.imgIndex = 0;
        setState(newState);
      });
  }, [id]);

  const handleColorIconClick = color => {
    setState({ ...state, imgIndex: 0, currentColor: color });

  };

  const handleSizeIconClick = size => {
    setState({ ...state, currentSize: size });
  };

  const handleAltImageClick = index => {
    setState({ ...state, imgIndex: index });
  };

  const product = state.product;

  if (product) {
    const currentColor = state.currentColor;
    const currentSize = state.currentSize;
    const imgIndex = state.imgIndex;

    const filteredImages = product.images.filter(image => {
      return !product.colors.length || (currentColor && image.colorId === currentColor.colorId);
    });

    const renderedProductImages = filteredImages.map((image, i) => {
      return (
        <Grid key={image.productImageId} container item xs={3}>
          <img className={`${classes.image} ${classes.subImage}`} src={image.imagePath} alt="" onClick={() => handleAltImageClick(i)} />
        </Grid>
      );
    });

    const renderedColorOptions = product.colors.map((color, i) => {
      const colorIconClass = (currentColor && color.colorId === currentColor.colorId) ? classes.colorIconSelected : classes.colorIcon;
      return (
        <div
          key={color.colorId}
          className={colorIconClass}
          style={{ backgroundColor: color.hex }}
          onClick={() => {
            handleColorIconClick(color);
          }}/>
      );
    });

    const renderedSizeOptions = product.sizes.map((size, i) => {
      const isActive = currentSize && size.sizeId === currentSize.sizeId;
      return (
        <Button
          variant={isActive ? 'outlined' : 'text'}
          key={size.sizeId}
          onClick={() => {
            handleSizeIconClick(size);
          }}>
          {size.abbreviation}
        </Button>
      );
    });

    const renderedRelatedProducts = product.relatedProducts.map(product => {
      return (
        <ProductListItem
          key={product.productId}
          product={Object.assign({}, product)}
        />
      );
    });

    return (
      <Fragment>
        <div className={classes.root}>
          <Paper className={classes.paper}>
            <Grid container justify="space-between">
              <Grid item xs={12} md={6}>
                <div className={classes.mainImageContainer}>
                  <img className={classes.image} src={filteredImages.length > 0 ? filteredImages[imgIndex].imagePath : product.images[imgIndex].imagePath} alt="" />
                </div>
                <Grid container spacing={2}>
                  {renderedProductImages}
                </Grid>
              </Grid>
              <Grid item xs={12} md={5} className={classes.productDetails}>
                <Typography variant="h4">
                  {product.name}
                </Typography>
                <div>
                  <Typography display="inline" variant="h6">
                    Brand:
                  </Typography>
                  <Typography display="inline" variant="h6" color="secondary">  {product.brand}</Typography>
                </div>
                <div>
                  <Typography display="inline" variant="h6">
                    Category:
                  </Typography>
                  <Typography display="inline" variant="h6" color="secondary">  {product.category}</Typography>
                </div>
                <Typography variant="body1">
                  {product.description}
                </Typography>
                {product.colors.length > 0 ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <Typography variant="h6">
                        Color:
                      </Typography>
                    </Grid>
                    <Grid container item xs={12} md={9} direction="row" alignItems="center">
                      {renderedColorOptions}
                    </Grid>
                  </Grid>
                ) : null}
                {product.sizes.length > 0 ? (
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={3}>
                      <Typography variant="h6">
                        Size:
                      </Typography>
                    </Grid>
                    <Grid container item xs={12} md={9} direction="row" alignItems="center">
                      {renderedSizeOptions}
                    </Grid>
                  </Grid>
                ) : null}
                <Typography variant="h4">
                  {`$${(product.price / 100).toFixed(2)}`}
                </Typography>
                <Button variant="contained" color="secondary" onClick={() => context.addToCart({ productId: product.productId, ...currentSize, ...currentColor })}>Add to Cart</Button>

              </Grid>
            </Grid>
          </Paper>
        </div>
        <Paper square className={classes.header}>
          <Typography className={classes.headerText} noWrap variant="h5" component="span">{'RELATED ITEMS'}</Typography>
        </Paper>
        <ProductList>
          {renderedRelatedProducts}
        </ProductList>
      </Fragment>

    );
  } else {
    return null;
  }
}

import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import NavBar from './nav-bar';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
  root: {
  },
  midSection: {
    flexGrow: 1
  },
  contrastText: {
    color: theme.palette.primary.contrastText
  },
  logoContainer: {
    position: 'relative',
    [theme.breakpoints.down('xs')]: {
      width: '115px'
    },
    [theme.breakpoints.up('sm')]: {
      width: '130px'
    }
  },
  logo: {
    position: 'absolute',
    top: '-35px',
    width: '100%',
    zIndex: 2
  },
  logoOffset: {
    width: '140px'
  },
  clickable: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  mobile: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'end'
    }
  },
  desktop: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'flex',
      alignItems: 'center'
    }
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const cartItemCount = props.cartItemCount;
  const cartItemCountText = cartItemCount === 1 ? '1 item' : `${cartItemCount} items`;

  return (
    <Fragment>
      <AppBar position="static" className={classes.root}>
        <div>
          <Container>
            <Toolbar disableGutters>
              <div className={classes.logoContainer}>
                <img className={`${classes.logo} ${classes.clickable}`} src="/images/logo.png" alt="logo" onClick={() => history.push('/')} />
              </div>
              <div className={classes.midSection} />
              <div className={classes.desktop}>
                <Button area-label="cart" onClick={() => history.push('/cart')}>
                  <Typography className={classes.contrastText} variant="h6">{cartItemCountText}</Typography>
                  <ShoppingCartIcon className={classes.contrastText} />
                </Button>
              </div>
              <div className={classes.mobile}>
                <IconButton area-label="cart" onClick={() => history.push('/cart')}>
                  <Badge badgeContent={cartItemCount} color="secondary" showZero>
                    <ShoppingCartIcon className={classes.contrastText} />
                  </Badge>
                </IconButton>
              </div>
            </Toolbar>
          </Container>
        </div>
        <NavBar logoOffsetClass={classes.logoOffset} />

      </AppBar>
    </Fragment>
  );
}

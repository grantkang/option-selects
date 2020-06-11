import React, { Fragment, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Toolbar, makeStyles, Container, Badge } from '@material-ui/core';
import NavItem from './nav-item';

const useStyles = makeStyles(theme => ({
  root: {
  },
  defaultBackground: {
    background: theme.palette.background.main
  },
  secondaryToolbar: {
    background: theme.palette.secondary.main,
    zIndex: 1
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
      width: '140px'
    }
  },
  logo: {
    position: 'absolute',
    top: '-30px',
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
  menuItems: {
    padding: theme.spacing(1)
  },
  mobile: {
    display: 'none',
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
      alignItems: 'center'
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
  const [nav, setNav] = useState([]);

  useEffect(() => {
    fetch('/api/nav')
      .then(response => response.json())
      .then(data => {
        const navItems = [];
        for (const navItem in data) {
          navItems.push(data[navItem].reduce((acc, child) => {
            acc.children.push(child);
            return acc;
          }, { name: navItem, children: [] }));
        }
        setNav(navItems);
      });
  }, []);

  const renderedDesktopNavItems = nav.map(navItem => <NavItem key={navItem.name} data={navItem} />);

  return (
    <Fragment>
      <AppBar position="static" className={classes.root}>
        <div>
          <Container>
            <Toolbar>
              <div className={classes.logoContainer}>
                <img className={`${classes.logo} ${classes.clickable}`} src="/images/logo.png" alt="logo" onClick={() => history.push('/')} />
              </div>
              <div className={classes.midSection} />
              <div className={classes.desktop}>
                <Typography variant="h6">{cartItemCountText}</Typography>
                <IconButton area-label="cart" onClick={() => history.push('/cart')}>
                  <ShoppingCartIcon className={classes.contrastText} />
                </IconButton>
              </div>
              <div className={classes.mobile}>
                <IconButton area-label="cart" onClick={() => history.push('/cart')}>
                  <Badge badgeContent={cartItemCount} color="secondary">
                    <ShoppingCartIcon className={classes.constrastText} />
                  </Badge>
                </IconButton>
              </div>
            </Toolbar>
          </Container>
        </div>
        <div className={classes.secondaryToolbar}>
          <Container>
            <Toolbar>
              <div className={classes.logoOffset} />
              {renderedDesktopNavItems}
            </Toolbar>
          </Container>
        </div>
      </AppBar>
    </Fragment>
  );
}

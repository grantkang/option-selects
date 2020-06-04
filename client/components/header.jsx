import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

import ApplicationContext from '../lib/context';
import { Toolbar, makeStyles, Container } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  titleContainer: {
    flexGrow: 1
  },
  title: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  icon: {
    color: theme.palette.primary.contrastText
  }
}));

export default function Header(props) {
  const classes = useStyles();
  const history = useHistory();
  const context = useContext(ApplicationContext);
  const cartItemCount = props.cartItemCount;
  const cartItemCountText = cartItemCount === 1 ? '1 item' : `${cartItemCount} items`;

  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <IconButton edge="start" aria-label="menu">
            <MenuIcon className={classes.icon} />
          </IconButton>
          <div className={classes.titleContainer}>
            <Typography variant="h6" className={classes.title} display="inline" noWrap onClick={() => history.push('/')}>
              {context.getApplicationTitle()}
            </Typography>
          </div>
          <Typography variant="h6">{cartItemCountText}</Typography>
          <IconButton area-label="cart" onClick={() => history.push('/cart')}>
            <ShoppingCartIcon className={classes.icon} />
          </IconButton>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

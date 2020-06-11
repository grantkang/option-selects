import React, { useState, useEffect, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';
import { useHistory } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  paper: {
    marginRight: theme.spacing(2),
    minWidth: '200px'
  },
  collapse: {
    position: 'absolute',
    top: '100%'
  },
  fullHeight: {
    ...theme.mixins.toolbar
  },
  white: {
    color: '#ffffff'
  }
}));

export default function NavItem(props) {
  const classes = useStyles();
  const data = props.data;
  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const history = useHistory();

  const handleToggle = () => {
    setOpen(prev => !prev);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }
  const prevOpen = React.useRef(open);

  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  const renderedChildren = data.children.map(child => {
    return (
      <MenuItem key={child.id.toString()} onClick={event => { handleClose(event); history.push(`/${data.name}/${child.id}`); }}>{child.name}</MenuItem>
    );
  });

  return (
    <div className={classes.root}>
      <Button
        className={`${classes.fullHeight} ${classes.white}`}
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <Typography variant="h6">{data.name}</Typography>
        <Icon>{open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}</Icon>
      </Button>
      <Collapse in={open} className={classes.collapse}>
        <Paper square className={classes.paper}>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow" onKeyDown={handleListKeyDown}>
              {renderedChildren}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Collapse>
    </div>
  );
}

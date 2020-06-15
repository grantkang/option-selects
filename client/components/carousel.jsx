import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  leftArrow: {
    position: 'absolute',
    left: '0px',
    color: theme.palette.secondary.main
  },
  rightArrow: {
    position: 'absolute',
    right: '0px',
    color: theme.palette.secondary.main
  },
  image: {
    width: '100%',
    height: '100%'
  }
}));

export default function Carousel(props) {
  const history = useHistory();
  const classes = useStyles();
  const items = props.items;
  const [index, setIndex] = useState(0);
  let timerId;

  const handleArrowClick = goRight => {
    const length = items.length;
    let nextIndex = index + length;
    nextIndex += goRight ? 1 : -1;
    setIndex(nextIndex % length);
  };

  useEffect(() => {
    startAutoSwitchTimer();
    return function cleanup() {
      clearInterval(timerId);
    };
  });

  const startAutoSwitchTimer = () => {
    clearInterval(timerId);
    timerId = setInterval(() => tick(), 3000);
  };

  const tick = () => {
    const length = items.length;
    const nextIndex = index + 1;
    setIndex(nextIndex % length);
  };

  return (
    <div className={classes.root}>
      <IconButton className={classes.leftArrow} onClick={() => handleArrowClick(false)}><ArrowBackIosIcon /></IconButton>
      <img className={classes.image} src={items[index].imagePath} onClick={() => history.push(items[index].url)}/>
      <IconButton className={classes.rightArrow} onClick={() => handleArrowClick(true)}><ArrowForwardIosIcon /></IconButton>
    </div>
  );

}

import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%'
  },
  arrow: {
    position: 'absolute',
    opacity: '.5',
    transition: 'opacity',
    transitionDuration: '.25s',
    transitionTimingFunction: 'linear',
    '&:hover': {
      opacity: '1'
    }
  },
  arrowLeft: {
    left: '0px'
  },
  arrowRight: {
    right: '0px'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  progressDots: {
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    bottom: '0px',
    width: '100%'
  },
  notActive: {
    opacity: '0.5',
    '&:hover': {
      cursor: 'pointer'
    }
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

  const handleProgressDotClick = newIndex => {
    setIndex(newIndex);
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

  const renderProgressDots = items.map((item, i) => {
    return (
      <FiberManualRecordIcon
        key={i}
        className={index !== i ? classes.notActive : ''}
        color="secondary"
        onClick={() => handleProgressDotClick(i)}
      />
    );
  });

  return (
    <div className={classes.root}>
      <IconButton className={`${classes.arrow} ${classes.arrowLeft}`} onClick={() => handleArrowClick(false)}><ArrowBackIosIcon color="secondary" fontSize="large"/></IconButton>
      <img className={classes.image} src={items[index].imagePath} onClick={() => history.push(items[index].url)}/>
      <IconButton className={`${classes.arrow} ${classes.arrowRight}`} onClick={() => handleArrowClick(true)}><ArrowForwardIosIcon color="secondary" fontSize="large"/></IconButton>
      <div className={classes.progressDots}>
        {renderProgressDots}
      </div>
    </div>
  );

}

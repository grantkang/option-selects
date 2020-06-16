import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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
  const classes = useStyles();
  return (
    <Grid container direction="row" justify="space-around" className={classes.root}>
      {props.children}
    </Grid>
  );
}

import React, { useEffect, useState } from 'react';
import makeStyles from '@material-ui/core/styles/makeStyles';
import NavItem from './nav-item';
import Container from '@material-ui/core/Container';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';
import Collapse from '@material-ui/core/Collapse';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.secondary.main,
    zIndex: 1
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
  },
  contrastText: {
    color: theme.palette.primary.contrastText
  },
  fullHeight: {
    ...theme.mixins.toolbar
  }
}));

export default function NavBar(props) {
  const classes = useStyles();
  const [nav, setNav] = useState([]);
  const logoOffsetClass = props.logoOffsetClass;
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up('sm'));

  const handleToggle = () => {
    setOpen(prev => !prev);
  };

  const prevOpen = React.useRef(open);

  useEffect(() => {
    prevOpen.current = open;
  }, [open]);

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

  const renderedNavItems = nav.map(navItem => <NavItem key={navItem.name} data={navItem} />);

  return (
    <div className={classes.root}>
      <Container>
        <Toolbar className={classes.desktop} disableGutters>
          <div className={logoOffsetClass} />
          {renderedNavItems}
        </Toolbar>
      </Container>
      <Toolbar className={classes.mobile} disableGutters>
        <Button className={`${classes.menuButton} ${classes.contrastText} ${classes.fullHeight}`} onClick={handleToggle}>
          <Icon>menu</Icon>
          <Typography variant="h6">Menu</Typography>
        </Button>
      </Toolbar>
      <Collapse in={!isMobile && open} className={classes.collapse}>
        {renderedNavItems}
      </Collapse>
    </div>
  );
}

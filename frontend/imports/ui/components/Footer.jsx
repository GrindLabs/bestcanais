import React from 'react';
import { Grid, Typography, Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  linkMarginLeft: {
    marginLeft: '10px',
  },
  linkMarginRight: {
    marginRight: '10px',
  },
}));

const Footer = props => {
  const classes = useStyles();
  return (
    <Grid container justify="center">
      <Grid item>
        <Typography variant="subtitle1">
          &copy; {new Date().getFullYear()}{' '}
          <Link className={classes.linkMarginRight} href="/">AssistirTV.GRATIS</Link>
          |
          <Link className={classes.linkMarginLeft} href="/termos-de-uso">Termos de Uso</Link>
        </Typography>
      </Grid>
    </Grid>
  );
};

export default Footer;

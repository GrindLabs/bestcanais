import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
  root: {
    height: '100%',
  },
}));

const Advertiser = props => {
  const classes = useStyles();
  const adsArray = props.ads;
  return (
    <>
      {adsArray.map(ads => (
        <Grid
          key={ads.elementId}
          container
          direction="column"
          justify="center"
          alignItems="center"
          className={classes.root}>
          <Grid item xs={12}>
            <Typography variant="caption" align="center">
              Publicidade
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: ads.rawHtml }} />
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default Advertiser;

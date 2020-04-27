import React from 'react';
import Layout from '/imports/ui/layouts/Layout';
import Advertiser from '/imports/ui/components/Advertiser';
import VideoPlayer from '/imports/ui/components/VideoPlayer';
import { Grid, Container, makeStyles, Hidden } from '@material-ui/core';
import { withTracker } from 'meteor/react-meteor-data';
import Ads from '/imports/api/Ads';
import CastButton from '/imports/ui/components/CastButton';

const useStyles = makeStyles(theme => ({
  grid: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
}));

const MainPage = props => {
  const classes = useStyles();
  const adsHorizontal = props.adsHorizontal;
  const adsVertical = props.adsVertical;
  const adsMobileTop = props.adsMobileTop;
  const adsMobileBottom = props.adsMobileBottom;
  return (
    <Layout>
      <Container maxWidth="xl" fixed>
        <Hidden smDown>
          <Grid container spacing={1} justify="center" className={classes.grid}>
            <Grid item xs={2}>
              <Advertiser ads={adsVertical} />
            </Grid>
            <Grid item container spacing={1} xs={8}>
              <Grid item xs={12}>
                <VideoPlayer />
              </Grid>
              <Grid item xs={12}>
                <Advertiser ads={adsHorizontal} />
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Advertiser ads={adsVertical} />
            </Grid>
          </Grid>
        </Hidden>
        <Hidden mdUp>
          <CastButton />
          <Grid container spacing={1} justify="center" className={classes.grid}>
            <Grid item xs={12}>
              <Advertiser ads={adsMobileTop} />
            </Grid>
            <Grid item xs={12}>
              <VideoPlayer />
            </Grid>
            <Grid item xs={12}>
              <Advertiser ads={adsMobileBottom} />
            </Grid>
          </Grid>
        </Hidden>
      </Container>
    </Layout>
  );
};

export default withTracker(() => {
  Meteor.subscribe('ads');
  return {
    adsHorizontal: Ads.find({ elementId: 'adsHorizontal' }).fetch(),
    adsVertical: Ads.find({ elementId: 'adsVertical' }).fetch(),
    adsMobileTop: Ads.find({ elementId: 'adsMobileTop' }).fetch(),
    adsMobileBottom: Ads.find({ elementId: 'adsMobileBottom' }).fetch(),
  };
})(MainPage);

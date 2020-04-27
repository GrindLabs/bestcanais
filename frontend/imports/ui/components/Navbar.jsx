import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Container, makeStyles } from '@material-ui/core';
import ChannelsList from '/imports/ui/components/ChannelsList';
import { withTracker } from 'meteor/react-meteor-data';
import Streams from '/imports/api/Streams';
import Channels from '/imports/api/Channels';

const useStyles = makeStyles(theme => ({
  root: {
    boxShadow: 'none',
    backgroundColor: 'transparent',
  },
  toolbarButtons: {
    marginLeft: 'auto',
  },
}));

const Navbar = props => {
  const classes = useStyles();

  changeChannelEvent = channel => {
    props.callbackChannel(channel);
  };

  const createStreams = () => {
    let streamList = [];
    props.channels.forEach(element => {
      let streamElement = Streams.findOne(
        {
          channelId: element._id,
        },
        { sort: { isActive: -1, priority: 1 } }
      );

      if (streamElement !== undefined) {
        streamList.push({
          name: element.name,
          logo: element.logo,
          URL: streamElement.URL,
          quality: streamElement.quality,
          isActive: streamElement.isActive,
        });
      }
    });

    return streamList;
  };

  return (
    <Container maxWidth="xl" fixed>
      <AppBar position="static" className={classes.root}>
        <Toolbar disableGutters>
          <div className={classes.toolbarButtons}>
            <ChannelsList
              isOpen={false}
              channelChange={changeChannelEvent}
              streamList={createStreams()}
            />
          </div>
        </Toolbar>
      </AppBar>
    </Container>
  );
};

export default withTracker(() => {
  Meteor.subscribe('streams');
  Meteor.subscribe('channels');
  return {
    channels: Channels.find(
      {
        isActive: true,
      },
      { sort: { priority: -1 } }
    ).fetch(),
  };
})(Navbar);

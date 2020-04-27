import React, { useState, useEffect } from 'react';
import {
  Drawer,
  Button,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  Avatar,
  Divider,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { makeStyles } from '@material-ui/styles';
import Icon from '@material-ui/core/Icon';
import Badge from '@material-ui/core/Badge';

const useStyles = makeStyles(theme => ({
  subHeader: {
    position: 'relative',
  },
  list: {
    width: 300,
  },
  root: {
    '& > span > span': {
      width: '2rem',
      marginLeft: '5px',
    },
  },
  logo: {
    '& > div': {
      borderRadius: 0,
      height: 'initial',
    },
  },
  badge: {
    marginTop: '5px',
  },
}));

const ChannelsList = props => {
  const classes = useStyles();
  const [currentChannel, setCurrentChannel] = useState();
  const [open, setDrawerState] = useState(!!props.isOpen);
  const channels = props.streamList;

  const getBestStream = stream => {
    let bestStream;
    let oldMax = 0;

    channels.forEach(element => {
      let value1 = oldMax;
      let value2 = element.priority;
      let max = Math.max(value1, value2);

      if (max === element.priority) {
        bestStream = element;
      }
    });

    if (bestStream !== undefined) {
      return bestStream;
    }

    return stream;
  };

  const handleClose = event => {
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setDrawerState(false);
  };

  const channelChangeSRC = (event, stream) => {
    if (stream !== undefined) {
      props.channelChange(stream.URL);
    }

    setCurrentChannel(stream);

    if (event !== undefined) {
      handleClose(event);
    }
  };

  useEffect(() => {
    if (
      channels.length > 0 &&
      channels[0] !== undefined &&
      currentChannel === undefined
    ) {
      setCurrentChannel(getBestStream(channels[0]));
      props.channelChange(getBestStream(channels[0]).URL);
    }
  });

  return (
    <>
      <Button
        variant="contained"
        className={classes.root}
        onClick={() => setDrawerState(true)}>
        Canais <Icon className="fas fa-tv" />
      </Button>
      <Drawer
        anchor="right"
        open={open}
        onClose={event => handleClose(event)}
        ModalProps={{ disableRestoreFocus: true }}>
        <div className={classes.list}>
          <List
            subheader={
              <ListSubheader
                className={classes.subHeader}
                component="div"
                id="nested-list-subheader">
                Assistindo agora
              </ListSubheader>
            }>
            {currentChannel ? (
              <ListItem
                key={channels.name}
                alignItems="center"
                button
                value={currentChannel}>
                <ListItemAvatar className={classes.logo}>
                  <Avatar alt={currentChannel.name} src={currentChannel.logo} />
                </ListItemAvatar>
                <ListItemText
                  primary={currentChannel.name}
                  secondary="Programação Indisponível"
                />
              </ListItem>
            ) : (
              ''
            )}
          </List>
          <Divider />
          <List
            subheader={
              <ListSubheader
                className={classes.subHeader}
                component="div"
                id="nested-list-subheader">
                Canais disponíveis
              </ListSubheader>
            }>
            {channels.map(stream => {
              if (
                currentChannel !== undefined &&
                currentChannel.name === stream.name
              ) {
                return;
              }

              let listItemText = (
                <ListItemText
                  primary={stream.name}
                  secondary="Programação Indisponível"
                />
              );

              if (!stream.isActive) {
                listItemText = (
                  <Badge
                    badgeContent="INDISPONÍVEL"
                    color="secondary"
                    className={classes.badge}>
                    {listItemText}
                  </Badge>
                );
              }

              return (
                <ListItem
                  disabled={stream.isActive ? false : true}
                  key={stream.name}
                  alignItems="center"
                  onClick={() => channelChangeSRC(event, stream)}
                  button
                  value={stream}>
                  <ListItemAvatar className={classes.logo}>
                    <Avatar alt={stream.name} src={stream.logo} />
                  </ListItemAvatar>
                  {listItemText}
                </ListItem>
              );
            })}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default ChannelsList;

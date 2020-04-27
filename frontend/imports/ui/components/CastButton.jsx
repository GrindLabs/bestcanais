import React, { useContext } from 'react';
import Fab from '@material-ui/core/Fab';
import CastIcon from '@material-ui/icons/Cast';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
}));

const CastButton = () => {
  const classes = useStyles();
  const openChromeCast = () => {
    var castButton = document.querySelector('button.chromecast-button');

    if (castButton !== null) {
      castButton.click();
    }
  };

  return (
    <Fab
      className={classes.fab}
      onClick={() => openChromeCast()}
      aria-label="cast">
      <CastIcon />
    </Fab>
  );
};

export default CastButton;

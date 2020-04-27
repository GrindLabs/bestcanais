import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { Snackbar, SnackbarContent } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import { amber, green } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    color: '#fff',
  },
  success: {
    backgroundColor: green[600],
  },
  error: {
    backgroundColor: theme.palette.error.main,
  },
  info: {
    backgroundColor: theme.palette.primary.main,
  },
  warning: {
    backgroundColor: amber[700],
  },
  message: {
    display: 'flex',
    alignItems: 'center',
  },
  icon: {
    fontSize: 20,
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1),
  },
}));

const Toaster = props => {
  const classes = useStyles();
  const { message, variant, posH, posV, isOpen, duration, ...other } = props;
  const [open, setOpen] = React.useState(isOpen || true);
  const handleCloseToaster = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
  };
  const Icon = variantIcon[variant];

  return (
    <Snackbar
      className={classes[variant]}
      anchorOrigin={{
        vertical: posV || 'bottom',
        horizontal: posH || 'right',
      }}
      open={open}
      autoHideDuration={duration || 5000}
      onClose={handleCloseToaster}>
      <SnackbarContent
        className={clsx(classes[variant], classes.root)}
        aria-describedby="toaster"
        message={
          <span id="toasterMessage" className={classes.message}>
            <Icon className={clsx(classes.icon, classes.iconVariant)} />
            {message}
          </span>
        }
        action={[
          <IconButton
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleCloseToaster}>
            <CloseIcon className={classes.icon} />
          </IconButton>,
        ]}
        {...other}
      />
    </Snackbar>
  );
};

Toaster.propTypes = {
  message: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning']).isRequired,
  posH: PropTypes.string,
  posV: PropTypes.string,
  isOpen: PropTypes.bool,
  duration: PropTypes.number,
};

export default Toaster;

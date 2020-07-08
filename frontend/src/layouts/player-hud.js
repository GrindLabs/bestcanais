import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../theme';

const PlayerHUD = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <main>{children}</main>
  </ThemeProvider>
);

PlayerHUD.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlayerHUD;

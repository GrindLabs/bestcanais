import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import Footer from '/imports/ui/components/Footer';
import { CssBaseline } from '@material-ui/core';
import theme from '/imports/ui/theme';
import { ThemeProvider } from '@material-ui/styles';

const SingleLayout = ({ children }) => {
  return (
    <>
      {/* <Helmet>
        <title>
          {Meteor.settings.public.site.description} |{' '}
          {Meteor.settings.public.site.name}
        </title>
      </Helmet> */}
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <header>{/*
          Logo and Stuffs
          */}</header>
        <main>{children}</main>
        <footer>
          <Footer />
        </footer>
        <noscript>
          Para que possa navegar nesse site é necessário que o JavaScript esteja
          ativado em seu computador.
        </noscript>
      </ThemeProvider>
    </>
  );
};

SingleLayout.propTypes = {
  children: PropTypes.element,
};

export default SingleLayout;

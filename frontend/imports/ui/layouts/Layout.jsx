import React, { createContext, useState } from 'react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { ThemeProvider } from '@material-ui/styles';
import theme from '/imports/ui/theme';
import Navbar from '/imports/ui/components/Navbar';
import Footer from '/imports/ui/components/Footer';
import { CssBaseline } from '@material-ui/core';
import DetectAdBlock from '/imports/ui/components/detectAdBlock/DetectAdBlock.jsx';

export const ChannelContext = createContext();

const Layout = ({ children }) => {
  const [channel, setChannel] = useState();
  changeChannelHandle = dataFromChild => {
    setChannel(dataFromChild);
  };

  return (
    <>
      <Helmet>
        {/*<html lang={Meteor.settings.public.site.lang} amp />
        <meta
          name="google-site-verification"
          content={Meteor.settings.public.google.siteVerification}
        />
        <meta
          name="exoclick-site-verification"
          content={Meteor.settings.public.exoclick.siteVerification}
        />
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, minimum-scale=1.0"
        />
        <meta name="title" content={Meteor.settings.public.site.name} />
        <meta
          name="description"
          content={Meteor.settings.public.site.description}
        />
        <meta name="keywords" content={Meteor.settings.public.site.keywords} />
        <meta name="robots" content="index, follow" />
        <meta property="og:locale" content={Meteor.settings.public.site.lang} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={Meteor.settings.public.site.name} />
        <meta
          property="og:description"
          content={Meteor.settings.public.site.description}
        />
        <meta property="og:url" content={Meteor.settings.public.site.URL} />
        <meta property="og:image" content="" />
        <meta
          property="og:site_name"
          content={Meteor.settings.public.site.name}
        />
        <link rel="canonical" href={Meteor.settings.public.site.URL} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={Meteor.settings.public.site.name} />
        <meta
          name="twitter:description"
          content={Meteor.settings.public.site.description}
        />
        <meta name="twitter:image:src" content="" />
        <link rel="icon" href="/assets/favicon.png" />
        <link
          rel="index"
          title={Meteor.settings.public.site.description}
          href={Meteor.settings.public.site.URL}
        />
        <link
          rel="base"
          title={Meteor.settings.public.site.description}
          href={Meteor.settings.public.site.URL}
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${Meteor.settings.public.google.analytics}`}
        />
        <script>{`
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', '${Meteor.settings.public.google.analytics}');
  `}</script>
        <script
          data-ad-client={Meteor.settings.public.google.adsense}
          async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>*/}
        <script
          type="text/javascript"
          charset="utf-8"
          src="https://cdn.jsdelivr.net/npm/clappr-chromecast-plugin@latest/dist/clappr-chromecast-plugin.min.js"></script>
        <title>
          {Meteor.settings.public.site.description} |{' '}
          {Meteor.settings.public.site.name}
        </title>
      </Helmet>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <DetectAdBlock>
          <ChannelContext.Provider value={channel}>
            <header>
              <Navbar callbackChannel={changeChannelHandle} />
            </header>
            <main>{children}</main>
          </ChannelContext.Provider>
          <footer>
            <Footer />
          </footer>
          <noscript>
            Para que possa navegar nesse site é necessário que o JavaScript
            esteja ativado em seu computador.
          </noscript>
        </DetectAdBlock>
      </ThemeProvider>
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.element,
};

export default Layout;

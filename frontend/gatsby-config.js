/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`,
});

module.exports = {
  siteMetadata: {
    title: `Assista TV Online GRÁTIS! ~ BestCanais`,
  },
  plugins: [
    `gatsby-plugin-material-ui`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_ID,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/assets/images/`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    // {
    //   resolve: `gatsby-plugin-manifest`,
    //   options: {
    //     name: `BestCanais`,
    //     short_name: `BestCanais`,
    //     description: `Os melhores canais da TV fechada disponíveis gratuitamente.`,
    //     lang: `pt-br`,
    //     start_url: `/tv-online`,
    //     background_color: `#6b37bf`,
    //     theme_color: `#6b37bf`,
    //     display: `standalone`,
    //   },
    // },
    `gatsby-plugin-offline`,
    {
      resolve: `gatsby-source-graphql`,
      options: {
        typeName: `BestCanais`,
        fieldName: `bestcanais`,
        url: process.env.GRAPHQL_URI,
      },
    },
  ],
};

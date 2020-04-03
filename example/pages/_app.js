import React from "react";
import App from "next/app";
import Head from "next/head";

import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import getPageContext from "../libraries/getPageContext";

class MyApp extends App {
   constructor(props) {
      super(props);
      this.pageContext = getPageContext();
   }

   static async getInitialProps({ Component, ctx }) {
      // we can dispatch from here too
      //ctx.store.dispatch({ type: 'FOO', payload: 'foo' });

      const pageProps = Component.getInitialProps
         ? await Component.getInitialProps(ctx)
         : {};

      return { pageProps };
   }

   componentDidMount() {
      // Remove the server-side injected CSS.
      const jssStyles = document.querySelector("#jss-server-side");
      if (jssStyles && jssStyles.parentNode) {
         jssStyles.parentNode.removeChild(jssStyles);
      }
   }

   render() {
      const { Component, pageProps, store } = this.props;

      return (
         <React.Fragment>
            <Head>
               <title>NextConnect</title>
            </Head>
            {/* MuiThemeProvider makes the theme available down the React
                tree thanks to React context. */}
            <ThemeProvider
               theme={this.pageContext.theme}
               //sheetsManager={this.pageContext.sheetsManager}
            >
               {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
               <CssBaseline />
               {/* <Navbar {...this.props} /> */}
               {/* Pass pageContext to the _document though the renderPage enhancer
                  to render collected styles on server side. */}
               <Component pageContext={this.pageContext} {...pageProps} />
            </ThemeProvider>
         </React.Fragment>
      );
   }
}

export default MyApp;

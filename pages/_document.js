import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheets } from "@material-ui/core/styles";

export default class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>      
          <link
      href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@300;400;600;700&family=Poppins:ital,wght@0,300;0,400;1,200&display=swap"
      rel="stylesheet"></link>
      <link rel="preconnect" href="https://fonts.googleapis.com"></link>
      <link href="https://fonts.googleapis.com/css2?family=Asap:ital,wght@0,400;0,500;1,500&family=IBM+Plex+Sans:ital,wght@0,300;0,400;0,500;1,400&display=swap" rel="stylesheet"></link>
      <link href="https://fonts.googleapis.com/css2?family=Asap:ital,wght@0,400;0,500;1,500&family=Passion+One&display=swap" rel="stylesheet"></link>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {

  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
    });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      sheets.getStyleElement(),
    ],
  };
};

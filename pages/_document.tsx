import Document, { DocumentContext, Head, Html, Main, NextScript } from 'next/document'
import React from 'react'

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx)
    return {
      ...initialProps,
      styles: React.Children.toArray([initialProps.styles]),
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <script src="https://accounts.google.com/gsi/client" async defer />
          <script src="https://js.pusher.com/beams/1.0/push-notifications-cdn.js" async defer />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument

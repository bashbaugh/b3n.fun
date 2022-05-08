import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps }
  }

  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
          <script defer data-domain="b3n.fun" src="https://p.bweb.app/js/script.js"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
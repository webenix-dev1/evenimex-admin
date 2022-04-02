import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;
    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html>
        <Head>
          <meta property="og:title" content="Evenimex" />
          {/* <link href="fonts/stylesheet.css" rel="stylesheet"></link> */}
          <link rel="icon" href="/favicon.ico" />
          <link rel="preconnect" href="https://fonts.googleapis.com"></link>
          <link rel="preconnect" href="https://fonts.gstatic.com"></link>

          <link
            href="https://fonts.googleapis.com/css2?family=Gothic+A1:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700;800&display=swap"
            rel="stylesheet"
          ></link>
          {/* <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossorigin="anonymous"
          /> */}
          {/* <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
            integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l"
            crossorigin="anonymous"
          />
          <link
            rel="stylesheet"
            type="text/css"
            charset="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />
          <script
            src="https://unpkg.com/react/umd/react.production.min.js"
            crossorigin
          ></script>

          <script
            src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
            crossorigin
          ></script>

          <script
            src="https://unpkg.com/react-bootstrap@next/dist/react-bootstrap.min.js"
            crossorigin
          ></script> */}
          <link href="css/bootstrap.min.css" rel="stylesheet" />
          <link href="font-awesome/css/font-awesome.css" rel="stylesheet" />

          <link href="css/plugins/toastr/toastr.min.css" rel="stylesheet" />

          <link href="js/plugins/gritter/jquery.gritter.css" rel="stylesheet" />

          <link href="css/animate.css" rel="stylesheet" />
          <link href="css/style.css" rel="stylesheet" />

          <script>var Alert = ReactBootstrap.Alert;</script>

          {/* <!-- Mainly scripts --> */}
          <script src="js/jquery-3.1.1.min.js"></script>
          <script src="js/bootstrap.min.js"></script>
          <script src="js/plugins/metisMenu/jquery.metisMenu.js"></script>
          <script src="js/plugins/slimscroll/jquery.slimscroll.min.js"></script>

          {/* <!-- Flot --> */}
          <script src="js/plugins/flot/jquery.flot.js"></script>
          <script src="js/plugins/flot/jquery.flot.tooltip.min.js"></script>
          <script src="js/plugins/flot/jquery.flot.spline.js"></script>
          <script src="js/plugins/flot/jquery.flot.resize.js"></script>
          <script src="js/plugins/flot/jquery.flot.pie.js"></script>

          {/* <!-- Peity --> */}
          <script src="js/plugins/peity/jquery.peity.min.js"></script>
          <script src="js/demo/peity-demo.js"></script>

          {/* <!-- Custom and plugin javascript --> */}
          <script src="js/inspinia.js"></script>
          <script src="js/plugins/pace/pace.min.js"></script>

          {/* <!-- jQuery UI --> */}
          <script src="js/plugins/jquery-ui/jquery-ui.min.js"></script>

          {/* <!-- GITTER --> */}
          <script src="js/plugins/gritter/jquery.gritter.min.js"></script>

          {/* <!-- Sparkline --> */}
          <script src="js/plugins/sparkline/jquery.sparkline.min.js"></script>

          {/* <!-- Sparkline demo data  --> */}
          <script src="js/demo/sparkline-demo.js"></script>

          {/* <!-- ChartJS--> */}
          <script src="js/plugins/chartJs/Chart.min.js"></script>

          {/* <!-- Toastr --> */}
          <script src="js/plugins/toastr/toastr.min.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;

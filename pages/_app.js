import Layout from "../components/Layout";
import SeoComponent from "../components/SeoComponent";
import { GlobalStyle } from "../styles/global/global.style";
import { ThemeProvider } from "styled-components";
import theme from "../styles/global/theme";
import { Provider, session } from "next-auth/client";
import { wrapper } from "../store";
import { PersistGate } from "redux-persist/integration/react";
import { useStore } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "icheck/skins/all.css";
import SimpleReactLightbox from "simple-react-lightbox";

function MyApp({ Component, pageProps }) {
  const store = useStore((state) => state);
  return (
    <Provider session={pageProps.session}>
      <PersistGate persistor={store.__persistor}>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Layout>
            <SeoComponent />
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            <SimpleReactLightbox>
              <Component {...pageProps} />
            </SimpleReactLightbox>
          </Layout>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

export default wrapper.withRedux(MyApp);

import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../store/store';
import "mapbox-gl/dist/mapbox-gl.css";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  );
}

export default MyApp;
//export default wrapper.withRedux(MyApp);
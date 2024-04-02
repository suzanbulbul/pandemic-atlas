//Toaster
import { Toaster } from 'react-hot-toast';

//Components
import { Layout } from '../components/index.js';

//Styles
import '../util/styles/style.scss'

function MyApp({ Component, pageProps }) {
  return (
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
  );
}

export default MyApp

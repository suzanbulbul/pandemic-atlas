//Toaster
import { Toaster } from 'react-hot-toast';

//Components
import Layout from '../components/layout';

//Styles
import '../styles/style.scss'

function MyApp({ Component, pageProps }) {
  return (
        <Layout>
          <Component {...pageProps} />
          <Toaster />
        </Layout>
  );
}

export default MyApp

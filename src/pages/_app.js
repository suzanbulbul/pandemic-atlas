import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//Toaster
import { Toaster } from 'react-hot-toast';

//Components
import { Layout } from '../components/index.js';

//Styles
import '../util/styles/style.scss'

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
        <Layout>
          <Component {...pageProps} />
          <Toaster />
          <ReactQueryDevtools initialIsOpen={false} />

        </Layout>
    </QueryClientProvider>
  );
}

export default MyApp

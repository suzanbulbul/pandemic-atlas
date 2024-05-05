import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

//Redux
import { Provider } from 'react-redux'
import store from '../redux/store';

//Component
import Layout from '../components/Layout';

//Styles
import '../util/styles/style.scss'

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
          <Layout>

            <Component {...pageProps} />
            <ReactQueryDevtools initialIsOpen={false} />

          </Layout>
      </QueryClientProvider>
    </Provider>
  );
}

export default MyApp

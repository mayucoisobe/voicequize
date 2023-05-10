import 'regenerator-runtime';
// import 'regenerator-runtime/runtime';
import { LocalStorageGet } from '@/components/LocalStorageGet';
import Layout from '@/components/layout';

import '@/styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <>
      <LocalStorageGet />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

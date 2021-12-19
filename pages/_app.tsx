import type { AppProps } from 'next/app';
import { createContext } from 'react';

import '../styles/globals.scss';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp

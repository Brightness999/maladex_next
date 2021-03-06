import type { AppProps } from 'next/app';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import Layout from 'components/Layout';
import {
  defaultTitle,
  defaultDescription,
  defaultKeywords,
} from 'lib/constants';
import 'styles/globals.scss';

const layoutProps = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: defaultKeywords,
};

function MyApp({ Component, pageProps }: AppProps) {
  const [theme, setTheme] = useState<string>('light');
  const [page, setPage] = useState<string>("trade");
  const [pair, setPair] = useState<string>("ADA_MAL");
  const router = useRouter();

  const changeTheme = (value: string) => {
    setTheme(value);
    window.localStorage.setItem('theme', value);
  }

  const changePage = (value: string) => {
    setPage(value);
    window.localStorage.setItem('page', value);
    if (value == 'trade') {
      router.push('/')
    } else {
      router.push(`/${value}`)
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let temp_theme = window.localStorage.getItem('theme');
      let temp_page = window.localStorage.getItem('page');
      let temp_pair = window.localStorage.getItem('pair');
      if (temp_theme) {
        setTheme(temp_theme);
      } else {
        window.localStorage.setItem('theme', 'light');
      }
      if (temp_page) {
        if (window.location.pathname.indexOf(temp_page) > -1) {
          setPage(temp_page);
        } else {
          setPage('trade');
        }
      } else {
        window.localStorage.setItem('page', 'trade');
      }
      if (temp_pair) {
        setPair(temp_pair);
      } else {
        window.localStorage.setItem('pair', 'ADA_MAL');
      }
    }
  }, []);

  return (
    <Layout
      {...layoutProps}
      theme={theme}
      page={page}
      changeTheme={(value: string) => changeTheme(value)}
      changePage={(value: string) => changePage(value)}
    >
      <Component {...pageProps}
        theme={theme}
        page={page}
        pair={pair}
      />
    </Layout>
  )
}

export default MyApp

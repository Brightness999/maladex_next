import { SetStateAction, useState } from 'react';
import dynamic from 'next/dynamic';

import Layout from 'components/Layout';
import {
  defaultTitle,
  defaultDescription,
  defaultKeywords,
} from 'lib/constants';

const TradingAssert = dynamic(() => import('components/TradingAssert'), {
  loading: () => <div className='loading'>Loading...</div>
});

const layoutProps = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: defaultKeywords,
};

const Home = () => {
  const [theme, setTheme] = useState<string>('light');
  const [page, setPage] = useState<string>("trade");
  const [type, setType] = useState<string>("index");
  const [slug, setSlug] = useState<string>("cardano_defi");

  return (
    <Layout
      {...layoutProps}
      theme={theme}
      page={page}
      changeTheme={(value: SetStateAction<string>) => setTheme(value)}
      changePage={(value: SetStateAction<string>) => setPage(value)}
    >
      <TradingAssert
        theme={theme}
        type={type}
        slug={slug}
      />
    </Layout>
  )
}

export default Home;
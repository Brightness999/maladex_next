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
  const [theme, setTheme] = useState<string>('dark');
  const [page, setPage] = useState<string>("trade");

  return (
    <Layout
      {...layoutProps}
      theme={theme}
      page={page}
      changeTheme={(value: SetStateAction<string>) => setTheme(value)}
      changePage={(value: SetStateAction<string>) => setPage(value)}
    >
      <TradingAssert theme={theme} />
    </Layout>
  )
}

export default Home;
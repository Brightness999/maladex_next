import { useState } from 'react';
import dynamic from 'next/dynamic';

import Layout from '../components/Layout';
import {
  defaultTitle,
  defaultDescription,
  defaultKeywords,
} from '../lib/constants';

const Landing = dynamic(() => import('../components/Landing'), {
  loading: () => <p>Loading...</p>
});

const layoutProps = {
  title: defaultTitle,
  description: defaultDescription,
  keywords: defaultKeywords,
};

const Home = () => {
  const [theme, setTheme] = useState('light');
  return (
    <Layout {...layoutProps} theme={theme} changeTheme={(value) => setTheme(value)}>
      <Landing theme={theme} />
    </Layout>
  )
}

export default Home;
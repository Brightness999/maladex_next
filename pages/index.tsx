import { useState } from 'react';
import Layout from '../components/Layout';
import Landing from '../components/Landing';
import {
  defaultTitle,
  defaultDescription,
  defaultKeywords,
} from '../lib/constants';

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
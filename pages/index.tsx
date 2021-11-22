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
  return (
    <Layout {...layoutProps}>
      <Landing />
    </Layout>
  )
}

export default Home;
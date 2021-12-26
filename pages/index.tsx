import dynamic from 'next/dynamic';

const Landing = dynamic(() => import('components/Landing'), {
  loading: () => <div className='loading'>Loading...</div>
});

type Props = {
  theme?: string;
  page?: string;
}

const Home: React.FC<Props> = (props) => {
  return (
    <Landing theme={props.theme} />
  )
}

export default Home;
import dynamic from 'next/dynamic';

const Landing = dynamic(() => import('components/Landing'), {
  loading: () => <div className='loading'>Loading...</div>
});

type Props = {
  theme?: string;
  page?: string;
  pair?: string;
}

const Home: React.FC<Props> = (props) => {
  return (
    <Landing
      theme={props.theme}
      pair={props.pair}
      page={props.page}
    />
  )
}

export default Home;
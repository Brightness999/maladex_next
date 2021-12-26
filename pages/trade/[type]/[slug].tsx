import React, { useState } from 'react';
import dynamic from 'next/dynamic';

const TradingAssert = dynamic(() => import('components/TradingAssert'), {
  loading: () => <div className='loading'>Loading...</div>
});

type Props = {
  theme?: string;
  page?: string;
}

const Home: React.FC<Props> = (props) => {
  const [type, setType] = useState<string>("index");
  const [slug, setSlug] = useState<string>("cardano_defi");

  return (
    <TradingAssert
      theme={props.theme}
      type={type}
      slug={slug}
    />
  )
}

export default Home;
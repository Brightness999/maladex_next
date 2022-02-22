import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/mint/programmable-swap/0');
  }, [router]);
  return (<></>);
}

export default Home;
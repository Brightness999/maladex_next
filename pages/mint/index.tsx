import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const swapcode = window.localStorage.getItem('swapcode');
      if (swapcode) {
        let code = JSON.parse(swapcode);
        if (code.approve) {
          code.id += 1;
          code.code = null;
          window.localStorage.setItem('swapcode', JSON.stringify(code));;
          router.push(`/mint/programmable-swap/${code.id}`);
        } else {
          router.push(`/mint/programmable-swap/${code.id}`);
        }
      } else {
        const initial_swapcode = {
          id: 0,
          code: null,
          approve: false
        }
        window.localStorage.setItem('swapcode', JSON.stringify(initial_swapcode));
        router.push('/mint/programmable-swap/0');
      }
    }
  }, [router]);
  return (<></>);
}

export default Home;
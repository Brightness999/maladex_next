import React, { useEffect } from 'react';
import { useRouter } from 'next/router';

const Home: React.FC = () => {
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // window.localStorage.removeItem('swapcodes');
      const swapcodes = window.localStorage.getItem('swapcodes');
      if (swapcodes) {
        let codes = JSON.parse(swapcodes);
        let code = codes[codes.length - 1];
        if (code.approve) {
          codes.push({
            id: parseInt(code.id) + 1,
            code: null,
            approve: false
          })
          window.localStorage.setItem('swapcodes', JSON.stringify(codes));;
          router.push(`/mint/programmable-swap/${parseInt(code.id) + 1}`);
        } else {
          router.push(`/mint/programmable-swap/${code.id}`);
        }
      } else {
        const initial_swapcode = [{
          id: 0,
          code: null,
          approve: false
        }]
        window.localStorage.setItem('swapcodes', JSON.stringify(initial_swapcode));
        router.push('/mint/programmable-swap/0');
      }
    }
  }, [router]);
  return (<></>);
}

export default Home;
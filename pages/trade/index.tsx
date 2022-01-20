import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Trade = () => {
  const router = useRouter();
  useEffect(() => {
    router.push('/');
  }, []);
}

export default Trade;
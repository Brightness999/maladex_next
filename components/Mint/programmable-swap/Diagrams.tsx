import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { Application } from './Application';

const BodyWidget = dynamic(() => import('./components/BodyWidget'), { ssr: false });

const Diagrams: React.FC = () => {
  var newapp = new Application;
  const [isadd, setIsAdd] = useState<boolean>(false);
  const [app, setApp] = useState<Application>(newapp);

  const handleAdd = (status: boolean) => {
    setIsAdd(status);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setApp(newapp);
    }
  }, []);
  
  return <BodyWidget app={app} isadd={isadd} handleAdd={(status: boolean) => handleAdd(status)} />;
}

export default Diagrams;
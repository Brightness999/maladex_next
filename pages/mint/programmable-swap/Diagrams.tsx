import React, { useState } from "react";
import { BodyWidget } from './components/BodyWidget';
import { Application } from './Application';

const Diagrams: React.FC = () => {
  const [isadd, setIsAdd] = useState<boolean>(false);
  const [app, setApp] = useState<Application>(new Application);
  const handleAdd = (status: boolean) => {
    setIsAdd(status);
  }
  return <BodyWidget app={app} isadd={isadd} handleAdd={(status: boolean) => handleAdd(status)} />;
}

export default Diagrams;
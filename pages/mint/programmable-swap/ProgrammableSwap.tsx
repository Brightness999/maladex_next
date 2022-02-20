import React from "react";
import { BodyWidget } from './components/BodyWidget';
import { Application } from './Application';

const ProgrammableSwap: React.FC = () => {
  var app = new Application();
  return <BodyWidget app={app} />;
}

export default ProgrammableSwap;
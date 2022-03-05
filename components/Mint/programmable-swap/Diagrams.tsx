import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Application from './Application';
import { NodeModel, NodeModelGenerics } from "@projectstorm/react-diagrams";

const BodyWidget = dynamic(() => import('./components/BodyWidget'), { ssr: false });

const Diagrams: React.FC = () => {
  var newapp = new Application;
  const [isadd, setIsAdd] = useState<boolean>(false);
  const [app, setApp] = useState<Application>(newapp);

  const handleAdd = (status: boolean) => {
    setIsAdd(status);
  }

  const handleChangeApp = (node: NodeModel<NodeModelGenerics>) => {
    app.getDiagramEngine().getModel().addNode(node);
    setApp(app);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setApp(newapp);
    }
  }, []);

  return <BodyWidget
    app={app}
    isadd={isadd}
    handleAdd={(status: boolean) => handleAdd(status)}
    handleChangeApp={(node: NodeModel<NodeModelGenerics>) => handleChangeApp(node)}
  />;
}

export default Diagrams;
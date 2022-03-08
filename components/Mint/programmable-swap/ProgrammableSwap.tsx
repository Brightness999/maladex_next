import React, { useState } from "react";
import dynamic from "next/dynamic";
import styles from "styles/Mint.module.scss";
import { useRouter } from 'next/router';
import { NodeType } from "./components/BodyWidget";

const Diagrams = dynamic(() => import('./Diagrams'), { ssr: false });

interface ProgrammableSwapProps {
  changeReview?: any;
  theme?: string;
}

const ProgrammableSwap: React.FC<ProgrammableSwapProps> = (props) => {
  const [isnodeselected, setIsNodeSelected] = useState<boolean>(false);
  const [nodeid, setNodeId] = useState<string>('');
  const [nodename, setNodeName] = useState<string>('');
  const [inputnodes, setInputNodes] = useState<Array<NodeType>>([]);
  const router = useRouter();

  const handleNodeSelection = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const element = e.target as HTMLElement;
    if (element.offsetParent.className == 'node css-nlpftr') {
      const node = element.offsetParent;
      const nodes = JSON.parse(window.localStorage.getItem('swapcodes'))[router.asPath.split('/')[3]].code.nodes;
      setIsNodeSelected(true);
      setNodeId(node.id.split('-')[1]);
      setNodeName(document.getElementById(`textarea-${node.id.split('-')[1]}`).textContent);
      setInputNodes(nodes.filter((n: NodeType) => n.type == 'output'));
    }
  }

  return (
    <div className={`${styles.programmableswap} ${props.theme == 'dark' && styles.dark}`}>
      <div className="d-md-flex">
        <div className={styles.programmableswap_title + ' p-md-4 p-2'}>ID + Title</div>
        <div className={styles.programmableswap_summary + ' p-md-4 p-2'}>
          <div>Parametrisation summary</div>
          <button className={styles.programmableswap_summary_review} onClick={() => props.changeReview(true)}>Review</button>
        </div>
      </div>
      <div className="d-md-flex">
        <div className={styles.programmableswap_diagrams} onClick={(e) => handleNodeSelection(e)}>
          <Diagrams />
        </div>
        <div className={styles.programmableswap_resources}>
          <div className="p-4">
            <div className="pb-4">Resources</div>
            <div className="d-flex flex-column gap-2">
              <div className="d-flex gap-2 align-items-center">
                <input type="text" value="245.142" className="text-center" onChange={() => { }} />
                <div>ADA</div>
              </div>
              <div className="d-flex gap-2 align-items-center">
                <input type="text" value="125.483" className="text-center" onChange={() => { }} />
                <div>USD</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-md-flex flex-fill">
        <div className={styles.programmableswap_customcode}>
          <div className="d-flex flex-column justify-content-center align-items-center p-md-4 p-2">
            {
              isnodeselected ?
                <div>
                  <div className="h5">ID: {nodeid}</div>
                  <div className="h5">Name: {nodename}</div>
                  <div className="h5 d-flex gap-2">Inputs:
                    <div>
                      {inputnodes.map((node: NodeType, index) => {
                        return (
                          <div key={index}>{node.id} - {node.name}</div>
                        )
                      })}
                    </div>
                  </div>
                  <div className="h5 d-flex gap-2">Code:
                    <textarea name="swapcodes" id="swapcodes"></textarea>
                  </div>
                </div>
                :
                <>
                  <div>
                    Programmable Swap Code (for the selected node above)
                  </div>
                  <div>
                    Custom code
                  </div>
                </>
            }
          </div>
        </div>
        <div className={styles.programmableswap_errors}>
          <div className="p-md-4 p-2">Errors</div>
        </div>
      </div>
    </div>
  );
}

export default ProgrammableSwap;
import React, { useState, Fragment } from "react";
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
          <div className={`p-md-4 p-2 h-100 ${!isnodeselected && 'd-flex flex-column align-items-center justify-content-center'}`}>
            {isnodeselected ? (
              <table className="w-100 h-100">
                <thead>
                  <tr className="border-bottom">
                    <th className={styles.programmableswap_customcode_id}>ID</th>
                    <th className={styles.programmableswap_customcode_name}>Name</th>
                    <th className={styles.programmableswap_customcode_inputs}>Inputs</th>
                    <th className={styles.programmableswap_customcode_code}>Code</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className={styles.programmableswap_customcode_id}>
                      <div className="h5">{nodeid}</div>
                    </td>
                    <td className={styles.programmableswap_customcode_name}>
                      <div className="h5">{nodename}</div>
                    </td>
                    <td className={styles.programmableswap_customcode_inputs}>
                      <div className="h5">
                        <div>
                          {inputnodes.map((node: NodeType, index) => {
                            return (
                              <div key={index}>{node.id} - {node.name}</div>
                            )
                          })}
                        </div>
                      </div>
                    </td>
                    <td className={styles.programmableswap_customcode_code}>
                      <div className="d-flex gap-2 h-100">
                        <textarea className="w-100 fs-5" name="swapcodes" id="swapcodes"></textarea>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            ) : (
              <Fragment>
                <div>
                  Programmable Swap Code (for the selected node above)
                </div>
                <div>
                  Custom code
                </div>
              </Fragment>
            )}
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
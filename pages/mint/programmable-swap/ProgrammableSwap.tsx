import React from "react";
import dynamic from "next/dynamic";
import styles from "styles/Mint.module.scss";

const Diagrams = dynamic(() => import('./Diagrams'), { ssr: false });

type ProgrammableSwapProps = {
  changeReview?: any;
  theme?: string;
}
const ProgrammableSwap: React.FC<ProgrammableSwapProps> = (props) => {
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
        <div className={styles.programmableswap_diagrams}>
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
            <div>
              Programmable Swap Code (for the selected node above)
            </div>
            <div>
              Custom code
            </div>
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
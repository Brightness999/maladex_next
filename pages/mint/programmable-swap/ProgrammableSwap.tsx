import React from "react";
import dynamic from "next/dynamic";
import styles from "styles/Mint.module.scss";

const Diagrams = dynamic(() => import('./Diagrams'), { ssr: false });

const ProgrammableSwap: React.FC = () => {
  return (
    <div className={styles.programmableswap}>
      <div className="d-md-flex">
        <div className={styles.programmableswap_title + ' p-md-4 p-2'}>ID + Title</div>
        <div className={styles.programmableswap_summary + ' p-md-4 p-2'}>
          <div>Parametrisation summary</div>
          <button className={styles.programmableswap_summary_review}>Review</button>
        </div>
      </div>
      <div className="d-md-flex">
        <div className={styles.programmableswap_diagrams}>
          <Diagrams />
        </div>
        <div className={styles.programmableswap_resources}>
          <div className="p-4">
            <div>Resources</div>
            <div>
              <input type="text" />
              <div>ADA</div>
            </div>
            <div>
              <input type="text" />
              <div>USD</div>
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
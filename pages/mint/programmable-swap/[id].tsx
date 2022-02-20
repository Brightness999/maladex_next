import React from "react";
import dynamic from "next/dynamic";
import styles from "styles/Mint.module.scss";

const ProgrammableSwap = dynamic(() => import('./ProgrammableSwap'), { ssr: false });

const Home: React.FC = () => {
  return (
    <div className={styles.programmableswap}>
      <div className="d-md-flex p-md-4 py-4">
        <div className={styles.programmableswap_title}>ID + Title</div>
        <div className={styles.programmableswap_summary}>
          <div>Parametrisation summary</div>
          <button className={styles.programmableswap_summary_review}>Review</button>
        </div>
      </div>
      <div className="d-md-flex">
        <div className={styles.programmableswap_diagrams}>
          <ProgrammableSwap />
        </div>
        <div className={styles.programmableswap_resources}>
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
      <div className="d-md-flex p-md-4">
        <div className={styles.programmableswap_customcode}>
          <div>
            <div>
              Programmable Swap Code (for the selected node above)
            </div>
            <div>
              Custom code
            </div>
          </div>
        </div>
        <div className={styles.programmableswap_errors}>
          <div>Errors</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
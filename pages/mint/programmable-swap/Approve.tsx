import React from "react";
import styles from "styles/Mint.module.scss";

const Approve: React.FC = () => {
  return (
    <div className={styles.approved}>
      <div className={styles.approved_content + ' d-flex flex-column justify-content-center align-items-center gap-4'}>
        <div>confirmation screen</div>
        <div>XYZ has been submitted</div>
      </div>
    </div>
  )
}

export default Approve;
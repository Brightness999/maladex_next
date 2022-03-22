import React from "react";
import styles from "styles/Mint.module.scss";

type ApproveProps = {
  theme?: string;
}

const Approve: React.FC<ApproveProps> = (props) => {
  return (
    <div className={`${styles.approved} ${props.theme == 'dark' && styles.dark}`}>
      <div className={`d-flex flex-column justify-content-center align-items-center gap-4 ${styles.approved_content}`}>
        <div>confirmation screen</div>
        <div>XYZ has been submitted</div>
      </div>
    </div>
  )
}

export default Approve;
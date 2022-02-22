import React from "react";
import styles from "styles/Mint.module.scss";

type ReviewProps = {
  changeApprove: any;
  changeReview: any;
}
const Review: React.FC<ReviewProps> = (props) => {
  return (
    <div className={styles.reviewed}>
      <div className="d-flex gap-3 p-4 justify-content-center align-items-center">
        <button className={styles.reviewed_goback} onClick={() => props.changeReview(false)}>Go Back</button>
        <button className={styles.reviewed_approve} onClick={() => props.changeApprove(true)}>Approve</button>
      </div>
      <div className="position-relative flex-fill">
        <div className={styles.reviewed_content}>
          <div>review/mock</div>
        </div>
      </div>
    </div>
  );
}

export default Review;
import React, { useState } from "react";
import ProgrammableSwap from "./ProgrammableSwap";
import Review from "./Review";

const Home: React.FC = () => {
  const [isreview, setIsReview] = useState<boolean>(false);
  const [isapprove, setIsApprove] = useState<boolean>(false);

  const handleChangeReview = (status: boolean) => {
    setIsReview(status);
  }

  const handleChangeApprove = (status: boolean) => {
    setIsApprove(status);
  }

  return (
    <React.Fragment>
      {isreview ? <Review changeReview={(status: boolean) => handleChangeReview(status)} changeApprove={(status: boolean) => handleChangeApprove(status)} /> :
        <ProgrammableSwap changeReview={(status: boolean) => handleChangeReview(status)} />
      }
    </React.Fragment>
  );
}

export default Home;
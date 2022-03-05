import React, { useEffect, useState } from "react";
import Approve from "components/Mint/programmable-swap/Approve";
import ProgrammableSwap from "components/Mint/programmable-swap/ProgrammableSwap";
import Review from "components/Mint/programmable-swap/Review";

type Props = {
  theme?: string;
  page?: string;
  pair?: string;
}

const Home: React.FC<Props> = (props) => {
  const [isreview, setIsReview] = useState<boolean>(false);
  const [isapprove, setIsApprove] = useState<boolean>(false);

  const handleChangeReview = (status: boolean) => {
    setIsReview(status);
  }

  const handleChangeApprove = (status: boolean) => {
    setIsApprove(status);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('page', 'mint');
    }
  }, []);

  return (
    <React.Fragment>
      {
        isreview
          ? isapprove
            ? <Approve
              theme={props.theme}
            />
            : <Review
              theme={props.theme}
              changeReview={(status: boolean) => handleChangeReview(status)}
              changeApprove={(status: boolean) => handleChangeApprove(status)}
            />
          : <ProgrammableSwap
            theme={props.theme}
            changeReview={(status: boolean) => handleChangeReview(status)}
          />
      }
    </React.Fragment>
  );
}

export default Home;
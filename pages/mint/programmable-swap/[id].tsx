import React, { useEffect, useState } from "react";
import Approve from "components/Mint/programmable-swap/Approve";
import ProgrammableSwap from "components/Mint/programmable-swap/ProgrammableSwap";
import Review from "components/Mint/programmable-swap/Review";
import { useRouter } from 'next/router';

type Props = {
  theme?: string;
  page?: string;
  pair?: string;
}

const Home: React.FC<Props> = (props) => {
  const [isreview, setIsReview] = useState<boolean>(false);
  const [isapprove, setIsApprove] = useState<boolean>(false);
  const router = useRouter();

  const handleChangeReview = (status: boolean) => {
    setIsReview(status);
  }

  const handleChangeApprove = (status: boolean) => {
    setIsApprove(status);
    if (status) {
      let swapcodes = JSON.parse(window.localStorage.getItem('swapcodes'));
      swapcodes.forEach(swapcode => {
        if (swapcode.id == router.query.id) {
          console.log('aaaa');
          
          swapcode.approve = true;
        }
      });
      window.localStorage.setItem('swapcodes', JSON.stringify(swapcodes));
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('page', 'mint');
      const swapcodes = window.localStorage.getItem('swapcodes');
      if (swapcodes) {
        let codes = JSON.parse(swapcodes);
        if (!router.query.id || router.query.id >= codes.length) {
          router.push(`/mint/programmable-swap/${codes.length - 1}`);
        }
      }
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
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import styles from "styles/Trading.module.scss";

const Symbol = dynamic(() => import('./Symbol'), {
  loading: () => <div className='loading'>Loading...</div>
});

const Indicators = dynamic(() => import('./Indicators'), {
  loading: () => <div className='loading'>Loading...</div>
});

const PriceComposition = dynamic(() => import('./PriceComposition'), {
  loading: () => <div className='loading'>Loading...</div>
})

type Props = {
  theme?: string;
}
const TradingAssert: React.FC<Props> = (props) => {
  return (
    <div className={styles.trading}>
      <Symbol
        theme={props.theme}
      />
      <Indicators
        theme={props.theme}
      />
      <PriceComposition
        theme={props.theme}
      />
    </div>
  )
}

export default TradingAssert;
import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import styles from "styles/Trading.module.scss";

const Symbol = dynamic(() => import('./Symbol'), {
  loading: () => <></>
});

const Indicators = dynamic(() => import('./Indicators'), {
  loading: () => <></>
});

const PriceComposition = dynamic(() => import('./PriceComposition'), {
  loading: () => <></>
});

const Compositions = dynamic(() => import('./Compositions'), {
  loading: () => <></>
});

const CompositionHistory = dynamic(() => import('./CompositionHistory'), {
  loading: () => <></>
});

type Props = {
  theme?: string;
  type?: string;
  slug?: string;
}
const TradingAssert: React.FC<Props> = (props) => {
  return (
    <div className={`${styles.trading} ${props.theme == 'dark' && `${styles.dark} dark`}`}>
      <Symbol
        theme={props.theme}
        type={props.type}
        slug={props.slug}
      />
      <Indicators
        theme={props.theme}
        type={props.type}
        slug={props.slug}
      />
      <PriceComposition
        theme={props.theme}
        type={props.type}
        slug={props.slug}
      />
      <Compositions
        theme={props.theme}
        type={props.type}
        slug={props.slug}
      />
      <CompositionHistory
        theme={props.theme}
        type={props.type}
        slug={props.slug}
      />
    </div>
  )
}

export default TradingAssert;
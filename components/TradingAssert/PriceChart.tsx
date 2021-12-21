import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import styles from "styles/Trading.module.scss";

const TradingviewChart = dynamic(() => import('../Landing/TradingviewChart'), {
  ssr: false
})
const PriceChart: React.FC = () => {
  return (
    <div className={styles.pricechart}>
      <TradingviewChart />
    </div>
  );
}

export default PriceChart;
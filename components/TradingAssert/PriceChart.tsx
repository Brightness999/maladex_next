import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import styles from "styles/Trading.module.scss";

const OriginalChart = dynamic(() => import('../Landing/OriginalChart'), {
  ssr: false,
  loading: () => <div className='loading'>...</div>
})

type Props = {
  theme?: string;
}

const PriceChart: React.FC<Props> = (props) => {
  const [chartwidth, setChartWidth] = useState<number>(10);
  const [chartheight, setChartHeight] = useState<number>(10);

  useEffect(() => {
    if (typeof window !== undefined) {
      let width = document.getElementById("pricecomposition_content").clientWidth;
      let height = 474;
      if (document.body.clientWidth > 768) {
        setChartWidth(width - 300);
      } else {
        setChartWidth(width - 10);
      }
      setChartHeight(height);
    }
  }, []);

  return (
    <div className={styles.pricechart}>
      <OriginalChart
        chartheight={chartheight}
        chartwidth={chartwidth}
      />
    </div>
  );
}

export default PriceChart;
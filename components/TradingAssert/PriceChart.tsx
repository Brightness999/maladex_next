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
      let width = document.body.clientWidth;
      if (width > 768) {
        setChartWidth(width * 0.9 - 300);
        setChartHeight(474);
      } else {
        setChartWidth(width * 0.9 - 10);
        setChartHeight(300);
      }
    }
  }, []);

  return (
    <div className={styles.pricechart}>
      <OriginalChart
        theme={props.theme}
        chartheight={chartheight}
        chartwidth={chartwidth}
      />
    </div>
  );
}

export default PriceChart;
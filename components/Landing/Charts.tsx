import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DepthChart from "./DepthChart";

import styles from '/styles/Home.module.scss';

const TradingviewChart = dynamic(() => import("./TradingviewChart"), {
  ssr: false
});

const OriginalChart = dynamic(() => import("./OriginalChart"), {
  ssr: false
});

type Props = {
  theme: string;
  chartwidth: number;
  chartheight: number;
  close: any;
}

const Charts: React.FC<Props> = (props) => {
  const [charttype, setChartType] = useState<string>("original");
  const [charttime, setChartTime] = useState<string>("time");
  const [chartwidth, setChartWidth] = useState<number>(0);
  const [chartheight, setChartheight] = useState<number>(0);

  useEffect(() => {
    setChartWidth(props.chartwidth);
  }, [props.chartwidth]);

  useEffect(() => {
    setChartheight(props.chartheight);
  }, [props.chartheight]);

  const changeChartType = (e) => {
    setChartType(e.target.id);
  }

  const changeChartTime = (e) => {
    setChartTime(e.target.id);
  }

  return (
    <div className={styles.charts}>
      <div className={styles.charts_menu_wrapper}>
        <div className={styles.charts_menu}>
          {charttype != 'depth' &&
            <div className={styles.charts_menu_properties}>
              <div className={styles.charts_menu_properties_times}>
                <span id="time" className={charttime == 'time' ? styles.active : ''} onClick={(e) => changeChartTime(e)}>Time</span>
                <span id="15m" className={charttime == '15m' ? styles.active : ''} onClick={(e) => changeChartTime(e)}>15m</span>
                <span id="1h" className={charttime == '1h' ? styles.active : ''} onClick={(e) => changeChartTime(e)}>1H</span>
                <span id="4h" className={charttime == '4h' ? styles.active : ''} onClick={(e) => changeChartTime(e)}>4H</span>
                <span id="1d" className={charttime == '1d' ? styles.active : ''} onClick={(e) => changeChartTime(e)}>1D</span>
                <span id="1w" className={charttime == '1w' ? styles.active : ''} onClick={(e) => changeChartTime(e)}>1W</span>
              </div>
              <div className={styles.charts_menu_properties_indicators}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12.874 8a4.002 4.002 0 01-7.748 0H2V6h3.126a4.002 4.002 0 017.748 0H22v2h-9.126zM11 7a2 2 0 11-4 0 2 2 0 014 0zM2 16h9.126a4.002 4.002 0 017.748 0H22v2h-3.126a4.002 4.002 0 01-7.748 0H2v-2zm13 3a2 2 0 110-4 2 2 0 010 4z" fill="currentColor"></path>
                </svg>
              </div>
            </div>
          }
          <div style={{ flex: 1 }}></div>
          <div className={styles.charts_menu_types}>
            <span id="original" className={charttype == 'original' ? styles.active : ''} onClick={(e) => changeChartType(e)}>Original</span>
            <span id="tradingview" className={charttype == 'tradingview' ? styles.active : ''} onClick={(e) => changeChartType(e)}>TradingView</span>
            <span id="depth" className={charttype == 'depth' ? styles.active : ''} onClick={(e) => changeChartType(e)}>Depth</span>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" onClick={props.close}>
              <path d="M10.586 12L4.293 5.707 5 5l.707-.707L12 10.586l6.293-6.293L19 5l.707.707L13.414 12l6.293 6.293-1.414 1.414L12 13.414l-6.293 6.293L5 19l-.707-.707L10.586 12z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
      </div>
      {charttype == 'original' &&
        <OriginalChart
          chartwidth={chartwidth}
          chartheight={chartheight}
        />
      }
      {charttype == 'tradingview' &&
        <TradingviewChart
          theme={props.theme}
        />
      }
      {charttype == 'depth' &&
        <DepthChart />
      }
    </div>
  );
}

export default Charts;
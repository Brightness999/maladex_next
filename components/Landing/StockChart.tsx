import React, { useRef, useState } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import { StockData } from '../../lib/data';
import styles from '/styles/Home.module.scss';

const StockChart: React.FC = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  let ohlc = [], volume = [], dataLength = StockData.length;

  for (let i = 0; i < dataLength; i++) {
    ohlc.push([
      StockData[i][0], // the date
      StockData[i][1], // open
      StockData[i][2], // high
      StockData[i][3], // low
      StockData[i][4] // close
    ]);

    volume.push([
      StockData[i][0], // the date
      StockData[i][5] // the volume
    ]);
  }
  const stockOptions: Highcharts.Options = {
    rangeSelector: {
      selected: 0
    },
    scrollbar: {
      enabled: true
    },
    mapNavigation: {
      enableMouseWheelZoom: true,
      enabled: true,
      enableDoubleClickZoom: true
    },
    yAxis: [{
      startOnTick: true,
      endOnTick: true,
      tickPosition: 'outside',
      labels: {
        align: 'left',
        x: 8
      },
      height: '60%',
      lineWidth: 1,
      resize: {
        enabled: true
      }
    }, {
      tickPosition: 'outside',
      labels: {
        align: 'left',
        x: 8
      },
      top: '65%',
      height: '35%',
      offset: 0,
      lineWidth: 1
    }],

    tooltip: {
      split: true
    },

    series: [{
      type: 'candlestick',
      name: 'AAPL',
      id: 'aapl',
      zIndex: 2,
      data: ohlc
    }, {
      type: 'column',
      name: 'Volume',
      id: 'volume',
      data: volume,
      yAxis: 1
    }]
  }


  return (
    <div className={styles.stockchart}>
      <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={stockOptions}
        ref={chartComponentRef}
        {...props}
      />
    </div>
  );
}

export default StockChart;
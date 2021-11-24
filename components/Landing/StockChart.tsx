import React, { useRef, useEffect } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { createChart, CrosshairMode } from 'lightweight-charts';
import { AdvancedChart } from "react-tradingview-embed";

import { StockData, priceData, areaData, volumeData } from '../../lib/data';
import styles from '/styles/Home.module.scss';

const StockChart: React.FC = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const chartContainerRef = useRef(null);
  const chart = useRef(null);
  const resizeObserver = useRef(null);

  const chartRef = React.useRef(null);
  useEffect(() => {
    if (chartRef.current) {
      console.log(chartRef);

      const chart = createChart(chartRef.current, {
        width: chartRef.current.clientWidth,
        height: 400,
        layout: {
          backgroundColor: '#253248',
          textColor: 'rgba(255, 255, 255, 0.9)',
        },
        grid: {
          vertLines: {
            color: '#334158',
          },
          horzLines: {
            color: '#334158',
          },
        },
        crosshair: {
          mode: CrosshairMode.Normal,
        },
        timeScale: {
          borderColor: '#485c7b',
          minBarSpacing: 0.001
        },
      });

      prepareChart(chart);
    }
  }, [])

  function prepareChart(chart) {

    const candleSeries = chart.addCandlestickSeries({
      upColor: '#4bffb5',
      downColor: '#ff4976',
      borderDownColor: '#ff4976',
      borderUpColor: '#4bffb5',
      wickDownColor: '#838ca1',
      wickUpColor: '#838ca1',
    });

    candleSeries.setData(priceData);

    // const areaSeries = chart.addAreaSeries({
    //   topColor: 'rgba(38,198,218, 0.56)',
    //   bottomColor: 'rgba(38,198,218, 0.04)',
    //   lineColor: 'rgba(38,198,218, 1)',
    //   lineWidth: 2
    // });

    // areaSeries.setData(areaData);

    const volumeSeries = chart.addHistogramSeries({
      color: '#182233',
      lineWidth: 2,
      priceFormat: {
        type: 'volume',
      },
      overlay: true,
      scaleMargins: {
        top: 0.8,
        bottom: 0,
      },
    });

    volumeSeries.setData(volumeData);

    // var lastClose = data[data.length - 1].close;
    // var lastIndex = data.length - 1;

    // var targetIndex = lastIndex + 105 + Math.round(Math.random() + 30);
    // var targetPrice = getRandomPrice();

    // var currentIndex = lastIndex + 1;
    // var currentBusinessDay = { day: 29, month: 5, year: 2019 };
    // var ticksInCurrentBar = 0;
    // var currentBar = {
    //   open: null,
    //   high: null,
    //   low: null,
    //   close: null,
    //   time: currentBusinessDay
    // };

    // function mergeTickToBar(price) {
    //   if (currentBar.open === null) {
    //     currentBar.open = price;
    //     currentBar.high = price;
    //     currentBar.low = price;
    //     currentBar.close = price;
    //   } else {
    //     currentBar.close = price;
    //     currentBar.high = Math.max(currentBar.high, price);
    //     currentBar.low = Math.min(currentBar.low, price);
    //   }
    //   candleSeries.update(currentBar);
    // }

    // function reset() {
    //   candleSeries.setData(data);
    //   lastClose = data[data.length - 1].close;
    //   lastIndex = data.length - 1;

    //   targetIndex = lastIndex + 5 + Math.round(Math.random() + 30);
    //   targetPrice = getRandomPrice();

    //   currentIndex = lastIndex + 1;
    //   currentBusinessDay = { day: 29, month: 5, year: 2019 };
    //   ticksInCurrentBar = 0;
    // }

    // function getRandomPrice() {
    //   return 10 + Math.round(Math.random() * 10000) / 100;
    // }

    // function nextBusinessDay(time) {
    //   var d = new Date();
    //   d.setUTCFullYear(time.year);
    //   d.setUTCMonth(time.month - 1);
    //   d.setUTCDate(time.day + 1);
    //   d.setUTCHours(0, 0, 0, 0);
    //   return {
    //     year: d.getUTCFullYear(),
    //     month: d.getUTCMonth() + 1,
    //     day: d.getUTCDate()
    //   };
    // }

    // setInterval(function () {
    //   var deltaY = targetPrice - lastClose;
    //   var deltaX = targetIndex - lastIndex;
    //   var angle = deltaY / deltaX;
    //   var basePrice = lastClose + (currentIndex - lastIndex) * angle;
    //   var noise = 0.1 - Math.random() * 0.2 + 1.0;
    //   var noisedPrice = basePrice * noise;
    //   mergeTickToBar(noisedPrice);
    //   if (++ticksInCurrentBar === 5) {
    //     // move to next bar
    //     currentIndex++;
    //     currentBusinessDay = nextBusinessDay(currentBusinessDay);
    //     currentBar = {
    //       open: null,
    //       high: null,
    //       low: null,
    //       close: null,
    //       time: currentBusinessDay
    //     };
    //     ticksInCurrentBar = 0;
    //     if (currentIndex === 5000) {
    //       reset();
    //       return;
    //     }
    //     if (currentIndex === targetIndex) {
    //       // change trend
    //       lastClose = noisedPrice;
    //       lastIndex = currentIndex;
    //       targetIndex = lastIndex + 5 + Math.round(Math.random() + 30);
    //       targetPrice = getRandomPrice();
    //     }
    //   }
    // }, 200);
  }

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
      {/* <HighchartsReact
        highcharts={Highcharts}
        constructorType={'stockChart'}
        options={stockOptions}
        ref={chartComponentRef}
        {...props}
      /> */}
      {/* <div ref={chartRef} /> */}
      <AdvancedChart widgetProps={{
        "symbol": "BINANCE:BTCUSDT",
        "theme": "light",
        "hide_side_toolbar": true,
        "allow_symbol_change": true
      }} />
    </div>
  );
}

export default StockChart;
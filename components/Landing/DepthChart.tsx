import React, { useRef } from 'react';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';

import { BidData, AskData } from '../../lib/data';
import styles from '/styles/Home.module.scss';

const DepthChart: React.FC = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  const depthOptions: Highcharts.Options = {
    chart: {
      type: 'area',
    },
    title: {
      text: ''
    },
    xAxis: {
      minPadding: 0,
      maxPadding: 0,
      plotLines: [{
        color: '#888',
        value: 0.1523,
        width: 1,
        label: {
          rotation: 90
        }
      }],
      title: {
        text: 'Price'
      }
    },
    yAxis: [{
      lineWidth: 1,
      gridLineWidth: 1,
      title: null,
      tickWidth: 1,
      tickLength: 5,
      tickPosition: 'outside',
      labels: {
        align: 'right',
        x: -8
      }
    }, {
      opposite: true,
      linkedTo: 0,
      lineWidth: 1,
      gridLineWidth: 0,
      title: null,
      tickWidth: 1,
      tickLength: 5,
      tickPosition: 'outside',
      labels: {
        align: 'left',
        x: 8
      }
    }],
    legend: {
      enabled: false
    },
    plotOptions: {
      area: {
        fillOpacity: 0.2,
        lineWidth: 1,
        step: 'center'
      }
    },
    tooltip: {
      headerFormat: '<span style="font-size=10px;">Price: {point.key}</span><br/>',
      valueDecimals: 2
    },
    series: [{
      type: 'area',
      name: 'Bids',
      data: BidData,
      color: '#03a7a8'
    }, {
      type: 'area',
      name: 'Asks',
      data: AskData,
      color: '#fc5857'
    }]
  }
  return (
    // <div className={styles.depthchart}>
      <HighchartsReact
        highcharts={Highcharts}
        options={depthOptions}
        containerProps={{className: "depth"}}
        ref={chartComponentRef}
        {...props}
      />
    // </div>
  );
}

export default DepthChart;
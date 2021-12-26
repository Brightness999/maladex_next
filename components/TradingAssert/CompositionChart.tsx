import React, { useState, useEffect, useRef } from "react";
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

import styles from "styles/Trading.module.scss";
import { CompositionData } from "lib/data";

const CompositionChart: React.FC = (props: HighchartsReact.Props) => {
  const [options, setOptions] = useState<Highcharts.Options>({});
  const assets = ['mal', 'sundae', 'minswap', 'lq', 'indy'];

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    if (typeof window !== undefined) {
      let chartwidth = document.body.clientWidth;
      let chartheight = 474;
      if (chartwidth > 768) {
        chartwidth = chartwidth * 0.9 - 300;
      } else {
        chartwidth = chartwidth * 0.9 - 10;
      }
      let chartdata = [];
      assets.forEach(asset => {
        CompositionData.forEach(data => {
          if (asset == data.id) {
            chartdata.push({
              type: 'area',
              name: data.symbol,
              data: data.percentages
            })
          }
        })
      })
      setOptions({
        chart: {
          type: 'area',
          width: chartwidth,
          height: chartheight,
          plotShadow: false,
          animation: false
        },
        title: {
          text: ''
        },
        subtitle: {
          text: ''
        },
        xAxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        },
        yAxis: {
          title: {
            text: ''
          },
          labels: {
            format: '{value}%'
          },
        },
        tooltip: {
          split: true
        },
        plotOptions: {
          area: {
            stacking: 'percent',
            lineColor: '#ffffff',
            lineWidth: 1,
            marker: {
              lineWidth: 1,
              lineColor: '#ffffff'
            }
          }
        },
        series: chartdata
      });
    }
  }, []);

  return (
    <div className={styles.compositionchart}>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
        {...props}
      />
    </div>
  )
}

export default CompositionChart;
import React, { useState, useEffect, useRef } from "react";
import Highcharts from 'highcharts'
import HighchartsExporting from 'highcharts/modules/exporting'
import HighchartsReact from 'highcharts-react-official'
if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

import styles from "styles/Trading.module.scss";

const CompositionChart: React.FC = (props: HighchartsReact.Props) => {
  const [options, setOptions] = useState<Highcharts.Options>({});

  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  useEffect(() => {
    let chartwidth = document.getElementById("pricecomposition_content").clientWidth - 250;
    let chartheight = document.getElementById("pricecomposition_content").clientHeight;
    setOptions({
      chart: {
        type: 'area',
        width: chartwidth,
        height: chartheight
      },
      title: {
        text: ''
      },
      xAxis: {
        categories: ['1750', '1800', '1850', '1900', '1950', '1999', '2050'],
        tickmarkPlacement: 'on',
      },
      yAxis: {
        title: {
          text: ''
        },
      },
      tooltip: {
        enabled: false,
        split: true,
        valueSuffix: ''
      },
      plotOptions: {
        area: {
          stacking: 'normal',
          lineColor: '#666666',
          lineWidth: 1,
          marker: {
            lineWidth: 1,
            lineColor: '#666666'
          }
        }
      },
      series: [{
        type: 'area',
        name: '',
        data: [502, 635, 809, 947, 1402, 3634, 5268]
      }]
    });
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
import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Composition = (props: HighchartsReact.Props) => {
  const [labelsize, setLabelSize] = useState<string>('');
  const [labeldistance, setLabelDistance] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const categories = ['ADA', 'MAL', 'AGIX', 'MELD'];
  const data = [
    { y: 25, color: '#e91919' },
    { y: 40, color: '#baff23' },
    { y: 15, color: '#19aac6' },
    { y: 20, color: '#8085e9' }
  ];
  let distData = [];

  for (let i = 0; i < data.length; i++) {
    distData.push({
      name: categories[i],
      y: data[i].y,
      color: data[i].color
    });
  }

  const options: Highcharts.Options = {
    chart: {
      type: 'pie',
      height: height
    },
    title: {
      text: undefined,
    },
    subtitle: {
      text: null
    },
    plotOptions: {
      pie: {
        shadow: false,
        center: ['50%', '50%'],
        startAngle: 195,
      }
    },
    tooltip: {
      valueSuffix: '%'
    },
    series: [{
      type: 'pie',
      name: 'Allocation',
      data: distData,
      size: '100%',
      dataLabels: {
        formatter: function () {
          return this.y > 5 ? this.point.name : null;
        },
        color: '#ffffff',
        distance: labeldistance,
        style: {
          fontSize: labelsize
        }
      }
    }],
    responsive: {
      rules: [{
        condition: {
          minHeight: 500,
        },
        chartOptions: {
          series: [{
            type: 'pie'
          }, {
            type: 'pie',
            id: 'percentages',
            dataLabels: {
              enabled: false
            }
          }]
        }
      }]
    }
  }

  const setChartDimensions = (ls: string, ld: number, h: number) => {
    setLabelSize(ls);
    setLabelDistance(ld);
    setHeight(h);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 1440) {
        setChartDimensions('20px', -68, 500);
      } else if (window.innerWidth > 992) {
        setChartDimensions('14px', -50, 400);
      } else if (window.innerWidth > 450) {
        setChartDimensions('20px', -68, 500);
      } else {
        setChartDimensions('14px', -40, 300);
      }
    }
  }, []);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={options}
      ref={chartComponentRef}
      {...props}
    />
  )
}

export default Composition;
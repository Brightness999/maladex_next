import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

const Composition = (props: HighchartsReact.Props) => {
  const [labelsize, setLabelSize] = useState<string>('');
  const [labeldistance, setLabelDistance] = useState<number>(0);
  const [detaillabelsize, setDetailLabelSize] = useState<string>('');
  const [detaillabeldistance, setDetailLabelDistance] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const LightenDarkenColor = (col, amt) => {
    let usePound = false;
    if (col[0] == "#") {
      col = col.slice(1);
      usePound = true;
    }
    let num = parseInt(col, 16);
    let r = (num >> 16) * (1 + amt);
    if (r > 255) r = 255;
    else if (r < 0) r = 0;
    let b = ((num >> 8) & 0x00FF) * (1 + amt);
    if (b > 255) b = 255;
    else if (b < 0) b = 0;
    let g = (num & 0x0000FF) * (1 + amt);
    if (g > 255) g = 255;
    else if (g < 0) g = 0;
    return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
  }
  const categories = ['Rewards', 'Team', 'Sale'];
  const data = [
    {
      y: 50,
      color: '#e91919',
      drilldown: {
        name: 'Rewards',
        categories: [
          'Platform: 40%',
          'Airdrops: 5%',
          'ISPO: 5%'
        ],
        data: [40, 5, 5]
      }
    },
    {
      y: 20,
      color: '#baff23',
      drilldown: {
        name: 'Team',
        categories: [
          'Y1: 4%',
          'Y2: 4%',
          'Y3: 4%',
          'Y4: 4%',
          'Y5: 4%'
        ],
        data: [4, 4, 4, 4, 4]
      }
    },
    {
      y: 30,
      color: '#19aac6',
      drilldown: {
        name: 'Sale',
        categories: [
          'Private: 5%',
          'IFO: 25%'
        ],
        data: [5, 25]
      }
    }
  ];
  let distData = [], distDetailData = [], drillDataLen: number, brightness: number;

  for (let i = 0; i < data.length; i++) {
    distData.push({
      name: categories[i],
      y: data[i].y,
      color: data[i].color
    });
    drillDataLen = data[i].drilldown.data.length;
    for (let j = 0; j < drillDataLen; j++) {
      brightness = 0.2 - (j / drillDataLen) / 5;
      distDetailData.push({
        name: data[i].drilldown.categories[j],
        y: data[i].drilldown.data[j],
        color: LightenDarkenColor(data[i].color, brightness)
      });
    }
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
        startAngle: 180,
      }
    },
    tooltip: {
      valueSuffix: '%'
    },
    series: [{
      type: 'pie',
      name: 'Allocation',
      data: distData,
      size: '60%',
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
    }, {
      type: 'pie',
      name: 'Allocation',
      data: distDetailData,
      size: '100%',
      innerSize: '60%',
      dataLabels: {
        formatter: function () {
          return this.y > 1 ? this.point.name.split(':')[0] : null;
        },
        crop: false,
        color: '#ffffff',
        connectorWidth: 0,
        distance: detaillabeldistance,
        style: {
          fontSize: detaillabelsize,
        }
      },
      id: 'percentages'
    }],
    responsive: {
      rules: [{
        condition: {
          minHeight: 600,
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

  const setChartDimensions = (ls: string, dls: string, ld: number, dld: number, h: number) => {
    setLabelSize(ls);
    setDetailLabelSize(dls);
    setLabelDistance(ld);
    setDetailLabelDistance(dld);
    setHeight(h);
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth > 1440) {
        setChartDimensions('20px', '16px', -68, -40, 500);
      } else if (window.innerWidth > 992) {
        setChartDimensions('14px', '12px', -50, -40, 400);
      } else if (window.innerWidth > 450) {
        setChartDimensions('20px', '16px', -68, -40, 500);
      } else {
        setChartDimensions('14px', '12px', -40, -25, 300);
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
import React, { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { HistoryData } from './TradingHistory';

const PnLStats = (props: HighchartsReact.Props) => {
  const [asset, setAsset] = useState<string>('MELD');
  const [labelsize, setLabelSize] = useState<string>('');
  const [labeldistance, setLabelDistance] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
  const categories = ['Sell', 'Buy'];
  let buy_total = 0, sell_total = 0, total = 0, total_amount = 0, price = 0.1294, pnl = 0;
  HistoryData.forEach(element => {
    if (element.asset == asset) {
      if (element.type == 'Sell') {
        sell_total += element.price * element.amount;
        total -= element.price * element.amount;
        total_amount -= element.amount;
      } else {
        buy_total += element.price * element.amount;
        total_amount += element.amount;
      }
    }
  });
  pnl = price * total_amount - total;
  const data = [
    { y: parseFloat((100 * sell_total / (sell_total + buy_total)).toFixed(2)), color: '#e91919' },
    { y: parseFloat((100 * buy_total / (sell_total + buy_total)).toFixed(2)), color: '#00e396' }
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
      size: '100%',
      innerSize: '60%',
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
          minHeight: 400,
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
      if (window.innerWidth > 450) {
        setChartDimensions('20px', -40, 400);
      } else {
        setChartDimensions('14px', -30, 300);
      }
    }
  }, []);

  return (
    <div>
      <HighchartsReact
        highcharts={Highcharts}
        options={options}
        ref={chartComponentRef}
        {...props}
      />
      <div className='d-flex justify-content-center align-items-center gap-2'>
        <div className='h4'>P&L stats</div>
        <div className={`h4 ${pnl < 0 ? 'text-red' : 'text-green'}`}>{pnl < 0 ? '-' : '+'}${pnl.toFixed(4)}</div>
      </div>

    </div>
  )
}

export default PnLStats;
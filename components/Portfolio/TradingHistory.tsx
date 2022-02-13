import React, { useEffect, useState } from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

export const HistoryData = [
  { date: 'Feb 12, 2022, 6:34 AM', type: 'Sell', asset: 'ADA', price: 1.09, amount: 4, fees: 0.170517 },
  { date: 'Feb 12, 2022, 8:50 AM', type: 'Buy', asset: 'ADA', price: 1.14, amount: 5, fees: 0.168493 },
  { date: 'Feb 12, 2022, 2:45 AM', type: 'Sell', asset: 'AGIX', price: 0.12, amount: 11, fees: 0.169153 },
  { date: 'Feb 12, 2022, 4:12 AM', type: 'Sell', asset: 'MELD', price: 0.13, amount: 5, fees: 0.830847 },
  { date: 'Feb 11, 2022, 6:56 AM', type: 'Buy', asset: 'ADA', price: 1.13, amount: 7, fees: 0.170517 },
  { date: 'Feb 11, 2022, 1:23 AM', type: 'Sell', asset: 'MELD', price: 0.13, amount: 12, fees: 0.170517 },
  { date: 'Feb 11, 2022, 8:40 AM', type: 'Buy', asset: 'MELD', price: 0.14, amount: 20, fees: 0.830847 },
  { date: 'Feb 11, 2022, 4:30 AM', type: 'Buy', asset: 'AGIX', price: 0.12, amount: 40, fees: 0.169153 },
  { date: 'Feb 10, 2022, 9:23 AM', type: 'Buy', asset: 'MELD', price: 0.13, amount: 10, fees: 0.170517 },
  { date: 'Feb 10, 2022, 6:45 AM', type: 'Buy', asset: 'AGIX', price: 0.11, amount: 5, fees: 0.830847 },
  { date: 'Feb 10, 2022, 11:15 AM', type: 'Buy', asset: 'MELD', price: 0.13, amount: 8, fees: 0.170517 },
  { date: 'Feb 9, 2022, 10:26 AM', type: 'Sell', asset: 'MELD', price: 0.14, amount: 6, fees: 0.830847 },
  { date: 'Feb 9, 2022, 9:49 AM', type: 'Buy', asset: 'AGIX', price: 0.12, amount: 10, fees: 0.170517 },
  { date: 'Feb 9, 2022, 8:28 AM', type: 'Sell', asset: 'MELD', price: 0.14, amount: 12, fees: 0.830847 },
  { date: 'Feb 9, 2022, 7:10 AM', type: 'Buy', asset: 'MELD', price: 0.13, amount: 15, fees: 0.830847 },
  { date: 'Feb 9, 2022, 6:50 AM', type: 'Buy', asset: 'ADA', price: 1.08, amount: 32, fees: 0.169153 },
]

type HistoryDataType = {
  date: string;
  type: string;
  asset: string;
  price: number;
  amount: number;
  fees: number;
}

const TradingHistory: React.FC = () => {
  const [data, setData] = useState<HistoryDataType[]>([]);
  const [asset, setAsset] = useState<string>('MELD');

  const handleAmount = ({ data }) => {
    return (
      <div className="d-flex flex-column">
        <span>{data.type == 'Sell' ? '-' : '+'}${(data.amount * data.price).toFixed(2)}</span>
        <span className={data.type == 'Sell' ? 'text-red' : 'text-green'}>{data.type == 'Sell' ? '-' : '+'}{data.amount} {data.asset}</span>
      </div>
    );
  }

  const handlePrice = ({ data }) => {
    return (<div>${data.price}</div>);
  }

  useEffect(() => {
    let temp_data = [];
    HistoryData.forEach(element => {
      if (element.asset == asset) {
        temp_data.push(element);
      }
    });
    setData(temp_data);
  }, []);

  return (
    <div className='ag-theme-alpine' style={{ height: 420 }}>
      <AgGridReact rowData={data} rowHeight={75} frameworkComponents={{ amount: handleAmount, price: handlePrice }}>
        <AgGridColumn headerName="Date" field='date' minWidth={180} flex={1} cellClass="d-flex align-items-center" />
        <AgGridColumn headerName="Type" field='type' minWidth={80} flex={1} cellClass="d-flex align-items-center" />
        <AgGridColumn headerName="Price" cellRenderer="price" minWidth={80} flex={1} cellClass="d-flex align-items-center" />
        <AgGridColumn headerName="Amount" cellRenderer="amount" minWidth={100} flex={1} cellClass="d-flex align-items-center" />
        <AgGridColumn headerName="Fees" field='fees' minWidth={80} flex={1} cellClass="d-flex align-items-center" />
      </AgGridReact>
    </div>
  );
}

export default TradingHistory;
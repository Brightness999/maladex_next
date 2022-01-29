import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import styles from 'styles/Track.module.scss';

const TradingHistoryData = [
  { id: 1, type: 'AAMM', status: 'Executing', state: 'ADA/USDC, 50:50, u+s' },
  { id: 2, type: 'Limit order', status: 'Completed', state: '2.4 ADA/USDC' },
  { id: 3, type: 'Limit order', status: 'Executing', state: '2.5 ADA/USDC, 34% completed' },
  { id: 4, type: 'Limit order', status: 'Executing', state: '5 ADA/X, 50% completed' },
  { id: 5, type: 'Limit order', status: 'Completed', state: '2.9 ADA/USDC' },
  { id: 6, type: 'AAMM', status: 'Executing', state: 'ADA/USDC, 40:60,u+s' },
  { id: 7, type: 'Limit order', status: 'Completed', state: '2.6 ADA/USDC' },
  { id: 8, type: 'Limit order', status: 'Executing', state: '4.6 ADA/X, 80% completed' },
  { id: 9, type: 'AAMM', status: 'Executing', state: 'ADA/USDC, 80:20,u+s' },
  { id: 10, type: 'Limit order', status: 'Completed', state: '3.2 ADA/USDC' },
  { id: 11, type: 'AAMM', status: 'Executing', state: '4.2 ADA/USDC, 46% completed' },
  { id: 12, type: 'Limit order', status: 'Completed', state: '2.4 ADA/USDC' },
  { id: 13, type: 'Limit order', status: 'Executing', state: '2.5 ADA/USDC, 34% completed' },
  { id: 14, type: 'Limit order', status: 'Executing', state: '5 ADA/X, 50% completed' },
  { id: 15, type: 'Limit order', status: 'Completed', state: '2.9 ADA/USDC' },
  { id: 16, type: 'AAMM', status: 'Executing', state: 'ADA/USDC, 40:60,u+s' },
  { id: 17, type: 'Limit order', status: 'Completed', state: '2.6 ADA/USDC' },
  { id: 18, type: 'Limit order', status: 'Executing', state: '4.6 ADA/X, 80% completed' },
  { id: 19, type: 'AAMM', status: 'Executing', state: 'ADA/USDC, 80:20,u+s' },
  { id: 20, type: 'Limit order', status: 'Completed', state: '3.2 ADA/USDC' },
  { id: 21, type: 'AAMM', status: 'Executing', state: '4.2 ADA/USDC, 46% completed' },
]

type TradingType = {
  id: number;
  type: string;
  status: string;
  state: string;
}

const Actions = () => {
  return (
    <div className='d-flex pt-1 gap-1'>
      <button className='btn btn-sm btn-secondary'>Cancel</button>
      <button className='btn btn-sm btn-info'>View</button>
      <button className='btn btn-sm btn-primary'>Modify</button>
    </div>
  );
}

type Props = {
  theme?: string;
  page?: string;
  pair?: string;
}


const Home: React.FC<Props> = (props) => {
  const [data, setData] = useState<TradingType[]>([]);
  const [isactive, setIsActive] = useState<boolean>(false);

  const filterTradingHistoryData = () => {
    if (isactive) {
      let temp_data = [];
      TradingHistoryData.forEach(element => {
        if (element.status == 'Executing') {
          temp_data.push(element);
        }
      });
      setData(temp_data);
    } else {
      setData(TradingHistoryData);
    }
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('page', 'track');
    }
  }, []);

  useEffect(() => {
    filterTradingHistoryData();
  }, [isactive]);

  return (
    <div className={`${styles.track} ${props.theme == 'dark' ? styles.dark : ''}`}>
      <div className='container d-flex justify-content-center'>
        <div className={styles.switch}>
          <button className={isactive ? styles.active : ''} onClick={() => setIsActive(true)}>Active</button>
          <button className={isactive ? '' : styles.active} onClick={() => setIsActive(false)}>Historical</button>
        </div>
      </div>
      <div className={`container ag-theme-alpine ${styles.tradinghistory}`}>
        <AgGridReact rowData={data} frameworkComponents={{ actions: Actions }}>
          <AgGridColumn headerName="ID" field='id' sortable={true} filter="agNumberColumnFilter" minWidth={100} flex={1} />
          <AgGridColumn headerName="Type" field='type' sortable={true} filter="agStringColumnFilter" minWidth={150} flex={2} />
          <AgGridColumn headerName="Status" field='status' sortable={true} filter="agStringColumnFilter" minWidth={150} flex={2} />
          <AgGridColumn headerName="State Summary" field='state' sortable={true} filter="agStringColumnFilter" minWidth={250} flex={3} />
          <AgGridColumn headerName="Actions" cellRenderer='actions' />
        </AgGridReact>
      </div>
    </div>
  );
}

export default Home;
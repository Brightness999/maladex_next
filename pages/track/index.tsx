import React, { useEffect, useState } from 'react';
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

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
]

type TradingType = {
  id: number;
  type: string;
  status: string;
  state: string;
}

const Actions = () => {
  return (
    <div className='d-flex gap-1'>
      <button className='btn btn-sm btn-secondary'>Cancel</button>
      <button className='btn btn-sm btn-info'>View</button>
      <button className='btn btn-sm btn-primary'>Modify</button>

    </div>
  );
}

const Home: React.FC = () => {
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
    filterTradingHistoryData();
  }, [isactive]);

  return (
    <React.Fragment>
      <div className='container d-flex justify-content-center'>
        <div className='d-flex gap-2'>
          <button className='btn btn-lg btn-danger' onClick={() => setIsActive(true)}>Active</button>
          <button className='btn btn-lg btn-outline-danger text-sm' onClick={() => setIsActive(false)}>Historical</button>
        </div>
      </div>
      <div className='container ag-theme-alpine' style={{height: '300px'}}>
        <AgGridReact rowData={data} frameworkComponents={{actions: Actions}}>
          <AgGridColumn headerName="ID" field='id' sortable={true} filter="agNumberColumnFilter" flex={1} />
          <AgGridColumn headerName="Type" field='type' sortable={true} filter="agStringColumnFilter" flex={2} />
          <AgGridColumn headerName="Status" field='status' sortable={true} filter="agStringColumnFilter" flex={2} />
          <AgGridColumn headerName="State Summary" field='state' sortable={true} filter="agStringColumnFilter" flex={4} />
          <AgGridColumn headerName="Actions" flex={4} cellRenderer='actions' />
        </AgGridReact>
      </div>
    </React.Fragment>
  );
}

export default Home;
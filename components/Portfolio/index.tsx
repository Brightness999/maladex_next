import React from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import styles from "styles/Portfolio.module.scss";
import Composition from "./Composition";
import PnLStats from "./PnLStats";
import TradingHistory from "./TradingHistory";

type Props = {
  theme: string;
  page: string;
}

const CompositionData = [{
  platform: '40%',
  airdrops: '5%',
  ispo: '5%',
  year1: '4%',
  year2: '4%',
  year3: '4%',
  year4: '4%',
  year5: '4%',
  private: '10%',
  ifo: '15%',
}]

const Portfolio: React.FC<Props> = (props) => {
  return (
    <div className="d-flex flex-column">
      <div className="d-flex p-4">
        <div className={styles.composition}>
          <Composition />
          <div className='ag-theme-alpine' style={{height: 140}}>
            <AgGridReact rowData={CompositionData}>
              <AgGridColumn headerName="Rewards">
                <AgGridColumn headerName="Platform Rewards" field='platform' width={150} />
                <AgGridColumn headerName="Airdrops" field='airdrops' width={90} />
                <AgGridColumn headerName="ISPO" field='ispo' width={70} />
              </AgGridColumn>
              <AgGridColumn headerName="Team">
                <AgGridColumn headerName="Year1" field='year1' width={80} />
                <AgGridColumn headerName="Year2" field='year2' width={80} />
                <AgGridColumn headerName="Year3" field='year3' width={80} />
                <AgGridColumn headerName="Year4" field='year4' width={80} />
                <AgGridColumn headerName="Year5" field='year5' width={80} />
              </AgGridColumn>
              <AgGridColumn headerName="Sale">
                <AgGridColumn headerName="Private Sale" field='private' width={150} />
                <AgGridColumn headerName="IFO" field='ifo' width={80} />
              </AgGridColumn>
            </AgGridReact>
          </div>
        </div>
        <div className={styles.stats}>
          <PnLStats />
        </div>
      </div>
      <div className={styles.history}>
        <TradingHistory />
      </div>
    </div>
  );
}

export default Portfolio;
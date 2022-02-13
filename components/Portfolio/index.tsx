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
  ADA: '25%',
  MAL: '40%',
  AGIX: '15%',
  MELD: '20%',
}]

const Portfolio: React.FC<Props> = (props) => {
  return (
    <div className="d-flex flex-column">
      <div className="d-md-flex py-md-4 px-4">
        <div className={styles.composition}>
          <Composition />
          <div className='ag-theme-alpine' style={{ height: 100 }}>
            <AgGridReact rowData={CompositionData}>
              <AgGridColumn headerName="ADA" field='ADA' minWidth={80} flex={1} />
              <AgGridColumn headerName="MAL" field='MAL' minWidth={80} flex={1} />
              <AgGridColumn headerName="AGIX" field='AGIX' minWidth={80} flex={1} />
              <AgGridColumn headerName="MELD" field='MELD' minWidth={80} flex={1} />
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
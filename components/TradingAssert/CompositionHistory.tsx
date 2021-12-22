import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import styles from "styles/Trading.module.scss";

type Props = {
  theme?: string;
  type?: string;
  slug?: string;
}

const CompositionHistory: React.FC<Props> = (props) => {

  return (
    <div className={styles.compositionhistory}>
      {/* <AgGridReact
        rowData={[]}
      >
        <AgGridColumn field="columns"></AgGridColumn>
        <AgGridColumn field="assets"></AgGridColumn>
        <AgGridColumn field="%"></AgGridColumn>
        <AgGridColumn field="quantity per set"></AgGridColumn>
        <AgGridColumn field="total price per asset"></AgGridColumn>
      </AgGridReact> */}
    </div>
  );
}

export default CompositionHistory;
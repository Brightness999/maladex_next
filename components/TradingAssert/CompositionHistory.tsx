import React, { useState, useEffect } from "react";
import { AgGridColumn, AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

import styles from "styles/Trading.module.scss";
import { CompositionData } from "lib/data";

type Props = {
  theme?: string;
  type?: string;
  slug?: string;
}

const CompositionHistory: React.FC<Props> = (props) => {
  const [data, setData] = useState<Array<object>>([]);
  const assets = ['mal', 'sundae', 'minswap', 'lq', 'indy'];
  useEffect(() => {
    let temp_arr = [];
    let temp_data = [];
    assets.forEach(asset => {
      CompositionData.forEach(row => {
        if (asset == row.id) {
          temp_arr[asset] = row;
        }
      })
    })
    const getMonthfromNumber = (number: number) => {
      if (number != undefined) {
        switch (number) {
          case 0: return "Jan";
          case 1: return "Feb";
          case 2: return "Mar";
          case 3: return "Apr";
          case 4: return "May";
          case 5: return "Jun";
          case 6: return "Jul";
          case 7: return "Aug";
          case 8: return "Sep";
          case 9: return "Oct";
          case 10: return "Nov";
          case 11: return "Dec";
          default: return '';
        }
      } else {
        return '';
      }
    }
    for (let i = 0; i < 12; i++) {
      let temp_obj = {};
      temp_obj["date"] = getMonthfromNumber(i);
      assets.forEach(asset => {
        temp_obj[`${asset}_percent`] = temp_arr[asset].percentages[i];
        temp_obj[`${asset}_qty`] = `${temp_arr[asset].quantities[i]}M`;
        temp_obj[`${asset}_total_price`] = `$${temp_arr[asset].total_prices[i]}`;
      })
      temp_data.push(temp_obj);
    }
    setData(temp_data);
  }, []);

  return (
    <div className={`ag-theme-alpine ${styles.compositionhistory}`}>
      <AgGridReact
        rowData={data}
      >
        <AgGridColumn headerName="Date" field="date" sortable={true} width={90}></AgGridColumn>
        {assets.map((asset, key) => {
          return (
            <AgGridColumn headerName={asset.toUpperCase()} key={key}>
              <AgGridColumn headerName="%" field={`${asset}_percent`} sortable={true} filter="agNumberColumnFilter" width={90}></AgGridColumn>
              <AgGridColumn headerName="Quantity" field={`${asset}_qty`} sortable={true} filter="agNumberColumnFilter" width={130}></AgGridColumn>
              <AgGridColumn headerName="Total Price" field={`${asset}_total_price`} sortable={true} filter="agNumberColumnFilter" width={140}></AgGridColumn>
            </AgGridColumn>
          )
        })}
      </AgGridReact>
    </div>
  );
}

export default CompositionHistory;
import React from 'react';
import { AdvancedChart } from "react-tradingview-embed";

import styles from '/styles/Home.module.scss';

const StockChart: React.FC = () => {
  return (
    <div className={styles.stockchart}>
      <AdvancedChart widgetProps={{
        "symbol": "BINANCE:ADAUSDT",
        "theme": "light",
        "hide_side_toolbar": true,
        "allow_symbol_change": true,
        "withdateranges": true
      }} />
    </div>
  );
}

export default StockChart;
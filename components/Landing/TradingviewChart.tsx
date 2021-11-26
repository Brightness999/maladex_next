import React from 'react';
import { AdvancedChart } from "react-tradingview-embed";

type Props = {
  theme: string;
}

const TradingviewChart: React.FC<Props> = (props) => {
  return (
    <React.Fragment>
      <AdvancedChart widgetProps={{
        "symbol": "BINANCE:ADAUSDT",
        "theme": props.theme == 'light' ? "light" : 'dark',
        "hide_side_toolbar": true,
        "hide_top_toolbar": true,
        "allow_symbol_change": true,
        "withdateranges": true,
      }} />
    </React.Fragment>
  );
}

export default TradingviewChart;
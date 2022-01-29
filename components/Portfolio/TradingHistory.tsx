import React from "react";

const TradingHistory: React.FC = () => {
  return (
    <table style={{width: '100%'}}>
      <thead>
        <tr>
          <th>Date</th>
          <th>Pair</th>
          <th>Type</th>
          <th>Side</th>
          <th>Price</th>
          <th>Amount</th>
          <th>Filled</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>
  );
}

export default TradingHistory;
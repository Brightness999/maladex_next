import React, { useEffect, useState } from 'react';

import api from '../../lib/api';
import SelectPair from './SelectPair';
import StockChart from './StockChart';
import DepthChart from './DepthChart';
import PlaceOrder from './PlaceOrder';
import PreviewOrder from './PreviewOrder';

const Landing: React.FC = () => {
  const [pair, setPair] = useState('AGIX_BTC');
  const [price, setPrice] = useState('');
  const [TradingData, setTradingData] = useState([]);

  const handleSelectPair = async (value) => {
    setPair(value);
  }
  
  useEffect(() => {
    try {
      api.get(`trade?pair=${pair}`).then((res) => {
        if (res && res.status == 200) {
          if (res.data.TradingData) {
            setTradingData(res.data.TradingData);
            setPrice(res.data.Price);
          }
        }
      });
    } catch (error) {
  
    }
  }, [pair]);

  return (
    <React.Fragment>
      <SelectPair
        handleSelectPair={(value) => handleSelectPair(value)}
      />
      <div style={{ display: 'flex', }}>
        <div style={{ flex: 3 }}>
          <StockChart />
          <DepthChart />
        </div>
        <div style={{ flex: 1 }}>
          <PlaceOrder
            pair={pair}
            price={price}
          />
          <PreviewOrder
            pair={pair}
            price={price}
            TradingData = {TradingData}
          />
        </div>
      </div>
    </React.Fragment>
  );
}

export default Landing;
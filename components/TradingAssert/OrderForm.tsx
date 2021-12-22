import React, { useState, useEffect } from "react";

import styles from "styles/Trading.module.scss";

const OrderFrom: React.FC = () => {
  const [isbuy, setIsBuy] = useState<boolean>(true);
  const [isliquidity, setIsLiquidity] = useState<boolean>(true);

  return (
    <div className={styles.pricecomposition_content_order}>
      <div className={styles.orderselection}>
        <div className={styles.orderselection_buysell}>
          <span className={isbuy ? 'text-underline' : ''} onClick={() => setIsBuy(true)}>Buy</span> / <span className={isbuy ? '' : 'text-underline'} onClick={() => setIsBuy(false)}>Sell</span>
        </div>
        <div className={styles.orderselection_liquidityforge}>
          <span className={isliquidity ? 'text-underline' : ''} onClick={() => setIsLiquidity(true)}>DEX liquidity</span> / <span className={isliquidity ? '' : 'text-underline'} onClick={() => setIsLiquidity(false)}>forge</span>
        </div>
      </div>
      <div className={styles.orderform}>
        <div className={styles.orderform_price}>
          <span className={styles.label}>Price</span>
          <input type="number" />
          <span className={styles.symbol}>BTC</span>
        </div>
        <div className={styles.orderform_amount}>
          <span className={styles.label}>Amount</span>
          <input type="number" />
          <span className={styles.symbol}>AGIX</span>
        </div>
      </div>
      <div className={styles.ordersummary}>
        <textarea></textarea>
      </div>
      <div className={styles.orderaction}>
        <button className={isbuy ? 'bg-green' : 'bg-red'}>Submit</button>
      </div>
    </div>
  );
}

export default OrderFrom;
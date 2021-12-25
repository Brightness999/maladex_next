import React, { useState, useEffect } from "react";

import styles from "styles/Trading.module.scss";

const OrderFrom: React.FC = () => {
  const [isbuy, setIsBuy] = useState<boolean>(true);
  const [isliquidity, setIsLiquidity] = useState<boolean>(true);
  const [pricesymbol, setPriceSymbol] = useState<string>("MAL");

  const changePriceSymbol = (value: React.SetStateAction<string>) => {
    setPriceSymbol(value)
  }

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
          <div className={styles.symbolselect}>
            <span className={styles.symbol}>{pricesymbol}</span>
            <div className={styles.symbolselect_options}>
              <div className={styles.symbol} id="ADA" onClick={(e) => changePriceSymbol((e.target as HTMLElement).id)}>ADA</div>
              <div className={styles.symbol} id="MAL" onClick={(e) => changePriceSymbol((e.target as HTMLElement).id)}>MAL</div>
              <div className={styles.symbol} id="AGIX" onClick={(e) => changePriceSymbol((e.target as HTMLElement).id)}>AGIX</div>
              <div className={styles.symbol} id="LQ" onClick={(e) => changePriceSymbol((e.target as HTMLElement).id)}>LQ</div>
              <div className={styles.symbol} id="INDY" onClick={(e) => changePriceSymbol((e.target as HTMLElement).id)}>INDY</div>
            </div>
          </div>
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
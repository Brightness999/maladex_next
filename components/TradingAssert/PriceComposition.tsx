import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import styles from "styles/Trading.module.scss";

const PriceChart = dynamic(() => import('./PriceChart'), {
  loading: () => <div className='loading'>Loading...</div>
});

const CompositionChart = dynamic(() => import('./CompositionChart'), {
  loading: () => <div className='loading'>Loading...</div>
})

type Props = {
  theme?: string;
}

const PriceComposition: React.FC<Props> = (props) => {
  const [ispriceselected, setIsPriceSelected] = useState<boolean>(true);

  return (
    <div className={styles.pricecomposition}>
      <div className={styles.pricecomposition_select}>
        <div className={styles.pricecomposition_select_price}>
          <div className={`${styles.pricecomposition_select_price_text} ${ispriceselected && styles.active}`}>
            Price
          </div>
        </div>
        <div className={styles.pricecomposition_select_composition}>
          <div className={`${styles.pricecomposition_select_composition_text} ${!ispriceselected && styles.active}`}>
            Composition
          </div>
        </div>
      </div>
      <div className={styles.pricecomposition_content}>
        {ispriceselected ?
          <PriceChart />
          :
          <CompositionChart />
        }
        <div className={styles.pricecomposition_content_order}>
          <div className={styles.orderselection}>
            <div className={styles.orderselection_buysell}>
              <span>Buy</span> / <span>Sell</span>
            </div>
            <div className={styles.orderselection_liquidityforge}>
              <span>DEX liquidity</span> / <span>forge</span>
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
            <button>Submit</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PriceComposition;
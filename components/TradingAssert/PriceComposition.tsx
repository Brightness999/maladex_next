import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";

import styles from "styles/Trading.module.scss";
import OrderFrom from "./OrderForm";

const PriceChart = dynamic(() => import('./PriceChart'), {
  loading: () => <div className='loading'>...</div>
});

const CompositionChart = dynamic(() => import('./CompositionChart'), {
  loading: () => <div className='loading'>...</div>
})

type Props = {
  theme?: string;
  type?: string;
  slug?: string;
}

const PriceComposition: React.FC<Props> = (props) => {
  const [ispriceselected, setIsPriceSelected] = useState<boolean>(true);

  return (
    <div className={styles.pricecomposition}>
      <div className={styles.pricecomposition_select}>
        <div className={styles.pricecomposition_select_price}>
          <div className={`${styles.pricecomposition_select_price_text} ${ispriceselected && styles.active}`} onClick={() => setIsPriceSelected(true)}>
            Price
          </div>
        </div>
        <div className={styles.pricecomposition_select_composition}>
          <div className={`${styles.pricecomposition_select_composition_text} ${!ispriceselected && styles.active}`} onClick={() => setIsPriceSelected(false)}>
            Composition
          </div>
        </div>
      </div>
      <div className={styles.pricecomposition_content} id="pricecomposition_content">
        {ispriceselected ?
          <PriceChart
            theme={props.theme}
          />
          :
          <CompositionChart />
        }
        <OrderFrom />
      </div>
    </div>
  )
}

export default PriceComposition;
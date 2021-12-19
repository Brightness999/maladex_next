import React, { useState } from "react";

import styles from 'styles/Home.module.scss';

type Props = {
  theme: string;
  close: any;
}

const Orders: React.FC<Props> = (props) => {
  const [item, setItem] = useState<string>("orderbook");
  const [orders, setOrders] = useState<Array<object>>([]);

  const changeItem = (e) => {
    setItem(e.target.id);
  }

  return (
    <div className={styles.orders}>
      <div className={`draggableHandle ${styles.orders_menu_wrapper}`}>
        <div className={styles.orders_menu}>
          <div className={styles.orders_menu_items}>
            <span id="orderbook" className={item == 'orderbook' ? styles.active : ''} onClick={(e) => changeItem(e)}>Order Book</span>
            <span id="example1" className={item == 'example1' ? styles.active : ''} onClick={(e) => changeItem(e)}>Example #1</span>
            <span id="example2" className={item == 'example2' ? styles.active : ''} onClick={(e) => changeItem(e)}>Example #2</span>
          </div>
          <div style={{ flex: 1 }}></div>
          <div className={styles.orders_menu_action}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" onClick={props.close}>
              <path d="M10.586 12L4.293 5.707 5 5l.707-.707L12 10.586l6.293-6.293L19 5l.707.707L13.414 12l6.293 6.293-1.414 1.414L12 13.414l-6.293 6.293L5 19l-.707-.707L10.586 12z" fill="currentColor"></path>
            </svg>
          </div>
        </div>
      </div>
      <div className={styles.orders_content}>
        <div className={styles.orders_content_header}>
          <div className={styles.orders_content_header_date}>
            <span>Date</span>
          </div>
          <div className={styles.orders_content_header_pair}>
            <span>Pair</span>
          </div>
          <div className={styles.orders_content_header_type}>
            <span>Type</span>
          </div>
          <div className={styles.orders_content_header_side}>
            <span>Side</span>
          </div>
          <div className={styles.orders_content_header_price}>
            <span>Price</span>
          </div>
          <div className={styles.orders_content_header_amount}>
            <span>Amount</span>
          </div>
          <div className={styles.orders_content_header_filled}>
            <span>Filled</span>
          </div>
          <div className={styles.orders_content_header_total}>
            <span>Total</span>
          </div>
          <div className={styles.orders_content_header_trigger}>
            <span>Trigger Contributions</span>
          </div>
          <div className={styles.orders_content_header_cancel}>
            <span>Cancel All</span>
          </div>
        </div>
        <div className={styles.orders_content_rows}>
          {
            orders.length ? <div></div>
              : <div className={styles.orders_content_rows_noorder}><span>You have no open orders.</span></div>
          }
        </div>
      </div>
    </div>
  );
}

export default Orders;
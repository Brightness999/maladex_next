import { useEffect, useState } from 'react';
import styles from '/styles/Home.module.scss';

type Props = {
  pair?: string;
  price?: string;
  TradingData?: Array<any>;
  close?: any;
  mobile?: boolean;
}

const PreviewOrder: React.FC<Props> = (props) => {
  const [selldata, setSellData] = useState([]);
  const [buydata, setBuyData] = useState([]);
  const [pair, setPair] = useState(props.pair);
  const [price, setPrice] = useState(props.price);

  useEffect(() => {
    let sell_temp = [], buy_temp = [];
    props.TradingData.forEach(transac => {
      if (transac.m) {
        sell_temp.push(transac);
      } else {
        buy_temp.push(transac);
      }
    });
    setSellData(sell_temp.slice(0, 10));
    setBuyData(buy_temp.slice(0, 10));
    setPair(props.pair);
    setPrice(props.price);
  }, [props]);

  return (
    <div className={styles.previeworder}>
      {!props.mobile &&
        <div className={`draggableHandle ${styles.previeworder__title}`}>
          <span>Order Book</span>
        </div>
      }
      <div>
        <div className={styles.previeworder__header}>
          <div className={styles.previeworder__header_price}><span>Price({pair.split('_').length > 1 ? pair.split('_')[1] : ''})</span></div>
          <div className={styles.previeworder__header_amount}><span>Amount({pair.split('_').length > 1 ? pair.split('_')[0] : ''})</span></div>
          <div className={styles.previeworder__header_total}><span>Total</span></div>
        </div>
        <div className={styles.previeworder__content}>
          {
            selldata.map((item, index) => {
              return (
                <div key={index} className={styles.previeworder__content_order}>
                  <div className={styles.previeworder__content_order_price}><span className="text-red">{
                    pair == 'AGIX_MAL' && parseFloat(item.p).toFixed(8) ||
                    pair == 'ADA_MAL' && parseFloat(item.p).toFixed(8) ||
                    pair == 'BNB_MAL' && parseFloat(item.p).toFixed(6)
                  }</span></div>
                  <div className={styles.previeworder__content_order_amount}><span>{
                    pair == 'AGIX_MAL' && parseFloat(item.q).toFixed(0) ||
                    pair == 'ADA_MAL' && parseFloat(item.q).toFixed(1) ||
                    pair == 'BNB_MAL' && parseFloat(item.q).toFixed(3)
                  }</span></div>
                  <div className={styles.previeworder__content_order_total}><span>{
                    pair == 'AGIX_MAL' && (item.p * item.q).toFixed(7) ||
                    pair == 'ADA_MAL' && (item.p * item.q).toFixed(7) ||
                    pair == 'BNB_MAL' && (item.p * item.q).toFixed(5)
                  }</span></div>
                </div>
              );
            })
          }
        </div>
        {
          props.TradingData.length > 0 &&
          <div className={styles.previeworder__price}>
            <h5>{price}<span>${pair == 'AGIX_MAL' ? (56920.51 * parseFloat(price)).toFixed(6) : (56920.51 * parseFloat(price)).toFixed(2)}</span> </h5>
          </div>
        }
        <div className={styles.previeworder__content}>
          {
            buydata.map((item, index) => {
              return (
                <div key={index} className={styles.previeworder__content_order}>
                  <div className={styles.previeworder__content_order_price}><span className="text-green">{
                    pair == 'AGIX_MAL' && parseFloat(item.p).toFixed(8) ||
                    pair == 'ADA_MAL' && parseFloat(item.p).toFixed(8) ||
                    pair == 'BNB_MAL' && parseFloat(item.p).toFixed(6)
                  }</span></div>
                  <div className={styles.previeworder__content_order_amount}><span>{
                    pair == 'AGIX_MAL' && parseFloat(item.q).toFixed(0) ||
                    pair == 'ADA_MAL' && parseFloat(item.q).toFixed(1) ||
                    pair == 'BNB_MAL' && parseFloat(item.q).toFixed(3)
                  }</span></div>
                  <div className={styles.previeworder__content_order_total}><span>{
                    pair == 'AGIX_MAL' && (item.p * item.q).toFixed(7) ||
                    pair == 'ADA_MAL' && (item.p * item.q).toFixed(7) ||
                    pair == 'BNB_MAL' && (item.p * item.q).toFixed(5)
                  }</span></div>
                </div>
              );
            })
          }
        </div>
      </div>
      <div className={styles.previeworder_close}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" onClick={props.close}>
          <path d="M10.586 12L4.293 5.707 5 5l.707-.707L12 10.586l6.293-6.293L19 5l.707.707L13.414 12l6.293 6.293-1.414 1.414L12 13.414l-6.293 6.293L5 19l-.707-.707L10.586 12z" fill="currentColor"></path>
        </svg>
      </div>
    </div>
  );
}

export default PreviewOrder;
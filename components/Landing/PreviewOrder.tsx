import { useEffect, useState } from 'react';
import styles from '/styles/Home.module.scss';

type Props = {
  pair: string,
  price: string,
  TradingData: Array<any>
}

const PreviewOrder: React.FC<Props> = (props) => {
  const [selldata, setSellData] = useState([]);
  const [buydata, setBuyData] = useState([]);
  const [pair, setPair] = useState(props.pair);
  const [price, setPrice] = useState(props.price);

  useEffect(() => {
    let sell_temp = [], buy_temp = [];
    props.TradingData.forEach(tranc => {
      if (tranc.m) {
        sell_temp.push(tranc);
      } else {
        buy_temp.push(tranc);
      }
    });
    setSellData(sell_temp.slice(0, 10));
    setBuyData(buy_temp.slice(0, 10));
    setPair(props.pair);
    setPrice(props.price);
  }, [props]);

  return (
    <div className={`mt-5 ${styles.previeworder}`} id="future">
      <div className={styles.previeworder__title}>
        <span>Order Book</span>
      </div>
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
                    pair == 'AGIX_BTC' && parseFloat(item.p).toFixed(8) ||
                    pair == 'ADA_BTC' && parseFloat(item.p).toFixed(8) ||
                    pair == 'BNB_BTC' && parseFloat(item.p).toFixed(6)
                  }</span></div>
                  <div className={styles.previeworder__content_order_amount}><span>{
                    pair == 'AGIX_BTC' && parseFloat(item.q).toFixed(0) ||
                    pair == 'ADA_BTC' && parseFloat(item.q).toFixed(1) ||
                    pair == 'BNB_BTC' && parseFloat(item.q).toFixed(3)
                  }</span></div>
                  <div className={styles.previeworder__content_order_total}><span>{
                    pair == 'AGIX_BTC' && (item.p * item.q).toFixed(7) ||
                    pair == 'ADA_BTC' && (item.p * item.q).toFixed(7) ||
                    pair == 'BNB_BTC' && (item.p * item.q).toFixed(5)
                  }</span></div>
                </div>
              );
            })
          }
        </div>
        <div className={styles.previeworder__price}>
          <h5>{price}<span>${pair == 'AGIX_BTC' ? (56920.51 * parseFloat(price)).toFixed(6) : (56920.51 * parseFloat(price)).toFixed(2)}</span> </h5>
        </div>
        <div className={styles.previeworder__content}>
          {
            buydata.map((item, index) => {
              return (
                <div key={index} className={styles.previeworder__content_order}>
                  <div className={styles.previeworder__content_order_price}><span className="text-green">{
                    pair == 'AGIX_BTC' && parseFloat(item.p).toFixed(8) ||
                    pair == 'ADA_BTC' && parseFloat(item.p).toFixed(8) ||
                    pair == 'BNB_BTC' && parseFloat(item.p).toFixed(6)
                  }</span></div>
                  <div className={styles.previeworder__content_order_amount}><span>{
                    pair == 'AGIX_BTC' && parseFloat(item.q).toFixed(0) ||
                    pair == 'ADA_BTC' && parseFloat(item.q).toFixed(1) ||
                    pair == 'BNB_BTC' && parseFloat(item.q).toFixed(3)
                  }</span></div>
                  <div className={styles.previeworder__content_order_total}><span>{
                    pair == 'AGIX_BTC' && (item.p * item.q).toFixed(7) ||
                    pair == 'ADA_BTC' && (item.p * item.q).toFixed(7) ||
                    pair == 'BNB_BTC' && (item.p * item.q).toFixed(5)
                  }</span></div>
                </div>
              );
            })
          }
        </div>
      </div>
    </div>
  );
}

export default PreviewOrder;
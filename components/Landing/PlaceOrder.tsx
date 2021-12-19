import React, { useEffect, useState } from 'react';

import styles from 'styles/Home.module.scss';

type OrderProps = {
  mainmenu?: string;
  submenu?: string;
  action?: string;
  pair?: string;
  price?: string;
}

const OrderForm: React.FC<OrderProps> = (props) => {
  const [price, setPrice] = useState(props.price);
  const [stop, setStop] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');

  useEffect(() => {
    setPrice(props.price);
  }, [props.price]);

  const handlePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    let arr = e.target.value.split('.');
    let p = '';
    if (arr.length > 1) {
      p = props.pair == 'AGIX_MAL' && `${arr[0]}.${arr[1].substr(0, 8)}`
        || props.pair == 'ADA_MAL' && `${arr[0]}.${arr[1].substr(0, 8)}`
        || props.pair == 'BNB_MAL' && `${arr[0]}.${arr[1].substr(0, 6)}`;
    } else {
      p = arr[0];
    }
    setPrice(p);
    setTotal(() => {
      return props.pair == 'AGIX_MAL' && (parseFloat(p) * parseFloat(amount)).toFixed(7).toString()
        || props.pair == 'ADA_MAL' && (parseFloat(p) * parseFloat(amount)).toFixed(7).toString()
        || props.pair == 'BNB_MAL' && (parseFloat(p) * parseFloat(amount)).toFixed(5).toString();
    });
  }

  const handleStop = (e: React.ChangeEvent<HTMLInputElement>) => {
    let arr = e.target.value.split('.');
    let s = '';
    if (arr.length > 1) {
      s = props.pair == 'AGIX_MAL' && `${arr[0]}.${arr[1].substr(0, 8)}`
        || props.pair == 'ADA_MAL' && `${arr[0]}.${arr[1].substr(0, 8)}`
        || props.pair == 'BNB_MAL' && `${arr[0]}.${arr[1].substr(0, 6)}`;
    } else {
      s = arr[0];
    }
    setStop(s);
  }

  const handleAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    let arr = e.target.value.split('.');
    let a = '';
    if (arr.length > 1) {
      a = props.pair == 'AGIX_MAL' && `${arr[0]}`
        || props.pair == 'ADA_MAL' && `${arr[0]}.${arr[1].substr(0, 1)}`
        || props.pair == 'BNB_MAL' && `${arr[0]}.${arr[1].substr(0, 3)}`;
    } else {
      a = arr[0];
    }
    setAmount(a);
    setTotal(() => {
      return props.pair == 'AGIX_MAL' && (parseFloat(a) * parseFloat(price)).toFixed(7).toString()
        || props.pair == 'ADA_MAL' && (parseFloat(a) * parseFloat(price)).toFixed(7).toString()
        || props.pair == 'BNB_MAL' && (parseFloat(a) * parseFloat(price)).toFixed(5).toString();
    });
  }

  const handleTotal = (e: React.ChangeEvent<HTMLInputElement>) => {
    let arr = e.target.value.split('.');
    let t = '';
    if (arr.length > 1) {
      t = props.pair == 'AGIX_MAL' && `${arr[0]}.${arr[1].substr(0, 7)}`
        || props.pair == 'ADA_MAL' && `${arr[0]}.${arr[1].substr(0, 7)}`
        || props.pair == 'BNB_MAL' && `${arr[0]}.${arr[1].substr(0, 5)}`;
    } else {
      t = arr[0];
    }
    setTotal(t);
    setAmount(() => {
      return props.pair == 'AGIX_MAL' && (parseFloat(t) / parseFloat(price)).toFixed(0).toString()
        || props.pair == 'ADA_MAL' && (parseFloat(t) / parseFloat(price)).toFixed(1).toString()
        || props.pair == 'BNB_MAL' && (parseFloat(t) / parseFloat(price)).toFixed(3).toString();
    });
  }

  return (
    <div className={styles.orderform}>
      {
        props.mainmenu == 'spot' ?
          <React.Fragment>
            <div className={styles.orderform__input}>
              {
                props.submenu == 'limit' &&
                <div className={styles.orderform__input_item}>
                  <div className={styles.orderform__input_item_name}>
                    <label>Price</label>
                  </div>
                  <div><input className={styles.orderform__input_item_value} min="0.1" type="number" value={price} onChange={(e) => handlePrice(e)} /></div>
                  <div className={styles.orderform__input_item_unit}>
                    <label>{props.pair.split('_')[1]}</label>
                  </div>
                </div>
              }
              {
                props.submenu == 'market' &&
                <div className={styles.orderform__input_item}>
                  <div className={styles.orderform__input_item_name}>
                    <label>Price</label>
                  </div>
                  <div><input className={styles.orderform__input_item_value} min="0.1" type="text" value="Market" onChange={() => { }} /></div>
                  <div className={styles.orderform__input_item_unit}>
                    <label>{props.pair.split('_')[1]}</label>
                  </div>
                </div>
              }
              {
                props.submenu == 'stop-limit' &&
                <React.Fragment>
                  <div className={styles.orderform__input_item}>
                    <div className={styles.orderform__input_item_name}>
                      <label>Stop</label>
                    </div>
                    <div><input className={styles.orderform__input_item_value} min="0.1" type="number" value={stop} onChange={(e) => handleStop(e)} /></div>
                    <div className={styles.orderform__input_item_unit}>
                      <label>{props.pair.split('_')[1]}</label>
                    </div>
                  </div>
                  <div className={styles.orderform__input_item}>
                    <div className={styles.orderform__input_item_name}>
                      <label>Limit</label>
                    </div>
                    <div><input className={styles.orderform__input_item_value} min="0.1" type="number" value={price} onChange={(e) => handlePrice(e)} /></div>
                    <div className={styles.orderform__input_item_unit}>
                      <label>{props.pair.split('_')[1]}</label>
                    </div>
                  </div>
                </React.Fragment>
              }
              <div className={styles.orderform__input_item}>
                <div className={styles.orderform__input_item_name}>
                  <label>Amount</label>
                </div>
                <div><input className={styles.orderform__input_item_value} min="0.1" type="number" value={amount} onChange={(e) => handleAmount(e)} /></div>
                <div className={styles.orderform__input_item_unit}>
                  <label>{props.pair.split('_')[0]}</label>
                </div>
              </div>
              {
                (props.submenu == 'limit' || props.submenu == 'stop-limit') &&
                <div className={styles.orderform__input_item}>
                  <div className={styles.orderform__input_item_name}>
                    <label>Total</label>
                  </div>
                  <div><input className={styles.orderform__input_item_value} min="0.1" type="number" value={total} onChange={(e) => handleTotal(e)} /></div>
                  <div className={styles.orderform__input_item_unit}>
                    <label>{props.pair.split('_')[1]}</label>
                  </div>
                </div>
              }
            </div>
            <div className={styles.orderform__confirm}>
              <button className={props.action == 'buy' ? 'bg-green' : 'bg-red'}><span className={styles.orderform__confirm_action}>{props.action}</span> <span className={styles.orderform__confirm_target}>{props.pair.split('_')[0]}</span></button>
            </div>
          </React.Fragment>
          : null
      }
      {
        props.mainmenu == 'strategy' ?
          <React.Fragment>
            <div className={styles.orderform__input}>
              <div className={styles.orderform__input_item}>
                <div className={styles.orderform__input_item_name}>
                  <label>#1</label>
                </div>
                <div><input className={styles.orderform__input_item_value} min="0.1" type="number" value={price} onChange={(e) => handlePrice(e)} /></div>
                <div className={styles.orderform__input_item_unit}>
                  <label>{props.pair.split('_')[1]}</label>
                </div>
              </div>
              <div className={styles.orderform__input_item}>
                <div className={styles.orderform__input_item_name}>
                  <label>#2</label>
                </div>
                <div><input className={styles.orderform__input_item_value} min="0.1" type="number" value={amount} onChange={(e) => handleAmount(e)} /></div>
                <div className={styles.orderform__input_item_unit}>
                  <label>{props.pair.split('_')[0]}</label>
                </div>
              </div>

              <div className={styles.orderform__input_item}>
                <div className={styles.orderform__input_item_name}>
                </div>
                <div><input className={styles.orderform__input_item_value} min="0.1" type="number" /></div>
                <div className={styles.orderform__input_item_unit}>
                </div>
              </div>
              <div className={styles.orderform__input_item}>
                <div className={styles.orderform__input_item_name}>
                </div>
                <div><textarea name="textarea" className={`${styles.orderform__input_item_value} ${styles.strategy}`}></textarea></div>
              </div>
            </div>
            <div className={styles.orderform__confirm}>
              <button className="bg-red"><span className={styles.orderform__confirm_action}>Submit</span></button>
            </div>
          </React.Fragment>
          : null
      }
    </div>
  );
}

type Props = {
  pair?: string;
  price?: string;
  close?: any;
  tradingaction?: string;
}

const PlaceOrder: React.FC<Props> = (props) => {
  const [pair, setPair] = useState(props.pair);
  const [price, setPrice] = useState(props.price);
  const [mainmenu, setMainMenu] = useState('spot');
  const [submenu, setSubMenu] = useState('limit');
  const [action, setAction] = useState(props.tradingaction);

  useEffect(() => {
    setPair(props.pair);
    setPrice(props.price);
  }, [props])

  const handleMainMenu = (e) => {
    setMainMenu(e.target.value);
  }
  const handleSubMenu = (e) => {
    setSubMenu(e.target.value);
  }
  const handleAction = (e) => {
    setAction(e.target.value);
  }
  return (
    <div className={styles.placeorder}>
      <div className={`${styles.placeorder__menu}`}>
        <button value="spot" onClick={(e) => handleMainMenu(e)} className={mainmenu == 'spot' ? styles.placeorder__menu_focus : ''}>Spot</button>
        <span>|</span>
        <button value="strategy" onClick={(e) => handleMainMenu(e)} className={mainmenu == 'strategy' ? styles.placeorder__menu_focus : ''}>Strategy</button>
        <div className={`${styles.placeorder__menu_draggable} draggableHandle`}></div>
      </div>
      {
        mainmenu == 'spot' ?
          <React.Fragment>
            <div className={styles.placeorder__menu}>
              <button value="limit" onClick={(e) => handleSubMenu(e)} className={submenu == 'limit' ? styles.placeorder__menu_focus : ''}>Limit</button>
              <span>|</span>
              <button value="market" onClick={(e) => handleSubMenu(e)} className={submenu == 'market' ? styles.placeorder__menu_focus : ''}>Market</button>
              <span>|</span>
              <button value="stop-limit" onClick={(e) => handleSubMenu(e)} className={submenu == 'stop-limit' ? styles.placeorder__menu_focus : ''}>Stop-limit</button>
            </div>
            <div className={styles.placeorder__menu}>
              <button value="buy" onClick={(e) => handleAction(e)} className={action == 'buy' ? styles.placeorder__menu_focus : ''}>Buy</button>
              <span>/</span>
              <button value="sell" onClick={(e) => handleAction(e)} className={action == 'sell' ? styles.placeorder__menu_focus : ''}>Sell</button>
            </div>
          </React.Fragment>
          : null
      }
      <OrderForm
        mainmenu={mainmenu}
        submenu={submenu}
        action={action}
        pair={pair}
        price={price}
      />
      <div className={styles.placeorder_close}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" onClick={props.close}>
          <path d="M10.586 12L4.293 5.707 5 5l.707-.707L12 10.586l6.293-6.293L19 5l.707.707L13.414 12l6.293 6.293-1.414 1.414L12 13.414l-6.293 6.293L5 19l-.707-.707L10.586 12z" fill="currentColor"></path>
        </svg>
      </div>
    </div>
  );
}

export default PlaceOrder;
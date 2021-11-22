import React, { useEffect, useState } from 'react';
import ReactSlider from 'react-slider';

import styles from '/styles/Home.module.scss';

type OrderProps = {
  mainmenu: string,
  submenu: string,
  action: string,
  pair: string,
  price: string
}

const OrderForm: React.FC<OrderProps> = (props) => {
  const [price, setPrice] = useState(props.price);
  const [stop, setStop] = useState('');
  const [amount, setAmount] = useState('');
  const [total, setTotal] = useState('');

  useEffect(() => {
    setPrice(props.price);
  }, [props.price]);

  const handlePrice = (e) => {
    let arr = e.target.value.split('.');
    let p = '';
    if (arr.length > 1) {
      p = props.pair == 'AGIX_BTC' && `${arr[0]}.${arr[1].substr(0, 8)}`
        || props.pair == 'ADA_BTC' && `${arr[0]}.${arr[1].substr(0, 8)}`
        || props.pair == 'BNB_BTC' && `${arr[0]}.${arr[1].substr(0, 6)}`;
    } else {
      p = arr[0];
    }
    setPrice(p);
    setTotal(() => {
      return props.pair == 'AGIX_BTC' && (parseFloat(p) * parseFloat(amount)).toFixed(7).toString()
        || props.pair == 'ADA_BTC' && (parseFloat(p) * parseFloat(amount)).toFixed(7).toString()
        || props.pair == 'BNB_BTC' && (parseFloat(p) * parseFloat(amount)).toFixed(5).toString();
    });
  }

  const handleStop = (e) => {
    let arr = e.target.value.split('.');
    let s = '';
    if (arr.length > 1) {
      s = props.pair == 'AGIX_BTC' && `${arr[0]}.${arr[1].substr(0, 8)}`
        || props.pair == 'ADA_BTC' && `${arr[0]}.${arr[1].substr(0, 8)}`
        || props.pair == 'BNB_BTC' && `${arr[0]}.${arr[1].substr(0, 6)}`;
    } else {
      s = arr[0];
    }
    setStop(s);
  }

  const handleAmount = (e) => {
    let arr = e.target.value.split('.');
    let a = '';
    if (arr.length > 1) {
      a = props.pair == 'AGIX_BTC' && `${arr[0]}`
        || props.pair == 'ADA_BTC' && `${arr[0]}.${arr[1].substr(0, 1)}`
        || props.pair == 'BNB_BTC' && `${arr[0]}.${arr[1].substr(0, 3)}`;
    } else {
      a = arr[0];
    }
    setAmount(a);
    setTotal(() => {
      return props.pair == 'AGIX_BTC' && (parseFloat(a) * parseFloat(price)).toFixed(7).toString()
        || props.pair == 'ADA_BTC' && (parseFloat(a) * parseFloat(price)).toFixed(7).toString()
        || props.pair == 'BNB_BTC' && (parseFloat(a) * parseFloat(price)).toFixed(5).toString();
    });
  }

  const handleTotal = (e) => {
    let arr = e.target.value.split('.');
    let t = '';
    if (arr.length > 1) {
      t = props.pair == 'AGIX_BTC' && `${arr[0]}.${arr[1].substr(0, 7)}`
        || props.pair == 'ADA_BTC' && `${arr[0]}.${arr[1].substr(0, 7)}`
        || props.pair == 'BNB_BTC' && `${arr[0]}.${arr[1].substr(0, 5)}`;
    } else {
      t = arr[0];
    }
    setTotal(t);
    setAmount(() => {
      return props.pair == 'AGIX_BTC' && (parseFloat(t) / parseFloat(price)).toFixed(0).toString()
        || props.pair == 'ADA_BTC' && (parseFloat(t) / parseFloat(price)).toFixed(1).toString()
        || props.pair == 'BNB_BTC' && (parseFloat(t) / parseFloat(price)).toFixed(3).toString();
    });
  }

  return (
    <div className={styles.orderform}>
      <div className={styles.orderform__input}>
        {
          props.submenu == 'limit' &&
          <div className={styles.orderform__input_item}>
            <div className={styles.orderform__input_item_name}>
              <label>Price</label>
            </div>
            <input className={styles.orderform__input_item_value} min="0.1" type="number" value={price} onChange={(e) => handlePrice(e)} />
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
            <input className={styles.orderform__input_item_value} min="0.1" type="text" value="Market" onChange={() => { }} />
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
              <input className={styles.orderform__input_item_value} min="0.1" type="number" value={stop} onChange={(e) => handleStop(e)} />
              <div className={styles.orderform__input_item_unit}>
                <label>{props.pair.split('_')[1]}</label>
              </div>
            </div>
            <div className={styles.orderform__input_item}>
              <div className={styles.orderform__input_item_name}>
                <label>Limit</label>
              </div>
              <input className={styles.orderform__input_item_value} min="0.1" type="number" value={price} onChange={(e) => handlePrice(e)} />
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
          <input className={styles.orderform__input_item_value} min="0.1" type="number" value={amount} onChange={(e) => handleAmount(e)} />
          <div className={styles.orderform__input_item_unit}>
            <label>{props.pair.split('_')[0]}</label>
          </div>
        </div>
        {/* <div className={styles.orderform__input_slide}>
          <ReactSlider
            className={styles.orderform__input_slide_slider}
            marks={[0, 25, 50, 75, 100]}
            markClassName={styles.orderform__input_slide_mark}
            min={0}
            max={100}
            pearling={true}
            minDistance={30}
            thumbClassName={styles.orderform__input_slide_thumb}
            trackClassName={styles.orderform__input_slide_track}
            renderThumb={(props, state) => <div {...props}><span className="text-red">{state.valueNow}</span></div>}
          />
        </div> */}
        {
          (props.submenu == 'limit' || props.submenu == 'stop-limit') &&
          <div className={styles.orderform__input_item}>
            <div className={styles.orderform__input_item_name}>
              <label>Total</label>
            </div>
            <input className={styles.orderform__input_item_value} min="0.1" type="number" value={total} onChange={(e) => handleTotal(e)} />
            <div className={styles.orderform__input_item_unit}>
              <label>{props.pair.split('_')[1]}</label>
            </div>
          </div>
        }
      </div>
      <div className={styles.orderform__confirm}>
        <button className={props.action == 'buy' ? 'bg-green' : 'bg-red'}><span className={styles.orderform__confirm_action}>{props.action}</span> <span className={styles.orderform__confirm_target}>{props.pair.split('_')[0]}</span></button>
      </div>
    </div>
  );
}

type Props = {
  pair: string
  price: string
}

const PlaceOrder: React.FC<Props> = (props) => {
  const [pair, setPair] = useState(props.pair);
  const [price, setPrice] = useState(props.price);
  const [mainmenu, setMainMenu] = useState('spot');
  const [submenu, setSubMenu] = useState('limit');
  const [action, setAction] = useState('buy');

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
    <div className="container">
      <div className={styles.placeorder__menu}>
        <button value="spot" onClick={(e) => handleMainMenu(e)} className={mainmenu == 'spot' ? styles.placeorder__menu_focus : ''}>Spot</button>
        <span>|</span>
        <button value="strategy" onClick={(e) => handleMainMenu(e)} className={mainmenu == 'strategy' ? styles.placeorder__menu_focus : ''}>Strategy</button>
      </div>
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
      <OrderForm
        mainmenu={mainmenu}
        submenu={submenu}
        action={action}
        pair={pair}
        price={price}
      />
    </div>
  );
}

export default PlaceOrder;
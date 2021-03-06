import React, { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);
import dynamic from 'next/dynamic';

import api from 'lib/api';
import styles from 'styles/Home.module.scss';
import { initialLayout } from 'lib/data';

const SelectPair = dynamic(() => import('./SelectPair'), {ssr: false});
const Charts = dynamic(() => import('./Charts'), {ssr: false});
const PlaceOrder = dynamic(() => import('./PlaceOrder'), {ssr: false});
const PreviewOrder = dynamic(() => import('./PreviewOrder'), {ssr: false});
const Orders = dynamic(() => import('./Orders'), {ssr: false});
const ChartOrder = dynamic(() => import('./ChartOrder'), {ssr: false});

type Props = {
  theme?: string;
  pair?: string;
  page?: string;
}

type DataProps = {
  a: number;
  p: string;
  q: string;
  f: number;
  l: number;
  T: number;
  m: boolean;
  M: boolean;
}

const Landing: React.FC<Props> = (props) => {
  const [price, setPrice] = useState<string>("");
  const [TradingData, setTradingData] = useState<DataProps[]>([]);
  const [chartwidth, setChartWidth] = useState<number>(0);
  const [chartheight, setChartHeight] = useState<number>(0);
  const [ordersclose, setOrdersClose] = useState<boolean>(false);
  const [chartclose, setChartClose] = useState<boolean>(false);
  const [placeorderclose, setPlaceorderClose] = useState<boolean>(false);
  const [previeworderclose, setPrevieworderClose] = useState<boolean>(false);
  const [layouts, setLayouts] = useState<any>(initialLayout);
  const [mobile, setMobile] = useState<boolean>(false);
  const [tradingaction, setTradingAction] = useState<string>("")
  const cols = { lg: 1000, md: 1000, sm: 1000, xs: 1000, xxs: 1000 };
  const breakpoints = { lg: 1024, md: 996, sm: 768, xs: 500, xxs: 0 };

  const onResize = (layout: { h: number; w: number; x: number; y: number; }[]) => {
    setChartWidth(window.document.body.clientWidth * layout[0].w / 1000 - 30);
    setChartHeight(layout[0].h - 70);
  }

  const onLayoutChange = (newlayout, newlayouts) => {
    window.localStorage.setItem('layouts', JSON.stringify(newlayouts));
    setLayouts(newlayouts);
  }

  const changeChartSize = (breakpoint: string) => {
    setChartWidth(window.document.body.clientWidth * layouts[breakpoint][0].w / 1000 - 30);
    setChartHeight(layouts[breakpoint][0].h - 70);
  }

  useEffect(() => {
    try {
      api.get(`trade?pair=${props.pair}`).then((res) => {
        if (res && res.status == 200) {
          if (res.data.TradingData) {
            setTradingData(res.data.TradingData);
            setPrice(res.data.Price);
          } else {
            setTradingData([]);
            setPrice("");
          }
        }
      });
    } catch (error) { }
  }, [props.pair]);

  const getBreakpoint = () => {
    let breakpoint = "";
    let width = window.document.body.clientWidth;
    if (width > 1024) {
      breakpoint = "lg";
    } else if (width > 996) {
      breakpoint = "md";
    } else if (width > 768) {
      breakpoint = "sm";
    } else if (width > 480) {
      breakpoint = "xs";
    } else {
      breakpoint = "xxs";
    }
    return breakpoint;
  }

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (layouts) {
        let width = window.document.body.clientWidth;
        window.localStorage.setItem('layouts', JSON.stringify(layouts));
        if (width > 500) {
          setMobile(false);
        } else {
          setMobile(true);
        }
        changeChartSize(getBreakpoint());
      }
      window.addEventListener('resize', function () {
        let newlayouts = JSON.parse(window.localStorage.getItem('layouts'));
        let width = window.document.body.clientWidth;
        if (width > 500) {
          setMobile(false);
        } else {
          setMobile(true);
        }
        setChartWidth(width * newlayouts[getBreakpoint()][0].w / 1000 - 30);
        setChartHeight(newlayouts[getBreakpoint()][0].h - 70);
      })
    }
  }, []);

  return (
    <React.Fragment>
      <SelectPair
        theme={props.theme}
        pair={props.pair}
        page={props.page}
      />
      <div className={`${styles.container} ${mobile && styles.mobile} ${props.theme == 'dark' && `${styles.dark} dark`}`}>
        {mobile ?
          <React.Fragment>
            <div key="charts" className={styles.charts_wrapper}>
              <ChartOrder
                theme={props.theme}
                chartwidth={chartwidth}
                chartheight={chartheight}
                pair={props.pair}
                price={price}
                TradingData={TradingData}
                mobile={mobile}
              />
            </div>
            <div key="orders" className={styles.orders_wrapper}>
              <Orders
                theme={props.theme}
                close={() => setOrdersClose(true)}
              />
            </div>
            {tradingaction &&
              <div key="placeorder" className={`${styles.placeorder_wrapper} ${styles.mobile} ${placeorderclose && styles.close}`}>
                <PlaceOrder
                  pair={props.pair}
                  price={price}
                  close={() => setPlaceorderClose(true)}
                  tradingaction={tradingaction}
                />
              </div>
            }
            <div className={`${styles.orderform__confirm} ${styles.mobile} ${props.theme == 'dark' && styles.dark}`}>
              <button className="bg-green" onClick={() => { setTradingAction("buy"); setPlaceorderClose(false); }}>
                <span className={styles.orderform__confirm_action}>Buy</span>
              </button>
              <button className="bg-red" onClick={() => { setTradingAction("sell"); setPlaceorderClose(false); }}>
                <span className={styles.orderform__confirm_action}>Sell</span>
              </button>
            </div>
          </React.Fragment>
          :
          <ResponsiveReactGridLayout
            rowHeight={0}
            cols={cols}
            breakpoints={breakpoints}
            layouts={layouts}
            measureBeforeMount={false}
            useCSSTransforms={true}
            compactType="vertical"
            preventCollision={false}
            onResize={onResize}
            onLayoutChange={onLayoutChange}
            containerPadding={[0, 0]}
            draggableHandle=".draggableHandle"
            margin={[1, 1]}
          >
            <div key="charts" className={`${styles.charts_wrapper} ${chartclose && styles.close}`}>
              <Charts
                theme={props.theme}
                chartwidth={chartwidth}
                chartheight={chartheight}
                close={() => setChartClose(true)}
              />
            </div>
            <div key="orders" className={`${styles.orders_wrapper} ${ordersclose && styles.close}`}>
              <Orders
                theme={props.theme}
                close={() => setOrdersClose(true)}
              />
            </div>
            <div key="placeorder" className={`'placeorders' ${styles.placeorder_wrapper} ${placeorderclose && styles.close}`}>
              <PlaceOrder
                pair={props.pair}
                price={price}
                close={() => setPlaceorderClose(true)}
                tradingaction="buy"
              />
            </div>
            <div key="previeworder" className={`${styles.previeworder_wrapper} ${previeworderclose && styles.close}`}>
              <PreviewOrder
                pair={props.pair}
                price={price}
                TradingData={TradingData}
                close={() => setPrevieworderClose(true)}
              />
            </div>
          </ResponsiveReactGridLayout>
        }
      </div>
    </React.Fragment >
  );
}

export default Landing;
import React, { useEffect, useState } from 'react';
import { Responsive, WidthProvider } from "react-grid-layout";
const ResponsiveReactGridLayout = WidthProvider(Responsive);

import api from '../../lib/api';
import SelectPair from './SelectPair';
import Charts from './Charts';
import PlaceOrder from './PlaceOrder';
import PreviewOrder from './PreviewOrder';
import styles from '/styles/Home.module.scss';
import Orders from './Orders';

type Props = {
  theme: string
}

const Landing: React.FC<Props> = (props) => {
  const [pair, setPair] = useState<string>("AGIX_BTC");
  const [price, setPrice] = useState<string>("");
  const [TradingData, setTradingData] = useState<Array<object>>([]);
  const [chartwidth, setChartWidth] = useState<number>(0);
  const [chartheight, setChartHeight] = useState<number>(0);
  const [ordersclose, setOrdersClose] = useState<boolean>(false);
  const [chartclose, setChartClose] = useState<boolean>(false);
  const [placeorderclose, setPlaceorderClose] = useState<boolean>(false);
  const [previeworderclose, setPrevieworderClose] = useState<boolean>(false);

  const layouts = {
    lg: [{ i: "charts", x: 0, y: 0, w: 750, h: 590, minW: 400, minH: 300 },
    { i: "orders", x: 0, y: 590, w: 750, h: 300, minW: 500, minH: 150 },
    { i: "placeorder", x: 750, y: 0, w: 250, h: 380, minW: 150, minH: 300 },
    { i: "previeworder", x: 750, y: 380, w: 250, h: 510, minW: 150, minH: 300 }],
    md: [{ i: "charts", x: 0, y: 0, w: 1000, h: 590, minW: 400, minH: 300 },
    { i: "orders", x: 0, y: 590, w: 1000, h: 300, minW: 500, minH: 150 },
    { i: "placeorder", x: 0, y: 890, w: 500, h: 510, minW: 150, minH: 300 },
    { i: "previeworder", x: 500, y: 890, w: 500, h: 510, minW: 150, minH: 300 }],
    sm: [{ i: "charts", x: 0, y: 0, w: 1000, h: 590, minW: 400, minH: 300 },
    { i: "orders", x: 0, y: 0, w: 1000, h: 300, minW: 500, minH: 150 },
    { i: "placeorder", x: 0, y: 860, w: 500, h: 510, minW: 150, minH: 300 },
    { i: "previeworder", x: 500, y: 860, w: 500, h: 510, minW: 150, minH: 300 }],
    xs: [{ i: "charts", x: 0, y: 0, w: 1000, h: 590, minW: 400, minH: 300 },
    { i: "orders", x: 0, y: 0, w: 1000, h: 300, minW: 500, minH: 150 },
    { i: "placeorder", x: 0, y: 860, w: 500, h: 510, minW: 150, minH: 300 },
    { i: "previeworder", x: 500, y: 860, w: 500, h: 510, minW: 150, minH: 300 }],
    xxs: [{ i: "charts", x: 0, y: 0, w: 1000, h: 590, minW: 400, minH: 300 },
    { i: "orders", x: 0, y: 0, w: 1000, h: 300, minW: 500, minH: 150 },
    { i: "placeorder", x: 0, y: 860, w: 1000, h: 410, minW: 150, minH: 300 },
    { i: "previeworder", x: 500, y: 860, w: 1000, h: 510, minW: 150, minH: 300 }],
  };
  const cols = { lg: 1000, md: 1000, sm: 1000, xs: 1000, xxs: 1000 };

  const handleSelectPair = (value: React.SetStateAction<string>) => {
    setPair(value);
  }

  const onResize = (layout: { h: number; w: number; x: number; y: number; }[]) => {
    setChartWidth(window.innerWidth * layout[0].w / 1000 - 30);
    setChartHeight(layout[0].h - 70);
  }

  const changeChartSize = (breakpoint: string) => {
    setChartWidth(window.innerWidth * layouts[breakpoint][0].w / 1000 - 30);
    setChartHeight(layouts[breakpoint][0].h - 70);
  }
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    try {
      api.get(`trade?pair=${pair}`).then((res) => {
        if (res && res.status == 200) {
          if (res.data.TradingData) {
            setTradingData(res.data.TradingData);
            setPrice(res.data.Price);
          }
        }
      });
    } catch (error) { }
  }, [pair]);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (layouts) {
        let breakpoint = "";
        if (window.innerWidth > 1200) {
          breakpoint = "lg";
        } else {
          breakpoint = "md";
        }
        changeChartSize(breakpoint);
      }
      window.addEventListener('resize', function () {
        let breakpoint = "";
        if (window.innerWidth > 1200) {
          breakpoint = "lg";
        } else {
          breakpoint = "md";
        }
        changeChartSize(breakpoint);
      })
    }
    setMounted(true);
  }, []);

  return (
    <React.Fragment>
      <SelectPair
        theme={props.theme}
        handleSelectPair={(value: any) => handleSelectPair(value)}
      />
      <div className={`${styles.container} ${props.theme == 'dark' && styles.dark}`}>
        <ResponsiveReactGridLayout
          rowHeight={0}
          cols={cols}
          layouts={layouts}
          measureBeforeMount={false}
          useCSSTransforms={mounted}
          compactType="vertical"
          preventCollision={false}
          onResize={onResize}
          containerPadding={[0, 0]}
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
              orderwidth={chartwidth}
              orderheight={chartheight}
              close={() => setOrdersClose(true)}
            />
          </div>
          <div key="placeorder" className={`${styles.placeorder_wrapper} ${placeorderclose && styles.close}`}>
            <PlaceOrder
              pair={pair}
              price={price}
              close={() => setPlaceorderClose(true)}
            />
          </div>
          <div key="previeworder" className={`${styles.previeworder_wrapper} ${previeworderclose && styles.close}`}>
            <PreviewOrder
              pair={pair}
              price={price}
              TradingData={TradingData}
              close={() => setPrevieworderClose(true)}
            />
          </div>
        </ResponsiveReactGridLayout>
      </div>
    </React.Fragment >
  );
}

export default Landing;
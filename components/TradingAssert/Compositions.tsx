import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLongArrowAltDown, faLongArrowAltUp } from "@fortawesome/free-solid-svg-icons";

import { CompositionData } from "lib/data";
import styles from "styles/Trading.module.scss";

type Props = {
  theme?: string;
  type?: string;
  slug?: string;
}

const Compositions: React.FC<Props> = (props) => {
  return (
    <div className={styles.compositions}>
      <div className={styles.compositions_table}>
        <table>
          <thead>
            <tr>
              <th><span>Token</span></th>
              <th><span>Quantity per Set</span></th>
              <th><span>Token Price</span></th>
              <th><span>Current Price Allocation</span></th>
              <th><span>Percent Change</span></th>
              <th><span>Total Price per Set</span></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <div>
                  <Image src="/img/defi_pulse.svg" width={24} height={24} />
                  <span>DeFi Pulse Index</span>
                </div>
              </td>
              <td colSpan={3}></td>
              <td>
                <div>
                  <FontAwesomeIcon icon={faLongArrowAltDown} color="#f00605" />
                  <span className="text-red">-30.57%</span>
                </div>
              </td>
              <td><span>$245.11</span></td>
            </tr>
            <tr>
              <td colSpan={8} className={styles.underlying}>
                <div>Underlying Tokens</div>
              </td>
            </tr>
            {CompositionData.map((row, key) => {
              return (
                <tr key={key}>
                  <td>
                    <div>
                      <Image src={row.image} width={24} height={24} />
                      <span>{row.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className={styles.qtyset}>
                      <span>{parseFloat(row.quantity).toFixed(6)}</span>
                      <span className={styles.symboltext}>{row.symbol}</span>
                    </div>
                  </td>
                  <td><span>${row.price}</span></td>
                  <td><span>{row.percent_of_set}%</span></td>
                  <td>
                    <div>
                      <FontAwesomeIcon icon={row.change < 0 ? faLongArrowAltDown : faLongArrowAltUp} color={row.change < 0 ? "#f00605" : "#0fdb8c"} />
                      <span className={row.change < 0 ? 'text-red' : 'text-green'}>{row.change >= 0 && '+'}{row.change}%</span>
                    </div>
                  </td>
                  <td><span>${row.total_price_usd}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Compositions;
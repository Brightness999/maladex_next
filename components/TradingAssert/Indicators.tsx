import React, { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

import styles from "styles/Trading.module.scss";

type Props = {
  theme?: string;
}

const Indicators: React.FC<Props> = (props) => {

  const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"]
      ]
    },
    startup: {
      typeset: false
    }
  };

  return (
    <div className={styles.indicators}>
      <table>
        <thead>
          <tr>
            <th><span>Benchmark</span></th>
            <th><span>Market Cap</span></th>
            <th><span>24h change</span></th>
            <th><span>7d change</span></th>
            <th><span>30d</span></th>
            <th><span>1y</span></th>
            <th><span>Annualized vol <MathJaxContext config={config}><MathJax>{"$$\\sigma$$"}</MathJax></MathJaxContext></span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span>Cardano DeFi Pulse</span></td>
            <td><span>$142.2M</span></td>
            <td><span>+5.5%</span></td>
            <td><span>-11%</span></td>
            <td><span>+7.2%</span></td>
            <td><span>+115.5%</span></td>
            <td><span>0.22</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Indicators;
import React, { useState, useEffect } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

import { BenchmarkData } from "lib/data";
import styles from "styles/Trading.module.scss";

type Props = {
  theme?: string;
  type?: string;
  slug?: string;
}

type IndicatorType = {
  id: string;
  name: string;
  market: number;
  pricechange24h: number;
  pricechange7d: number;
  pricechange30d: number;
  pricechange1y: number;
  annualizedvol: number;
}

const initialindicator = {
  id: "",
  name: "",
  market: 0,
  pricechange24h: 0,
  pricechange7d: 0,
  pricechange30d: 0,
  pricechange1y: 0,
  annualizedvol: 0
}

const Indicators: React.FC<Props> = (props) => {
  const [indicator, setIndicator] = useState<IndicatorType>(initialindicator);

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

  useEffect(() => {
    BenchmarkData.forEach((item) => {
      if (item.id == props.slug) {
        setIndicator(item);
      }
    })
  }, []);

  return (
    <div className={styles.indicators}>
      <table>
        <thead>
          <tr>
            <th><span>Benchmark</span></th>
            <th><span>Market Cap</span></th>
            <th><span>24h</span></th>
            <th><span>7d</span></th>
            <th><span>30d</span></th>
            <th><span>1y</span></th>
            <th><span>Annualized vol <MathJaxContext config={config}><MathJax>{"$$\\sigma$$"}</MathJax></MathJaxContext></span></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><span data-name="Benchmark" className="text-red">{indicator.name}</span></td>
            <td><span data-name="Market Cap" className="text-red">${indicator.market}M</span></td>
            <td><span data-name="24h change" className={indicator.pricechange24h < 0 ? 'text-red' : 'text-green'}>{indicator.pricechange24h >= 0 && '+'}{indicator.pricechange24h}%</span></td>
            <td><span data-name="7d change" className={indicator.pricechange7d < 0 ? 'text-red' : 'text-green'}>{indicator.pricechange7d >= 0 && '+'}{indicator.pricechange7d}%</span></td>
            <td><span data-name="30d change" className={indicator.pricechange30d < 0 ? 'text-red' : 'text-green'}>{indicator.pricechange30d >= 0 && '+'}{indicator.pricechange30d}%</span></td>
            <td><span data-name="1y change" className={indicator.pricechange1y < 0 ? 'text-red' : 'text-green'}>{indicator.pricechange1y >= 0 && '+'}{indicator.pricechange1y}%</span></td>
            <td><span data-name="Annualized vol" className="text-red">{indicator.annualizedvol}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Indicators;
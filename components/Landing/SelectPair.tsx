import React from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";

import styles from '/styles/Home.module.scss';

type Props = {
  theme?: string;
  handleSelectPair?: any;
}

const SelectPair: React.FC<Props> = ({ theme, handleSelectPair }) => {
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
    <div className={`${styles.pair} ${theme == 'dark' && styles.dark}`} >
      <select name="Pair" className={styles.pair__select} onChange={(e) => handleSelectPair(e.target.value)}>
        <option value="AGIX_BTC">AGIX/BTC</option>
        <option value="ADA_BTC">ADA/BTC</option>
        <option value="BNB_BTC">BNB/BTC</option>
      </select>
      <div className={styles.pair__formula}>
        <MathJaxContext config={config}>
          <MathJax>{"$$\\mu=105.13$$"}</MathJax>
          <MathJax>{"$$\\sigma=0.24$$"}</MathJax>
          <MathJax>{"$$y=5$$"}</MathJax>
          <MathJax>{"$$v=0.23$$"}</MathJax>
        </MathJaxContext>
      </div>
    </div>
  );
}

export default SelectPair;
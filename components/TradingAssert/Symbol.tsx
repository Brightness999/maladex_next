import React, { useState, useEffect } from "react";
import Image from 'next/image';

import styles from "styles/Trading.module.scss";

type Props = {
  theme?: string;
}

const Symbol: React.FC<Props> = (props) => {
  const [isexpanded, setIsExpanded] = useState<boolean>(true);

  const handleExpand = () => {
    setIsExpanded(!isexpanded);
  }

  return (
    <div className={styles.symbol}>
      <div className={styles.symbol_content}>
        <div className={styles.symbol_content_img}>
          <Image
            src="/img/ada.svg"
            width={60}
            height={60}
          />
        </div>
        <div className={styles.symbol_content_type}>
          Cardano DeFi Index
        </div>
        <div className={styles.symbol_content_descriptionicon} onClick={() => handleExpand()}>
          <Image
            src="/img/info.svg"
            width={45}
            height={45}
          />
        </div>
      </div>
      {isexpanded &&
        <div className={styles.symbol_description}>
          <p>Collapsible information</p>
          <p>Learn how indexes are made and tracked here(link).</p>
        </div>
      }
    </div>
  )
}

export default Symbol;
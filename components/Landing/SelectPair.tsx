import React, { useEffect, useState } from "react";
import { MathJax, MathJaxContext } from "better-react-mathjax";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faCogs, faStar, faSearch, faSortUp, faSortDown } from "@fortawesome/free-solid-svg-icons";

import styles from '/styles/Home.module.scss';
import { pairData, Symbols, Indexes, Options, ActiveAssets } from "../../lib/data";

type TableProps = {
  pair?: string;
  tabledata?: Array<any>;
  handleSelectPair?: any;
  changeStarPair?: any;
  currentsort?: string;
  changeSort?: any;
  sortitem?: string;
}

const PairTable: React.FC<TableProps> = (props) => {
  const sortTypes = {
    pair: {
      up: {
        class: 'sort-up',
        fn: (a, b) => a.s > b.s ? 1 : -1
      },
      down: {
        class: 'sort-down',
        fn: (a, b) => a.s > b.s ? -1 : 1
      },
      default: {
        class: 'sort',
        fn: (a, b) => a
      }
    },
    lastprice: {
      up: {
        class: 'sort-up',
        fn: (a, b) => a.qv / a.v - b.qv / b.v
      },
      down: {
        class: 'sort-down',
        fn: (a, b) => b.qv / b.v - a.qv / a.v
      },
      default: {
        class: 'sort',
        fn: (a, b) => a
      }
    },
    change: {
      up: {
        class: 'sort-up',
        fn: (a, b) => (a.c - a.o) / a.o - (b.c - b.o) / b.o
      },
      down: {
        class: 'sort-down',
        fn: (a, b) => (b.c - b.o) / b.o - (a.c - a.o) / a.o
      },
      default: {
        class: 'sort',
        fn: (a, b) => a
      }
    },
    default: {
      default: {
        class: 'sort',
        fn: (a, b) => a
      }
    }
  }

  return (
    <table>
      <thead>
        <tr>
          <th>
            <div>
              <div className={styles.header_pair} onClick={() => props.changeSort("pair")}>
                <span>Pair</span>
                <label>
                  <p className={props.currentsort == 'up' && props.sortitem == 'pair' ? styles.active : ''}>
                    <FontAwesomeIcon icon={faSortUp} />
                  </p>
                  <p className={props.currentsort == 'down' && props.sortitem == 'pair' ? styles.active : ''}>
                    <FontAwesomeIcon icon={faSortDown} />
                  </p>
                </label>
              </div>
            </div>
          </th>
          <th>
            <div>
              <div className={styles.header_lastprice} onClick={() => props.changeSort("lastprice")}>
                <span>Last Price</span>
                <label>
                  <p className={props.currentsort == 'up' && props.sortitem == 'lastprice' ? styles.active : ''}>
                    <FontAwesomeIcon icon={faSortUp} />
                  </p>
                  <p className={props.currentsort == 'down' && props.sortitem == 'lastprice' ? styles.active : ''}>
                    <FontAwesomeIcon icon={faSortDown} />
                  </p>
                </label>
              </div>
            </div>
          </th>
          <th>
            <div className={styles.percentage}>
              <div className={styles.header_change} onClick={() => props.changeSort("change")}>
                <span>Change</span>
                <label>
                  <p className={props.currentsort == 'up' && props.sortitem == 'change' ? styles.active : ''}>
                    <FontAwesomeIcon icon={faSortUp} />
                  </p>
                  <p className={props.currentsort == 'down' && props.sortitem == 'change' ? styles.active : ''}>
                    <FontAwesomeIcon icon={faSortDown} />
                  </p>
                </label>
              </div>
            </div>
          </th>
        </tr>
      </thead>
      <tbody>
        {
          props.tabledata.sort(sortTypes[props.sortitem][props.currentsort].fn).map((value, index) => {
            let lastprice = '';
            let averageprice = '';
            let change = '';
            if (value.ts.split(".").length > 1) {
              let length = value.ts.split(".")[1].length;
              lastprice = parseFloat(value.c).toFixed(length);
              averageprice = (value.qv / value.v).toFixed(length);
              change = `${((value.c - value.o) / value.o * 100).toFixed(2)}`;
            } else {
              lastprice = value.c;
              averageprice = (value.qv / value.v).toFixed(0);
              change = `${((value.c - value.o) / value.o * 100).toFixed(2)}`;
            }
            return (
              <tr key={index}>
                <td>
                  <div className={value.sd ? styles.star : ''}>
                    <FontAwesomeIcon icon={faStar} onClick={() => props.changeStarPair(value.s)} />
                    <p id={`${value.b}_${value.q}`} onClick={(e) => props.handleSelectPair((e.target as HTMLElement).parentElement.id)}>
                      <span>{value.b}</span>
                      <span className="text-gray"> / {value.q}</span>
                    </p>
                  </div>
                </td>
                <td>
                  <div>
                    <p>
                      <span>{lastprice}</span>
                      <span className={`${styles.averageprice} text-gray`}> / {averageprice}</span>
                    </p>
                  </div>
                </td>
                <td>
                  <div className={styles.percentage}>
                    <span className={`${parseFloat(change) < 0 ? 'text-red' : 'text-green'}`}>{change}%</span>
                  </div>
                </td>
              </tr>
            )
          })
        }
        <tr></tr>
      </tbody>
    </table >
  );
}

type Props = {
  theme?: string;
  handleSelectPair?: any;
  pair?: string;
}

const SelectPair: React.FC<Props> = (props) => {
  const [pair, setPair] = useState<string>(props.pair);
  const [symbol, setSymbol] = useState<string>("MAL");
  const [index, setIndex] = useState<string>("");
  const [option, setOption] = useState<string>("");
  const [startegy, setStartegy] = useState<string>("");
  const [tabledata, setTableData] = useState<Array<any>>([]);
  const [isstar, setIsStar] = useState<boolean>(false);
  const [pairdata, setPairData] = useState<Array<any>>(pairData);
  const [currentsort, setCurrentSort] = useState<string>("default");
  const [sortitem, setSortitem] = useState<string>("default");

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

  const handleSearchPair = (event: React.ChangeEvent<HTMLInputElement>) => {
    let temp_data = [];
    pairdata.forEach(element => {
      if (element.s.indexOf(event.target.value.toUpperCase()) >= 0) {
        temp_data.push(element);
      }
    });
    setTableData(temp_data);
  }
  
  const selectStar = () => {
    setIsStar(true);
    let temp_data = [];
    pairdata.forEach(element => {
      if (element.sd) {
        temp_data.push(element);
      }
    });
    setTableData(temp_data);
  }

  const selectActiveAssets = () => {
    let temp_data = [];
    pairdata.forEach(element => {
      ActiveAssets.forEach(activeasset => {
        if (element.q == symbol && element.b == activeasset) {
          temp_data.push(element);
        }
      })
    });
    setIsStar(false);
    setTableData(temp_data);
  }
  
  const changeSymbol = (value: React.SetStateAction<string>) => {
    setSymbol(value);
    let temp_data = [];
    pairdata.forEach(element => {
      if (element.q == value) {
        temp_data.push(element);
      }
    });
    setIsStar(false);
    setTableData(temp_data);
  }

  const changeStarPair = (value: any) => {
    pairdata.forEach(element => {
      if (element.s == value) {
        element.sd = !element.sd;
      }
    });
    setPairData(() => {
      return [...pairdata];
    })
  }

  const changeIndex = (value: React.SetStateAction<string>) => {
    setIndex(value);
    let temp_data = [];
    pairdata.forEach(element => {
      if (element.q == value) {
        temp_data.push(element);
      }
    });
    setIsStar(false);
    setTableData(temp_data);
  }

  const changeOption = (value: React.SetStateAction<string>) => {
    setOption(value);
    let temp_data = [];
    pairdata.forEach(element => {
      if (element.q == value) {
        temp_data.push(element);
      }
    });
    setIsStar(false);
    setTableData(temp_data);
  }

  const changeStrategy = (value: React.SetStateAction<string>) => {
    setStartegy(value);
    let temp_data = [];
    pairdata.forEach(element => {
      element.tags.forEach(tag => {
        if (tag == value) {
          temp_data.push(element);
        }
      })
    });
    setIsStar(false);
    setTableData(temp_data);
  }

  const changeSort = (type) => {
    let nextsort = '';
    if (type == sortitem || sortitem == 'default') {
      if (currentsort == 'down') {
        nextsort = 'up';
      } else if (currentsort == 'up') {
        nextsort = 'default';
      } else if (currentsort == 'default') {
        nextsort = 'down';
      }
    } else {
      nextsort = 'default';
    }
    if (nextsort == 'default') {
      let temp_data = [];
      pairdata.forEach(element => {
        if (element.q == symbol) {
          temp_data.push(element);
        }
      });
      setTableData(temp_data);
    }
    setCurrentSort(nextsort);
    setSortitem(type);
  }

  useEffect(() => {
    let temp_data = [];
    pairdata.forEach(element => {
      if (element.q == symbol) {
        temp_data.push(element);
      }
    });
    setTableData(temp_data);
  }, []);

  useEffect(() => {
    setPair(props.pair);
  }, [props.pair]);

  return (
    <div className={`${styles.pair} ${props.theme == 'dark' && styles.dark}`} >
      <div className={styles.pair_symbol}>
        <div className={styles.pair_symbol_text}>
          <span>{pair.replace('_', '/')}</span>
        </div>
        <div className={styles.pair_symbol_icon}>
          <FontAwesomeIcon icon={faCaretDown} />
        </div>
        <div className={styles.pair_select}>
          <div className={styles.pair_select_search}>
            <FontAwesomeIcon icon={faSearch} />
            <input type="search" onChange={(e) => handleSearchPair(e)} placeholder="Search" />
          </div>
          <div className={styles.pair_select_instrumenttypes}>
            <div className={`${styles.pair_select_instrumenttypes_star} ${isstar && styles.star}`}>
              <FontAwesomeIcon icon={faStar} onClick={() => selectStar()} />
            </div>
            <div className={styles.pair_select_instrumenttypes_activeassets}>
              <FontAwesomeIcon icon={faCogs} onClick={() => selectActiveAssets()} />
            </div>
            <div className={styles.pair_select_instrumenttypes_pairs}>
              <span>Pairs</span>
              <FontAwesomeIcon icon={faCaretDown} />
              <div className={styles.pair_select_instrumenttypes_pairs_content}>
                {Symbols.map((value, key) => {
                  return (
                    <span key={key} id={value} onClick={(e) => changeSymbol((e.target as HTMLElement).id)}>{value}</span>
                  );
                })}
              </div>
            </div>
            <div className={styles.pair_select_instrumenttypes_indexes}>
              <span>Indexes</span>
              <FontAwesomeIcon icon={faCaretDown} />
              <div className={styles.pair_select_instrumenttypes_indexes_content}>
                {Indexes.map((value, key) => {
                  return (
                    <span key={key} id={value} onClick={(e) => changeIndex((e.target as HTMLElement).id)}>{value}</span>
                  );
                })}
              </div>
            </div>
            <div className={styles.pair_select_instrumenttypes_options}>
              <span>Options</span>
              <FontAwesomeIcon icon={faCaretDown} />
              <div className={styles.pair_select_instrumenttypes_options_content}>
                {Options.map((value, key) => {
                  return (
                    <span key={key} id={value} onClick={(e) => changeOption((e.target as HTMLElement).id)}>{value}</span>
                  );
                })}
              </div>
            </div>
            <div className={styles.pair_select_instrumenttypes_strategies}>
              <span>Strategies</span>
              <FontAwesomeIcon icon={faCaretDown} />
              <div className={styles.pair_select_instrumenttypes_strategies_content}>
                <span id="innovation-zone" onClick={(e) => changeStrategy((e.target as HTMLElement).id)}>Innovation</span>
                <span id="defi" onClick={(e) => changeStrategy((e.target as HTMLElement).id)}>DeFi</span>
                <span id="BSC" onClick={(e) => changeStrategy((e.target as HTMLElement).id)}>BSC</span>
                <span id="pos" onClick={(e) => changeStrategy((e.target as HTMLElement).id)}>POS</span>
                <span id="pow" onClick={(e) => changeStrategy((e.target as HTMLElement).id)}>POW</span>
                <span id="storage-zone" onClick={(e) => changeStrategy((e.target as HTMLElement).id)}>Storage</span>
                <span id="NFT" onClick={(e) => changeStrategy((e.target as HTMLElement).id)}>NFT</span>
                <span id="Polkadot" onClick={(e) => changeStrategy((e.target as HTMLElement).id)}>Polkadot</span>
                <span id="Gaming" onClick={(e) => changeStrategy((e.target as HTMLElement).id)}>Gaming</span>
                <span id="Metaverse" onClick={(e) => changeStrategy((e.target as HTMLElement).id)}>Metaverse</span>
                <span id="Layer1_Layer2" onClick={(e) => changeStrategy((e.target as HTMLElement).id)}>Layer1 / Layer2</span>
                <span id="fan_token" onClick={(e) => changeStrategy((e.target as HTMLElement).id)}>Fan Token</span>
                <span id="Launchpad" onClick={(e) => changeStrategy((e.target as HTMLElement).id)}>Launchpad</span>
                <span id="Launchpool" onClick={(e) => changeStrategy((e.target as HTMLElement).id)}>Launchpool</span>
                <span id="ETF" onClick={(e) => changeStrategy((e.target as HTMLElement).id)}>ETF</span>
              </div>
            </div>
          </div>
          <div className={styles.pair_select_table}>
            <PairTable
              tabledata={tabledata}
              pair={pair}
              handleSelectPair={props.handleSelectPair}
              changeStarPair={changeStarPair}
              currentsort={currentsort}
              changeSort={(type) => changeSort(type)}
              sortitem={sortitem}
            />
          </div>
        </div>
      </div>
      <div className={styles.pair_formula}>
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
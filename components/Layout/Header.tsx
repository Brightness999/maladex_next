import Image from 'next/image';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import Logo from '/public/img/logo.png'
import styles from '/styles/Navbar.module.scss'
import ResponsiveModal from './ResponsiveModal';

const Header: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [walletmodal, setWalletModal] = useState(false);
  const [nowallet, setNoWallet] = useState(false);
  const [address, setAddress] = useState('');

  useEffect(() => {
    connectWallet();
  }, [])

  const connectWallet = () => {
    if (typeof window !== undefined) {
      if (window.cardano) {
        let cardano = window.cardano;
        if (cardano.isEnabled()) {
          cardano.getUsedAddresses().then(res => {
            setAddress(res[0]);
          }).catch(res => {
            if (res.code < 0) {
              cardano.enable(false).then(() => {
                cardano.getUsedAddresses().then(res => {
                  setAddress(res[0]);
                })
              }).catch(() => { });
              setWalletModal(false);
            }
          })
        } else {
          cardano.enable()
        }
      } else {
        setNoWallet(true);
        setTimeout(() => {
          setNoWallet(false);
        }, 5000);
      }
    }
  }

  return (
    <nav className={`navbar navbar-inverse ${styles.navbar}`} id="header">
      <div className={styles.navbar__container} >
        <div className={`navbar-header ${styles.navbar__container_header}`}>
          <a className="navbar-brand" href="/">
            <Image src={Logo} alt="Logo" width="135" height="25" />
          </a>
          <ul className={`nav ${styles.navbar__nav}`}>
            <li className={`nav-item ${styles.navbar__nav_item}`}>
              <a className="nav-link" href="#">Trade</a>
            </li>
            <li className={`nav-item ${styles.navbar__nav_mint}`}>
              <a className="nav-link" href="#">Mint</a>
            </li>
            <li className={`nav-item ${styles.navbar__nav_item}`}>
              <a className="nav-link" href="#">Track</a>
            </li>
          </ul>
        </div>
        <div className={styles.navbar__container_launch}>
          {
            address ?
              <button className={styles.navbar__connect_btn}>
                <div>
                  <svg viewBox="0 0 24 24" color="primary" width="40px" xmlns="http://www.w3.org/2000/svg" className={styles.navbar__connect_btn_img}>
                    <path fillRule="evenodd" clipRule="evenodd" d="M17 4C18.5 4 19 4.5 19 6L19 8C20.1046 8 21 8.89543 21 10L21 17C21 19 20 20 17.999 20H6C4 20 3 19 3 17L3 7C3 5.5 4.5 4 6 4L17 4ZM5 7C5 6.44772 5.44772 6 6 6L19 6L19 8L6 8C5.44772 8 5 7.55229 5 7ZM17 16C18 16 19.001 15 19 14C18.999 13 18 12 17 12C16 12 15 13 15 14C15 15 16 16 17 16Z"></path>
                  </svg>
                  <span>
                    {`${address.substr(0, 2)}...${address.substr(-4)}`}
                  </span>
                  <FontAwesomeIcon icon={faAngleDown} className={styles.navbar__connect_btn_arrow} />
                </div>
                <div className={styles.navbar__connect_btn_dropdown}>
                  <span>Wallet</span>
                  <span>Transactions</span>
                  <span>Disconnect</span>
                </div>
              </button>
              :
              <button onClick={() => setWalletModal(true)} className={styles.navbar__connect_btn}>
                Connect Wallet
              </button>
          }
        </div>
        <div className={styles.navbar__toggle} onClick={() => setModal(true)}>
          <FontAwesomeIcon icon={faBars} />
        </div>
      </div>
      {
        walletmodal &&
        <div className={styles.wallet}>
          <div className={styles.wallet__wrapper} onClick={() => setWalletModal(false)}></div>
          <div className={styles.wallet__content}>
            <div className={styles.wallet__content_header}>
              <div>
                <span>Connect Wallet</span>
              </div>
              <button className={styles.wallet__content_header_close} onClick={() => setWalletModal(false)}>
                <svg viewBox="0 0 24 24" color="primary" width="20px" xmlns="http://www.w3.org/2000/svg" className="sc-bdnxRM ACFFk">
                  <path d="M18.3 5.70997C17.91 5.31997 17.28 5.31997 16.89 5.70997L12 10.59L7.10997 5.69997C6.71997 5.30997 6.08997 5.30997 5.69997 5.69997C5.30997 6.08997 5.30997 6.71997 5.69997 7.10997L10.59 12L5.69997 16.89C5.30997 17.28 5.30997 17.91 5.69997 18.3C6.08997 18.69 6.71997 18.69 7.10997 18.3L12 13.41L16.89 18.3C17.28 18.69 17.91 18.69 18.3 18.3C18.69 17.91 18.69 17.28 18.3 16.89L13.41 12L18.3 7.10997C18.68 6.72997 18.68 6.08997 18.3 5.70997Z"></path>
                </svg>
              </button>
            </div>
            <div className={styles.wallet__content_wallets}>
              <div className={styles.wallet__content_wallets_wallet} onClick={() => connectWallet()}>
                <Image src="/img/nami.png" width={60} height={60} />
                <div><span>Nami Wallet</span></div>
              </div>
            </div>
            <div className={styles.wallet__content_footer}>
              <p>Haven’t got a crypto wallet yet?</p>
              <button>Learn How to Connect</button>
            </div>
          </div>
        </div>
      }
      {
        nowallet &&
        <div className={styles.nowallet}>
          <div className={styles.nowallet__content}>
            <div>
              <span>Get Nami Wallet first</span>
            </div>
            <div>
              <a href="https://namiwallet.io/" target="_blank">
                <button>Get</button>
              </a>
            </div>
          </div>
        </div>
      }
      <ResponsiveModal
        show={modal}
        close={() => setModal(false)}
      />
    </nav>
  );
};
export default Header;
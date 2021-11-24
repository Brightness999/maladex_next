import Modal from 'react-modal';
import Link from 'next/link';
Modal.setAppElement('*');
import Image from 'next/image'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCompressArrowsAlt, faAngleDown } from "@fortawesome/free-solid-svg-icons";

import Logo from '/public/img/logo.png'
import styles from './modal.module.scss'

const customStyles = {
  content: {
    top: '3%',
    left: '50%',
    right: 'auto',
    width: '95%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, 0)',
  },
};

type ModalProps = {
  show: boolean,
  close: any
}

const ResponsiveModal = ({ show, close }: ModalProps) => {
  return (
    <>
      <Modal
        isOpen={show}
        style={customStyles.content}
        contentLabel="Example Modal"
      >
        <div className={styles.modal} >
          <Link href="/">
            <a className="navbar-brand" >
              <Image
                src={Logo}
                alt="Logo"
                width="108"
                height="20"
              />
            </a>
          </Link>
          <div onClick={close} style={{ float: 'right' }}>
            <FontAwesomeIcon icon={faCompressArrowsAlt} />
          </div>
        </div>

        <hr />

        <div>
          <ul className="nav navbar-nav">
            <li className={styles.modal__item}>
              <Link href="https://docs.maladex.com/whitepaper.pdf">
                <a>WhitePaper</a>
              </Link>
            </li>
            <li className={styles.modal__item}>
              <FontAwesomeIcon icon={faAngleDown} />
              Info
              <dl>
                <dd><Link href="/tokenomics">
                  <a>Tokenomics</a>
                </Link></dd>
                <dd><Link href="/faq">
                  <a>FAQ</a>
                </Link></dd>
              </dl>
            </li>
            <li className={styles.modal__item}>
              <FontAwesomeIcon icon={faAngleDown} />
              Pool
              <dl style={{ padding: '5px 20px', marginBottom: '0px' }}>
                <dd>
                  <Link href="/pools">
                    <a>Pools</a>
                  </Link>
                </dd>
                <dd>
                  <Link href="/distribution">
                    <a>Distribution</a>
                  </Link>
                </dd>
                <dd>
                  <Link href="/distribution-faq">
                    <a>FAQ</a>
                  </Link>
                </dd>
                <dd>
                  <Link href="/formula">
                    <a>Formula</a>
                  </Link>
                </dd>
              </dl>
            </li>
            <li className={styles.modal__item}>
              <Link href="/press">
                <a>Press</a>
              </Link></li>
          </ul>
        </div>
      </Modal>
    </>
  );
}

export default ResponsiveModal;
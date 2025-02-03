import './Footer.css';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { FaInstagram, FaTelegramPlane, FaWhatsapp, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer__container">
        <a className="footer__scroll-top" href="#headerScroll">
          <MdKeyboardArrowUp className="footer__arrow-top" />
        </a>
        <h2 className="footer__title">Контакты</h2>
        <p className=" footer__info">Вопросы пишите на почту makesceramics@gmail.com,
          телеграм или через соц. сети ниже:</p>
        <p>Подписывайтесь на нас!</p>
        <ul className=" footer__social-links">
          <li>
            <a className=" footer__social-link"><FaTelegramPlane /></a>
          </li>
          <li>
            <a className=" footer__social-link"><FaWhatsapp /></a>
          </li>
          <li>
            <a className=" footer__social-link"><FaInstagram /></a>
          </li>
          <li>
            <a className=" footer__social-link"><FaYoutube /></a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
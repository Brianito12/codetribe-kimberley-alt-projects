import { FaInstagram, FaFacebookF, FaYoutube } from 'react-icons/fa';
import '../styles/Footer.css';

const footerColumns = [
  { title: 'Products', links: ['Shows'] },
  { title: 'Category', links: ['Men', 'New In', 'Weekly Pick'] },
  {
    title: 'Company Info',
    links: [
      'About Us',
      'Contact Us',
      'Payment Options',
      'Track Order',
      'Support',
      'Vouchers',
      'Size Charts',
    ],
  },
];

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__grid">
        {footerColumns.map((col) => (
          <div key={col.title} className="footer__col">
            <h4>{col.title}</h4>
            <ul>
              {col.links.map((link) => (
                <li key={link}>
                  <a href="#">{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="footer__col">
          <h4>Follow us</h4>
          <div className="footer__socials">
            <a href="#" aria-label="Instagram">
              <FaInstagram size={18} />
            </a>
            <a href="#" aria-label="Facebook">
              <FaFacebookF size={18} />
            </a>
            <a href="#" aria-label="YouTube">
              <FaYoutube size={20} />
            </a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <a href="#">Data settings</a>
        <a href="#">Cookie settings</a>
        <a href="#">Privacy Policy</a>
        <a href="#">Terms And Conditions</a>
        <a href="#">Imprint</a>
      </div>
    </footer>
  );
};

export default Footer;
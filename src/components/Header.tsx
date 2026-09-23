import '../styles/Header.css';
import { Search } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
}

const navLinks: NavLink[] = [
  { label: 'Home', href: '#' },
  { label: 'Menu', href: '#' },
  { label: 'Blog', href: '#' },
  { label: 'Media', href: '#' },
  { label: 'Contact', href: '#' },
];

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo">
       <img 
          src="/assets/logo.png" 
          alt="Coffy Solutions" 
          className="header__logo-img" 
          />
      </div>

      <nav className="header__nav">
        {navLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="header__link"
          >
            {link.label}
          </a>
        ))}
      </nav>

      <button className="header__search" aria-label="Search">
         <Search size={22} strokeWidth={2} />
      </button>
    </header>
  );
};

export default Header;
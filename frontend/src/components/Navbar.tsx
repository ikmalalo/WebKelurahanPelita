import { useState, useRef, useEffect } from 'react'
import './Navbar.css'

interface NavbarProps {
  onHelpdeskClick?: () => void
  onHomeClick?: () => void
  onLoginClick?: () => void
  onDirektoriClick?: () => void
  onMateriClick?: () => void
  activePage?: string
  activeLink?: string
  onLinkClick?: (linkId: string) => void
}

export function Navbar({ onHelpdeskClick, onHomeClick, onLoginClick, onDirektoriClick, onMateriClick, activePage = 'home', activeLink: externalActiveLink, onLinkClick }: NavbarProps = {}) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [internalActiveLink, setInternalActiveLink] = useState('beranda')
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  const activeLink = externalActiveLink !== undefined ? externalActiveLink : internalActiveLink;
  const setActiveLink = onLinkClick || setInternalActiveLink;

  // Prioritaskan activePage untuk menentukan menu mana yang menyala
  const currentActive = activePage === 'helpdesk' ? 'forum' : (activePage === 'direktori' ? 'direktori' : (activePage === 'materi' ? 'materi' : (activePage === 'home' ? activeLink : '')));

  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const navRef = useRef<HTMLElement>(null);
  const linksRef = useRef<{ [key: string]: HTMLAnchorElement | null }>({});

  useEffect(() => {
    const activeElement = linksRef.current[currentActive];
    if (activeElement) {
      setIndicatorStyle({
        left: activeElement.offsetLeft,
        width: activeElement.offsetWidth,
        opacity: 1
      });
    } else {
      setIndicatorStyle(prev => ({ ...prev, opacity: 0 }));
    }
  }, [currentActive]);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        // Jangan sembunyikan jika menu mobile sedang terbuka
        if (menuOpen) return;

        if (window.scrollY > lastScrollY && window.scrollY > 100) { // scrolling down
          setShow(false);
        } else { // scrolling up
          setShow(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY, menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, linkId: string) => {
    setActiveLink(linkId);
    setMenuOpen(false);
    if (onHomeClick) {
      onHomeClick();
      const targetId = e.currentTarget.getAttribute('href')?.slice(1);
      if (targetId) {
        setTimeout(() => {
          document.getElementById(targetId)?.scrollIntoView({ behavior: 'smooth' });
        }, 100); // Tunggu render halaman selesai
      }
    }
  }

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setActiveLink('beranda');
    if (onHomeClick) onHomeClick();
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  }

  return (
    <header className={`navbar ${!show ? 'navbar--hidden' : ''}`}>
      <div className="container navbar-inner">
        <a href="#" className="navbar-brand" onClick={handleBrandClick}>
          <div className="navbar-logo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 22V12h6v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div className="navbar-brand-text">
            <span className="navbar-title">Kelurahan Pelita</span>
            <span className="navbar-sub">Samarinda Kota</span>
          </div>
        </a>

        <nav className={`navbar-nav ${menuOpen ? 'open' : ''}`} ref={navRef}>
          <div className="nav-indicator" style={indicatorStyle} />
          <a
            href="#beranda"
            ref={el => { linksRef.current['beranda'] = el; }}
            className={`nav-link ${currentActive === 'beranda' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'beranda')}
          >
            Beranda
          </a>
          <a
            href="#direktori"
            ref={el => { linksRef.current['direktori'] = el; }}
            className={`nav-link ${currentActive === 'direktori' ? 'active' : ''}`}
            onClick={(e) => {
              setActiveLink('direktori');
              setMenuOpen(false);
              if (onDirektoriClick) {
                e.preventDefault();
                onDirektoriClick();
              }
            }}
          >
            Direktori
          </a>
          <a
            href="#materi"
            ref={el => { linksRef.current['materi'] = el; }}
            className={`nav-link ${currentActive === 'materi' ? 'active' : ''}`}
            onClick={(e) => {
              setActiveLink('materi');
              setMenuOpen(false);
              if (onMateriClick) {
                e.preventDefault();
                onMateriClick();
              }
            }}
          >
            Materi
          </a>
          <a
            href="#forum"
            ref={el => { linksRef.current['forum'] = el; }}
            className={`nav-link ${currentActive === 'forum' ? 'active' : ''}`}
            onClick={(e) => {
              setActiveLink('forum');
              setMenuOpen(false);
              if (onHelpdeskClick) {
                e.preventDefault();
                onHelpdeskClick();
              }
            }}
          >
            Forum
          </a>
        </nav>

        <div className="navbar-actions">
          <button className="btn-primary" onClick={onLoginClick}>Masuk</button>
          <button
            className={`hamburger ${menuOpen ? 'open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span /><span /><span />
          </button>
        </div>
      </div>
    </header>
  )
}

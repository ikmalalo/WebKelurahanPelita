import { useState, useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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

export function Navbar({ onHelpdeskClick, onHomeClick, onLoginClick, onDirektoriClick, onMateriClick }: NavbarProps = {}) {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false)
  const [show, setShow] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)

  // Tentukan link mana yang aktif berdasarkan URL
  const getActiveFromPath = () => {
    const path = location.pathname;
    if (path === '/') return 'beranda';
    if (path === '/direktori') return 'direktori';
    if (path === '/materi') return 'materi';
    if (path === '/helpdesk') return 'forum';
    if (path === '/semua-pertanyaan') return 'forum';
    return '';
  };

  const currentActive = getActiveFromPath();

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
  }, [currentActive, location.pathname]);

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (menuOpen) return;
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setShow(false);
        } else {
          setShow(true);
        }
        setLastScrollY(window.scrollY);
      }
    };

    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY, menuOpen]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, linkId: string) => {
    setMenuOpen(false);
    if (linkId === 'beranda' && onHomeClick) {
      onHomeClick();
    } else if (linkId === 'direktori' && onDirektoriClick) {
      e.preventDefault();
      onDirektoriClick();
    } else if (linkId === 'materi' && onMateriClick) {
      e.preventDefault();
      onMateriClick();
    } else if (linkId === 'forum' && onHelpdeskClick) {
      e.preventDefault();
      onHelpdeskClick();
    }
  }

  const handleBrandClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (onHomeClick) onHomeClick();
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  }

  return (
    <header className={`navbar ${!show ? 'navbar--hidden' : ''}`}>
      <div className="container navbar-inner">
        <a href="/" className="navbar-brand" onClick={handleBrandClick}>
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
            href="/"
            ref={el => { linksRef.current['beranda'] = el; }}
            className={`nav-link ${currentActive === 'beranda' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'beranda')}
          >
            Beranda
          </a>
          <a
            href="/direktori"
            ref={el => { linksRef.current['direktori'] = el; }}
            className={`nav-link ${currentActive === 'direktori' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'direktori')}
          >
            Direktori
          </a>
          <a
            href="/materi"
            ref={el => { linksRef.current['materi'] = el; }}
            className={`nav-link ${currentActive === 'materi' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'materi')}
          >
            Materi
          </a>
          <a
            href="/helpdesk"
            ref={el => { linksRef.current['forum'] = el; }}
            className={`nav-link ${currentActive === 'forum' ? 'active' : ''}`}
            onClick={(e) => handleNavClick(e, 'forum')}
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

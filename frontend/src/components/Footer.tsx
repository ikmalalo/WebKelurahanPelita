import './Footer.css'

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#" className="footer-logo-wrap">
              <div className="footer-logo">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 22V12h6v10" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <span className="footer-brand-name">Kelurahan Pelita</span>
                <p className="footer-address">
                  Jl. Kyai H. Usman Ibrahim No.72, Pelita, Kec. Sungai Pinang, <br />
                  Kota Samarinda, Kalimantan Timur 75117
                </p>
              </div>
            </a>
          </div>

          <nav className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
            <a href="#">Accessibility</a>
          </nav>

          <div className="footer-icons">
            <a href="#" className="footer-icon-btn" aria-label="Website">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <line x1="2" y1="12" x2="22" y2="12"/>
                <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/>
              </svg>
            </a>
            <a href="#" className="footer-icon-btn" aria-label="Share">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="18" cy="5" r="3"/>
                <circle cx="6" cy="12" r="3"/>
                <circle cx="18" cy="19" r="3"/>
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
              </svg>
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2024 Pemerintah Kota Samarinda · Kelurahan Pelita. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  )
}

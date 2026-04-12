import LoginCard from "../components/LoginCard";
import "../components/Navbar.css";

const BackIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 12H5"/>
    <path d="m12 19-7-7 7-7"/>
  </svg>
);

interface LoginPageProps {
  onBack?: () => void;
  onLoginSuccess?: () => void;
}

export default function LoginPage({ onBack, onLoginSuccess }: LoginPageProps) {
  return (
    <div
      style={{
        height: "100vh",
        background: "#F1F5F9",
        display: "flex",
        flexDirection: "column",
        fontFamily: "'Inter', sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background subtle pattern */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(circle at 20% 20%, rgba(219,234,254,0.5) 0%, transparent 50%),
                            radial-gradient(circle at 80% 80%, rgba(191,219,254,0.4) 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      {/* Book/map decorative element bottom right */}
      <div
        style={{
          position: "absolute",
          bottom: "40px",
          right: "60px",
          opacity: 0.08,
          pointerEvents: "none",
        }}
      >
        <svg width="200" height="160" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      </div>

      {/* Navbar - Matched with main Navbar design */}
      <header className="navbar">
        <div className="container navbar-inner">
          <div className="navbar-brand">
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
          </div>

          <div className="navbar-actions">
            <button className="btn-outline" onClick={onBack} style={{ gap: "8px", padding: "8px 16px", height: "auto" }}>
              <BackIcon />
              Kembali ke Beranda
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
          position: "relative",
          zIndex: 1,
          transform: "scale(0.9)", // Kecilkan sedikit agar tidak scroll
          transformOrigin: "center center",
        }}
      >
        <LoginCard onLogin={onLoginSuccess} />
      </main>
    </div>
  );
}
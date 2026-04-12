import './Hero.css'

interface HeroProps {
  onDirektoriClick?: () => void
  onProgramClick?: () => void
}

export function Hero({ onDirektoriClick, onProgramClick }: HeroProps) {
  return (
    <section className="hero" id="beranda">
      <div className="container hero-inner">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            TRANSFORMASI DIGITAL 2024
          </div>

          <h1 className="hero-title">
            Modernisasi <span className="hero-title-blue">UMKM</span> Kelurahan Pelita
          </h1>

          <p className="hero-desc">
            Mendorong pelaku usaha lokal Samarinda menuju ekosistem digital yang modern, aman, dan terpercaya untuk jangkauan pasar yang lebih luas.
          </p>

          <div className="hero-actions">
            <button className="btn-primary hero-btn-lg" onClick={onProgramClick}>Pelajari Program</button>
            <button className="btn-outline hero-btn-lg" onClick={onDirektoriClick}>Lihat Direktori</button>
          </div>
        </div>

        {/* Image section removed as requested */}

      </div>
    </section>
  )
}

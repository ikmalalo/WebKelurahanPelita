import './CtaBanner.css'

interface CtaBannerProps {
  onDaftarClick?: () => void
  onConsultationClick?: () => void
}

export function CtaBanner({ onDaftarClick, onConsultationClick }: CtaBannerProps) {
  return (
    <section className="cta" id="umkm">
      <div className="container">
        <div className="cta-inner">
          <div className="cta-text">
            <h2 className="cta-title">Daftarkan UMKM Anda Sekarang</h2>
            <p className="cta-desc">
              Jadilah bagian dari transformasi ekonomi digital di Kelurahan Pelita. Gratis dan didampingi hingga mahir.
            </p>
          </div>
          <div className="cta-actions">
            <button className="btn-accent" onClick={onDaftarClick}>Daftar UMKM</button>
            <button className="btn-outline-white" onClick={onConsultationClick}>Konsultasi Gratis</button>
          </div>
        </div>
      </div>
    </section>
  )
}

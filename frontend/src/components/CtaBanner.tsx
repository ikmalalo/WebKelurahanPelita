import './CtaBanner.css'

export function CtaBanner() {
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
            <button className="btn-accent">Daftar Program</button>
            <button className="btn-outline-white">Konsultasi Gratis</button>
          </div>
        </div>
      </div>
    </section>
  )
}

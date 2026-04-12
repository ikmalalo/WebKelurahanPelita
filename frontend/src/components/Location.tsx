import './Location.css'

export function Location() {
  return (
    <section className="location" id="kontak">
      <div className="container location-inner">
        <div className="location-info">
          <h2 className="section-title">Lokasi Kantor Kelurahan</h2>
          <p className="section-subtitle" style={{ marginBottom: '32px' }}>
            Kunjungi pusat layanan kami untuk mendapatkan informasi langsung mengenai program digitalisasi dan perizinan usaha lainnya.
          </p>

          <div className="location-contacts">
            <div className="contact-item">
              <div className="contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/>
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                </svg>
              </div>
              <span>Jl. Pelita No. 123, Kelurahan Pelita, Samarinda Kota, Kalimantan Timur</span>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.82a19.79 19.79 0 01-3.07-8.68A2 2 0 012 1.19h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.95a16 16 0 006 6l1.12-1.12a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
              </div>
              <span>(0541) 741234 / 0812-3456-7890</span>
            </div>

            <div className="contact-item">
              <div className="contact-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <span>pelayanan@kelurahanpelita.go.id</span>
            </div>
          </div>
        </div>

        <div className="location-map">
          <div className="map-placeholder">
            <div className="map-pin">
              <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
            </div>
            <p className="map-label">Peta Kelurahan Pelita</p>
          </div>
        </div>
      </div>
    </section>
  )
}

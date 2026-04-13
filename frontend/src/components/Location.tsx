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
          <iframe 
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d997.4186595508819!2d117.15833486955054!3d-0.4865773998632662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2df67f7127ecb8fd%3A0xa5a54acfa3871050!2sKantor+Kelurahan+Pelita!5e0!3m2!1sid!2sid!4v1776048409477!5m2!1sid!2sid"
            width="100%" 
            height="400" 
            style={{ border: 0 }} 
            allowFullScreen={true} 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            title="Lokasi Kantor Kelurahan Pelita"
          ></iframe>
        </div>
      </div>
    </section>
  )
}

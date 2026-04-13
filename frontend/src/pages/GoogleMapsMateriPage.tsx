import { useState, useEffect } from 'react'
import './GoogleMapsMateriPage.css'

interface GoogleMapsMateriPageProps {
  onBack: () => void
  from?: 'home' | 'materi'
}

export function GoogleMapsMateriPage({ onBack, from = 'home' }: GoogleMapsMateriPageProps) {
  const [activeSection, setActiveSection] = useState('perilaku')

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = element.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
      setActiveSection(id)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['perilaku', 'etalase-digital', 'kenapa-maps', 'perbandingan', 'langkah', 'fondasi']
      const scrollPosition = window.scrollY + 120

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="materi-detail-page maps-theme">
      {/* Mini Header */}
      <header className="md-header">
        <div className="md-header-left">
          <button className="md-back-btn" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <div className="md-title-group">
            <h2>Edukasi: Google Maps UMKM</h2>
            <p>Modul Visibilitas Lokal Digital</p>
          </div>
        </div>
        <div className="md-header-actions">
          <button className="md-user-btn">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
          </button>
        </div>
      </header>

      {/* Breadcrumbs */}
      <nav className="md-breadcrumbs">
        {from === 'home' ? (
          <>
            <span>Beranda</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <span className="active">Google Maps UMKM</span>
          </>
        ) : (
          <>
            <span>Materi</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
            <span className="active">Detail Materi</span>
          </>
        )}
      </nav>

      <main className="md-main">
        <div className="md-content">
          <section className="md-hero">
            <img 
              src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=1200" 
              alt="Google Maps UMKM" 
              className="md-hero-img" 
            />
            <div className="md-hero-overlay">
              <span className="md-badge-main">LOCAL VISIBILITY</span>
              <h1 className="md-hero-title">Etalase Digital di Genggaman Pelanggan</h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px', fontSize: '18px', fontWeight: '500' }}>
                Meningkatkan visibilitas dan keuntungan UMKM dengan Google Maps
              </p>
              <div className="md-hero-meta">
                <span>12 Menit Membaca</span>
                <span>1.5k Pembaca</span>
              </div>
            </div>
          </section>

          <article className="md-article">
            {/* Perubahan Perilaku Pelanggan */}
            <h3 className="md-section-title" id="perilaku">
              Perubahan Perilaku Pelanggan
            </h3>
            <p className="md-text">
              Dulu, pelanggan mencari warung dengan cara keliling jalan atau bertanya ke orang sekitar. Sekarang, semuanya berubah.
            </p>
            <div className="md-benefits" style={{ marginBottom: '40px' }}>
              <div className="md-benefit-card" style={{ borderLeftColor: '#ef4444' }}>
                <h4>Cara Dulu</h4>
                <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#64748b' }}>
                  <li>Keliling jalan tanpa tujuan</li>
                  <li>Tanya ke orang sekitar</li>
                  <li>Coba-coba tanpa kepastian</li>
                </ul>
              </div>
              <div className="md-benefit-card" style={{ borderLeftColor: '#10b981' }}>
                <h4>Cara Sekarang</h4>
                <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#64748b' }}>
                  <li>Cari lewat HP</li>
                  <li>Lihat lokasi di Google Maps</li>
                  <li>Lihat foto, rating, dan ulasan</li>
                </ul>
              </div>
            </div>
            <div className="md-info-box" style={{ background: '#fff7ed', borderColor: '#ffedd5', marginBottom: '48px', textAlign: 'center' }}>
              <p style={{ fontWeight: '700', color: '#c2410c', fontSize: '18px', margin: 0 }}>
                👉 Artinya: Kalau usaha tidak ada di Google Maps, bisa dianggap "tidak ada".
              </p>
            </div>

            {/* Google Maps sebagai Etalase Digital */}
            <h3 className="md-section-title" id="etalase-digital">
              Google Maps sebagai Etalase Digital
            </h3>
            <p className="md-text">
              Google Maps bukan sekadar peta, tapi berfungsi sebagai identitas digital lengkap bagi usaha Anda.
            </p>
            <div className="md-steps">
              <div className="md-step">
                <div className="md-step-num" style={{ background: '#34a853' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                </div>
                <div className="md-step-content">
                  <b>Papan Nama Digital:</b> Menunjukkan lokasi tepat usaha Anda di peta dunia.
                </div>
              </div>
              <div className="md-step">
                <div className="md-step-num" style={{ background: '#4285f4' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                </div>
                <div className="md-step-content">
                  <b>Etalase Online:</b> Menampilkan foto-foto produk dan suasana tempat jualan.
                </div>
              </div>
              <div className="md-step">
                <div className="md-step-num" style={{ background: '#fbbc05' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/><path d="M12 8v4"/><path d="M12 16h.01"/></svg>
                </div>
                <div className="md-step-content">
                  <b>Rekomendasi Otomatis:</b> Muncul secara otomatis saat orang mencari kata kunci terkait di sekitar lokasi Anda.
                </div>
              </div>
            </div>

            <div className="md-info-box" style={{ background: '#f0f9ff', borderColor: '#bae6fd', marginBottom: '40px' }}>
               <h4 style={{ color: '#0369a1', marginBottom: '16px' }}>Ekosistem Digital UMKM</h4>
               <p style={{ fontSize: '15px', color: '#0c4a6e', marginBottom: '15px' }}>Tiga pilar utama agar usaha Anda naik kelas:</p>
               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '20px' }}>
                 <div style={{ background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #e0f2fe' }}>
                    <b style={{ color: '#7c3aed' }}>Canva AI</b>
                    <p style={{ fontSize: '13px', marginTop: '5px' }}>Bikin desain promosi keren</p>
                 </div>
                 <div style={{ background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #e0f2fe' }}>
                    <b style={{ color: '#10b981' }}>QRIS</b>
                    <p style={{ fontSize: '13px', marginTop: '5px' }}>Sistem pembayaran digital</p>
                 </div>
                 <div style={{ background: 'white', padding: '15px', borderRadius: '12px', border: '1px solid #e0f2fe' }}>
                    <b style={{ color: '#f59e0b' }}>Google Maps</b>
                    <p style={{ fontSize: '13px', marginTop: '5px' }}>Mendatangkan pelanggan baru</p>
                 </div>
               </div>
               <p style={{ marginTop: '20px', fontWeight: '600', color: '#0369a1', textAlign: 'center' }}>👉 Semua saling terhubung untuk meningkatkan penjualan.</p>
            </div>

            {/* Kenapa Harus Ada di Google Maps? */}
            <h3 className="md-section-title" id="kenapa-maps">
              Kenapa Harus Ada di Google Maps?
            </h3>
            <div className="md-benefits">
              <div className="md-benefit-card">
                <h4 style={{ color: '#2563eb' }}>1. Lebih Terpercaya</h4>
                <p style={{ fontSize: '14px' }}>Pelanggan lebih yakin karena bisa melihat lokasi fisik, foto nyata, dan ulasan dari pembeli lain secara transparan.</p>
              </div>
              <div className="md-benefit-card">
                <h4 style={{ color: '#10b981' }}>2. Mendatangkan Pelanggan</h4>
                <p style={{ fontSize: '14px' }}>Saat orang mencari "warung terdekat" atau "kopi dekat sini", usaha kamu punya kesempatan besar untuk muncul di baris teratas.</p>
              </div>
              <div className="md-benefit-card">
                <h4 style={{ color: '#f59e0b' }}>3. Bukti Sosial</h4>
                <p style={{ fontSize: '14px' }}>Rating dan ulasan positif berfungsi sebagai magnet yang menarik pelanggan baru tanpa biaya iklan tambahan.</p>
              </div>
            </div>

            {/* Perbandingan: Tanpa vs Dengan Google Maps */}
            <h3 className="md-section-title" id="perbandingan">
              Tanpa vs Dengan Google Maps
            </h3>
            <div className="md-info-box" style={{ padding: '0', overflow: 'hidden', border: 'none', background: 'transparent', marginBottom: '40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#e2e8f0', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ background: '#fff1f2', padding: '24px' }}>
                  <h4 style={{ color: '#e11d48', marginBottom: '16px' }}>Tanpa Google Maps</h4>
                  <ul style={{ fontSize: '14px', color: '#9f1239', padding: 0 }}>
                    <li style={{ marginBottom: '8px' }}>• Hanya dikenal warga sekitar</li>
                    <li style={{ marginBottom: '8px' }}>• Sulit mendapatkan kepercayaan</li>
                    <li>• Promosi harus manual & melelahkan</li>
                  </ul>
                </div>
                <div style={{ background: '#f0fdf4', padding: '24px' }}>
                  <h4 style={{ color: '#166534', marginBottom: '16px' }}>Dengan Google Maps</h4>
                  <ul style={{ fontSize: '14px', color: '#14532d', padding: 0 }}>
                    <li style={{ marginBottom: '8px' }}>• Jangkauan luas lintas wilayah</li>
                    <li style={{ marginBottom: '8px' }}>• Terlihat profesional & modern</li>
                    <li>• Direkomendasikan otomatis oleh Google</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Cara Membuat Etalase Digital */}
            <h3 className="md-section-title" id="langkah">
              4 Langkah Membuat Etalase Digital
            </h3>
            <p className="md-text">
              Agar usaha kamu tampil menarik dan dipercaya Google, lakukan langkah-langkah praktis berikut ini:
            </p>
            <div className="md-steps">
              <div className="md-step">
                <span className="md-step-num">1</span>
                <div className="md-step-content">
                  <b>Upload Foto Terbaik:</b>
                  <p>Jangan biarkan profil kosong. Upload foto depan toko, foto produk unggulan, dan foto suasana yang nyaman. Ingat: pelanggan membeli dengan mata dulu.</p>
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">2</span>
                <div className="md-step-content">
                  <b>Informasi Lengkap & Akurat:</b>
                  <p>Pastikan nomor WhatsApp aktif, alamat jelas, dan tambahkan patokan (landmark). Contoh: "Sebelah masjid" atau "Kurang lebih 50m dari Balai Desa Pelita".</p>
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">3</span>
                <div className="md-step-content">
                  <b>Jam Operasional Konsisten:</b>
                  <p>Pastikan jam buka di Google Maps sesuai kenyataan. Pelanggan yang datang jauh-jauh tapi ternyata toko tutup akan merasa kecewa dan memberi rating buruk.</p>
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">4</span>
                <div className="md-step-content">
                  <b>Kumpulkan Review Bintang 5:</b>
                  <p>Ajak pelanggan yang puas untuk memberikan rating ⭐5 dan ulasan singkat. Bintang 5 adalah magnet terkuat untuk mendatangkan pelanggan baru secara gratis.</p>
                </div>
              </div>
            </div>

            {/* Fondasi Digital UMKM */}
            <h3 className="md-section-title" id="fondasi">
              Fondasi Digital UMKM
            </h3>
            <div className="md-info-box" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', border: 'none', color: 'white' }}>
              <p style={{ fontSize: '16px', lineHeight: '1.6', marginBottom: '20px' }}>
                Jika tiga hal ini sudah Anda terapkan:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <b>Branding (Nama & Desain Menarik)</b>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <b>Pembayaran Digital (QRIS)</b>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '24px', height: '24px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <b>Lokasi Online (Google Maps)</b>
                </div>
              </div>
              <p style={{ marginTop: '24px', fontWeight: '800', fontSize: '18px', textAlign: 'center' }}>
                Maka usaha Anda sudah 100% siap bersaing di era digital!
              </p>
            </div>

            {/* Penutup */}
            <div style={{ marginTop: '60px', padding: '40px', background: '#f0fdfa', borderRadius: '32px', textAlign: 'center', border: '1px solid #ccfbf1' }}>
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#0f766e', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                Saatnya Punya Etalase Digital Sendiri!
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </h2>
              <p className="md-text" style={{ marginBottom: '32px' }}>
                Dunia sudah beralih ke digital. Jangan biarkan usaha Anda tertinggal. Dengan Google Maps, usaha lebih mudah ditemukan, lebih dipercaya, dan lebih banyak pelanggan yang datang.
              </p>
              <button className="md-next-btn" style={{ maxWidth: '300px', margin: '0 auto', padding: '16px 32px', fontSize: '16px', background: '#10b981' }} onClick={onBack}>
                Mulai Daftar Google Maps
              </button>
            </div>
          </article>
        </div>

        <aside className="md-sidebar">
          <div className="md-side-card">
            <h4 className="md-side-title">Navigasi Materi</h4>
            <div className="md-nav-list">
              <div className={`md-nav-item ${activeSection === 'perilaku' ? 'active' : ''}`} onClick={() => scrollToSection('perilaku')}>Perubahan Perilaku</div>
              <div className={`md-nav-item ${activeSection === 'etalase-digital' ? 'active' : ''}`} onClick={() => scrollToSection('etalase-digital')}>Etalase Digital</div>
              <div className={`md-nav-item ${activeSection === 'kenapa-maps' ? 'active' : ''}`} onClick={() => scrollToSection('kenapa-maps')}>Manfaat Utama</div>
              <div className={`md-nav-item ${activeSection === 'perbandingan' ? 'active' : ''}`} onClick={() => scrollToSection('perbandingan')}>Perbandingan</div>
              <div className={`md-nav-item ${activeSection === 'langkah' ? 'active' : ''}`} onClick={() => scrollToSection('langkah')}>4 Langkah Pasti</div>
              <div className={`md-nav-item ${activeSection === 'fondasi' ? 'active' : ''}`} onClick={() => scrollToSection('fondasi')}>Fondasi UMKM</div>
            </div>
          </div>

          <div className="md-side-card md-help-card" style={{ background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)' }}>
            <div className="md-help-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h4 className="md-side-title" style={{ color: 'white' }}>Butuh Bantuan Navigasi?</h4>
            <p className="md-help-desc">Tim kami siap membantu Anda mendaftarkan titik lokasi usaha di Google Maps hingga disetujui.</p>
            <button className="md-mentor-btn" onClick={() => window.open('https://wa.me/6282357214445', '_blank')} style={{ color: '#10b981' }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Hubungi Kami
            </button>
          </div>
        </aside>
      </main>
    </div>
  )
}

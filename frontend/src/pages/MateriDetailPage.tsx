import { useState, useEffect, useRef } from 'react'
import './MateriDetailPage.css'

interface MateriDetailPageProps {
  onBack: () => void
  from?: 'home' | 'materi'
}

export function MateriDetailPage({ onBack, from = 'home' }: MateriDetailPageProps) {
  const [activeSection, setActiveSection] = useState('apa-itu-qris')

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 100 // Height of sticky header + padding
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

  // Optional: Update active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['apa-itu-qris', 'manfaat', 'cara-daftar', 'cetak-monitor']
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
    <div className="materi-detail-page">
      {/* Mini Header */}
      <header className="md-header">
        <div className="md-header-left">
          <button className="md-back-btn" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <div className="md-title-group">
            <h2>Pelatihan Penggunaan QRIS</h2>
            <p>Modul 1: Dasar-dasar QRIS</p>
          </div>
        </div>
        <div className="md-header-actions">
          <button className="md-action-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Bagikan
          </button>
          <button className="md-action-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z"/></svg>
            Simpan
          </button>
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
            <span className="active">Pelatihan QRIS</span>
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
        {/* Main Content */}
        <div className="md-content">
          <section className="md-hero">
            <img 
              src="https://images.unsplash.com/photo-1595079676339-1534802ad6cf?auto=format&fit=crop&q=80&w=1200" 
              alt="QRIS Implementation" 
              className="md-hero-img" 
            />
            <div className="md-hero-overlay">
              <span className="md-badge-main">MATERI UTAMA</span>
              <h1 className="md-hero-title">Implementasi QRIS untuk Pertumbuhan UMKM</h1>
              <div className="md-hero-meta">
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  15 Menit Membaca
                </span>
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  1.2k Pembaca
                </span>
              </div>
            </div>
          </section>

          <article className="md-article">
            <h3 className="md-section-title" id="apa-itu-qris">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
              Apa itu QRIS?
            </h3>
            <p className="md-text">
              Quick Response Code Indonesian Standard (QRIS) adalah penyatuan berbagai macam QR dari berbagai Penyelenggara Jasa Sistem Pembayaran (PJSP) menggunakan QR Code. QRIS dikembangkan oleh industri sistem pembayaran bersama dengan Bank Indonesia agar proses transaksi dengan QR Code dapat lebih mudah, cepat, dan terjaga keamanannya.
            </p>

            <h3 className="md-section-title" id="manfaat">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
              Manfaat bagi UMKM
            </h3>
            <div className="md-benefits">
              <div className="md-benefit-card">
                <h4>Higenis & Modern</h4>
                <p>Transaksi tanpa sentuh yang meningkatkan citra modern usaha Anda.</p>
              </div>
              <div className="md-benefit-card">
                <h4>Mencegah Uang Palsu</h4>
                <p>Menghilangkan risiko menerima pembayaran uang kertas palsu.</p>
              </div>
              <div className="md-benefit-card">
                <h4>Pencatatan Otomatis</h4>
                <p>Riwayat transaksi tersimpan rapi secara digital, memudahkan pembukuan.</p>
              </div>
              <div className="md-benefit-card">
                <h4>Satu untuk Semua</h4>
                <p>Menerima pembayaran dari e-wallet (GoPay, OVO, Dana) dan mobile banking manapun.</p>
              </div>
            </div>

            <h3 className="md-section-title" id="cara-daftar">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              Cara Mendaftar QRIS
            </h3>
            <div className="md-steps">
              <div className="md-step">
                <span className="md-step-num">1</span>
                <div className="md-step-content">
                  <b>Pilih Penyelenggara (PJSP)</b>
                  <p>Bisa melalui Bank (BCA, Mandiri, BRI, dll) atau Dompet Digital (ShopeePay, OVO, Dana).</p>
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">2</span>
                <div className="md-step-content">
                  <b>Lengkapi Dokumen</b>
                  <p>Siapkan KTP, NPWP (jika ada), dan foto lokasi usaha atau produk Anda.</p>
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">3</span>
                <div className="md-step-content">
                  <b>Proses Verifikasi</b>
                  <p>PJSP akan memverifikasi data Anda. Biasanya memakan waktu 3-7 hari kerja.</p>
                </div>
              </div>
            </div>

            <h3 className="md-section-title" id="cetak-monitor">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
              Cetak & Monitor Transaksi
            </h3>
            <div className="md-info-box">
              <p>Setelah disetujui, Anda akan mendapatkan QR Code digital yang dapat diunduh:</p>
              <ul>
                <li><b>Cetak</b>: Gunakan kertas berkualitas tinggi atau akrilik agar mudah dipindai konsumen.</li>
                <li><b>Monitor</b>: Gunakan aplikasi merchant (seperti BCA Merchant, Shopee Partner) untuk notifikasi real-time setiap transaksi masuk.</li>
                <li><b>Penyelesaian</b>: Dana biasanya akan masuk ke rekening Anda secara otomatis pada H+1.</li>
              </ul>
            </div>
          </article>
        </div>

        {/* Sidebar */}
        <aside className="md-sidebar">
          <div className="md-side-card">
            <h4 className="md-side-title">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
              Daftar Isi
            </h4>
            <div className="md-nav-list">
              <div 
                className={`md-nav-item ${activeSection === 'apa-itu-qris' ? 'active' : ''}`}
                onClick={() => scrollToSection('apa-itu-qris')}
              >
                Apa itu QRIS?
              </div>
              <div 
                className={`md-nav-item ${activeSection === 'manfaat' ? 'active' : ''}`}
                onClick={() => scrollToSection('manfaat')}
              >
                Manfaat bagi UMKM
              </div>
              <div 
                className={`md-nav-item ${activeSection === 'cara-daftar' ? 'active' : ''}`}
                onClick={() => scrollToSection('cara-daftar')}
              >
                Cara Mendaftar
              </div>
              <div 
                className={`md-nav-item ${activeSection === 'cetak-monitor' ? 'active' : ''}`}
                onClick={() => scrollToSection('cetak-monitor')}
              >
                Cetak & Monitor
              </div>
            </div>
          </div>

          <div className="md-side-card">
            <h4 className="md-side-title">Materi Lainnya</h4>
            <div className="md-related-item">
              <img src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=150" alt="Branding" className="md-related-img" />
              <div className="md-related-info">
                <h5>Meningkatkan Branding UMKM dengan AI</h5>
                <span className="md-related-meta">AI Tools • 15 Menit</span>
              </div>
            </div>
            <div className="md-related-item">
              <img src="https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=150" alt="Marketplace" className="md-related-img" />
              <div className="md-related-info">
                <h5>Pemanfaatan Marketplace untuk Penjualan</h5>
                <span className="md-related-meta">Marketplace • 18 Menit</span>
              </div>
            </div>
            <div className="md-related-item">
              <img src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=150" alt="Gmaps" className="md-related-img" />
              <div className="md-related-info">
                <h5>Google Maps UMKM</h5>
                <span className="md-related-meta">Visibility • 12 Menit</span>
              </div>
            </div>
            <div className="md-related-item">
              <img src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=150" alt="Canva" className="md-related-img" />
              <div className="md-related-info">
                <h5>Pembuatan Konten Promosi Canva AI</h5>
                <span className="md-related-meta">Content • 20 Menit</span>
              </div>
            </div>
          </div>

          <div className="md-side-card md-help-card">
            <h4 className="md-side-title">Butuh Bantuan?</h4>
            <p className="md-help-desc">Tim ahli kami siap membantu Anda dalam proses aktivasi QRIS.</p>
            <button className="md-mentor-btn">Hubungi Mentor</button>
          </div>
        </aside>
      </main>
    </div>
  )
}

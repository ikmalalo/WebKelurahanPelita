import { useState, useEffect } from 'react'
import './QrisMateriPage.css'
import qrisImg from '../assets/images/qris-materi.png'

interface QrisMateriPageProps {
  onBack: () => void
  from?: 'home' | 'materi'
}

export function QrisMateriPage({ onBack, from = 'home' }: QrisMateriPageProps) {
  const [activeSection, setActiveSection] = useState('masalah')

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
      const sections = ['masalah', 'solusi', 'keunggulan', 'perbandingan', 'jenis', 'rahasia', 'daftar', 'dampak']
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
    <div className="materi-detail-page qris-theme">
      {/* Mini Header */}
      <header className="md-header">
        <div className="md-header-left">
          <button className="md-back-btn" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <div className="md-title-group">
            <h2>Edukasi: Keuangan Digital</h2>
            <p>Modul Warung Tradisional ke Warung Pintar</p>
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
            <span className="active">Pelatihan Warung Pintar QRIS</span>
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
              src={qrisImg} 
              alt="QRIS Implementation" 
              className="md-hero-img" 
            />
            <div className="md-hero-overlay">
              <span className="md-badge-main">GO DIGITAL</span>
              <h1 className="md-hero-title">Dari Warung Tradisional ke Warung Pintar</h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px', fontSize: '18px', fontWeight: '500' }}>
                Rahasia jualan makin laris, catatan rapi, dan modal gampang cair
              </p>
              <div className="md-hero-meta">
                <span>12 Menit Membaca</span>
                <span>1.8k Pembaca</span>
              </div>
            </div>
          </section>

          <article className="md-article">
            {/* Latar Belakang Masalah */}
            <h3 className="md-section-title" id="masalah">
              Masalah Manual di Warung Tradisional
            </h3>
            <p className="md-text">
              Banyak warung tradisional masih menggunakan sistem manual, terutama dalam hal pembayaran dan pencatatan keuangan. Hal ini seringkali menghambat perkembangan usaha.
            </p>
            <div className="md-benefits" style={{ marginBottom: '40px' }}>
              <div className="md-benefit-card" style={{ borderLeftColor: '#ef4444' }}>
                <h4>Susah Cari Uang Receh</h4>
                <p style={{ fontSize: '14px' }}>Kehabisan kembalian bikin transaksi lama, pembeli nunggu, bahkan kadang transaksi batal.</p>
              </div>
              <div className="md-benefit-card" style={{ borderLeftColor: '#f59e0b' }}>
                <h4>Risiko Uang Palsu</h4>
                <p style={{ fontSize: '14px' }}>Uang tunai rawan dipalsukan, hilang, tercecer, atau menjadi sasaran pencurian.</p>
              </div>
              <div className="md-benefit-card" style={{ borderLeftColor: '#6366f1' }}>
                <h4>Pembukuan Ribet</h4>
                <p style={{ fontSize: '14px' }}>Catatan manual sering lupa, uang modal dan untung campur aduk, sulit lihat progres usaha.</p>
              </div>
            </div>
            <p style={{ textAlign: 'center', fontWeight: '600', color: '#ef4444', marginBottom: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8L22 12L18 16"/><path d="M2 12H22"/></svg>
              Semua ini bikin usaha jadi kurang efisien dan sulit berkembang.
            </p>

            {/* Solusi: QRIS */}
            <h3 className="md-section-title" id="solusi">
              Solusi: QRIS (Satu Kode untuk Semua)
            </h3>
            <p className="md-text">
              <strong>QRIS</strong> adalah sistem pembayaran digital dengan satu kode QR yang bisa digunakan oleh semua aplikasi pembayaran. Anda tidak perlu banyak aplikasi atau banyak kode QR.
            </p>
            <div className="md-info-box" style={{ background: '#f0f9ff', borderColor: '#bae6fd', marginBottom: '40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'center' }}>
                <div>
                  <div style={{ background: '#3b82f6', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>1</div>
                  <b>Satu QR Saja</b>
                </div>
                <div>
                  <div style={{ background: '#3b82f6', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>2</div>
                  <b>Aplikasi Apa Saja</b>
                </div>
                <div>
                  <div style={{ background: '#3b82f6', color: 'white', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>3</div>
                  <b>Terhubung Semua</b>
                </div>
              </div>
            </div>

            {/* Keunggulan QRIS */}
            <h3 className="md-section-title" id="keunggulan">
              Kenapa Harus Pakai QRIS?
            </h3>
            <div className="md-benefits">
              <div className="md-benefit-card">
                <h4>Universal</h4>
                <p>Bisa digunakan oleh semua e-wallet (GoPay, OVO, Dana) dan mobile banking (BCA, Mandiri, dll).</p>
              </div>
              <div className="md-benefit-card">
                <h4>Praktis</h4>
                <p>Pembeli tinggal scan → bayar → selesai. Tidak perlu hitung kembalian sama sekali.</p>
              </div>
              <div className="md-benefit-card">
                <h4>Uang Langsung Masuk</h4>
                <p>Dana masuk secara otomatis dan tercatat rapi di sistem, tidak ada risiko uang palsu.</p>
              </div>
              <div className="md-benefit-card">
                <h4>Sangat Aman</h4>
                <p>Sistem keamanan Bank Indonesia menjamin setiap transaksi Anda aman dari penipuan fisik.</p>
              </div>
            </div>

            {/* Perbandingan: Uang Tunai vs QRIS */}
            <h3 className="md-section-title" id="perbandingan">
              Perbandingan: Uang Tunai vs QRIS
            </h3>
            <div className="md-info-box" style={{ padding: '0', overflow: 'hidden', border: 'none', background: 'transparent', marginBottom: '40px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#e2e8f0', borderRadius: '16px', border: '1px solid #e2e8f0' }}>
                <div style={{ background: '#fef2f2', padding: '24px' }}>
                  <h4 style={{ color: '#ef4444', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                    Uang Tunai
                  </h4>
                  <ul style={{ fontSize: '14px', color: '#7f1d1d', padding: 0 }}>
                    <li style={{ marginBottom: '8px' }}>• Repot cari kembalian</li>
                    <li style={{ marginBottom: '8px' }}>• Risiko uang palsu</li>
                    <li style={{ marginBottom: '8px' }}>• Harus catat manual</li>
                    <li>• Rawan kehilangan</li>
                  </ul>
                </div>
                <div style={{ background: '#f0fdf4', padding: '24px' }}>
                  <h4 style={{ color: '#10b981', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    QRIS
                  </h4>
                  <ul style={{ fontSize: '14px', color: '#14532d', padding: 0 }}>
                    <li style={{ marginBottom: '8px' }}>• Pembayaran pas tanpa kembalian</li>
                    <li style={{ marginBottom: '8px' }}>• Aman dan terjamin</li>
                    <li style={{ marginBottom: '8px' }}>• Tercatat otomatis</li>
                    <li>• Bisa dipantau kapan saja</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Jenis QRIS */}
            <h3 className="md-section-title" id="jenis">
              Pilihan Jenis QRIS
            </h3>
            <div className="md-benefits">
              <div className="md-benefit-card" style={{ background: 'white', border: '1px solid #e2e8f0', borderLeft: '4px solid #10b981' }}>
                <h4 style={{ color: '#059669' }}>1. QRIS Statis</h4>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Cocok untuk Warung Kecil & PKL</p>
                <ul style={{ paddingLeft: '20px', fontSize: '14px' }}>
                  <li>Bentuk stiker/akrilik</li>
                  <li>Dipasang di meja kasir</li>
                  <li>Pembeli input nominal sendiri</li>
                </ul>
              </div>
              <div className="md-benefit-card" style={{ background: 'white', border: '1px solid #e2e8f0', borderLeft: '4px solid #3b82f6' }}>
                <h4 style={{ color: '#2563eb' }}>2. QRIS Dinamis</h4>
                <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Cocok untuk Toko Besar / Minimarket</p>
                <ul style={{ paddingLeft: '20px', fontSize: '14px' }}>
                  <li>Muncul di layar mesin/EDC</li>
                  <li>Nominal muncul otomatis</li>
                  <li>Lebih cepat untuk antrian panjang</li>
                </ul>
              </div>
            </div>

            {/* Rahasia Tersembunyi */}
            <h3 className="md-section-title" id="rahasia">
              Rahasia Besar: Memperluas Usaha
            </h3>
            <p className="md-text">
              QRIS bukan cuma buat pembayaran, tapi juga bantu usaha berkembang. Inilah alur rahasia bagaimana QRIS membantumu dapat modal Bank:
            </p>
            <div className="md-steps">
              <div className="md-step">
                <span className="md-step-num">1</span>
                <div className="md-step-content"><b>Data Transaksi:</b> Setiap pelanggan bayar, transaksi tercatat secara otomatis dan valid.</div>
              </div>
              <div className="md-step">
                <span className="md-step-num">2</span>
                <div className="md-step-content"><b>Laporan Otomatis:</b> Sistem PJSP akan membuatkan laporan keuangan berkala untuk Anda.</div>
              </div>
              <div className="md-step">
                <span className="md-step-num">3</span>
                <div className="md-step-content"><b>Bukti Valid:</b> Data ini adalah bukti nyata kejayaan usahamu di mata Bank.</div>
              </div>
              <div className="md-step">
                <span className="md-step-num">4</span>
                <div className="md-step-content">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#10b981' }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    <b>Modal Cair:</b> Saat mengajukan pinjaman, Bank punya data valid. Peluang modal cair jadi lebih besar!
                  </div>
                </div>
              </div>
            </div>

            {/* Cara Daftar */}
            <h3 className="md-section-title" id="daftar">
              Cara Daftar QRIS (Mudah via HP)
            </h3>
            <div className="md-steps">
              <div className="md-step">
                <span className="md-step-num">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <div className="md-step-content"><b>Siapkan Dokumen:</b> KTP & Foto usaha/warung Anda.</div>
              </div>
              <div className="md-step">
                <span className="md-step-num">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <div className="md-step-content"><b>Pilih Aplikasi:</b> Download GoPay Merchant, Dana Bisnis, atau BukuKas.</div>
              </div>
              <div className="md-step">
                <span className="md-step-num">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <div className="md-step-content"><b>Upload & Verifikasi:</b> Isi data dan tunggu 1-3 hari kerja.</div>
              </div>
              <div className="md-step">
                <span className="md-step-num">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <div className="md-step-content"><b>Cetak & Pakai:</b> Cetak QRIS Anda dan mulai terima bayaran digital!</div>
              </div>
            </div>

            {/* Dampak */}
            <h3 className="md-section-title" id="dampak">
              Dampak Menjadi Warung Pintar
            </h3>
            <div className="md-info-box" style={{ background: '#f8fafc', border: '1px solid #e2e8f0', textAlign: 'center' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
                <div>
                  <div style={{ color: '#10b981', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                  </div>
                  <b style={{ fontSize: '13px' }}>Modern</b>
                </div>
                <div>
                  <div style={{ color: '#f59e0b', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M19 17v4"/><path d="M3 5h4"/><path d="M17 19h4"/></svg>
                  </div>
                  <b style={{ fontSize: '13px' }}>Praktis</b>
                </div>
                <div>
                  <div style={{ color: '#3b82f6', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                  </div>
                  <b style={{ fontSize: '13px' }}>Aman</b>
                </div>
                <div>
                  <div style={{ color: '#6366f1', marginBottom: '8px', display: 'flex', justifyContent: 'center' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>
                  </div>
                  <b style={{ fontSize: '13px' }}>Rapi</b>
                </div>
              </div>
              <p style={{ marginTop: '24px', color: '#64748b', fontSize: '14px' }}>
                Usaha terlihat lebih profesional dan pelanggan merasa lebih nyaman bertransaksi.
              </p>
            </div>

            {/* Penutup */}
            <div style={{ marginTop: '60px', padding: '40px', background: '#ecfdf5', borderRadius: '32px', textAlign: 'center', border: '1px solid #bbf7d0' }}>
              <h2 style={{ fontSize: '26px', fontWeight: '800', color: '#065f46', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
                Warung Pintar, Rezeki Lancar!
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>
              </h2>
              <p className="md-text" style={{ marginBottom: '32px' }}>
                Saatnya warung naik level dari tradisional ke digital. Lupakan ribetnya uang receh dan catatan manual. Mulai hari ini, bangun masa depan usahamu dengan QRIS.
              </p>
              <button className="md-next-btn" style={{ maxWidth: '300px', margin: '0 auto', padding: '16px 32px', fontSize: '16px' }} onClick={onBack}>
                Mulai Go Digital Sekarang
              </button>
            </div>
          </article>
        </div>

        <aside className="md-sidebar">
          <div className="md-side-card">
            <h4 className="md-side-title">Navigasi Materi</h4>
            <div className="md-nav-list">
              <div className={`md-nav-item ${activeSection === 'masalah' ? 'active' : ''}`} onClick={() => scrollToSection('masalah')}>Masalah Manual</div>
              <div className={`md-nav-item ${activeSection === 'solusi' ? 'active' : ''}`} onClick={() => scrollToSection('solusi')}>Solusi QRIS</div>
              <div className={`md-nav-item ${activeSection === 'keunggulan' ? 'active' : ''}`} onClick={() => scrollToSection('keunggulan')}>Keunggulan</div>
              <div className={`md-nav-item ${activeSection === 'perbandingan' ? 'active' : ''}`} onClick={() => scrollToSection('perbandingan')}>Tunai vs QRIS</div>
              <div className={`md-nav-item ${activeSection === 'jenis' ? 'active' : ''}`} onClick={() => scrollToSection('jenis')}>Jenis QRIS</div>
              <div className={`md-nav-item ${activeSection === 'rahasia' ? 'active' : ''}`} onClick={() => scrollToSection('rahasia')}>Rahasia Modal</div>
              <div className={`md-nav-item ${activeSection === 'daftar' ? 'active' : ''}`} onClick={() => scrollToSection('daftar')}>Cara Daftar</div>
              <div className={`md-nav-item ${activeSection === 'dampak' ? 'active' : ''}`} onClick={() => scrollToSection('dampak')}>Dampak Usaha</div>
            </div>
          </div>

          <div className="md-side-card md-help-card">
            <div className="md-help-icon-wrap">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h4 className="md-side-title" style={{ color: 'white' }}>Butuh Pendampingan?</h4>
            <p className="md-help-desc">Tim ahli kami siap membantu Anda dalam proses pendaftaran dan penggunaan QRIS secara gratis.</p>
            <button className="md-mentor-btn" onClick={() => window.open('https://wa.me/6282357214445', '_blank')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Hubungi Kami
            </button>
          </div>
        </aside>
      </main>
    </div>
  )
}

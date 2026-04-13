import { useState, useEffect } from 'react'
import './BrandingMateriPage.css'

interface BrandingMateriPageProps {
  onBack: () => void
  from?: 'home' | 'materi'
}

export function BrandingMateriPage({ onBack, from = 'home' }: BrandingMateriPageProps) {
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
      const sections = ['masalah', 'apa-branding', 'solusi', 'tugas', 'konsep-prompt', 'rumus', 'contoh', 'tips']
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
    <div className="materi-detail-page branding-theme">
      {/* Mini Header */}
      <header className="md-header">
        <div className="md-header-left">
          <button className="md-back-btn" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <div className="md-title-group">
            <h2>Edukasi: Branding AI</h2>
            <p>Modul Identitas Digital UMKM</p>
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
            <span className="active">Branding UMKM dengan AI</span>
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
              src="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1200" 
              alt="AI Branding" 
              className="md-hero-img" 
            />
            <div className="md-hero-overlay">
              <span className="md-badge-main">IDENTITAS DIGITAL</span>
              <h1 className="md-hero-title">Branding UMKM dengan AI</h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px', fontSize: '18px', fontWeight: '500' }}>
                Cara mudah punya asisten pintar untuk usaha Anda
              </p>
              <div className="md-hero-meta">
                <span>15 Menit Membaca</span>
                <span>1.2k Pembaca</span>
              </div>
            </div>
          </section>

          <article className="md-article">
            {/* 5. Masalah UMKM Sehari-hari */}
            <h3 className="md-section-title" id="masalah">
              Masalah UMKM Sehari-hari
            </h3>
            <p className="md-text">
              Banyak UMKM mengalami kendala dalam membangun identitas usaha dan promosi:
            </p>
            <div className="md-benefits" style={{ marginBottom: '40px' }}>
              <div className="md-benefit-card" style={{ borderLeftColor: '#ef4444' }}>
                <h4>Kendala Utama</h4>
                <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#64748b' }}>
                  <li>Bingung cara promosi di media sosial</li>
                  <li>Susah merangkai kata-kata jualan</li>
                  <li>Tidak punya ide konten</li>
                  <li>Tidak konsisten posting</li>
                  <li>Tidak tahu cara bikin brand yang menarik</li>
                </ul>
              </div>
              <div className="md-benefit-card" style={{ borderLeftColor: '#f97316' }}>
                <h4>Akibatnya</h4>
                <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#64748b' }}>
                  <li>Konten sepi pengunjung</li>
                  <li>Penjualan tidak maksimal</li>
                  <li>Kalah saing dengan kompetitor</li>
                </ul>
              </div>
            </div>

            {/* 3 & 4. Apa itu Branding & Kenapa Penting */}
            <h3 className="md-section-title" id="apa-branding">
              Mengenal Branding Produk
            </h3>
            <p className="md-text">
              <strong>Branding</strong> adalah identitas yang membuat usaha kamu berbeda dari yang lain. Branding bukan cuma logo, tapi juga nama usaha, cara berbicara ke pelanggan, tampilan visual, dan kesan yang diingat pelanggan.
            </p>
            <div className="md-info-box" style={{ background: '#f0f9ff', borderColor: '#bae6fd', marginBottom: '40px' }}>
              <h4 style={{ color: '#0369a1', marginBottom: '16px' }}>Kenapa Branding Itu Penting?</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                <div>
                  <b style={{ color: '#0c4a6e' }}>1. Biar Dikenal</b>
                  <p style={{ fontSize: '14px' }}>Produk kamu lebih mudah ditemukan di tengah banyaknya pesaing.</p>
                </div>
                <div>
                  <b style={{ color: '#0c4a6e' }}>2. Biar Diingat</b>
                  <p style={{ fontSize: '14px' }}>Pelanggan akan ingat bisnis kamu saat mereka butuh produk.</p>
                </div>
                <div>
                  <b style={{ color: '#0c4a6e' }}>3. Biar Dipercaya</b>
                  <p style={{ fontSize: '14px' }}>Branding yang bagus bikin usaha terlihat profesional.</p>
                </div>
              </div>
              <p style={{ marginTop: '20px', fontWeight: '600', color: '#0369a1' }}> Tanpa branding, usaha kamu akan terlihat "biasa aja".</p>
            </div>

            {/* 6. Solusi: AI sebagai Asisten Pintar */}
            <h3 className="md-section-title" id="solusi">
              Solusi: AI sebagai Asisten Pintar
            </h3>
            <p className="md-text">
              Sekarang ada solusi modern: <strong>Artificial Intelligence (AI)</strong>. Anggap saja AI seperti karyawan baru yang pintar, cepat, dan siap membantu kapan saja tanpa rasa lelah.
            </p>
            <div className="md-benefits">
              <div className="md-benefit-card" style={{ borderLeftColor: '#3b82f6' }}>
                <h4>Kelebihan Pakai AI</h4>
                <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#64748b' }}>
                  <li>Bikin caption otomatis dalam detik</li>
                  <li>Dapat ide konten tanpa henti</li>
                  <li>Bikin konsep branding profesional</li>
                  <li>Menghemat waktu dan tenaga</li>
                </ul>
              </div>
            </div>

            {/* 7. Tugas AI untuk UMKM */}
            <h3 className="md-section-title" id="tugas">
              Tugas AI untuk UMKM
            </h3>
            <div className="md-steps">
              <div className="md-step">
                <span className="md-step-num">1</span>
                <div className="md-step-content">
                  <b>Membuat Caption:</b> Menulis teks promosi untuk Instagram, WhatsApp, TikTok, dll.
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">2</span>
                <div className="md-step-content">
                  <b>Memberikan Ide:</b> Memberi inspirasi konten segar setiap hari sesuai tren.
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">3</span>
                <div className="md-step-content">
                  <b>Mempercepat Pekerjaan:</b> Semua bisa jadi dalam hitungan detik, bukan jam.
                </div>
              </div>
            </div>
            <p style={{ textAlign: 'center', fontWeight: '600', color: '#3b82f6', marginBottom: '40px' }}>
              Jadi kamu tinggal fokus jualan, bukan mikirin konten terus!
            </p>

            {/* 8 & 9. Apa Itu Prompt & Kenapa Penting */}
            <h3 className="md-section-title" id="konsep-prompt">
              Apa Itu Prompt?
            </h3>
            <p className="md-text">
              <strong>Prompt</strong> adalah perintah atau instruksi yang kita berikan ke AI. Semakin jelas perintahnya, semakin bagus hasilnya.
            </p>
            <div className="md-benefits">
              <div className="md-info-box" style={{ background: '#fef2f2', borderColor: '#fecad3' }}>
                <h4 style={{ color: '#991b1b', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                  Prompt Tidak Jelas
                </h4>
                <ul style={{ padding: 0 }}>
                  <li style={{ color: '#7f1d1d' }}>"Buat caption jualan kopi"</li>
                  <li style={{ color: '#7f1d1d' }}>AI bingung context-nya</li>
                  <li style={{ color: '#7f1d1d' }}>Hasil asal-asalan & kaku</li>
                </ul>
              </div>
              <div className="md-info-box" style={{ background: '#f0fdf4', borderColor: '#bbf7d0' }}>
                <h4 style={{ color: '#166534', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Prompt Jelas
                </h4>
                <ul style={{ padding: 0 }}>
                  <li style={{ color: '#14532d' }}>"Buat caption jualan kopi kekinian untuk anak muda, bahasa santai dan menarik"</li>
                  <li style={{ color: '#14532d' }}>AI paham target & gaya</li>
                  <li style={{ color: '#14532d' }}>Hasil tepat sasaran & hidup</li>
                </ul>
              </div>
            </div>

            {/* 10. Rumus Prompt AI */}
            <h3 className="md-section-title" id="rumus">
              Rumus Prompt AI (4 Komponen Penting)
            </h3>
            <p className="md-text">
              Gunakan rumus ini agar hasil AI maksimal dan tidak membosankan:
            </p>
            <div className="md-steps">
              <div className="md-step">
                <span className="md-step-num">1</span>
                <div className="md-step-content">
                  <b>APA:</b> Produk atau jasa apa yang sedang Anda jual?
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">2</span>
                <div className="md-step-content">
                  <b>SIAPA:</b> Siapa target pembelinya? (Ibu rumah tangga, anak muda, pekerja?)
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">3</span>
                <div className="md-step-content">
                  <b>GAYA BAHASA:</b> Formal, santai, lucu, atau puitis?
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">4</span>
                <div className="md-step-content">
                  <b>TUJUAN:</b> Promosi (jualan), edukasi (info), atau interaksi (tanya-tanya)?
                </div>
              </div>
            </div>

            {/* 12. Contoh Prompt + Hasil */}
            <h3 className="md-section-title" id="contoh">
              Contoh Penerapan Rumus
            </h3>
            <div className="md-info-box" style={{ borderLeft: '4px solid #3b82f6', background: 'white', boxShadow: '0 4px 20px rgba(59, 130, 246, 0.1)', marginBottom: '32px' }}>
              <p style={{ fontStyle: 'italic', color: '#3b82f6', marginBottom: '10px', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase' }}>Prompt yang Digunakan:</p>
              <div style={{ position: 'relative', background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                <p style={{ fontSize: '15px', color: '#1e293b', fontWeight: '500', lineHeight: '1.6' }}>
                  "Buat caption jualan <strong>nasi kuning</strong>, untuk <strong>anak muda</strong>, bahasa <strong>santai dan lucu</strong>, tujuan <strong>promosi</strong>. Tambahkan emoji."
                </p>
              </div>
            </div>
            <div className="md-benefits" style={{ marginBottom: '40px' }}>
              <div className="md-benefit-card" style={{ borderLeftColor: '#10b981', background: '#f0fdf4' }}>
                <h4>Hasil Konten Jadi:</h4>
                <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#166534' }}>
                  <li>Lebih hidup dan tidak kaku</li>
                  <li>Lebih menarik perhatian mata</li>
                  <li>Lebih relate (nyambung) ke pembeli</li>
                  <li>Peluang jualan JAUH meningkat</li>
                </ul>
              </div>
            </div>

            {/* 11. Tips Agar Prompt Lebih Efektif */}
            <h3 className="md-section-title" id="tips">
              Tips Agar Prompt Lebih Efektif
            </h3>
            <div className="md-info-box" style={{ background: '#fff' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Jangan Singkat: Semakin detail, semakin bagus hasilnya.',
                  'Harus Jelas: Gunakan bahasa yang mudah dipahami.',
                  'Bisa Diulang: Prompt yang bagus bisa dipakai berkali-kali.',
                  'Berikan Contoh: Jika perlu, beri tahu AI gaya yang Anda sukai.'
                ].map((check, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '20px', height: '20px', border: '2px solid #3b82f6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontSize: '14px', color: '#1e293b' }}>{check}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 13. Penutup */}
            <div style={{ marginTop: '60px', padding: '40px', background: '#f0f9ff', borderRadius: '24px', textAlign: 'center' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '800', color: '#0369a1', marginBottom: '16px' }}>Mulai Branding dengan AI Hari Ini!</h2>
              <p className="md-text" style={{ marginBottom: '0' }}>
                AI bukan untuk menggantikan manusia, tapi untuk membantu pekerjaan jadi lebih ringan. Dengan AI, Branding jadi lebih mudah, konten jadi lebih cepat, dan promosi jadi lebih efektif.
              </p>
              <p style={{ marginTop: '24px', fontWeight: '700', color: '#3b82f6', fontSize: '18px' }}>
                Saatnya kembangkan usahamu bareng asisten pintar!
              </p>
            </div>
          </article>
        </div>

        <aside className="md-sidebar">
          <div className="md-side-card">
            <h4 className="md-side-title">Navigasi Materi</h4>
            <div className="md-nav-list">
              <div className={`md-nav-item ${activeSection === 'masalah' ? 'active' : ''}`} onClick={() => scrollToSection('masalah')}>Masalah UMKM</div>
              <div className={`md-nav-item ${activeSection === 'apa-branding' ? 'active' : ''}`} onClick={() => scrollToSection('apa-branding')}>Apa itu Branding?</div>
              <div className={`md-nav-item ${activeSection === 'solusi' ? 'active' : ''}`} onClick={() => scrollToSection('solusi')}>Solusi AI</div>
              <div className={`md-nav-item ${activeSection === 'tugas' ? 'active' : ''}`} onClick={() => scrollToSection('tugas')}>Tugas AI</div>
              <div className={`md-nav-item ${activeSection === 'konsep-prompt' ? 'active' : ''}`} onClick={() => scrollToSection('konsep-prompt')}>Konsep Prompt</div>
              <div className={`md-nav-item ${activeSection === 'rumus' ? 'active' : ''}`} onClick={() => scrollToSection('rumus')}>Rumus Prompt</div>
              <div className={`md-nav-item ${activeSection === 'contoh' ? 'active' : ''}`} onClick={() => scrollToSection('contoh')}>Contoh Hasil</div>
              <div className={`md-nav-item ${activeSection === 'tips' ? 'active' : ''}`} onClick={() => scrollToSection('tips')}>Tips Efektif</div>
            </div>
          </div>

          <div className="md-side-card md-help-card" style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)' }}>
            <div className="md-help-icon-wrap" style={{ background: 'rgba(255,255,255,0.2)', marginBottom: '16px', width: '40px', height: '40px', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'white' }}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h4 className="md-side-title" style={{ color: 'white' }}>Butuh Mentor AI?</h4>
            <p className="md-help-desc">Konsultasikan strategi branding digital usaha Anda secara gratis dengan tim ahli kami.</p>
            <button className="md-mentor-btn" style={{ color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={() => window.open('https://wa.me/6282357214445', '_blank')}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '8px' }}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l2.27-2.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              Hubungi Kami
            </button>
          </div>
        </aside>
      </main>
    </div>
  )
}

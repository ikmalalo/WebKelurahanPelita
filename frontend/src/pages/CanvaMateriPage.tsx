import { useState, useEffect } from 'react'
import './CanvaMateriPage.css'

interface CanvaMateriPageProps {
  onBack: () => void
  from?: 'home' | 'materi'
}

export function CanvaMateriPage({ onBack, from = 'home' }: CanvaMateriPageProps) {
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
      const sections = ['masalah', 'solusi', 'perbandingan', 'fitur', 'konsep-prompt', 'langkah', 'tips']
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
    <div className="materi-detail-page canva-theme">
      {/* Mini Header */}
      <header className="md-header">
        <div className="md-header-left">
          <button className="md-back-btn" onClick={onBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 18-6-6 6-6"/>
            </svg>
          </button>
          <div className="md-title-group">
            <h2>Desain Konten dengan Canva AI</h2>
            <p>Modul 2: Kreativitas Tanpa Batas</p>
          </div>
        </div>
        <div className="md-header-actions">
          <button className="md-action-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
            Bagikan
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
            <span className="active">Konten Canva AI</span>
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
              src="https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=1200" 
              alt="Canva AI Design" 
              className="md-hero-img" 
            />
            <div className="md-hero-overlay">
              <span className="md-badge-main">MODUL KREATIF</span>
              <h1 className="md-hero-title">Bikin Desain Jualan Keren Tanpa Ribet</h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px', fontSize: '18px' }}>
                Panduan santai pakai Canva AI untuk UMKM (bebas pusing, bebas biaya)
              </p>
              <div className="md-hero-meta">
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
                  20 Menit Membaca
                </span>
                <span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                  850 Pembaca
                </span>
              </div>
            </div>
          </section>

          <article className="md-article">
            <h3 className="md-section-title" id="masalah">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              Apa Masalahnya?
            </h3>
            <p className="md-text">
              Banyak pelaku UMKM mengalami kendala dalam membuat desain promosi yang menarik. Hambatan utama biasanya adalah:
            </p>
            <div className="md-benefits" style={{ marginBottom: '40px' }}>
              <div className="md-benefit-card" style={{ borderLeftColor: '#ef4444' }}>
                <h4>Tidak Jago Desain</h4>
                <p>Mider karena merasa tidak memiliki bakat seni atau teknis desain.</p>
              </div>
              <div className="md-benefit-card" style={{ borderLeftColor: '#ef4444' }}>
                <h4>Keterbatasan Waktu</h4>
                <p>Terlalu sibuk mengurus produksi dan penjualan hingga tak sempat mendesain.</p>
              </div>
              <div className="md-benefit-card" style={{ borderLeftColor: '#ef4444' }}>
                <h4>Budget Terbatas</h4>
                <p>Belum mampu membayar jasa desainer profesional untuk setiap promo.</p>
              </div>
            </div>

            <h3 className="md-section-title" id="solusi">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 22 4-10 4 10"/><path d="M9 18h6"/></svg>
              Solusi: Canva AI
            </h3>
            <p className="md-text">
              Sekarang ada solusi praktis yaitu <strong>Canva AI</strong>. Anggap saja ini sebagai asisten desain pribadi yang selalu ada di HP Anda.
            </p>
            <div className="md-benefits">
              <div className="md-benefit-card">
                <h4>Sangat Cepat</h4>
                <p>Desain profesional jadi dalam waktu 1 hingga 5 menit saja.</p>
              </div>
              <div className="md-benefit-card">
                <h4>Gratis</h4>
                <p>Gunakan fitur-fitur canggih tanpa tambahan biaya langganan.</p>
              </div>
              <div className="md-benefit-card">
                <h4>Bantuan Ide</h4>
                <p>Tidak perlu bingung mulai dari nol, AI akan membantu membuatkan konsepnya.</p>
              </div>
            </div>

            <h3 className="md-section-title" id="perbandingan">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3h5v5"/><path d="M8 3H3v5"/><path d="m21 3-7.5 7.5"/><path d="m3 3 7.5 7.5"/><path d="M16 21h5v-5"/><path d="M8 21H3v-5"/><path d="m21 21-7.5-7.5"/><path d="m3 21 7.5-7.5"/></svg>
              Perbandingan: Cara Lama vs Canva AI
            </h3>
            <div className="md-benefits">
              <div className="md-info-box" style={{ background: '#fff1f2', borderColor: '#fecdd3' }}>
                <h4 style={{ color: '#e11d48', marginBottom: '12px' }}>Cara Lama</h4>
                <ul style={{ padding: 0 }}>
                  <li style={{ color: '#9f1239' }}>Butuh waktu berjam-jam</li>
                  <li style={{ color: '#9f1239' }}>Biaya jasa mahal</li>
                  <li style={{ color: '#9f1239' }}>Harus mikir ide sendiri</li>
                </ul>
              </div>
              <div className="md-info-box" style={{ background: '#f5f3ff', borderColor: '#ddd6fe' }}>
                <h4 style={{ color: '#7c3aed', marginBottom: '12px' }}>Canva AI</h4>
                <ul style={{ padding: 0 }}>
                  <li style={{ color: '#5b21b6' }}>Cepat (1-5 Menit)</li>
                  <li style={{ color: '#5b21b6' }}>Gratis sepenuhnya</li>
                  <li style={{ color: '#5b21b6' }}>Ide dibuatkan otomatis</li>
                </ul>
              </div>
            </div>

            <h3 className="md-section-title" id="fitur">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              Fitur Penting Canva AI
            </h3>
            <div className="md-steps">
              <div className="md-step">
                <span className="md-step-num" style={{ background: '#7c3aed' }}>1</span>
                <div className="md-step-content">
                  <b>Magic Design</b>
                  <p>Otomatis membuat berbagai pilihan desain hanya dari perintah teks.</p>
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num" style={{ background: '#7c3aed' }}>2</span>
                <div className="md-step-content">
                  <b>Background Remover</b>
                  <p>Hapus latar belakang foto produk dalam sekali klik saja.</p>
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num" style={{ background: '#7c3aed' }}>3</span>
                <div className="md-step-content">
                  <b>Magic Write</b>
                  <p>Asisten penulis yang membantu membuat kata-kata promosi menarik.</p>
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num" style={{ background: '#7c3aed' }}>4</span>
                <div className="md-step-content">
                  <b>Template Siap Pakai</b>
                  <p>Ribuan desain profesional tinggal edit nama dan harga produk.</p>
                </div>
              </div>
            </div>

            <h3 className="md-section-title" id="konsep-prompt">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
              Konsep Prompt (Instruksi)
            </h3>
            <p className="md-text">
              Untuk mendapatkan hasil yang bagus, AI harus diberikan instruksi (Prompt) yang jelas. Contoh prompt yang efektif:
            </p>
            <div className="md-info-box">
              <p style={{ fontStyle: 'italic', color: '#5b21b6', fontSize: '16px' }}>
                "Buatkan poster promo untuk [Nama Produk]. Fokus pada satu gambar produk di tengah. Gunakan warna latar yang bersih dan lembut. Pastikan teks rapi, mudah dibaca, dan terlihat elegan. Tambahkan harga [Harga] dengan font modern."
              </p>
            </div>

            <h3 className="md-section-title" id="langkah">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 11 12 14 22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
              Langkah Menggunakan
            </h3>
            <div className="md-steps">
              <div className="md-step">
                <div className="md-step-content">
                  <b>Tahap 1: Persiapan</b>
                  <p>Buka aplikasi Canva, pilih fitur Magic Design, dan masukkan prompt yang sudah dibuat.</p>
                </div>
              </div>
              <div className="md-step">
                <div className="md-step-content">
                  <b>Tahap 2: Eksekusi</b>
                  <p>Edit nama produk dan harga, klik generate, lalu pilih desain yang paling sesuai dengan selera Anda.</p>
                </div>
              </div>
            </div>

            <h3 className="md-section-title" id="tips">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              Tips & Penutup
            </h3>
            <div className="md-info-box">
              <h4 style={{ marginBottom: '16px' }}>Tips Kata Kunci Prompt:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                <div style={{ padding: '10px', background: 'white', borderRadius: '8px', fontSize: '14px' }}><b>Modern</b> → Kekinian</div>
                <div style={{ padding: '10px', background: 'white', borderRadius: '8px', fontSize: '14px' }}><b>Estetik</b> → Enak dilihat</div>
                <div style={{ padding: '10px', background: 'white', borderRadius: '8px', fontSize: '14px' }}><b>Profesional</b> → Terlihat mahal</div>
                <div style={{ padding: '10px', background: 'white', borderRadius: '8px', fontSize: '14px' }}><b>Bersih</b> → Tidak ramai</div>
              </div>
            </div>
            
            <p className="md-text" style={{ marginTop: '30px' }}>
              Membuat desain promosi kini tidak perlu skill khusus. Cukup gunakan Canva AI dengan prompt yang jelas. Saatnya UMKM naik kelas dengan desain yang menarik! 🚀
            </p>
          </article>
        </div>

        <aside className="md-sidebar">
          <div className="md-side-card">
            <h4 className="md-side-title">Daftar Isi</h4>
            <div className="md-nav-list">
              <div className={`md-nav-item ${activeSection === 'masalah' ? 'active' : ''}`} onClick={() => scrollToSection('masalah')}>Apa Masalahnya?</div>
              <div className={`md-nav-item ${activeSection === 'solusi' ? 'active' : ''}`} onClick={() => scrollToSection('solusi')}>Solusi Canva AI</div>
              <div className={`md-nav-item ${activeSection === 'perbandingan' ? 'active' : ''}`} onClick={() => scrollToSection('perbandingan')}>Perbandingan</div>
              <div className={`md-nav-item ${activeSection === 'fitur' ? 'active' : ''}`} onClick={() => scrollToSection('fitur')}>Fitur Penting</div>
              <div className={`md-nav-item ${activeSection === 'konsep-prompt' ? 'active' : ''}`} onClick={() => scrollToSection('konsep-prompt')}>Konsep Prompt</div>
              <div className={`md-nav-item ${activeSection === 'langkah' ? 'active' : ''}`} onClick={() => scrollToSection('langkah')}>Langkah Pakai</div>
              <div className={`md-nav-item ${activeSection === 'tips' ? 'active' : ''}`} onClick={() => scrollToSection('tips')}>Tips & Penutup</div>
            </div>
          </div>

          <div className="md-side-card md-help-card">
            <h4 className="md-side-title">Ingin Praktek Langsung?</h4>
            <p className="md-help-desc">Mentor kami siap mendampingi Anda membuat desain promosi pertama menggunakan AI.</p>
            <button className="md-mentor-btn">Hubungi Mentor</button>
          </div>
        </aside>
      </main>
    </div>
  )
}

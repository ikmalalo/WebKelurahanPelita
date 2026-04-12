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
      const sections = ['masalah', 'solusi', 'perbandingan', 'fitur', 'konsep-prompt', 'hasil', 'langkah', 'tips']
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
            <h2>Halaman Edukasi: Canva AI</h2>
            <p>Modul Kreativitas Digital UMKM</p>
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
              <span className="md-badge-main">MATERI UNGGULAN</span>
              <h1 className="md-hero-title">Bikin Desain Jualan Keren Tanpa Ribet</h1>
              <p style={{ color: 'rgba(255,255,255,0.9)', marginBottom: '24px', fontSize: '18px', fontWeight: '500' }}>
                Panduan santai pakai Canva AI untuk UMKM (bebas pusing, bebas biaya)
              </p>
              <div className="md-hero-meta">
                <span>20 Menit Membaca</span>
                <span>850 Pembaca</span>
              </div>
            </div>
          </section>

          <article className="md-article">
            <h3 className="md-section-title" id="masalah">
              Latar Belakang Masalah
            </h3>
            <p className="md-text">
              Di era digital sekarang, desain promosi itu penting banget buat menarik perhatian pembeli. Sayangnya, banyak pelaku UMKM masih kesulitan dalam membuat desain yang menarik karena beberapa kendala utama:
            </p>
            <div className="md-benefits" style={{ marginBottom: '40px' }}>
              <div className="md-benefit-card" style={{ borderLeftColor: '#ef4444' }}>
                <h4>Hambatan Utama</h4>
                <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#64748b' }}>
                  <li>Tidak punya skill desain grafis</li>
                  <li>Bingung mulai dari mana saat bikin desain</li>
                  <li>Tidak punya waktu karena fokus jualan</li>
                  <li>Biaya mahal jika pakai jasa desainer</li>
                  <li>Hasil desain terlihat tidak profesional</li>
                </ul>
              </div>
            </div>
            <p className="md-text">
              Akibatnya, promosi jadi kurang maksimal dan produk lokal seringkali kalah saing dengan brand besar yang punya tim desain khusus.
            </p>

            <h3 className="md-section-title" id="solusi">
              Solusi: Canva AI sebagai Asisten Desain
            </h3>
            <p className="md-text">
              Sekarang ada solusi praktis yang bisa digunakan siapa saja, yaitu <strong>Canva AI</strong>. Anggap saja ini sebagai asisten desain pribadi yang membantu membuat desain secara otomatis hanya dari perintah teks.
            </p>
            <div className="md-benefits">
              <div className="md-benefit-card" style={{ borderLeftColor: '#8b5cf6' }}>
                <h4>Keuntungan Utama</h4>
                <ul style={{ paddingLeft: '20px', fontSize: '14px', color: '#64748b' }}>
                  <li>Tidak perlu jago desain</li>
                  <li>Tidak perlu waktu lama (1-5 Menit)</li>
                  <li>Tidak perlu biaya mahal</li>
                  <li>Tinggal ketik &rarr; langsung jadi desain</li>
                </ul>
              </div>
            </div>

            <h3 className="md-section-title" id="perbandingan">
              Perbandingan: Cara Lama vs Canva AI
            </h3>
            <div className="md-benefits">
              <div className="md-info-box" style={{ background: '#fff1f2', borderColor: '#fecdd3' }}>
                <h4 style={{ color: '#e11d48', marginBottom: '12px' }}>Cara Lama</h4>
                <ul style={{ padding: 0 }}>
                  <li style={{ color: '#9f1239' }}>Proses lama (berjam-jam)</li>
                  <li style={{ color: '#9f1239' }}>Harus belajar tools sulit</li>
                  <li style={{ color: '#9f1239' }}>Biaya jasa desainer mahal</li>
                  <li style={{ color: '#9f1239' }}>Ide sering mentok</li>
                </ul>
              </div>
              <div className="md-info-box" style={{ background: '#f5f3ff', borderColor: '#ddd6fe' }}>
                <h4 style={{ color: '#7c3aed', marginBottom: '12px' }}>Canva AI</h4>
                <ul style={{ padding: 0 }}>
                  <li style={{ color: '#5b21b6' }}>Cepat (1-5 Menit)</li>
                  <li style={{ color: '#5b21b6' }}>Tidak perlu skill khusus</li>
                  <li style={{ color: '#5b21b6' }}>Gratis sepenuhnya</li>
                  <li style={{ color: '#5b21b6' }}>AI bantu buatkan ide</li>
                </ul>
              </div>
            </div>

            <h3 className="md-section-title" id="fitur">
              Fitur Utama Canva AI
            </h3>
            <div className="md-steps">
              <div className="md-step">
                <span className="md-step-num">1</span>
                <div className="md-step-content">
                  <b>Magic Design</b>
                  <p>Membuat desain otomatis hanya dari deskripsi teks. Cukup ketik kebutuhan Anda dan Canva akan memberikan beberapa pilihan desain instan.</p>
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">2</span>
                <div className="md-step-content">
                  <b>Background Remover</b>
                  <p>Menghapus latar belakang foto produk secara otomatis agar terlihat lebih bersih, profesional, dan fokus pada produk utama.</p>
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">3</span>
                <div className="md-step-content">
                  <b>Magic Write</b>
                  <p>Asisten AI yang membantu membuat caption, deskripsi produk, atau kalimat iklan menarik bagi Anda yang bingung merangkai kata.</p>
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">4</span>
                <div className="md-step-content">
                  <b>Template Siap Pakai</b>
                  <p>Ribuan template desain profesional (Poster, Feed IG, Banner) yang tinggal diganti teks dan gambarnya saja.</p>
                </div>
              </div>
            </div>

            <h3 className="md-section-title" id="konsep-prompt">
              Cara Berkomunikasi dengan AI (Konsep Prompt)
            </h3>
            <p className="md-text">
              Agar hasil desain bagus, AI perlu diberikan instruksi yang jelas. Anggap saja seperti memberi resep ke koki; semakin detail instruksinya, semakin lezat hasilnya.
            </p>
            
            <div className="md-info-box" style={{ borderLeft: '4px solid #8b5cf6', background: 'white', boxShadow: '0 4px 20px rgba(139, 92, 246, 0.1)' }}>
              <p style={{ fontStyle: 'italic', color: '#8b5cf6', marginBottom: '10px', fontSize: '14px', fontWeight: '700', textTransform: 'uppercase' }}>Contoh Prompt Yang Direkomendasikan:</p>
              <div style={{ position: 'relative', background: '#f8fafc', padding: '20px', borderRadius: '12px', border: '1px dashed #cbd5e1' }}>
                <p style={{ fontSize: '16px', color: '#1e293b', fontWeight: '500', lineHeight: '1.6', margin: 0 }}>
                  "Buatkan poster promo untuk minuman kopi kekinian. Gunakan satu gambar produk di tengah. Gunakan background warna soft dan bersih. Tambahkan teks 'Segar & Nikmat' dan harga Rp15.000. Gunakan font modern dan elegan."
                </p>
                <div style={{ marginTop: '15px', display: 'flex', gap: '8px' }}>
                  <span style={{ fontSize: '11px', background: '#f5f3ff', color: '#8b5cf6', padding: '4px 8px', borderRadius: '4px', fontWeight: '700' }}>MODERN</span>
                  <span style={{ fontSize: '11px', background: '#f5f3ff', color: '#8b5cf6', padding: '4px 8px', borderRadius: '4px', fontWeight: '700' }}>CLEAN</span>
                  <span style={{ fontSize: '11px', background: '#f5f3ff', color: '#8b5cf6', padding: '4px 8px', borderRadius: '4px', fontWeight: '700' }}>PROFESIONAL</span>
                </div>
              </div>
            </div>

            <h3 className="md-section-title" id="hasil">
              Koleksi Prompt Siap Pakai (Quick Copy)
            </h3>
            <p className="md-text">
              Salin dan sesuaikan prompt di bawah ini untuk berbagai kebutuhan jualan Anda:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
              {[
                { title: 'Promo Makanan (Donat/Camilan)', prompt: 'Buat poster promo donat coklat, background gelap, warna merah dan kuning, teks tebal, tampilkan harga 15.000 dan badge promo.' },
                { title: 'Fashion / Pakaian', prompt: 'Desain katalog untuk kemeja pria minimalis, background estetik ruangan, font clean, warna pastel, tambahkan teks Koleksi Terbaru.' },
                { title: 'Jasa / Layanan', prompt: 'Banner promo jasa cuci sepatu, warna biru cerah, gunakan ikon kebersihan, teks Mengkilap Seperti Baru, font profesional.' }
              ].map((item, i) => (
                <div key={i} style={{ background: '#f5f3ff', padding: '20px', borderRadius: '16px', border: '1px solid #ddd6fe' }}>
                  <b style={{ display: 'block', marginBottom: '8px', color: '#5b21b6' }}>{item.title}</b>
                  <p style={{ fontSize: '14px', color: '#475569', margin: 0 }}>"{item.prompt}"</p>
                </div>
              ))}
            </div>

            <h3 className="md-section-title" id="langkah">
              Langkah Menggunakan Canva AI
            </h3>
            <div className="md-steps">
              <div className="md-step">
                <span className="md-step-num">1</span>
                <div className="md-step-content">
                  <b>Tahap Mulai:</b> Buka aplikasi Canva di HP atau Laptop, pastikan sudah login, dan cari fitur “Magic Design”.
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">2</span>
                <div className="md-step-content">
                  <b>Tahap Generate:</b> Masukkan prompt yang paling sesuai dengan produk Anda, klik "Generate", dan tunggu sistem AI bekerja.
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">3</span>
                <div className="md-step-content">
                  <b>Tahap Editing:</b> AI akan memberikan beberapa pilihan. Pilih satu, sesuaikan nama produk/harga, dan tambahkan logo brand Anda.
                </div>
              </div>
              <div className="md-step">
                <span className="md-step-num">4</span>
                <div className="md-step-content">
                  <b>Tahap Final:</b> Simpan desain dalam format PNG atau JPG kualitas tinggi, dan desain Anda siap diunggah ke media sosial!
                </div>
              </div>
            </div>

            <h3 className="md-section-title" id="tips">
              Checklist Desain Jualan Menarik
            </h3>
            <p className="md-text">
              Gunakan checklist ini sebelum mengunggah desain Anda untuk memastikan hasil maksimal:
            </p>
            <div className="md-info-box" style={{ background: '#fff' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {[
                  'Sudah menggunakan kata kunci Modern/Estetik/Clean?',
                  'Apakah teks sudah terbaca dengan jelas (kontras)?',
                  'Apakah gambar produk sudah menjadi pusat perhatian?',
                  'Apakah harga dan kontak sudah terlihat?',
                  'Desain tidak terlalu ramai (minimalis)?'
                ].map((check, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{ width: '20px', height: '20px', border: '2px solid #8b5cf6', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyItems: 'center' }}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                    </div>
                    <span style={{ fontSize: '14px', color: '#1e293b' }}>{check}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <p className="md-text" style={{ marginTop: '40px', textAlign: 'center', fontWeight: '600', color: '#8b5cf6' }}>
              Sekarang Anda siap membuat konten promosi kelas dunia. Selamat berkreasi! 🚀
            </p>
          </article>
        </div>

        <aside className="md-sidebar">
          <div className="md-side-card">
            <h4 className="md-side-title">Navigasi Materi</h4>
            <div className="md-nav-list">
              <div className={`md-nav-item ${activeSection === 'masalah' ? 'active' : ''}`} onClick={() => scrollToSection('masalah')}>Latar Belakang</div>
              <div className={`md-nav-item ${activeSection === 'solusi' ? 'active' : ''}`} onClick={() => scrollToSection('solusi')}>Solusi Canva AI</div>
              <div className={`md-nav-item ${activeSection === 'perbandingan' ? 'active' : ''}`} onClick={() => scrollToSection('perbandingan')}>Perbandingan</div>
              <div className={`md-nav-item ${activeSection === 'fitur' ? 'active' : ''}`} onClick={() => scrollToSection('fitur')}>Fitur Utama</div>
              <div className={`md-nav-item ${activeSection === 'konsep-prompt' ? 'active' : ''}`} onClick={() => scrollToSection('konsep-prompt')}>Konsep Prompt</div>
              <div className={`md-nav-item ${activeSection === 'hasil' ? 'active' : ''}`} onClick={() => scrollToSection('hasil')}>Koleksi Prompt</div>
              <div className={`md-nav-item ${activeSection === 'langkah' ? 'active' : ''}`} onClick={() => scrollToSection('langkah')}>Langkah Pakai</div>
              <div className={`md-nav-item ${activeSection === 'tips' ? 'active' : ''}`} onClick={() => scrollToSection('tips')}>Checklist Desain</div>
            </div>
          </div>

          <div className="md-side-card md-help-card">
            <h4 className="md-side-title">Butuh Pendampingan?</h4>
            <p className="md-help-desc">Kami siap membimbing Anda menggunakan Canva AI hingga mahir membuat desain jualan.</p>
            <button className="md-mentor-btn" onClick={() => window.open('https://wa.me/6282357214445', '_blank')}>Hubungi Mentor</button>
          </div>
        </aside>
      </main>
    </div>
  )
}

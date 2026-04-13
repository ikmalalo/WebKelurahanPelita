import { useState } from 'react'
import './MateriPage.css'
import qrisImg from '../assets/images/qris-materi.png'

interface Material {
  id: number
  title: string
  description: string
  category: string
  badgeClass: string
  readTime: string
  image: string
}

const materials: Material[] = [
  {
    id: 1,
    title: "Meningkatkan Branding UMKM dengan AI",
    description: "Gunakan teknologi kecerdasan buatan untuk membangun identitas visual dan narasi brand yang kuat untuk bisnis Anda.",
    category: "AI Tools",
    badgeClass: "ai-tools",
    readTime: "15 min read",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Pelatihan QRIS",
    description: "Panduan lengkap implementasi sistem pembayaran digital QRIS untuk memudahkan transaksi di gerai UMKM Anda.",
    category: "Payments",
    badgeClass: "payments",
    readTime: "10 min read",
    image: qrisImg
  },
  {
    id: 4,
    title: "Google Maps UMKM",
    description: "Optimalkan profil bisnis Anda di Google Maps agar mudah ditemukan oleh pelanggan di sekitar Kelurahan Pelita.",
    category: "Visibility",
    badgeClass: "visibility",
    readTime: "12 min read",
    image: "https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    title: "Pembuatan Konten Promosi dengan Canva AI",
    description: "Pelajari cara membuat desain promosi yang menarik secara instan menggunakan fitur AI di Canva.",
    category: "Content",
    badgeClass: "content",
    readTime: "20 min read",
    image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=800"
  }
]

const categories = [
  { id: 'All Topics', name: 'All Topics', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
  )},
  { id: 'AI Tools', name: 'AI Tools', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v8"/><path d="m4.93 10.93 1.41 1.41"/><path d="M2 18h2"/><path d="M20 18h2"/><path d="m19.07 10.93-1.41 1.41"/><path d="M22 22H2"/><path d="m8 22 4-10 4 10"/><path d="M9 18h6"/></svg>
  )},
  { id: 'Payments', name: 'Payments', icon: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
  )}
]

interface MateriPageProps {
  onMaterialClick?: (id: number) => void
}

export function MateriPage({ onMaterialClick }: MateriPageProps) {
  const [activeTab, setActiveTab] = useState('All Topics')

  const filtered = materials.filter(m => 
    activeTab === 'All Topics' ? true : m.category === activeTab
  )

  return (
    <div className="materi-page">
      <div className="materi-container">
        
        <header className="materi-header">
          <div className="materi-sub-top">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
            </svg>
            Learning Catalog
          </div>
          <h1 className="materi-title">Training Materials</h1>
          <p className="materi-subtitle">
            Empower your UMKM business with digital skills. Our curated materials cover everything from branding to digital payments.
          </p>
        </header>

        <div className="materi-filters">
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={`materi-filter-btn ${activeTab === cat.id ? 'active' : ''}`}
              onClick={() => setActiveTab(cat.id)}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>

        <div className="materi-grid">
          {filtered.map(mat => (
            <div key={mat.id} className="materi-card">
              <div className="materi-img-wrap">
                <img src={mat.image} alt={mat.title} className="materi-img" />
                <span className={`materi-badge ${mat.badgeClass}`}>{mat.category}</span>
              </div>
              <div className="materi-content">
                <h3 className="materi-card-title">{mat.title}</h3>
                <p className="materi-card-desc">{mat.description}</p>
                <div className="materi-footer">
                  <div className="materi-read-time">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
                    </svg>
                    {mat.readTime}
                  </div>
                  <button 
                    className="materi-btn"
                    onClick={() => onMaterialClick && onMaterialClick(mat.id)}
                  >
                    Read More 
                    <svg style={{ marginLeft: '6px' }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>



      </div>
    </div>
  )
}

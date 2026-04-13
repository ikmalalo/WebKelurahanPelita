import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './DirektoriPage.css'

interface Business {
  id: number
  name: string
  category: string
  address: string
  description: string
  image: string
  gallery: string[]
  status: 'buka' | 'tutup'
}

// Data statis dipindahkan ke database Supabase

const categories = ["Semua", "Makanan Berat", "Makanan Ringan", "Dessert", "Minuman"]

interface ModalProps {
  business: Business | null
  onClose: () => void
}

function ProductModal({ business, onClose }: ModalProps) {
  const [selectedImg, setSelectedImg] = useState(0)

  if (!business) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>

        <div className="modal-grid">
          <div className="modal-gallery">
            <div className="modal-main-img-wrap">
              <img src={business.gallery[selectedImg]} alt={business.name} className="modal-main-img" />
            </div>
            <div className="modal-thumbnails">
              {business.gallery.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`modal-thumb ${selectedImg === idx ? 'active' : ''}`}
                  onClick={() => setSelectedImg(idx)}
                >
                  <img src={img} alt={`${business.name} detail ${idx + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="modal-info">
            <span className="modal-badge">{business.category}</span>
            <h2 className="modal-title">{business.name}</h2>
            <div className="modal-addr">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              {business.address}
            </div>
            <p className="modal-desc">{business.description}</p>
            
            <div className="modal-features">
              <div className="modal-feature">
                <span className="mf-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                <span>Produk Original</span>
              </div>
              <div className="modal-feature">
                <span className="mf-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2563eb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13"/><polyline points="16 8 20 8 23 11 23 16 16 16"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>
                </span>
                <span>Siap Pesan Antar</span>
              </div>
              <div className="modal-feature">
                <span className="mf-icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#eab308" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                </span>
                <span>Harga Terjangkau</span>
              </div>
            </div>

            <button className="dir-wa-btn modal-cta">
              Hubungi via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function DirektoriPage() {
  const [activeTab, setActiveTab] = useState("Semua")
  const [selectedBusiness, setSelectedBusiness] = useState<Business | null>(null)
  const [businesses, setBusinesses] = useState<Business[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBusinesses()
  }, [])

  const fetchBusinesses = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('usaha_kuliner')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      if (data) {
        // Map data dari Supabase ke interface Business
        const mappedData: Business[] = data.map(item => ({
          id: item.id,
          name: item.nama,
          category: item.kategori === 'Drink' ? 'Minuman' : item.kategori,
          address: item.lokasi,
          description: item.deskripsi,
          image: item.foto || 'https://images.unsplash.com/photo-1516762689617-e1cff9ee739e?auto=format&fit=crop&q=80&w=400',
          gallery: item.gallery && item.gallery.length > 0 ? item.gallery : [item.foto],
          status: item.status as 'buka' | 'tutup'
        }))
        setBusinesses(mappedData)
      }
    } catch (error) {
      console.error('Error fetching businesses:', error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = businesses.filter(b => 
    activeTab === "Semua" ? true : b.category === activeTab
  )

  return (
    <div className="dir-page">
      <div className="dir-container">
        
        <header className="dir-header">
          <h1 className="dir-title">Direktori UMKM Pelita</h1>
          <p className="dir-subtitle">
            Pusat informasi usaha lokal di Kelurahan Pelita, Samarinda. Dukung ekonomi lokal dengan berbelanja di tetangga sendiri.
          </p>
        </header>

        <div className="dir-filters-row">
          <div className="dir-categories">
            {categories.map(cat => (
              <button
                key={cat}
                className={`dir-cat-btn ${activeTab === cat ? 'active' : ''}`}
                onClick={() => setActiveTab(cat)}
              >
                {cat === "Makanan Berat" && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/></svg>
                )}
                {cat === "Makanan Ringan" && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m21 8-2 2-1.5-3.7A.5.5 0 0 0 17 6H7a.5.5 0 0 0-.5.3L5 10l-2-2V5a1 1 0 0 1 1-1h16a1 1 0 0 1 1 1v3ZM7.8 15.8c-.8.3-1.3 1-1.3 1.9 0 1 .7 1.8 1.4 2.1l1.1.5h6l1.1-.5c.7-.3 1.4-1.1 1.4-2.1 0-.9-.5-1.6-1.3-1.9"/><path d="M5 10c0 2 1.5 3 3.5 3s3.5-1 3.5-3"/><path d="M12 10c0 2 1.5 3 3.5 3s3.5-1 3.5-3"/></svg>
                )}
                {cat === "Dessert" && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8"/><path d="M4 16s.5-1 2-1 2.5 2 4 2 2.5-2 4-2 2.5 2 4 2 2-1 2-1"/><path d="M2 21h20"/><path d="M7 8v3"/><path d="M12 8v3"/><path d="M17 8v3"/><path d="M7 4h.01"/><path d="M12 4h.01"/><path d="M17 4h.01"/></svg>
                )}
                {cat === "Minuman" && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 22l-1.2-3h-7.6l-1.2 3"/><path d="M18 10H6l1 12h10l1-12z"/><path d="m6 10 1-5h10l1 5"/><path d="M10 5l1-3h2l1 3"/></svg>
                )}
                {cat}
              </button>
            ))}
          </div>
          <div className="dir-stats">
            Menampilkan <b>{filtered.length}</b> usaha lokal
          </div>
        </div>

        <div className="dir-grid">
          {loading ? (
            <div className="loading-state">Memuat data UMKM...</div>
          ) : filtered.length > 0 ? (
            filtered.map(biz => (
              <div key={biz.id} className="dir-card">
                <div className="dir-card-img-wrap">
                  <img src={biz.image} alt={biz.name} className="dir-card-img" />
                  <span className="dir-badge-cat">{biz.category}</span>
                  <span className={`dir-badge-status ${biz.status}`}>
                    {biz.status === 'buka' ? 'BUKA' : 'TUTUP'}
                  </span>
                </div>
                <div className="dir-card-content">
                  <h3 className="dir-card-title">{biz.name}</h3>
                  <div className="dir-card-addr">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                    </svg>
                    {biz.address}
                  </div>
                  <p className="dir-card-desc">{biz.description}</p>
                  <div className="dir-card-actions">
                    <button className="dir-detail-btn" onClick={() => setSelectedBusiness(biz)}>
                      Lihat Detail Produk
                    </button>
                    <div className="dir-card-bottom">
                      <button className="dir-wa-btn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                        </svg>
                        WhatsApp
                      </button>
                      <button className="dir-map-btn" title="Lihat Lokasi">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="empty-state">Belum ada UMKM di kategori ini.</div>
          )}
        </div>

    

        <div className="dir-pagination">
          <button className="dir-page-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button className="dir-page-btn active">1</button>
          <button className="dir-page-btn">2</button>
          <button className="dir-page-btn">3</button>
          <button className="dir-page-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>
        </div>

        <ProductModal 
          business={selectedBusiness} 
          onClose={() => setSelectedBusiness(null)} 
        />
      </div>
    </div>
  )
}

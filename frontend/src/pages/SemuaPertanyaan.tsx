import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './SemuaPertanyaan.css'

interface Ticket {
  id: string
  created_at: string
  nama_lengkap: string
  nama_usaha: string
  isi_pertanyaan: string
  status: string
  jawaban?: string
  foto_urls?: string[]
  is_hidden?: boolean
}

interface Props {
  onBack: () => void
}

export function SemuaPertanyaan({ onBack }: Props) {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [activeTab, setActiveTab] = useState('Semua Pertanyaan')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(true)
  const [selectedImg, setSelectedImg] = useState<string | null>(null)

  const tabs = ['Semua Pertanyaan', 'Belum Dijawab', 'Telah Selesai']

  useEffect(() => {
    fetchTickets()
  }, [])

  const fetchTickets = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('pertanyaan_helpdesk')
      .select('*')
      .eq('is_hidden', false)
      .order('created_at', { ascending: false })
    
    if (!error && data) {
      setTickets(data)
    }
    setLoading(false)
  }

  const filteredTickets = tickets.filter(t => {
    const matchSearch = t.isi_pertanyaan.toLowerCase().includes(search.toLowerCase()) || 
                       t.nama_lengkap.toLowerCase().includes(search.toLowerCase())
    if (!matchSearch) return false
    if (activeTab === 'Belum Dijawab') return t.status === 'Belum Dijawab'
    if (activeTab === 'Telah Selesai') return t.status === 'Selesai'
    return true
  })

  // Helper for UI icons/colors (Simplified)
  const getAvatarStyle = (index: number) => {
    const colors = ['#ffedd5', '#e0e7ff', '#fef2f2', '#f0fdf4']
    return { background: colors[index % colors.length] }
  }

  return (
    <div className="sp-page">
      <header className="sp-header">
        <div className="sp-header-inner">
          <div className="sp-header-left">
            <button className="sp-back-btn" onClick={onBack}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
              </svg>
            </button>
            <div className="sp-title-wrap">
              <h1 className="sp-title">Daftar Semua Pertanyaan UMKM</h1>
              <span className="sp-subtitle">Panel Warga Kelurahan Pelita</span>
            </div>
          </div>
          <div className="sp-header-right">
            <div className="sp-search-bar">
              <input type="text" placeholder="Cari pertanyaan..." value={search} onChange={(e) => setSearch(e.target.value)} />
            </div>
          </div>
        </div>
      </header>

      <div className="sp-tabs">
        <div className="sp-tabs-inner">
          {tabs.map(tab => (
            <button key={tab} className={`sp-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
              {tab}
            </button>
          ))}
        </div>
      </div>

      <main className="sp-main">
        {loading ? (
          <p className="sp-loading">Memuat data...</p>
        ) : (
          <div className="sp-grid">
            {filteredTickets.map((ticket, i) => (
              <div key={ticket.id} className="sp-card">
                <div className="sp-card-header">
                  <div className="sp-card-author">
                    <div className="sp-avatar" style={getAvatarStyle(i)}>
                       <span style={{fontWeight: 'bold', fontSize: '10px'}}>{ticket.nama_lengkap.charAt(0)}</span>
                    </div>
                    <div className="sp-author-info">
                      <h3 className="sp-author-name">{ticket.nama_lengkap}</h3>
                      <span className="sp-author-biz">{ticket.nama_usaha || 'Umum'}</span>
                    </div>
                  </div>
                  <div className={`sp-badge ${ticket.status === 'Selesai' ? 'success' : 'warning'}`}>
                    {ticket.status}
                  </div>
                </div>
                <div className="sp-card-body">
                  <p className="sp-question">{ticket.isi_pertanyaan}</p>
                  
                  {ticket.foto_urls && ticket.foto_urls.length > 0 && (
                    <div className="sp-gallery">
                      {ticket.foto_urls.map((url, idx) => (
                        <div key={idx} className="sp-photo-link" onClick={() => setSelectedImg(url)}>
                          <img src={url} alt="Lampiran" className="sp-photo" />
                          <div className="sp-photo-overlay">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {ticket.jawaban && (
                    <div className="sp-answer-box">
                      <div className="sp-answer-label">ADMIN PELITA</div>
                      <p className="sp-answer-text">{ticket.jawaban}</p>
                    </div>
                  )}
                </div>
                <div className="sp-card-footer">
                  <span className="sp-time">{new Date(ticket.created_at).toLocaleDateString('id-ID')}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {selectedImg && (
        <div className="sp-modal-overlay" onClick={() => setSelectedImg(null)}>
          <div className="sp-modal-content" onClick={e => e.stopPropagation()}>
            <button className="sp-modal-close" onClick={() => setSelectedImg(null)}>×</button>
            <img src={selectedImg} alt="Preview" className="sp-modal-img" />
          </div>
        </div>
      )}
    </div>
  )
}

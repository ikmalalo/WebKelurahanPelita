import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import './HelpdeskPage.css'



interface HelpdeskProps {
  onAllQuestions?: () => void
}

export function HelpdeskPage({ onAllQuestions }: HelpdeskProps) {
  const [recentTickets, setRecentTickets] = useState<any[]>([])
  const [form, setForm] = useState({
    nama: '',
    whatsapp: '',
    usaha: '',
    pertanyaan: '',
  })
  const [photos, setPhotos] = useState<File[]>([])
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    fetchRecent()
  }, [])

  const fetchRecent = async () => {
    const { data, error } = await supabase
      .from('pertanyaan_helpdesk')
      .select('*')
      .eq('is_hidden', false)
      .order('created_at', { ascending: false })
      .limit(3)
    
    if (!error && data) {
      setRecentTickets(data.map(t => ({
        ...t,
        statusColor: t.status === 'Selesai' ? '#2563EB' : '#d97706',
        statusBg: t.status === 'Selesai' ? '#EFF6FF' : '#FEF3C7',
        time: new Date(t.created_at).toLocaleDateString('id-ID'),
        title: t.isi_pertanyaan.substring(0, 30) + '...',
        preview: t.isi_pertanyaan
      })))
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files)
      setPhotos([...photos, ...selectedFiles].slice(0, 5))
    }
  }

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.nama || !form.whatsapp || !form.pertanyaan) return
    
    setLoading(true)
    try {
      const uploadedUrls: string[] = []

      // 1. Upload photos to 'forum-photos' bucket
      for (const file of photos) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `questions/${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('forum-photos')
          .upload(filePath, file)

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('forum-photos')
          .getPublicUrl(filePath)
          
        uploadedUrls.push(publicUrl)
      }

      // 2. Insert record with photo URLs
      const { error } = await supabase
        .from('pertanyaan_helpdesk')
        .insert([{
          nama_lengkap: form.nama,
          whatsapp: form.whatsapp,
          nama_usaha: form.usaha,
          isi_pertanyaan: form.pertanyaan,
          status: 'Belum Dijawab',
          foto_urls: uploadedUrls
        }])

      if (error) throw error

      setSubmitted(true)
      setForm({ nama: '', whatsapp: '', usaha: '', pertanyaan: '' })
      setPhotos([])
      fetchRecent()
      setTimeout(() => setSubmitted(false), 3000)
    } catch (err: any) {
      alert('Error: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="hd-page">
      <div className="hd-hero">
        <div className="hd-hero-content">
          <h1 className="hd-hero-title">Pusat Bantuan & Konsultasi UMKM</h1>
          <p className="hd-hero-desc">Kami siap mendukung pertumbuhan bisnis Anda di Kelurahan Pelita.</p>
        </div>
      </div>

      <div className="hd-main">
        <div className="hd-main-inner">
          <div className="hd-form-card">
            <div className="hd-card-title">Ajukan Pertanyaan Baru</div>
            {submitted && <div className="hd-success-banner">✅ Terkirim! Kami akan merespons segera.</div>}
            
            <form className="hd-form" onSubmit={handleSubmit}>
              <div className="hd-form-row">
                <div className="hd-field">
                  <label className="hd-label">Nama</label>
                  <input className="hd-input" name="nama" value={form.nama} onChange={(e) => setForm({...form, nama: e.target.value})} required />
                </div>
                <div className="hd-field">
                  <label className="hd-label">WhatsApp</label>
                  <input className="hd-input" name="whatsapp" value={form.whatsapp} onChange={(e) => setForm({...form, whatsapp: e.target.value})} required />
                </div>
              </div>
              <div className="hd-field">
                <label className="hd-label">Nama Usaha</label>
                <input className="hd-input" name="usaha" value={form.usaha} onChange={(e) => setForm({...form, usaha: e.target.value})} />
              </div>
              <div className="hd-field">
                <label className="hd-label">Pertanyaan</label>
                <textarea className="hd-textarea" name="pertanyaan" value={form.pertanyaan} onChange={(e) => setForm({...form, pertanyaan: e.target.value})} rows={5} required />
              </div>
              <div className="hd-field">
                <label className="hd-label">Lampiran Foto (Opsional)</label>
                <div className="hd-upload-area">
                  <input 
                    type="file" 
                    id="photo-upload"
                    multiple 
                    accept="image/*" 
                    onChange={handleFileChange} 
                    style={{ display: 'none' }} 
                  />
                  <label htmlFor="photo-upload" className="hd-upload-label">
                    <div className="hd-upload-icon-circle">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                    </div>
                    <div className="hd-upload-text">
                      <span className="hd-upload-title">Klik atau seret foto ke sini</span>
                      <span className="hd-upload-sub">Format PNG, JPG (Maks. 5 foto)</span>
                    </div>
                  </label>
                </div>
                
                {photos.length > 0 && (
                  <div className="hd-photo-previews">
                    {photos.map((f, i) => (
                      <div key={i} className="hd-photo-item">
                        <img src={URL.createObjectURL(f)} className="hd-photo-img" alt="preview" />
                        <button type="button" className="hd-photo-remove" onClick={() => removePhoto(i)}>
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                          </svg>
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button type="submit" className="hd-submit-btn" disabled={loading}>{loading ? 'Mengirim...' : 'Kirim Pertanyaan'}</button>
            </form>
          </div>

          <div className="hd-recent-card">
            <div className="hd-card-title">Pertanyaan Terkini</div>
            <div className="hd-ticket-list">
              {recentTickets.length === 0 && <p className="hd-empty" style={{ padding: '20px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>Belum ada pertanyaan.</p>}
              {recentTickets.map(t => (
                <div key={t.id} className="hd-ticket">
                  <div className="hd-ticket-header">
                    <span className="hd-status" style={{color: t.statusColor}}>{t.status}</span>
                    <span className="hd-time">{t.time}</span>
                  </div>
                  <h4 className="hd-ticket-title">{t.nama_lengkap}</h4>
                  <p className="hd-ticket-preview">{t.isi_pertanyaan}</p>
                  {t.foto_urls?.length > 0 && (
                    <div style={{display: 'flex', gap: '5px', marginTop: '10px'}}>
                      {t.foto_urls.map((url: string, i: number) => (
                        <img key={i} src={url} style={{width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px'}} />
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            <a href="#" className="hd-see-all" onClick={(e) => { e.preventDefault(); onAllQuestions?.(); }}>
              Lihat Semua Riwayat
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

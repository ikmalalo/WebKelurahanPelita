import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './AdminDashboard.css';
import './AdminHelpdesk.css';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

interface AdminHelpdeskProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const AdminHelpdesk: React.FC<AdminHelpdeskProps> = ({ onLogout, onNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [answer, setAnswer] = useState('');
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ total: 0, pending: 0, completed: 0 });

  const handleDelete = async (id: string) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus pertanyaan ini?')) return;
    try {
      const { error } = await supabase.from('pertanyaan_helpdesk').delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err: any) {
      alert('Gagal menghapus: ' + err.message);
    }
  };

  const handleToggleVisibility = async (id: string, currentHidden: boolean) => {
    try {
      const { error } = await supabase
        .from('pertanyaan_helpdesk')
        .update({ is_hidden: !currentHidden })
        .eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err: any) {
      alert('Gagal mengubah visibilitas: ' + err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('pertanyaan_helpdesk')
      .select('*')
      .order('created_at', { ascending: false });

    if (!error && data) {
      setTickets(data);
      const pending = data.filter(t => t.status !== 'Selesai').length;
      const completed = data.filter(t => t.status === 'Selesai').length;
      setStats({ total: data.length, pending, completed });
    }
    setLoading(false);
  };

  const handleOpenModal = (ticket: any) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
    setAnswer(ticket.jawaban || '');
  };

  const handleSendAnswer = async () => {
    if (!selectedTicket || !answer) return;
    try {
      const { error } = await supabase
        .from('pertanyaan_helpdesk')
        .update({ jawaban: answer, status: 'Selesai' })
        .eq('id', selectedTicket.id);
      if (error) throw error;
      setIsModalOpen(false);
      fetchData();
    } catch (err: any) {
      alert('Error: ' + err.message);
    }
  };

  return (
    <div className="dashboard-container">
      <AdminSidebar activePage="admin-helpdesk" onNavigate={onNavigate} onLogout={onLogout} />
      <main className="main-content">
        <AdminHeader title="Admin Helpdesk" />
        <div className="content-body" style={{ padding: '30px' }}>
          <div className="helpdesk-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '30px' }}>
             <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
               <div style={{ color: '#64748b' }}>Total</div>
               <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.total}</div>
             </div>
             <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
               <div style={{ color: '#f59e0b' }}>Pending</div>
               <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.pending}</div>
             </div>
             <div style={{ background: '#fff', padding: '20px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
               <div style={{ color: '#10b981' }}>Selesai</div>
               <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{stats.completed}</div>
             </div>
          </div>

          <div style={{ background: '#fff', borderRadius: '12px', overflow: 'hidden', border: '1px solid #e2e8f0' }}>
            {loading ? <p style={{ padding: '20px' }}>Memuat data...</p> : (
              tickets.map((t) => (
                <div key={t.id} style={{ padding: '20px', borderBottom: '1px solid #f1f5f9', display: 'flex', gap: '20px' }}>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                       <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '4px', background: t.status === 'Selesai' ? '#dcfce7' : '#fef3c7', color: t.status === 'Selesai' ? '#15803d' : '#9a3412' }}>{t.status}</span>
                       <span style={{ fontSize: '12px', color: '#94a3b8' }}>{new Date(t.created_at).toLocaleString()}</span>
                    </div>
                    <h3 style={{ fontSize: '16px', fontWeight: '700' }}>{t.nama_lengkap} ({t.nama_usaha || 'Umum'})</h3>
                    <p style={{ color: '#475569', fontSize: '14px', marginTop: '5px' }}>{t.isi_pertanyaan}</p>
                    
                    {t.foto_urls?.length > 0 && (
                      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
                        {t.foto_urls.map((url: string, idx: number) => (
                          <a href={url} target="_blank" rel="noreferrer" key={idx}>
                             <img src={url} style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px', border: '1px solid #e2e8f0' }} alt="Lampiran" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button onClick={() => handleOpenModal(t)} style={{ background: '#2563eb', color: '#fff', padding: '10px 20px', borderRadius: '8px', border: 'none', fontWeight: '600', cursor: 'pointer' }}>
                      {t.status === 'Selesai' ? 'Edit Jawaban' : 'Jawab'}
                    </button>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => handleToggleVisibility(t.id, t.is_hidden)} 
                        title={t.is_hidden ? "Tampilkan di Forum" : "Sembunyikan dari Forum"}
                        style={{ flex: 1, background: t.is_hidden ? '#f1f5f9' : '#fff', color: '#64748b', padding: '8px', borderRadius: '8px', border: '1px solid #e2e8f0', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        {t.is_hidden ? (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                        ) : (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
                        )}
                      </button>
                      <button 
                        onClick={() => handleDelete(t.id)} 
                        title="Hapus Pertanyaan"
                        style={{ flex: 1, background: '#fff', color: '#ef4444', padding: '8px', borderRadius: '8px', border: '1px solid #fecaca', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
                      </button>
                    </div>
                    {t.is_hidden && <span style={{ fontSize: '10px', color: '#94a3b8', textAlign: 'center' }}>Tersembunyi</span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </main>

      {/* Answer Modal */}
      {isModalOpen && selectedTicket && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-container" onClick={e => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-header-left">
                <div className="modal-icon-box">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                  </svg>
                </div>
                <h2 className="modal-title">Jawab Pertanyaan</h2>
              </div>
              <button className="modal-close-btn" onClick={() => setIsModalOpen(false)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            <div className="modal-content">
              <div className="question-context-box">
                <div className="context-label">
                  KONTEKS PERTANYAAN <span className="context-id">ID: #{selectedTicket.id.substring(0, 8)}</span>
                </div>
                <div className="context-from">Dari: <strong>{selectedTicket.nama_lengkap}</strong></div>
                <h3 className="context-title">{selectedTicket.nama_usaha || 'Umum'}</h3>
                <p className="context-message">"{selectedTicket.isi_pertanyaan}"</p>
              </div>

              <div className="answer-section">
                <label className="answer-label">Jawaban Admin</label>
                <div className="textarea-wrapper">
                  <textarea 
                    className="answer-textarea"
                    placeholder="Tuliskan jawaban atau instruksi detail untuk pelaku UMKM..."
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value.substring(0, 1000))}
                  ></textarea>
                  <div className="textarea-footer">
                    <span className="footnote">Jawaban akan dikirim ke WhatsApp dan Dashboard UMKM terkait.</span>
                    <span className="char-counter">Karakter: {answer.length}/1000</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn-modal-cancel" onClick={() => setIsModalOpen(false)}>Batal</button>
              <button className="btn-modal-submit" onClick={handleSendAnswer}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ marginRight: 8 }}>
                  <line x1="22" y1="2" x2="11" y2="13" /><polyline points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
                Kirim Jawaban
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminHelpdesk;

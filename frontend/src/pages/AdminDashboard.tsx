import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './AdminDashboard.css';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

interface AdminDashboardProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const DashboardIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
);

const HelpdeskIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 1 1-7.6-12.7 8.19 8.19 0 0 1 1.8.2" />
    <path d="M16 3h5v5" /><path d="M21 3l-9 9" />
  </svg>
);

const UMKMIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);

const NewsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
    <path d="M18 14h-8" /><path d="M15 18h-5" /><path d="M10 6h8v4h-8z" />
  </svg>
);

export default function AdminDashboard({ onLogout, onNavigate }: AdminDashboardProps) {
  const [totalUMKM, setTotalUMKM] = useState(0);
  const [newUMKMWeek, setNewUMKMWeek] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [questionsWeek, setQuestionsWeek] = useState(0);
  const [categoryCounts, setCategoryCounts] = useState<{ [key: string]: number }>({});
  const [activities, setActivities] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

      // Total UMKM & Categories
      const { data: umkmData, error: umkmError } = await supabase
        .from('usaha_kuliner')
        .select('*');

      if (!umkmError && umkmData) {
        setTotalUMKM(umkmData.length);
        
        // Count Categories
        const counts: { [key: string]: number } = {};
        umkmData.forEach(item => {
          const cat = item.kategori || 'Lainnya';
          counts[cat] = (counts[cat] || 0) + 1;
        });
        setCategoryCounts(counts);

        // Count New UMKM this week
        const newThisWeek = umkmData.filter(item => item.created_at >= sevenDaysAgo).length;
        setNewUMKMWeek(newThisWeek);
      }

      // Total Pertanyaan
      const { count: countTotalQ } = await supabase
        .from('pertanyaan_helpdesk')
        .select('*', { count: 'exact', head: true });
      setTotalQuestions(countTotalQ || 0);

      // Pertanyaan Minggu Ini
      const { count: countNewQ } = await supabase
        .from('pertanyaan_helpdesk')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', sevenDaysAgo);
      setQuestionsWeek(countNewQ || 0);

      // Latest Activities Combine
      const { data: latestUMKM } = await supabase
        .from('usaha_kuliner')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      const { data: latestQuestions } = await supabase
        .from('pertanyaan_helpdesk')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(10);

      const combined = [
        ...(latestUMKM || []).map(u => ({
          id: u.id,
          type: 'umkm',
          title: 'UMKM Baru Terdaftar',
          by: u.nama,
          time: new Date(u.created_at),
          status: 'berhasil',
          desc: `Kategori: ${u.kategori || 'Tidak ada'}`
        })),
        ...(latestQuestions || []).map(q => ({
          id: q.id,
          type: 'helpdesk',
          title: 'Pertanyaan Helpdesk Baru',
          by: q.nama_lengkap,
          time: new Date(q.created_at),
          status: q.status === 'Selesai' ? 'berhasil' : 'menunggu',
          desc: q.isi_pertanyaan.substring(0, 70) + (q.isi_pertanyaan.length > 70 ? '...' : '')
        }))
      ].sort((a, b) => b.time.getTime() - a.time.getTime()).slice(0, 15);

      setActivities(combined);

    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    { label: "Total UMKM Terdaftar", value: loading ? "..." : totalUMKM.toLocaleString(), trend: null, color: "#2563EB", icon: <UMKMIcon /> },
    { label: "UMKM Baru Minggu Ini", value: loading ? "..." : newUMKMWeek.toLocaleString(), trend: null, color: "#8B5CF6", icon: <NewsIcon /> },
    { label: "Total Pertanyaan Helpdesk", value: loading ? "..." : totalQuestions.toLocaleString(), trend: null, color: "#F97316", icon: <HelpdeskIcon /> },
    { label: "Pertanyaan Minggu Ini", value: loading ? "..." : questionsWeek.toLocaleString(), trend: null, color: "#EC4899", icon: <DashboardIcon /> }
  ];



  return (
    <div className="dashboard-container">
      <AdminSidebar activePage="admin-dashboard" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="main-content">
        <AdminHeader title="Dashboard Overview" />

        <div className="content-body">

          <div className="stats-grid">
            {stats.map((s, i) => (
              <div key={i} className="stat-card">
                <div className="stat-header">
                  <div className="stat-icon-box" style={{ background: `${s.color}15`, color: s.color }}>
                    {s.icon}
                  </div>
                  {s.trend && (
                    <div className="trend-badge trend-up">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" /><polyline points="17 6 23 6 23 12" />
                      </svg>
                      {s.trend}
                    </div>
                  )}
                </div>
                <div className="stat-label">{s.label}</div>
                <div className="stat-value">{s.value}</div>
              </div>
            ))}
          </div>

          <div className="data-grid">
            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <DashboardIcon />
                  Kategori UMKM
                </div>
              </div>
              <div className="donut-chart-container">
                <div className="donut-chart-mock">
                  <div className="donut-center-text">
                    <span className="donut-percentage">
                      {totalUMKM > 0 ? Math.round(((categoryCounts['Makanan Berat'] || 0) / totalUMKM) * 100) : 0}%
                    </span>
                    <span className="donut-label">Makanan</span>
                  </div>
                </div>
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-left">
                      <div className="legend-dot" style={{ background: '#2563EB' }}></div>
                      <span className="legend-name">Makanan Berat</span>
                    </div>
                    <span className="legend-value">{categoryCounts['Makanan Berat'] || 0}</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-left">
                      <div className="legend-dot" style={{ background: '#F97316' }}></div>
                      <span className="legend-name">Jajanan</span>
                    </div>
                    <span className="legend-value">{categoryCounts['Jajanan'] || 0}</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-left">
                      <div className="legend-dot" style={{ background: '#8B5CF6' }}></div>
                      <span className="legend-name">Desert</span>
                    </div>
                    <span className="legend-value">{categoryCounts['Desert'] || 0}</span>
                  </div>
                  <div className="legend-item">
                    <div className="legend-left">
                      <div className="legend-dot" style={{ background: '#EC4899' }}></div>
                      <span className="legend-name">Katering</span>
                    </div>
                    <span className="legend-value">{categoryCounts['Katering'] || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="card-header">
                <div className="card-title">
                  <HelpdeskIcon />
                  Aktivitas Terbaru
                </div>
                <a href="#" className="card-link" onClick={() => onNavigate('admin-helpdesk')}>Lihat Semua</a>
              </div>
              <div className="activity-list">
                {activities.length > 0 ? activities.map((a, i) => (
                  <div key={i} className="activity-item">
                    <div className="activity-icon">
                      {a.type === 'helpdesk' ? <HelpdeskIcon /> : <UMKMIcon />}
                    </div>
                    <div className="activity-info">
                      <div className="activity-top">
                        <span className="activity-title">{a.title}</span>
                        <span className={`status-badge status-${a.status}`}>{a.status}</span>
                      </div>
                      <div className="activity-meta">Oleh: {a.by} • {a.time.toLocaleDateString()} {a.time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</div>
                      <div className="activity-desc">{a.desc}</div>
                    </div>
                  </div>
                )) : (
                  <p style={{ padding: '20px', color: '#94a3b8', textAlign: 'center' }}>Belum ada aktivitas.</p>
                )}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

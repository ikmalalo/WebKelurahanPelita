import './Programs.css'

const programs = [
  {
    id: 'ai-branding',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/>
      </svg>
    ),
    iconColor: '#3b82f6',
    iconBg: '#eff6ff',
    title: 'Meningkatkan Branding UMKM dengan AI',
    desc: 'Pelatihan menggunakan kecerdasan buatan untuk membangun identitas merek yang kuat dan profesional bagi usaha Anda.',
    link: 'PELAJARI LEBIH LANJUT',
    linkColor: 'var(--primary)',
  },
  {
    id: 'canva-ai',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    ),
    iconColor: '#8b5cf6',
    iconBg: '#f5f3ff',
    title: 'Pembuatan Konten Promosi dengan Canva AI',
    desc: 'Workshop praktis merancang visual pemasaran yang menarik and efektif dengan fitur AI terbaru dari Canva.',
    link: 'IKUTI WORKSHOP',
    linkColor: '#8b5cf6',
  },
  {
    id: 'qris',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" rx="1"/>
        <rect x="14" y="3" width="7" height="7" rx="1"/>
        <rect x="3" y="14" width="7" height="7" rx="1"/>
        <rect x="14" y="14" width="3" height="3"/>
        <rect x="18" y="18" width="3" height="3"/>
        <rect x="14" y="18" width="3" height="3"/>
        <rect x="18" y="14" width="3" height="3"/>
      </svg>
    ),
    iconColor: '#f97316',
    iconBg: '#fff7ed',
    title: 'Pelatihan QRIS',
    desc: 'Implementasi standar pembayaran digital nasional untuk transaksi yang lebih praktis, cepat, dan tercatat otomatis.',
    link: 'IKUTI PELATIHAN',
    linkColor: 'var(--accent)',
  },
  {
    id: 'gmaps',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0118 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
    iconColor: '#ef4444',
    iconBg: '#fef2f2',
    title: 'Google Maps UMKM',
    desc: 'Pendaftaran titik lokasi usaha secara presisi untuk meningkatkan visibilitas dan memudahkan pelanggan menemukan toko Anda.',
    link: 'DAFTARKAN LOKASI',
    linkColor: '#ef4444',
  },
]

interface ProgramsProps {
  onProgramClick?: (id: string) => void
}

export function Programs({ onProgramClick }: ProgramsProps) {
  return (
    <section className="programs" id="program">
      <div className="container">
        <div className="programs-header">
          <h2 className="section-title">Program Unggulan Digital</h2>
          <p className="section-subtitle">
            Inisiatif strategis kami untuk membantu UMKM bersaing di era ekonomi digital
            melalui pendampingan intensif.
          </p>
        </div>

        <div className="programs-grid">
          {programs.map((program) => (
            <div key={program.id} className="program-card">
              <div className="program-icon" style={{ background: program.iconBg, color: program.iconColor }}>
                {program.icon}
              </div>
              <h3 className="program-title">{program.title}</h3>
              <p className="program-desc">{program.desc}</p>
              <a
                href={`#${program.id}`}
                className="program-link"
                style={{ color: program.linkColor }}
                onClick={(e) => {
                  if (onProgramClick) {
                    e.preventDefault();
                    onProgramClick(program.id);
                  }
                }}
              >
                {program.link} →
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

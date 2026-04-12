import React from 'react';

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



const LogoutIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

interface AdminSidebarProps {
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
}

const AdminSidebar: React.FC<AdminSidebarProps> = ({ activePage, onNavigate, onLogout }) => {
  return (
    <aside className="sidebar">
      <div className="brand" onClick={() => onNavigate('admin-dashboard')} style={{ cursor: 'pointer' }}>
        <div className="brand-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" /><path d="M9 22V12h6v10" />
          </svg>
        </div>
        <div className="brand-text">
          <span className="brand-name">Kelurahan Pelita</span>
          <span className="brand-portal">Admin Portal</span>
        </div>
      </div>

      <nav className="nav-menu">
        <div 
          className={`nav-item ${activePage === 'admin-dashboard' ? 'active' : ''}`}
          onClick={() => onNavigate('admin-dashboard')}
        >
          <DashboardIcon />
          <span>Dashboard</span>
        </div>
        <div 
          className={`nav-item ${activePage === 'admin-helpdesk' ? 'active' : ''}`}
          onClick={() => onNavigate('admin-helpdesk')}
        >
          <HelpdeskIcon />
          <span>Helpdesk</span>
        </div>
        <div 
          className={`nav-item ${activePage === 'admin-direktori' ? 'active' : ''}`}
          onClick={() => onNavigate('admin-direktori')}
        >
          <UMKMIcon />
          <span>Direktori UMKM</span>
        </div>

      </nav>

      <button className="btn-logout-sidebar" onClick={onLogout}>
        <LogoutIcon />
        Keluar
      </button>
    </aside>
  );
};

export default AdminSidebar;

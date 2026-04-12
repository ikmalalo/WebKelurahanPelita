import React from 'react';

const SearchIcon = () => (
  <svg className="search-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const BellIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

interface AdminHeaderProps {
  title: string;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({ title }) => {
  return (
    <header className="dashboard-header">
      <div className="header-title">{title}</div>
      <div className="header-actions">
        <div className="search-wrapper">
          <SearchIcon />
          <input type="text" placeholder="Search data..." className="search-input" />
        </div>
        <div className="notification-bell">
          <BellIcon />
          <div className="notification-dot"></div>
        </div>
        <div className="user-profile">
          <div className="user-info">
            <span className="user-name">Admin Pelita</span>
            <span className="user-role">Administrator</span>
          </div>
          <div className="user-avatar-icon">
            <UserIcon />
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;

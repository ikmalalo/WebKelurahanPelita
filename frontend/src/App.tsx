import './App.css'
import './index.css'
import { useState, useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Programs } from './components/Programs'
import { CtaBanner } from './components/CtaBanner'
import { Location } from './components/Location'
import { Footer } from './components/Footer'
import { HelpdeskPage } from './pages/HelpdeskPage'
import { SemuaPertanyaan } from './pages/SemuaPertanyaan'
import { DirektoriPage } from './pages/DirektoriPage'
import { MateriPage } from './pages/MateriPage'
import { MateriDetailPage } from './pages/MateriDetailPage'
import LoginPage from './pages/LoginPage'
import AdminDashboard from './pages/AdminDashboard'
import AdminHelpdesk from './pages/AdminHelpdesk'
import AdminDirektori from './pages/AdminDirektori'

type Page = 'home' | 'helpdesk' | 'semua-pertanyaan' | 'login' | 'direktori' | 'materi' | 'materi-detail' | 'admin-dashboard' | 'admin-helpdesk' | 'admin-direktori'

function App() {
  const [page, setPage] = useState<Page>('home')
  const [activeLink, setActiveLink] = useState('beranda')
  const [materiOrigin, setMateriOrigin] = useState<'home' | 'materi'>('home')

  // Reset scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  // Helper to handle navigation from navbar
  const handleHomeClick = () => {
    setPage('home');
  };

  const handleHelpdeskClick = () => {
    setPage('helpdesk');
  };

  const handleDirektoriClick = () => {
    setPage('direktori');
  };

  const handleMateriClick = () => {
    setPage('materi');
  };

  const handleMateriDetailClick = (origin: 'home' | 'materi' = 'home') => {
    setMateriOrigin(origin);
    setPage('materi-detail');
  };

  if (page === 'login') {
    return <LoginPage 
      onBack={() => setPage('home')} 
      onLoginSuccess={() => setPage('admin-dashboard')}
    />
  }

  if (page === 'admin-dashboard') {
    return <AdminDashboard 
      onLogout={() => setPage('home')} 
      onNavigate={(p: string) => setPage(p as Page)}
    />
  }

  if (page === 'admin-helpdesk') {
    return <AdminHelpdesk 
      onLogout={() => setPage('home')} 
      onNavigate={(p: string) => setPage(p as Page)}
    />
  }

  if (page === 'admin-direktori') {
    return <AdminDirektori 
      onLogout={() => setPage('home')} 
      onNavigate={(p: string) => setPage(p as Page)}
    />
  }

  return (
    <>
      {page !== 'semua-pertanyaan' && page !== 'materi-detail' && (
        <Navbar 
          onHomeClick={handleHomeClick} 
          onHelpdeskClick={handleHelpdeskClick} 
          onDirektoriClick={handleDirektoriClick}
          onMateriClick={handleMateriClick}
          onLoginClick={() => setPage('login')}
          activePage={page}
          activeLink={activeLink}
          onLinkClick={setActiveLink}
        />
      )}
      <main className={(page === 'semua-pertanyaan' || page === 'materi-detail') ? 'no-padding' : 'has-navbar'}>
        {page === 'home' && (
          <>
            <Hero />
            <Programs onProgramClick={(id) => {
              if (id === 'qris') handleMateriDetailClick('home');
              else handleMateriClick();
            }} />
            <CtaBanner />
            <Location />
          </>
        )}
        
        {page === 'helpdesk' && (
          <HelpdeskPage 
            onAllQuestions={() => setPage('semua-pertanyaan')} 
          />
        )}

        {page === 'direktori' && (
          <DirektoriPage />
        )}

        {page === 'materi' && (
          <MateriPage onMaterialClick={(id) => {
            if (id === 3) handleMateriDetailClick('materi'); // id 3 is QRIS in MateriPage
          }} />
        )}

        {page === 'materi-detail' && (
          <MateriDetailPage 
            onBack={() => setPage(materiOrigin)} 
            from={materiOrigin}
          />
        )}

        {page === 'semua-pertanyaan' && (
          <SemuaPertanyaan onBack={() => setPage('helpdesk')} />
        )}
      </main>
      {page !== 'semua-pertanyaan' && page !== 'materi-detail' && <Footer />}
    </>
  )
}

export default App


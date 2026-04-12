import './App.css'
import './index.css'
import { useEffect } from 'react'
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom'
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

// Layout component for public pages
function PublicLayout({ children, activePage }: { children: React.ReactNode, activePage: string }) {
  const navigate = useNavigate();
  return (
    <>
      <Navbar 
        onHomeClick={() => navigate('/')} 
        onHelpdeskClick={() => navigate('/helpdesk')} 
        onDirektoriClick={() => navigate('/direktori')}
        onMateriClick={() => navigate('/materi')}
        onLoginClick={() => navigate('/login')}
        activePage={activePage}
      />
      <main className="has-navbar">
        {children}
      </main>
      <Footer />
    </>
  )
}

function App() {
  const location = useLocation();
  const navigate = useNavigate();

  // Reset scroll on path change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={
        <PublicLayout activePage="home">
          <Hero 
            onDirektoriClick={() => navigate('/direktori')}
            onProgramClick={() => {
              const element = document.getElementById('program');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }}
          />
          <Programs onProgramClick={(id) => {
            if (id === 'qris') navigate('/materi-detail', { state: { from: 'home' } });
            else navigate('/materi');
          }} />
          <CtaBanner />
          <Location />
        </PublicLayout>
      } />

      <Route path="/helpdesk" element={
        <PublicLayout activePage="helpdesk">
          <HelpdeskPage onAllQuestions={() => navigate('/semua-pertanyaan')} />
        </PublicLayout>
      } />

      <Route path="/direktori" element={
        <PublicLayout activePage="direktori">
          <DirektoriPage />
        </PublicLayout>
      } />

      <Route path="/materi" element={
        <PublicLayout activePage="materi">
          <MateriPage onMaterialClick={(id) => {
            if (id === 3) navigate('/materi-detail', { state: { from: 'materi' } });
          }} />
        </PublicLayout>
      } />

      <Route path="/materi-detail" element={
        <MateriDetailPage 
          onBack={() => {
            const from = location.state?.from || 'home';
            navigate(from === 'materi' ? '/materi' : '/');
          }} 
          from={location.state?.from || 'home'}
        />
      } />

      <Route path="/semua-pertanyaan" element={
        <SemuaPertanyaan onBack={() => navigate('/helpdesk')} />
      } />

      <Route path="/login" element={
        <LoginPage 
          onBack={() => navigate('/')} 
          onLoginSuccess={() => navigate('/admin-dashboard')}
        />
      } />

      {/* Admin Routes */}
      <Route path="/admin-dashboard" element={
        <AdminDashboard 
          onLogout={() => navigate('/')} 
          onNavigate={(p) => navigate(`/${p}`)}
        />
      } />

      <Route path="/admin-helpdesk" element={
        <AdminHelpdesk 
          onLogout={() => navigate('/')} 
          onNavigate={(p) => navigate(`/${p}`)}
        />
      } />

      <Route path="/admin-direktori" element={
        <AdminDirektori 
          onLogout={() => navigate('/')} 
          onNavigate={(p) => navigate(`/${p}`)}
        />
      } />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App


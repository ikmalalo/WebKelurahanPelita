import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './AdminDashboard.css';
import './AdminDirektori.css';
import AdminSidebar from '../components/admin/AdminSidebar';
import AdminHeader from '../components/admin/AdminHeader';

interface AdminDirektoriProps {
  onLogout: () => void;
  onNavigate: (page: string) => void;
}

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const FilterIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const DownloadIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" /><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /><line x1="10" y1="11" x2="10" y2="17" /><line x1="14" y1="11" x2="14" y2="17" />
  </svg>
);

const AdminDirektori: React.FC<AdminDirektoriProps> = ({ onLogout, onNavigate }) => {
  const [umkmData, setUmkmData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    total: 0,
    lauk: 0,
    jajanan: 0,
    halal: '0%'
  });

  // Modal and Form States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    nama: '',
    kategori: 'Makanan Berat',
    lokasi: '',
    kontak: '',
    deskripsi: '',
    status: 'buka'
  });
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [galleryFiles, setGalleryFiles] = useState<(File | null)[]>([null, null, null, null, null]);
  const [galleryPreviews, setGalleryPreviews] = useState<(string | null)[]>([null, null, null, null, null]);

  useEffect(() => {
    fetchUmkm();
  }, []);

  const fetchUmkm = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('usaha_kuliner')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        setUmkmData(data);
        calculateStats(data);
      }
    } catch (error) {
      console.error('Error fetching UMKM:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files?.[0];
    if (file) {
      const newFiles = [...galleryFiles];
      newFiles[index] = file;
      setGalleryFiles(newFiles);

      const reader = new FileReader();
      reader.onloadend = () => {
        const newPreviews = [...galleryPreviews];
        newPreviews[index] = reader.result as string;
        setGalleryPreviews(newPreviews);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeGalleryPhoto = (index: number) => {
    const newFiles = [...galleryFiles];
    newFiles[index] = null;
    setGalleryFiles(newFiles);

    const newPreviews = [...galleryPreviews];
    newPreviews[index] = null;
    setGalleryPreviews(newPreviews);
  };

  const resetForm = () => {
    setFormData({
      nama: '',
      kategori: 'Makanan Berat',
      lokasi: '',
      kontak: '',
      deskripsi: '',
      status: 'buka'
    });
    setPhotoFile(null);
    setImagePreview(null);
    setGalleryFiles([null, null, null, null, null]);
    setGalleryPreviews([null, null, null, null, null]);
  };

  const handleSaveBusiness = async () => {
    if (!formData.nama || !formData.lokasi || !formData.kontak) {
      alert('Mohon isi semua field yang wajib.');
      return;
    }

    try {
      setIsSaving(true);
      let photoUrl = '';
      let galleryUrls: string[] = [];

      // 1. Upload Hauptfoto (Thumbnail)
      if (photoFile) {
        const fileExt = photoFile.name.split('.').pop();
        const fileName = `thumb_${Date.now()}.${fileExt}`;
        const filePath = `umkm/${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('umkm-photos')
          .upload(filePath, photoFile);

        if (uploadError) throw uploadError;

        const { data: { publicUrl } } = supabase.storage
          .from('umkm-photos')
          .getPublicUrl(filePath);
        
        photoUrl = publicUrl;
      }

      // 2. Upload Gallery Photos
      const validGalleryFiles = galleryFiles.filter((f): f is File => f !== null);
      if (validGalleryFiles.length > 0) {
        const uploadPromises = validGalleryFiles.map(async (file, idx) => {
          const fileExt = file.name.split('.').pop();
          const fileName = `gallery_${Date.now()}_${idx}.${fileExt}`;
          const filePath = `umkm/gallery/${fileName}`;

          const { error: uploadError } = await supabase.storage
            .from('umkm-photos')
            .upload(filePath, file);

          if (uploadError) throw uploadError;

          const { data: { publicUrl } } = supabase.storage
            .from('umkm-photos')
            .getPublicUrl(filePath);
          
          return publicUrl;
        });

        galleryUrls = await Promise.all(uploadPromises);
      }

      // 3. Insert to database
      const { error: insertError } = await supabase
        .from('usaha_kuliner')
        .insert([{
          nama: formData.nama,
          kategori: formData.kategori,
          lokasi: formData.lokasi,
          kontak: formData.kontak,
          deskripsi: formData.deskripsi,
          status: formData.status,
          foto: photoUrl,
          gallery: galleryUrls
        }]);

      if (insertError) throw insertError;

      alert('Berhasil menambahkan UMKM baru!');
      setIsAddModalOpen(false);
      resetForm();
      fetchUmkm();
    } catch (error: any) {
      console.error('Error saving business:', error);
      alert('Gagal menyimpan data: ' + error.message);
    } finally {
      setIsSaving(false);
    }
  };


  const calculateStats = (data: any[]) => {
    const lauk = data.filter(item => item.kategori === 'Makanan Berat' || item.kategori === 'Kuliner Utama').length;
    const jajanan = data.filter(item => item.kategori === 'Jajanan' || item.kategori === 'Makanan Ringan').length;
    setStats({
      total: data.length,
      lauk: lauk,
      jajanan: jajanan,
      halal: '84%' // Tetap statis sementara
    });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('Apakah Anda yakin ingin menghapus data ini?')) return;

    try {
      const { error } = await supabase
        .from('usaha_kuliner')
        .delete()
        .eq('id', id);

      if (error) throw error;

      setUmkmData(umkmData.filter(item => item.id !== id));
      alert('Data berhasil dihapus');
    } catch (error) {
      console.error('Error deleting:', error);
      alert('Gagal menghapus data');
    }
  };

  return (
    <div className="dashboard-container">
      <AdminSidebar activePage="admin-direktori" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="main-content">
        <AdminHeader title="Manajemen Direktori UMKM" />

        <div className="content-body">
          <div className="direktori-page-header">
            <div className="header-text">
              <h1 className="direktori-title">Direktori UMKM Makanan</h1>
              <p className="direktori-subtitle">Kelola dan pantau data pelaku usaha kuliner di wilayah Kelurahan Pelita.</p>
            </div>
            <button className="btn-add-umkm" onClick={() => setIsAddModalOpen(true)}>
              <PlusIcon /> Tambah Kuliner Baru
            </button>
          </div>

          <div className="direktori-stats-grid">
            <div className="dir-stat-card">
              <div className="dir-stat-label">Total UMKM Makanan</div>
              <div className="dir-stat-value">{stats.total}</div>
            </div>
            <div className="dir-stat-card">
              <div className="dir-stat-label">Kategori Lauk Pauk</div>
              <div className="dir-stat-value" style={{ color: '#F97316' }}>{stats.lauk}</div>
            </div>
            <div className="dir-stat-card">
              <div className="dir-stat-label">Kategori Jajanan</div>
              <div className="dir-stat-value" style={{ color: '#2563EB' }}>{stats.jajanan}</div>
            </div>
            <div className="dir-stat-card">
              <div className="dir-stat-label">Sertifikasi Halal</div>
              <div className="dir-stat-value" style={{ color: '#10B981' }}>{stats.halal}</div>
            </div>
          </div>

          {/* Modal Tambah UMKM */}
          {isAddModalOpen && (
            <div className="modal-overlay">
              <div className="modal-container">
                <div className="modal-header">
                  <div className="modal-title-group">
                    <h2>Add New Culinary UMKM</h2>
                    <p>Register a new food & beverage business to the platform.</p>
                  </div>
                  <button className="btn-close-modal" onClick={() => setIsAddModalOpen(false)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </button>
                </div>

                <div className="modal-content">
                  <div className="modal-form">
                    <div className="modal-form-grid">
                      {/* Left Column: Form Fields */}
                      <div className="form-left-column">
                    <div className="form-group">
                      <label className="form-label">Business Name</label>
                      <div className="input-wrapper">
                        <div className="input-icon">
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18"/><path d="M3 7v1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7m0 1a3 3 0 0 0 6 0V7H3"/><path d="M19 21V11"/><path d="M5 21V11"/><path d="M9 21V11"/><path d="M15 21V11"/></svg>
                        </div>
                        <input 
                          type="text" 
                          className="form-input" 
                          placeholder="e.g., Warung Sate Makmur" 
                          value={formData.nama}
                          onChange={e => setFormData({...formData, nama: e.target.value})}
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Category</label>
                        <div className="input-wrapper">
                          <div className="input-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 15V10c0-2.21-1.79-4-4-4S10 7.79 10 10v5"/><path d="M14 15H6a2 2 0 0 1-2-2V9"/><path d="M2 3h16a2 2 0 0 1 2 2v1"/><path d="M6 15v4a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-4"/></svg>
                          </div>
                          <select 
                            className="form-select"
                            value={formData.kategori}
                            onChange={e => setFormData({...formData, kategori: e.target.value})}
                          >
                            <option value="Makanan Berat">Makanan Berat</option>
                            <option value="Jajanan">Jajanan</option>
                            <option value="Katering">Katering</option>
                            <option value="Desert">Desert</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">Status</label>
                        <div className="input-wrapper">
                          <div className="input-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                          </div>
                          <select 
                            className="form-select"
                            value={formData.status}
                            onChange={e => setFormData({...formData, status: e.target.value})}
                          >
                            <option value="buka">Buka (Open)</option>
                            <option value="tutup">Tutup (Closed)</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Phone Number</label>
                        <div className="input-wrapper">
                          <div className="input-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                          </div>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="0812XXXXXX"
                            value={formData.kontak}
                            onChange={e => setFormData({...formData, kontak: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="form-group">
                        <label className="form-label">RW / Neighborhood</label>
                        <div className="input-wrapper">
                          <div className="input-icon">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
                          </div>
                          <input 
                            type="text" 
                            className="form-input" 
                            placeholder="e.g., RW 05"
                            value={formData.lokasi}
                            onChange={e => setFormData({...formData, lokasi: e.target.value})}
                          />
                        </div>
                      </div>
                    </div>

                        <div className="form-group">
                          <label className="form-label">Business Description</label>
                          <textarea 
                            className="form-textarea" 
                            placeholder="Describe products..."
                            style={{ paddingLeft: '14px', minHeight: '50px' }}
                            value={formData.deskripsi}
                            onChange={e => setFormData({...formData, deskripsi: e.target.value})}
                          />
                        </div>
                      </div>

                      {/* Right Column: Photo Uploads */}
                      <div className="form-right-column">

                    <div className="photo-sections">
                          <div className="thumbnail-section">
                            <span className="section-label">Main Thumbnail</span>
                            {imagePreview ? (
                              <div className="image-preview-container" style={{ height: '100px' }}>
                                <img src={imagePreview} alt="Preview" className="image-preview" />
                                <button className="btn-remove-preview" onClick={() => { setPhotoFile(null); setImagePreview(null); }}>
                                   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                </button>
                              </div>
                            ) : (
                              <label className="upload-zone" style={{ padding: '12px', height: '100px' }}>
                                <input type="file" hidden accept="image/*" onChange={handlePhotoChange} />
                                <div className="upload-icon-box" style={{ width: '32px', height: '32px', marginBottom: '4px' }}>
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h7"/><polyline points="16 5 21 5 21 10"/><line x1="12" y1="12" x2="21" y2="3"/></svg>
                                </div>
                                <span className="upload-text-main" style={{ fontSize: '11px' }}>Logo / Thumbnail</span>
                              </label>
                            )}
                          </div>

                      <div className="gallery-section">
                        <span className="section-label">Detail Photos (Max 5)</span>
                        <div className="gallery-grid">
                          {galleryPreviews.map((preview, idx) => (
                                <div key={idx} className={`gallery-slot ${preview ? 'has-image' : ''}`} style={{ height: '54px' }}>
                                  {preview ? (
                                    <>
                                      <img src={preview} alt={`Gallery ${idx}`} className="gallery-preview-img" />
                                      <button className="btn-remove-gallery" onClick={() => removeGalleryPhoto(idx)}>
                                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                                      </button>
                                    </>
                                  ) : (
                                    <label style={{ cursor: 'pointer', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                      <input type="file" hidden accept="image/*" onChange={(e) => handleGalleryChange(e, idx)} />
                                      <div className="upload-plus-icon">
                                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                                      </div>
                                    </label>
                                  )}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="modal-footer">
                  <button className="btn-cancel" onClick={() => setIsAddModalOpen(false)}>Cancel</button>
                  <button className="btn-save" onClick={handleSaveBusiness} disabled={isSaving}>
                    {isSaving ? 'Saving...' : (
                      <>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
                        Save Business
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="umkm-table-container">
            <div className="table-header">
              <h2 className="table-title">BUSINESS DIRECTORY - KULINER</h2>
              <div className="table-actions">
                <button className="btn-icon-table" title="Filter"><FilterIcon /></button>
                <button className="btn-icon-table" title="Download"><DownloadIcon /></button>
              </div>
            </div>

            <table className="umkm-table">
              <thead>
                <tr>
                  <th>FOTO</th>
                  <th>NAMA USAHA</th>
                  <th>KATEGORI</th>
                  <th>LOKASI</th>
                  <th>KONTAK</th>
                  <th style={{ textAlign: 'center' }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>Memuat data...</td></tr>
                ) : umkmData.length > 0 ? (
                  umkmData.map((item) => (
                    <tr key={item.id}>
                      <td>
                        <div className="umkm-foto-wrap">
                          <img src={item.foto || 'https://via.placeholder.com/100'} alt={item.nama} />
                        </div>
                      </td>
                      <td>
                         <div className="umkm-nama-cell">
                            <div className="umkm-icon-box">
                               <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9z" /></svg>
                            </div>
                            <strong>{item.nama}</strong>
                         </div>
                      </td>
                      <td>
                        <span className={`cat-badge badge-${item.kategori.toLowerCase().replace(' ', '-')}`}>
                          {item.kategori}
                        </span>
                      </td>
                      <td>{item.lokasi}</td>
                      <td>{item.kontak}</td>
                      <td>
                        <div className="umkm-actions">
                          <button className="btn-table-action" title="Edit"><EditIcon /></button>
                          <button 
                            className="btn-table-action" 
                            title="Delete"
                            onClick={() => handleDelete(item.id)}
                          >
                            <DeleteIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan={6} style={{ textAlign: 'center', padding: '2rem' }}>Belum ada data UMKM.</td></tr>
                )}
              </tbody>
            </table>

            <div className="table-footer">
              <div className="footer-info">
                Menampilkan {umkmData.length} UMKM Makanan
              </div>
              <div className="table-pagination">
                 <button className="pagination-btn">Sebelumnya</button>
                 <button className="pagination-num active">1</button>
                 <button className="pagination-num">2</button>
                 <button className="pagination-num">3</button>
                 <button className="pagination-btn">Selanjutnya</button>
              </div>
            </div>
          </div>
        </div>
        <footer className="admin-footer-minimal">
          © 2024 Kelurahan Pelita. Food Management System v2.1.0
        </footer>
      </main>
    </div>
  );
};

export default AdminDirektori;

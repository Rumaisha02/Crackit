import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { StatCard } from '../components/ui/StatCard';
import { StatusBadge } from '../components/ui/StatusBadge';
import { AddInternshipModal } from '../components/ui/AddInternshipModal';
import { Icon } from '../components/ui/Icon';

export const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [internships, setInternships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [viewMode, setViewMode] = useState('list'); // 'list' | 'kanban'
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const fetchInternships = async () => {
    try {
      setLoading(true);
      const res = await api.get('/internships');
      setInternships(res.data);
    } catch (error) {
      console.error('Failed to fetch internships', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInternships();
  }, []);

  // Client-side search and status filtering by company and role
  const filteredInternships = internships.filter((item) => {
    const matchesSearch =
      search.trim() === '' ||
      item.company.toLowerCase().includes(search.toLowerCase()) ||
      item.role.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      statusFilter === 'all' ||
      item.status.toLowerCase() === statusFilter.toLowerCase() ||
      (statusFilter === 'offer' && item.status === 'selected');

    return matchesSearch && matchesStatus;
  });

  // Statistics calculation
  const totalCount = internships.length;
  const wishlistCount = internships.filter((i) => i.status === 'wishlist').length;
  const screeningCount = internships.filter((i) => i.status === 'screening').length;
  const interviewCount = internships.filter((i) => i.status === 'interview').length;
  const offerCount = internships.filter((i) => i.status === 'offer' || i.status === 'selected').length;

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingItem) {
        await api.patch(`/internships/${editingItem._id}`, formData);
      } else {
        await api.post('/internships', formData);
      }
      setIsModalOpen(false);
      setEditingItem(null);
      fetchInternships();
    } catch (error) {
      alert(error.response?.data?.error || 'Failed to save internship');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      await api.patch(`/internships/${id}/status`, { status: newStatus });
      setInternships((prev) =>
        prev.map((item) => (item._id === id ? { ...item, status: newStatus } : item))
      );
    } catch (error) {
      alert('Failed to update status');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this application?')) return;
    try {
      await api.delete(`/internships/${id}`);
      setInternships((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      alert('Failed to delete internship');
    }
  };

  const openAddModal = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const statusOptions = ['all', 'wishlist', 'applied', 'screening', 'interview', 'offer', 'selected', 'rejected'];

  return (
    <div>
      {/* Welcome Banner */}
      <div
        className="nb-card"
        style={{
          backgroundColor: 'var(--primary-yellow)',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <h1 style={{ margin: '0 0 0.35rem 0', fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* 🚀 → Rocket */}
            <Icon name="Rocket" context="card" />
            Welcome back, {user?.name || 'Developer'}!
          </h1>
          <p style={{ margin: 0, fontWeight: 600, fontSize: '0.95rem' }}>
            Track your career applications, study resources, and interview prep in real-time.
          </p>
        </div>
        <button onClick={openAddModal} className="nb-btn nb-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* ⚡ → Zap */}
          <Icon name="Zap" context="button" />
          + Add Internship
        </button>
      </div>

      {/* Stat Cards — icon prop now uses Lucide icon name strings */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        {/* 💼 → Briefcase */}
        <StatCard title="Total Applications" count={totalCount} bg="var(--surface-white)" icon="Briefcase" />
        {/* ⭐ → Star */}
        <StatCard title="Wishlist" count={wishlistCount} bg="var(--accent-blue)" icon="Star" />
        {/* 💡 → Lightbulb */}
        <StatCard title="Screening" count={screeningCount} bg="var(--accent-purple)" icon="Lightbulb" />
        {/* 📝 → ClipboardList */}
        <StatCard title="Interviews" count={interviewCount} bg="var(--primary-yellow)" icon="ClipboardList" />
        {/* 🏆 → Trophy */}
        <StatCard title="Offers / Selected" count={offerCount} bg="var(--accent-green)" icon="Trophy" />
      </div>

      {/* Control Bar: Search, Status Filter Tabs & View Switcher */}
      <div
        className="nb-card"
        style={{
          marginBottom: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          {/* Search Bar */}
          <div style={{ flex: '1 1 250px', position: 'relative', display: 'flex', alignItems: 'center' }}>
            {/* 🔍 → Search */}
            <span style={{ position: 'absolute', left: '0.75rem', display: 'flex', alignItems: 'center', pointerEvents: 'none' }}>
              <Icon name="Search" context="status" style={{ opacity: 0.5 }} />
            </span>
            <input
              type="text"
              placeholder="Search company or role..."
              className="nb-input"
              style={{ paddingLeft: '2.25rem' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* View Switcher */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <button
              onClick={() => setViewMode('list')}
              className={`nb-btn ${viewMode === 'list' ? 'nb-btn-primary' : 'nb-btn-white'}`}
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              {/* 📋 → List */}
              <Icon name="List" context="status" />
              List View
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`nb-btn ${viewMode === 'kanban' ? 'nb-btn-primary' : 'nb-btn-white'}`}
              style={{ padding: '0.5rem 0.85rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
            >
              {/* 📌 → Columns */}
              <Icon name="Columns" context="status" />
              Kanban View
            </button>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {statusOptions.map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`nb-tab ${statusFilter === st ? 'nb-tab-active' : ''}`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area */}
      {loading ? (
        <div className="nb-card" style={{ textAlign: 'center', padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          {/* ⚡ → Zap */}
          <Icon name="Zap" context="card" />
          <h3 style={{ margin: 0 }}>Loading applications...</h3>
        </div>
      ) : filteredInternships.length === 0 ? (
        <div className="nb-card" style={{ textAlign: 'center', padding: '3rem', backgroundColor: 'var(--bg-canvas)' }}>
          <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '0.5rem' }}>No internship applications found</h3>
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', opacity: 0.6, marginBottom: '1.25rem' }}>
            {search ? `No cards match "${search}"` : 'Start by adding your first job or internship application!'}
          </p>
          <button onClick={openAddModal} className="nb-btn nb-btn-primary">
            + Add Internship Now
          </button>
        </div>
      ) : viewMode === 'list' ? (
        /* List / Table View */
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {filteredInternships.map((item) => (
            <div
              key={item._id}
              className="nb-card nb-card-hover"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem',
              }}
            >
              <div style={{ flex: '1 1 250px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
                  <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 800 }}>{item.company}</h3>
                  <StatusBadge status={item.status} />
                </div>
                <div style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
                  {item.role}
                </div>
                {item.deadline && (
                  <div style={{ fontSize: '0.8rem', fontFamily: 'Space Mono, monospace', color: 'var(--text-primary)', opacity: 0.6, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    {/* ⏰ → Clock */}
                    <Icon name="Clock" context="status" />
                    Deadline: {new Date(item.deadline).toLocaleDateString()}
                  </div>
                )}
              </div>

              {/* Status Selector & Actions */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                <select
                  className="nb-select"
                  style={{ width: 'auto', padding: '0.4rem 0.6rem', fontSize: '0.85rem' }}
                  value={item.status}
                  onChange={(e) => handleStatusChange(item._id, e.target.value)}
                >
                  <option value="wishlist">Wishlist</option>
                  <option value="applied">Applied</option>
                  <option value="screening">Screening</option>
                  <option value="interview">Interview</option>
                  <option value="offer">Offer</option>
                  <option value="selected">Selected</option>
                  <option value="rejected">Rejected</option>
                </select>

                <Link
                  to={`/internships/${item._id}`}
                  className="nb-btn nb-btn-primary"
                  style={{ padding: '0.4rem 0.75rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  {/* ⚡ → Zap */}
                  <Icon name="Zap" context="status" />
                  Workspace
                </Link>

                <button
                  onClick={() => openEditModal(item)}
                  className="nb-btn nb-btn-white"
                  style={{ padding: '0.4rem 0.65rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}
                  title="Edit"
                >
                  {/* ✏️ → Pencil */}
                  <Icon name="Pencil" context="status" />
                </button>

                <button
                  onClick={() => handleDelete(item._id)}
                  className="nb-btn nb-btn-danger"
                  style={{ padding: '0.4rem 0.65rem', fontSize: '0.85rem', display: 'flex', alignItems: 'center' }}
                  title="Delete"
                >
                  {/* 🗑️ → Trash2 */}
                  <Icon name="Trash2" context="status" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Kanban Board View */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {['wishlist', 'applied', 'screening', 'interview', 'offer', 'rejected'].map((colStatus) => {
            const columnItems = filteredInternships.filter(
              (i) => i.status === colStatus || (colStatus === 'offer' && i.status === 'selected')
            );
            return (
              <div
                key={colStatus}
                className="nb-card"
                style={{ backgroundColor: 'var(--surface-white)', padding: '1rem', minHeight: '350px' }}
              >
                <div style={{ marginBottom: '1rem', borderBottom: '3px solid var(--border-dark)', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <StatusBadge status={colStatus} />
                  <span style={{ fontWeight: 800, fontSize: '0.85rem' }}>({columnItems.length})</span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {columnItems.map((item) => (
                    <div
                      key={item._id}
                      className="nb-card nb-card-hover"
                      style={{ padding: '0.85rem', backgroundColor: 'var(--bg-canvas)' }}
                    >
                      <div style={{ fontWeight: 800, fontSize: '1rem' }}>{item.company}</div>
                      <div style={{ fontWeight: 600, fontSize: '0.85rem', color: 'var(--text-primary)', opacity: 0.7, marginBottom: '0.75rem' }}>
                        {item.role}
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link
                          to={`/internships/${item._id}`}
                          className="nb-btn nb-btn-primary"
                          style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                        >
                          {/* ⚡ → Zap */}
                          <Icon name="Zap" context="status" />
                          View
                        </Link>
                        <button
                          onClick={() => handleDelete(item._id)}
                          className="nb-btn nb-btn-danger"
                          style={{ padding: '0.25rem 0.45rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center' }}
                          title="Delete"
                        >
                          {/* 🗑️ → Trash2 */}
                          <Icon name="Trash2" context="status" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Internship Modal */}
      <AddInternshipModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onItemAdded={(newItem) => {
          if (editingItem) {
            setInternships((prev) =>
              prev.map((item) => (item._id === newItem._id ? newItem : item))
            );
          } else {
            setInternships((prev) => [newItem, ...prev]);
          }
        }}
        initialData={editingItem}
      />
    </div>
  );
};

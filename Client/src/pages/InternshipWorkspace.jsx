import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { StatusBadge } from '../components/ui/StatusBadge';
import { Tabs } from '../components/ui/Tabs';
import { Icon } from '../components/ui/Icon';

const STATUS_OPTIONS = [
  { value: 'wishlist', label: 'Wishlist' },
  { value: 'applied', label: 'Applied' },
  { value: 'screening', label: 'Screening' },
  { value: 'interview', label: 'Interview' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'offer', label: 'Offer' },
];

export const InternshipWorkspace = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [internship, setInternship] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  // Resource State
  const [resources, setResources] = useState([]);
  const [resourcesLoading, setResourcesLoading] = useState(false);
  const [resourceTitle, setResourceTitle] = useState('');
  const [resourceType, setResourceType] = useState('link');
  const [resourceContent, setResourceContent] = useState('');
  const [resourceSubmitting, setResourceSubmitting] = useState(false);
  const [resourceErrors, setResourceErrors] = useState({});

  // Prep Item State
  const [prepItems, setPrepItems] = useState([]);
  const [prepLoading, setPrepLoading] = useState(false);
  const [prepQuestion, setPrepQuestion] = useState('');
  const [prepAnswer, setPrepAnswer] = useState('');
  const [prepSubmitting, setPrepSubmitting] = useState(false);
  const [prepErrors, setPrepErrors] = useState({});

  // Initial Load: Fetch Internship workspace
  useEffect(() => {
    const fetchInternship = async () => {
      try {
        setLoading(true);
        const res = await api.get(`/internships/${id}`);
        setInternship(res.data);
        if (res.data.resources) setResources(res.data.resources);
        if (res.data.prepItems) setPrepItems(res.data.prepItems);
      } catch (err) {
        toast.error(err.response?.data?.error || 'Internship not found or unauthorized access');
        navigate('/dashboard', { replace: true });
      } finally {
        setLoading(false);
      }
    };

    fetchInternship();
  }, [id, navigate]);

  // Fetch Resources on tab click/load
  const fetchResources = async () => {
    try {
      setResourcesLoading(true);
      const res = await api.get(`/resources/internship/${id}`);
      setResources(res.data);
    } catch (err) {
      toast.error('Failed to load resources');
    } finally {
      setResourcesLoading(false);
    }
  };

  // Fetch Prep Items on tab click/load
  const fetchPrepItems = async () => {
    try {
      setPrepLoading(true);
      const res = await api.get(`/prep-items/internship/${id}`);
      setPrepItems(res.data);
    } catch (err) {
      toast.error('Failed to load prep items');
    } finally {
      setPrepLoading(false);
    }
  };

  // Switch tabs & fetch data if needed
  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    if (tabId === 'resources') fetchResources();
    if (tabId === 'prep') fetchPrepItems();
  };

  // Status Change handler
  const handleStatusChange = async (newStatus) => {
    try {
      const res = await api.patch(`/internships/${id}/status`, { status: newStatus });
      setInternship((prev) => ({ ...prev, status: res.data.status }));
      toast.success(`Status updated to ${res.data.status}!`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update status');
    }
  };

  // Resource Form Submit
  const handleAddResource = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!resourceTitle.trim()) errors.title = 'Title is required';
    if (!resourceContent.trim()) errors.content = 'Content is required';

    if (Object.keys(errors).length > 0) {
      setResourceErrors(errors);
      return;
    }

    setResourceErrors({});
    setResourceSubmitting(true);

    try {
      const res = await api.post('/resources', {
        internshipId: id,
        title: resourceTitle.trim(),
        type: resourceType,
        content: resourceContent.trim(),
      });
      setResources((prev) => [res.data, ...prev]);
      setResourceTitle('');
      setResourceContent('');
      setResourceType('link');
      toast.success('Resource added successfully!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add resource');
    } finally {
      setResourceSubmitting(false);
    }
  };

  // Delete Resource
  const handleDeleteResource = async (resourceId) => {
    try {
      await api.delete(`/resources/${resourceId}`);
      setResources((prev) => prev.filter((r) => r._id !== resourceId));
      toast.success('Resource deleted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete resource');
    }
  };

  // Prep Item Form Submit
  const handleAddPrepItem = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!prepQuestion.trim()) errors.question = 'Question is required';

    if (Object.keys(errors).length > 0) {
      setPrepErrors(errors);
      return;
    }

    setPrepErrors({});
    setPrepSubmitting(true);

    try {
      const res = await api.post('/prep-items', {
        internshipId: id,
        question: prepQuestion.trim(),
        myAnswer: prepAnswer.trim(),
      });
      setPrepItems((prev) => [res.data, ...prev]);
      setPrepQuestion('');
      setPrepAnswer('');
      toast.success('Prep question added successfully!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add prep question');
    } finally {
      setPrepSubmitting(false);
    }
  };

  // Delete Prep Item
  const handleDeletePrepItem = async (prepId) => {
    try {
      await api.delete(`/prep-items/${prepId}`);
      setPrepItems((prev) => prev.filter((p) => p._id !== prepId));
      toast.success('Prep item deleted successfully!');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete prep item');
    }
  };

  if (loading) {
    return (
      <div className="nb-card" style={{ textAlign: 'center', padding: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
        <Icon name="Zap" context="card" />
        <h3 style={{ margin: 0 }}>Loading workspace...</h3>
      </div>
    );
  }

  if (!internship) return null;

  const tabList = [
    { id: 'overview', label: 'Overview', icon: <Icon name="FileText" context="button" /> },
    { id: 'resources', label: 'Resources', icon: <Icon name="Lightbulb" context="button" />, count: resources.length },
    { id: 'prep', label: 'Prep Q&A', icon: <Icon name="ClipboardList" context="button" />, count: prepItems.length },
  ];

  return (
    <div>
      {/* Header Banner */}
      <div
        className="nb-card"
        style={{
          backgroundColor: 'var(--surface-white)',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.35rem' }}>
            <Link to="/dashboard" style={{ textDecoration: 'none', fontWeight: 800, color: 'var(--text-primary)', display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
              ← Dashboard /
            </Link>
            <StatusBadge status={internship.status} />
          </div>
          <h1 style={{ margin: 0, fontSize: '1.8rem', fontWeight: 800 }}>
            {internship.company} — <span style={{ fontWeight: 600 }}>{internship.role}</span>
          </h1>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <label style={{ fontWeight: 700, fontSize: '0.85rem' }}>Status:</label>
          <select
            className="nb-select"
            style={{ width: 'auto', padding: '0.4rem 0.75rem' }}
            value={internship.status}
            onChange={(e) => handleStatusChange(e.target.value)}
          >
            {STATUS_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs tabs={tabList} activeTab={activeTab} onChange={handleTabChange} />

      {/* Tab 1: Overview */}
      {activeTab === 'overview' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.25rem' }}>
          <div className="nb-card">
            <h3 style={{ marginTop: 0, borderBottom: '3px solid var(--border-dark)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icon name="ClipboardList" context="button" />
              Application Details
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.25rem' }}>
              <div>
                <strong>Company:</strong> {internship.company}
              </div>
              <div>
                <strong>Role:</strong> {internship.role}
              </div>
              <div>
                <strong>Applied Date:</strong>{' '}
                {internship.appliedDate ? new Date(internship.appliedDate).toLocaleDateString() : 'N/A'}
              </div>
              <div>
                <strong>Deadline:</strong>{' '}
                {internship.deadline ? new Date(internship.deadline).toLocaleDateString() : 'No deadline specified'}
              </div>
              <div>
                <strong>Source Link:</strong>{' '}
                {internship.sourceLink ? (
                  <a href={internship.sourceLink} target="_blank" rel="noreferrer" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                    View Job Posting ↗
                  </a>
                ) : (
                  'None provided'
                )}
              </div>
            </div>

            <h4 style={{ marginBottom: '0.5rem' }}>Job Description (JD Text)</h4>
            <div
              style={{
                backgroundColor: 'var(--bg-canvas)',
                border: '2px solid var(--border-dark)',
                borderRadius: '6px',
                padding: '1rem',
                whiteSpace: 'pre-wrap',
                fontFamily: 'Space Mono, monospace',
                fontSize: '0.9rem',
                minHeight: '120px',
              }}
            >
              {internship.jdText || 'No job description provided for this application.'}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Study Resources */}
      {activeTab === 'resources' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Add Resource Inline Form */}
          <div className="nb-card" style={{ backgroundColor: 'var(--surface-white)' }}>
            <h3 style={{ marginTop: 0, borderBottom: '3px solid var(--border-dark)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icon name="Lightbulb" context="button" />
              Add Resource
            </h3>
            <form onSubmit={handleAddResource} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0.75rem' }}>
                <div>
                  <input
                    type="text"
                    placeholder="Resource Title *"
                    className="nb-input"
                    value={resourceTitle}
                    onChange={(e) => {
                      setResourceTitle(e.target.value);
                      if (resourceErrors.title) setResourceErrors((prev) => ({ ...prev, title: '' }));
                    }}
                    disabled={resourceSubmitting}
                  />
                  {resourceErrors.title && (
                    <span style={{ color: 'var(--accent-pink)', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.2rem', display: 'block' }}>
                      {resourceErrors.title}
                    </span>
                  )}
                </div>

                <div>
                  <select
                    className="nb-select"
                    value={resourceType}
                    onChange={(e) => setResourceType(e.target.value)}
                    disabled={resourceSubmitting}
                  >
                    <option value="link">Link</option>
                    <option value="note">Note</option>
                    <option value="question">Question</option>
                  </select>
                </div>
              </div>

              <div>
                <textarea
                  rows="2"
                  placeholder="URL or notes content *"
                  className="nb-textarea"
                  value={resourceContent}
                  onChange={(e) => {
                    setResourceContent(e.target.value);
                    if (resourceErrors.content) setResourceErrors((prev) => ({ ...prev, content: '' }));
                  }}
                  disabled={resourceSubmitting}
                />
                {resourceErrors.content && (
                  <span style={{ color: 'var(--accent-pink)', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.2rem', display: 'block' }}>
                    {resourceErrors.content}
                  </span>
                )}
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="nb-btn nb-btn-secondary" disabled={resourceSubmitting}>
                  {resourceSubmitting ? 'Adding...' : '+ Add Resource'}
                </button>
              </div>
            </form>
          </div>

          {/* Resources List */}
          {resourcesLoading ? (
            <div className="nb-card" style={{ textAlign: 'center', padding: '2rem' }}>
              Loading resources...
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {resources.length === 0 ? (
                <div className="nb-card" style={{ textAlign: 'center', color: 'var(--text-primary)', opacity: 0.6 }}>
                  No study resources added yet. Add your first note or link above!
                </div>
              ) : (
                resources.map((res) => (
                  <div key={res._id} className="nb-card nb-card-hover" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                        <span className="nb-badge" style={{ backgroundColor: 'var(--accent-blue)' }}>
                          {res.type}
                        </span>
                        <strong style={{ fontSize: '1.05rem' }}>{res.title}</strong>
                      </div>
                      <div style={{ fontSize: '0.9rem', wordBreak: 'break-word' }}>
                        {res.type === 'link' ? (
                          <a href={res.content} target="_blank" rel="noreferrer" style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                            {res.content} ↗
                          </a>
                        ) : (
                          res.content
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteResource(res._id)}
                      className="nb-btn nb-btn-danger"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}
                      title="Delete resource"
                    >
                      <Icon name="Trash2" context="button" />
                    </button>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Prep Q&A */}
      {activeTab === 'prep' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Add Prep Question Form */}
          <div className="nb-card" style={{ backgroundColor: 'var(--surface-white)' }}>
            <h3 style={{ marginTop: 0, borderBottom: '3px solid var(--border-dark)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Icon name="ClipboardList" context="button" />
              Add Mock Interview Question &amp; Answer Notes
            </h3>
            <form onSubmit={handleAddPrepItem} style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              <div>
                <input
                  type="text"
                  placeholder="Question * (e.g. Tell me about a time you resolved a conflict on a team.)"
                  className="nb-input"
                  value={prepQuestion}
                  onChange={(e) => {
                    setPrepQuestion(e.target.value);
                    if (prepErrors.question) setPrepErrors((prev) => ({ ...prev, question: '' }));
                  }}
                  disabled={prepSubmitting}
                />
                {prepErrors.question && (
                  <span style={{ color: 'var(--accent-pink)', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.2rem', display: 'block' }}>
                    {prepErrors.question}
                  </span>
                )}
              </div>

              <textarea
                rows="3"
                placeholder="Your STAR framework answer or key talking points..."
                className="nb-textarea"
                value={prepAnswer}
                onChange={(e) => setPrepAnswer(e.target.value)}
                disabled={prepSubmitting}
              />
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="nb-btn nb-btn-purple" disabled={prepSubmitting}>
                  {prepSubmitting ? 'Adding...' : '+ Add Prep Q&A'}
                </button>
              </div>
            </form>
          </div>

          {/* Prep List */}
          {prepLoading ? (
            <div className="nb-card" style={{ textAlign: 'center', padding: '2rem' }}>
              Loading prep items...
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {prepItems.length === 0 ? (
                <div className="nb-card" style={{ textAlign: 'center', color: 'var(--text-primary)', opacity: 0.6 }}>
                  No prep questions added yet. Prepare your mock answers above!
                </div>
              ) : (
                prepItems.map((prep) => (
                  <div key={prep._id} className="nb-card nb-card-hover">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                      <h4 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <Icon name="HelpCircle" context="button" />
                        {prep.question}
                      </h4>
                      <button
                        onClick={() => handleDeletePrepItem(prep._id)}
                        className="nb-btn nb-btn-danger"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.8rem', display: 'flex', alignItems: 'center' }}
                        title="Delete question"
                      >
                        <Icon name="Trash2" context="button" />
                      </button>
                    </div>
                    {prep.myAnswer ? (
                      <div style={{ backgroundColor: 'var(--bg-canvas)', border: '2px solid var(--border-dark)', borderRadius: '4px', padding: '0.75rem', fontSize: '0.9rem' }}>
                        <strong>Answer Notes:</strong> {prep.myAnswer}
                      </div>
                    ) : (
                      <span style={{ fontSize: '0.85rem', color: 'var(--text-primary)', opacity: 0.55 }}>No answer notes added yet.</span>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};


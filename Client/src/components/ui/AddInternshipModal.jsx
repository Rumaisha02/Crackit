import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import api from '../../api/axios';
import { Modal } from './Modal';
import { Icon } from './Icon';

export const AddInternshipModal = ({ isOpen, onClose, onItemAdded, initialData = null }) => {
  const [formData, setFormData] = useState({
    company: '',
    role: '',
    sourceLink: '',
    jdText: '',
    deadline: '',
  });

  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          company: initialData.company || '',
          role: initialData.role || '',
          sourceLink: initialData.sourceLink || '',
          jdText: initialData.jdText || '',
          deadline: initialData.deadline ? initialData.deadline.split('T')[0] : '',
        });
      } else {
        setFormData({
          company: '',
          role: '',
          sourceLink: '',
          jdText: '',
          deadline: '',
        });
      }
      setErrors({});
      setLoading(false);
    }
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.company.trim()) {
      newErrors.company = 'Company is required';
    }
    if (!formData.role.trim()) {
      newErrors.role = 'Role is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      if (initialData) {
        const res = await api.patch(`/internships/${initialData._id}`, formData);
        toast.success('Internship updated successfully!');
        if (onItemAdded) onItemAdded(res.data);
      } else {
        const res = await api.post('/internships', formData);
        toast.success('Internship added successfully!');
        if (onItemAdded) onItemAdded(res.data);
      }
      onClose();
    } catch (error) {
      const errorMessage = error.response?.data?.error || error.response?.data?.message || 'Failed to save internship';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={loading ? () => {} : onClose}
      title={initialData ? 'Edit Internship' : 'Add Internship'}
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <div>
          <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
            Company *
          </label>
          <input
            type="text"
            name="company"
            placeholder="e.g. Google, Stripe, Microsoft"
            className="nb-input"
            style={errors.company ? { borderColor: 'var(--accent-pink)' } : {}}
            value={formData.company}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.company && (
            <span style={{ color: 'var(--accent-pink)', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.25rem', display: 'block' }}>
              {errors.company}
            </span>
          )}
        </div>

        <div>
          <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
            Role *
          </label>
          <input
            type="text"
            name="role"
            placeholder="e.g. Software Engineer Intern"
            className="nb-input"
            style={errors.role ? { borderColor: 'var(--accent-pink)' } : {}}
            value={formData.role}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.role && (
            <span style={{ color: 'var(--accent-pink)', fontSize: '0.8rem', fontWeight: 700, marginTop: '0.25rem', display: 'block' }}>
              {errors.role}
            </span>
          )}
        </div>

        <div>
          <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
            <Icon name="Link" context="button" />
            Source Link / Job Posting URL
          </label>
          <input
            type="url"
            name="sourceLink"
            placeholder="https://careers.company.com/job/..."
            className="nb-input"
            value={formData.sourceLink}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div>
          <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
            JD Text
          </label>
          <textarea
            name="jdText"
            rows="4"
            placeholder="Paste job description text..."
            className="nb-textarea"
            value={formData.jdText}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div>
          <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
            <Icon name="Calendar" context="button" />
            Deadline
          </label>
          <input
            type="date"
            name="deadline"
            className="nb-input"
            value={formData.deadline}
            onChange={handleChange}
            disabled={loading}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
          <button type="button" onClick={onClose} className="nb-btn nb-btn-white" disabled={loading}>
            Cancel
          </button>
          <button type="submit" className="nb-btn nb-btn-primary" disabled={loading}>
            {loading ? (
              <>
                <Icon name="Loader2" context="button" style={{ animation: 'spin 1s linear infinite' }} />
                Saving...
              </>
            ) : initialData ? (
              'Save Changes'
            ) : (
              '+ Add Internship'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
};



import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Icon } from '../components/ui/Icon';

export const Profile = () => {
  const { user } = useContext(AuthContext);
  const [bio, setBio] = useState('Passionate software engineering candidate actively seeking internship opportunities.');
  const [portfolioLinks, setPortfolioLinks] = useState({
    linkedin: 'https://linkedin.com/in/username',
    github: 'https://github.com/username',
    portfolio: 'https://myportfolio.dev',
    behance: '',
    dribbble: '',
  });

  const [resumeUrl, setResumeUrl] = useState('https://cloudinary.com/demo_resume.pdf');
  const [saved, setSaved] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div style={{ maxWidth: '800px' }}>
      <div className="nb-card" style={{ backgroundColor: 'var(--primary-yellow)', marginBottom: '1.5rem' }}>
        <h1 style={{ margin: '0 0 0.35rem 0', fontSize: '1.75rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* 👤 → User */}
          <Icon name="User" context="card" />
          User Profile
        </h1>
        <p style={{ margin: 0, fontWeight: 600 }}>
          Manage your resume, portfolio links, and bio to reference when applying to internships.
        </p>
      </div>

      {saved && (
        <div className="nb-card" style={{ backgroundColor: 'var(--accent-green)', marginBottom: '1.25rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          {/* ✅ → CheckCircle */}
          <Icon name="CheckCircle" context="button" />
          Profile updated successfully!
        </div>
      )}

      <div className="nb-card" style={{ backgroundColor: 'var(--surface-white)' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
                Full Name
              </label>
              <input type="text" disabled className="nb-input" value={user?.name || ''} style={{ backgroundColor: 'var(--bg-canvas)', opacity: 0.75 }} />
            </div>

            <div>
              <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
                Email Address
              </label>
              <input type="email" disabled className="nb-input" value={user?.email || ''} style={{ backgroundColor: 'var(--bg-canvas)', opacity: 0.75 }} />
            </div>
          </div>

          <div>
            <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
              Bio / Short Summary
            </label>
            <textarea
              rows="3"
              className="nb-textarea"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell recruiters about your key technical skills & career goals..."
            />
          </div>

          <div>
            <label style={{ fontWeight: 700, fontSize: '0.85rem', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {/* 📄 → FileText */}
              <Icon name="FileText" context="status" />
              Resume URL / Cloudinary Link
            </label>
            <input
              type="url"
              className="nb-input"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <h3 style={{ marginBottom: 0, borderBottom: '3px solid var(--border-dark)', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {/* 🌐 → Globe */}
            <Icon name="Globe" context="button" />
            Portfolio &amp; Social Links
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
                LinkedIn Profile
              </label>
              <input
                type="url"
                className="nb-input"
                value={portfolioLinks.linkedin}
                onChange={(e) => setPortfolioLinks({ ...portfolioLinks, linkedin: e.target.value })}
              />
            </div>

            <div>
              <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
                GitHub Profile
              </label>
              <input
                type="url"
                className="nb-input"
                value={portfolioLinks.github}
                onChange={(e) => setPortfolioLinks({ ...portfolioLinks, github: e.target.value })}
              />
            </div>

            <div>
              <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
                Personal Website / Portfolio
              </label>
              <input
                type="url"
                className="nb-input"
                value={portfolioLinks.portfolio}
                onChange={(e) => setPortfolioLinks({ ...portfolioLinks, portfolio: e.target.value })}
              />
            </div>

            <div>
              <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
                Behance / Dribbble
              </label>
              <input
                type="url"
                className="nb-input"
                value={portfolioLinks.behance}
                placeholder="https://..."
                onChange={(e) => setPortfolioLinks({ ...portfolioLinks, behance: e.target.value })}
              />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button type="submit" className="nb-btn nb-btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {/* 💾 → Save */}
              <Icon name="Save" context="button" />
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

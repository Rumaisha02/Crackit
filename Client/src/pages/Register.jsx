import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { Icon } from '../components/ui/Icon';

export const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await register(name, email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: 'var(--bg-canvas)',
        padding: '1rem',
      }}
    >
      <div className="nb-card" style={{ width: '100%', maxWidth: '440px', padding: '2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <div
            className="nb-badge"
            style={{
              backgroundColor: 'var(--primary-yellow)',
              fontSize: '1rem',
              padding: '0.4rem 0.8rem',
              marginBottom: '1rem',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
            }}
          >
            {/* ⚡ → Zap */}
            <Icon name="Zap" context="button" />
            CAREER TRACKER
          </div>
          <h2 style={{ margin: '0.5rem 0 0.25rem 0', fontSize: '1.6rem', fontWeight: 800 }}>Create Account</h2>
          <p style={{ margin: 0, fontWeight: 600, color: '#555' }}>Start tracking your internship journey</p>
        </div>

        {error && (
          <div
            className="nb-card"
            style={{
              backgroundColor: 'var(--accent-pink)',
              padding: '0.75rem 1rem',
              marginBottom: '1.25rem',
              fontWeight: 700,
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {/* ⚠️ → AlertTriangle */}
            <Icon name="AlertTriangle" context="button" />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
              Full Name
            </label>
            <input
              type="text"
              required
              placeholder="Alex Johnson"
              className="nb-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="nb-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontWeight: 700, fontSize: '0.85rem', display: 'block', marginBottom: '0.35rem' }}>
              Password (min 6 characters)
            </label>
            <input
              type="password"
              required
              minLength={6}
              placeholder="••••••••"
              className="nb-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="nb-btn nb-btn-primary"
            style={{ width: '100%', marginTop: '0.5rem', padding: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            {submitting ? (
              'Creating Account...'
            ) : (
              <>
                {/* 🚀 → Rocket */}
                <Icon name="Rocket" context="button" />
                Register
              </>
            )}
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '1.5rem', fontWeight: 600, fontSize: '0.9rem' }}>
          Already have an account?{' '}
          <Link to="/login" style={{ fontWeight: 800, color: '#000' }}>
            Log in here
          </Link>
        </div>
      </div>
    </div>
  );
};

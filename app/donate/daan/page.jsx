"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import './DaanSection.css';

// ── Data for each Daan type ────────────────────────────────────────────────
const DAAN_TYPES = [
  {
    id: 'shram',
    cardClass: 'daan-card-shram',
    icon: '⚒️',
    hindi: 'श्रमदान',
    title: 'Shramdaan',
    subtitle: 'Gift of Labour',
    desc: 'The core principle of Anandwan. Volunteers and residents contribute their physical work to build infrastructure, farm the land, and maintain the community forest.',
    accent: '#2d6a4f',
    accentGlow: 'rgba(45, 106, 79, 0.15)',
    btnGradient: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
    modalBg: 'linear-gradient(135deg, #1a472a, #2d6a4f)',
    badgeColor: '#95d5b2',
    iconBg: 'rgba(82,183,136,0.2)',
  },
  {
    id: 'anand',
    cardClass: 'daan-card-anand',
    icon: '🌟',
    hindi: 'आनंददान',
    title: 'Anand-Daan',
    subtitle: 'Gift of Joy',
    desc: 'The overarching goal of the "Forest of Happiness". Residents find joy and dignity through self-sufficiency, building a community that uplifts the human spirit.',
    accent: '#c0392b',
    accentGlow: 'rgba(192, 57, 43, 0.15)',
    btnGradient: 'linear-gradient(135deg, #7b2d00, #c0392b)',
    modalBg: 'linear-gradient(135deg, #7b2d00, #c0392b)',
    badgeColor: '#ffa07a',
    iconBg: 'rgba(255,107,107,0.2)',
  },
  {
    id: 'vriksha',
    cardClass: 'daan-card-vriksha',
    icon: '🌳',
    hindi: 'वृक्षदान',
    title: 'Vriksha Daan',
    subtitle: 'Gift of Trees',
    desc: 'Focused on "planting hope" — donate and plant native saplings to create urban forests. A living legacy of green that breathes life into our future.',
    accent: '#2980b9',
    accentGlow: 'rgba(41, 128, 185, 0.15)',
    btnGradient: 'linear-gradient(135deg, #0d3b6e, #2980b9)',
    modalBg: 'linear-gradient(135deg, #0d3b6e, #2980b9)',
    badgeColor: '#74b9ff',
    iconBg: 'rgba(116,185,255,0.2)',
  },
  {
    id: 'anna',
    cardClass: 'daan-card-anna',
    icon: '🍚',
    hindi: 'अन्नदान',
    title: 'Anna Daan',
    subtitle: 'Gift of Food',
    desc: 'Accept food donations or meals to support residents and those in need. Feed a soul, nourish a community — every meal shared is a step toward dignity.',
    accent: '#d4882e',
    accentGlow: 'rgba(212, 136, 46, 0.15)',
    btnGradient: 'linear-gradient(135deg, #5d3a1a, #d4882e)',
    modalBg: 'linear-gradient(135deg, #5d3a1a, #d4882e)',
    badgeColor: '#fdcb6e',
    iconBg: 'rgba(253,203,110,0.2)',
  },
];

// ── DaanCard ──────────────────────────────────────────────────────────────
function DaanCard({ daan, onOpen }) {
  return (
    <div className={`daan-card ${daan.cardClass}`} onClick={() => onOpen(daan)}>
      <div className="daan-card-bg-circle" />
      <div className="daan-card-content">
        <div className="daan-icon-wrapper">
          <span role="img" aria-label={daan.title}>{daan.icon}</span>
        </div>
        <div className="daan-card-hindi">{daan.hindi}</div>
        <div className="daan-card-title">{daan.title}</div>
        <div className="daan-card-subtitle">{daan.subtitle}</div>
        <p className="daan-card-desc">{daan.desc}</p>
        <button className="daan-card-btn" onClick={(e) => { e.stopPropagation(); onOpen(daan); }}>
          Contribute Now
          <span className="daan-card-btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

// ── DaanModal ─────────────────────────────────────────────────────────────
function DaanModal({ daan, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', amount: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(120); // 2 minutes in seconds
  const [step, setStep] = useState(1); // Step 1: Form, Step 2: QR & Confirm

  useEffect(() => {
    if (step !== 2) return;

    if (timeLeft <= 0) {
      const timeout = setTimeout(() => {
        setStep(1);
      }, 3000);
      return () => clearTimeout(timeout);
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, step]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleContinue = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      alert('Please fill in all required fields.');
      return;
    }
    setStep(2);
    setTimeLeft(120);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('donations')
        .insert([
          {
            name: form.name,
            email: form.email,
            phone: form.phone,
            amount: 0,
            category: daan.title,
            message: form.message
          }
        ]);

      if (error) {
        console.error('Supabase Error:', error);
        alert('There was an issue recording your contribution. Please try again.');
        setLoading(false);
        return;
      }

      setLoading(false);
      setSubmitted(true);
    } catch (err) {
      console.error('Submission Error:', err);
      setLoading(false);
      alert('An unexpected error occurred. Please try again.');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div className="daan-modal-overlay" onClick={handleOverlayClick}>
      <div
        className="daan-modal"
        style={{
          '--daan-accent': daan.accent,
          '--daan-accent-glow': daan.accentGlow,
        }}
      >
        {submitted ? (
          <div className="daan-success-state">
            <div className="daan-success-icon">🙏</div>
            <h3>Thank You, {form.name}!</h3>
            <p>
              Your contribution for <strong>{daan.title}</strong> has been
              received. Every rupee you share helps us nourish our community and build a legacy of hope.
            </p>
            <button className="daan-success-close-btn" onClick={onClose}>
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="daan-modal-header">
              <div
                className="daan-modal-icon"
                style={{ background: daan.iconBg }}
              >
                {daan.icon}
              </div>
              <div className="daan-modal-header-info">
                <div
                  className="daan-modal-badge"
                  style={{ color: daan.badgeColor }}
                >
                  {daan.hindi} — {daan.subtitle}
                </div>
                <div className="daan-modal-title">{daan.title}</div>
                <div className="daan-modal-subtitle">
                  {step === 1 ? 'Share your details to continue.' : 'Scan the QR code to complete your payment.'}
                </div>
              </div>
              <button className="daan-modal-close" onClick={onClose} aria-label="Close">
                ✕
              </button>
            </div>

            <div className="daan-modal-divider" />

            {step === 1 ? (
              <form className="daan-modal-form" onSubmit={handleContinue}>
                <p className="daan-modal-form-intro">
                  Enter your details to proceed to the payment step.
                </p>

                <div className="daan-form-group">
                  <label className="daan-form-label" htmlFor={`daan-name-${daan.id}`}>
                    Full Name *
                  </label>
                  <div className="daan-form-input-wrapper">
                    <span className="daan-form-icon">👤</span>
                    <input
                      id={`daan-name-${daan.id}`}
                      className="daan-form-input"
                      type="text"
                      name="name"
                      placeholder="Your full name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="daan-form-row">
                  <div className="daan-form-group">
                    <label className="daan-form-label" htmlFor={`daan-email-${daan.id}`}>
                      Email *
                    </label>
                    <div className="daan-form-input-wrapper">
                      <span className="daan-form-icon">✉️</span>
                      <input
                        id={`daan-email-${daan.id}`}
                        className="daan-form-input"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="daan-form-group">
                    <label className="daan-form-label" htmlFor={`daan-phone-${daan.id}`}>
                      Phone *
                    </label>
                    <div className="daan-form-input-wrapper">
                      <span className="daan-form-icon">📞</span>
                      <input
                        id={`daan-phone-${daan.id}`}
                        className="daan-form-input"
                        type="tel"
                        name="phone"
                        placeholder="+91 XXXXX XXXXX"
                        value={form.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="daan-form-group">
                  <label className="daan-form-label" htmlFor={`daan-msg-${daan.id}`}>
                    Message (Optional)
                  </label>
                  <div className="daan-form-input-wrapper">
                    <span className="daan-form-icon" style={{ top: '1.1rem', transform: 'none' }}>💬</span>
                    <textarea
                      id={`daan-msg-${daan.id}`}
                      className="daan-form-input"
                      name="message"
                      placeholder="Share how you'd like to contribute..."
                      value={form.message}
                      onChange={handleChange}
                      rows={2}
                      style={{ paddingTop: '0.85rem', resize: 'none' }}
                    />
                  </div>
                </div>

                <button type="submit" className="daan-modal-submit" style={{ background: daan.btnGradient }}>
                  Continue to Payment
                </button>
              </form>
            ) : (
              <div className="daan-step-two">
                <div className="daan-payment-section">
                  {timeLeft > 0 ? (
                    <div className="daan-qr-box">
                      <div className="daan-qr-header">
                        <span>Scan & Pay any amount</span>
                        <div className="daan-timer">
                          <span className="timer-icon">⏳</span>
                          {formatTime(timeLeft)}
                        </div>
                      </div>
                      <div className="daan-qr-image-wrapper">
                        <img src="/image.png" alt="Donation QR Code" className="daan-qr-image" />
                        <div className="daan-qr-overlay">
                          <span>UPI QR for {daan.title}</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="daan-qr-expired">
                      <span className="expired-icon">⌛</span>
                      <p>QR Code sessions usually expire within 2 minutes. Please go back to regenerate.</p>
                    </div>
                  )}
                </div>

                <div className="daan-step-two-actions">
                  <button
                    onClick={handleSubmit}
                    className="daan-modal-submit"
                    style={{ background: daan.btnGradient }}
                    disabled={loading || timeLeft <= 0}
                  >
                    {loading ? '⏳  Confirming...' : '🙏  Confirm & Record Payment'}
                  </button>
                  <button onClick={() => setStep(1)} className="daan-back-btn">
                    ← Back to Edit
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function DaanSection() {
  const [activeDaan, setActiveDaan] = useState(null);

  return (
    <section id="donate" className="daan-section">
      <div className="container">
        <div className="daan-section-header">
          <div className="daan-badge">Ways to Give</div>
          <h2>
            Choose Your <span>Daan</span>
          </h2>
          <p>
            At Anandwan, every form of giving creates ripples of change. Select the
            contribution that resonates with your heart.
          </p>
        </div>

        <div className="daan-cards-grid">
          {DAAN_TYPES.map((daan) => (
            <DaanCard key={daan.id} daan={daan} onOpen={setActiveDaan} />
          ))}
        </div>
      </div>

      {activeDaan && (
        <DaanModal daan={activeDaan} onClose={() => setActiveDaan(null)} />
      )}
    </section>
  );
}

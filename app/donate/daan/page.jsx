"use client";

import React, { useState, useEffect, useRef } from 'react';
import { supabase } from '@/lib/supabaseClient';
import './DaanSection.css';

// ── UPI Config ───────────────────────────────────────────────────────────────
const UPI_VPA  = process.env.NEXT_PUBLIC_UPI_VPA  || 'anandwan@sbi';
const UPI_NAME = process.env.NEXT_PUBLIC_UPI_NAME || 'Anandwan Foundation';

const QR_DURATION = 120; // seconds

function buildUpiLink(amount, note) {
  const params = new URLSearchParams({
    pa: UPI_VPA,
    pn: UPI_NAME,
    am: amount,
    cu: 'INR',
    tn: note,
  });
  return `upi://pay?${params.toString()}`;
}

function buildQrUrl(upiLink, size = 220) {
  return `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(upiLink)}&margin=8&ecc=M`;
}

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec < 10 ? '0' : ''}${sec}`;
}

// ── SVG Ring Timer ────────────────────────────────────────────────────────────
function RingTimer({ timeLeft, accent }) {
  const R = 30;
  const C = 2 * Math.PI * R;
  const progress = timeLeft / QR_DURATION;
  const offset = C * (1 - progress);
  const isLow = timeLeft <= 30;
  const color = isLow ? '#ef4444' : '#ffc84f';
  const trackColor = isLow ? 'rgba(239,68,68,0.15)' : 'rgba(255,200,79,0.12)';
  const glowColor = isLow ? 'rgba(239,68,68,0.5)' : 'rgba(255,200,79,0.5)';

  return (
    <div className="qr-ring-timer">
      <svg width="84" height="84" viewBox="0 0 70 70">
        {/* Glow filter */}
        <defs>
          <filter id="ringGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
        {/* Track */}
        <circle cx="35" cy="35" r={R} fill="none" stroke={trackColor} strokeWidth="4" />
        {/* Progress arc */}
        <circle
          cx="35" cy="35" r={R}
          fill="none"
          stroke={color}
          strokeWidth="4"
          strokeDasharray={C}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform="rotate(-90 35 35)"
          filter="url(#ringGlow)"
          style={{ transition: 'stroke-dashoffset 1s linear, stroke 0.4s' }}
        />
        {/* Time text */}
        <text
          x="35" y="31"
          textAnchor="middle"
          fontSize="11"
          fontWeight="800"
          fill={color}
          style={{ transition: 'fill 0.4s', fontFamily: 'Inter, sans-serif' }}
        >
          {formatTime(timeLeft)}
        </text>
        <text x="35" y="43" textAnchor="middle" fontSize="7" fill="rgba(255,255,255,0.4)" fontWeight="500">
          left
        </text>
      </svg>
    </div>
  );
}

// ── Data ──────────────────────────────────────────────────────────────────────
const DAAN_TYPES = [
  {
    id: 'shram', cardClass: 'daan-card-shram', icon: '⚒️',
    hindi: 'श्रमदान', title: 'Shramdaan', subtitle: 'Gift of Labour',
    desc: 'The core principle of Anandwan. Volunteers and residents contribute their physical work to build infrastructure, farm the land, and maintain the community forest.',
    accent: '#2d6a4f', accentGlow: 'rgba(45,106,79,0.15)',
    btnGradient: 'linear-gradient(135deg,#1a472a,#2d6a4f)',
    badgeColor: '#95d5b2', iconBg: 'rgba(82,183,136,0.18)',
  },
  {
    id: 'anand', cardClass: 'daan-card-anand', icon: '🌟',
    hindi: 'आनंददान', title: 'Anand-Daan', subtitle: 'Gift of Joy',
    desc: 'The overarching goal of the "Forest of Happiness". Residents find joy and dignity through self-sufficiency, building a community that uplifts the human spirit.',
    accent: '#c0392b', accentGlow: 'rgba(192,57,43,0.15)',
    btnGradient: 'linear-gradient(135deg,#7b2d00,#c0392b)',
    badgeColor: '#ffa07a', iconBg: 'rgba(255,107,107,0.18)',
  },
  {
    id: 'vriksha', cardClass: 'daan-card-vriksha', icon: '🌳',
    hindi: 'वृक्षदान', title: 'Vriksha Daan', subtitle: 'Gift of Trees',
    desc: 'Focused on "planting hope" — donate and plant native saplings to create urban forests. A living legacy of green that breathes life into our future.',
    accent: '#2980b9', accentGlow: 'rgba(41,128,185,0.15)',
    btnGradient: 'linear-gradient(135deg,#0d3b6e,#2980b9)',
    badgeColor: '#74b9ff', iconBg: 'rgba(116,185,255,0.18)',
  },
  {
    id: 'anna', cardClass: 'daan-card-anna', icon: '🍚',
    hindi: 'अन्नदान', title: 'Anna Daan', subtitle: 'Gift of Food',
    desc: 'Accept food donations or meals to support residents and those in need. Feed a soul, nourish a community — every meal shared is a step toward dignity.',
    accent: '#d4882e', accentGlow: 'rgba(212,136,46,0.15)',
    btnGradient: 'linear-gradient(135deg,#5d3a1a,#d4882e)',
    badgeColor: '#fdcb6e', iconBg: 'rgba(253,203,110,0.18)',
  },
];

const AMOUNT_PRESETS = [100, 251, 500, 1001, 2100, 5000];

// ── DaanCard ──────────────────────────────────────────────────────────────────
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
        <button
          className="daan-card-btn"
          onClick={(e) => { e.stopPropagation(); onOpen(daan); }}
        >
          Contribute Now <span className="daan-card-btn-arrow">→</span>
        </button>
      </div>
    </div>
  );
}

// ── DaanModal ────────────────────────────────────────────────────────────────
function DaanModal({ daan, onClose }) {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '', amount: '' });
  const [step, setStep]       = useState(1);   // 1 = form  |  2 = QR  |  3 = success
  const [loading, setLoading] = useState(false);
  const [qrLoaded, setQrLoaded] = useState(false);
  const [timeLeft, setTimeLeft] = useState(QR_DURATION);
  const [expired, setExpired]   = useState(false);
  const [emailStatus, setEmailStatus]   = useState('idle'); // idle | sending | sent | error
  const [donationId, setDonationId]     = useState(null);   // Supabase row ID
  const [showCloseWarning, setShowCloseWarning] = useState(false);
  const timerRef = useRef(null);

  // Build UPI strings whenever form.amount changes
  const upiNote = `Donation - ${daan.title}`;
  const upiLink = form.amount ? buildUpiLink(Number(form.amount), upiNote) : '';
  const qrUrl   = upiLink ? buildQrUrl(upiLink) : '';

  // ── Countdown timer (runs only in step 2) ──
  useEffect(() => {
    if (step !== 2) return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setExpired(true);
          // Auto-close modal 3s after expiry only if user hasn't confirmed payment
          setTimeout(() => {
            setStep((s) => { if (s === 2) onClose(); return s; });
          }, 3000);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timerRef.current);
  }, [step]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePreset = (val) =>
    setForm((prev) => ({ ...prev, amount: String(val) }));

  // Continue: validate → save to Supabase → show QR
  const handleContinue = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      alert('Please fill in Name, Email and Phone.');
      return;
    }
    if (!form.amount || Number(form.amount) < 1) {
      alert('Please enter a valid donation amount (minimum ₹1).');
      return;
    }

    setLoading(true);
    try {
      const { data, error } = await supabase.from('donations').insert([{
        name:     form.name,
        email:    form.email,
        phone:    form.phone,
        amount:   Number(form.amount),
        category: daan.title,
        message:  form.message,
        status:   'pending',   // will be updated to 'paid' on confirmation
      }]).select('id');
      if (error) {
        console.error('Supabase error (non-blocking):', error);
      } else if (data && data[0]) {
        setDonationId(data[0].id);  // save ID for later update
      }
    } catch (err) {
      console.error('Supabase error (non-blocking):', err);
    } finally {
      setLoading(false);
    }

    // Reset QR state and enter step 2
    setQrLoaded(false);
    setTimeLeft(QR_DURATION);
    setExpired(false);
    setStep(2);
  };

  const handleRegenerate = () => {
    clearInterval(timerRef.current);
    setExpired(false);
    setQrLoaded(false);
    setTimeLeft(QR_DURATION);
    // restart the effect by briefly going to step 1 then back
    setStep(1);
    setTimeout(() => setStep(2), 0);
  };

  // ── I've Paid handler ──────────────────────────────────────────────────────
  const handlePaid = async () => {
    // Stop the QR timer immediately
    clearInterval(timerRef.current);
    setStep(3);

    // ── 1. Mark donation as paid in Supabase ──
    if (donationId) {
      try {
        const { error } = await supabase
          .from('donations')
          .update({ status: 'paid', paid_at: new Date().toISOString() })
          .eq('id', donationId);
        if (error) console.error('Status update error (non-blocking):', error);
      } catch (err) {
        console.error('Status update error (non-blocking):', err);
      }
    }

    // ── 2. Send receipt email ──
    setEmailStatus('sending');
    try {
      const res = await fetch('/api/send-receipt', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name:       form.name,
          email:      form.email,
          phone:      form.phone,
          amount:     form.amount,
          category:   daan.title,
          hindi:      daan.hindi,
          message:    form.message,
          upiVpa:     UPI_VPA,
          donationId: donationId,  // pass ID so API can fetch exact record
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed');
      setEmailStatus('sent');
    } catch (err) {
      console.error('Receipt email error:', err);
      setEmailStatus('error');
    }
  };

  // Intercept close — warn on Step 2 only
  const tryClose = () => {
    if (step === 2) {
      setShowCloseWarning(true);
    } else {
      clearInterval(timerRef.current);
      onClose();
    }
  };

  const handleForceClose = () => {
    clearInterval(timerRef.current);
    setShowCloseWarning(false);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) tryClose();
  };

  return (
    <div className="daan-modal-overlay" onClick={handleOverlayClick}>
      <div
        className="daan-modal"
        style={{ '--daan-accent': daan.accent, '--daan-accent-glow': daan.accentGlow }}
      >
        {/* ══ CLOSE WARNING DIALOG ════════════════════════════════════════ */}
        {showCloseWarning && (
          <div className="close-warn-overlay">
            <div className="close-warn-box">
              <div className="close-warn-icon">⚠️</div>
              <h3 className="close-warn-title">Did you complete your payment?</h3>
              <p className="close-warn-msg">
                Please tap <strong className="close-warn-highlight">"✅ I've Paid"</strong> after
                scanning the QR so we can send your confirmation email and update your donation record.
              </p>
              <p className="close-warn-sub">
                Closing now will leave your donation unconfirmed — no receipt will be sent.
              </p>
              <div className="close-warn-actions">
                <button
                  className="close-warn-back-btn"
                  onClick={() => setShowCloseWarning(false)}
                  style={{ background: daan.btnGradient }}
                >
                  ← Go Back & Confirm
                </button>
                <button
                  className="close-warn-force-btn"
                  onClick={handleForceClose}
                >
                  Close Anyway
                </button>
              </div>
            </div>
          </div>
        )}
        {/* ══ STEP 1 — FORM ══════════════════════════════════════════════════ */}
        {step === 1 && (
          <>
            {/* Header */}
            <div className="daan-modal-header">
              <div className="daan-modal-icon" style={{ background: daan.iconBg }}>
                {daan.icon}
              </div>
              <div className="daan-modal-header-info">
                <div className="daan-modal-badge" style={{ color: daan.badgeColor }}>
                  {daan.hindi} — {daan.subtitle}
                </div>
                <div className="daan-modal-title">{daan.title}</div>
                <div className="daan-modal-subtitle">
                  Share your details and donation amount.
                </div>
              </div>
              <button className="daan-modal-close" onClick={onClose} aria-label="Close">
                ✕
              </button>
            </div>
            <div className="daan-modal-divider" />

            {/* Form */}
            <form className="daan-modal-form" onSubmit={handleContinue}>
              {/* Name */}
              <div className="daan-form-group">
                <label className="daan-form-label" htmlFor={`daan-name-${daan.id}`}>Full Name *</label>
                <div className="daan-form-input-wrapper">
                  <span className="daan-form-icon">👤</span>
                  <input id={`daan-name-${daan.id}`} className="daan-form-input" type="text"
                    name="name" placeholder="Your full name" value={form.name} onChange={handleChange} required />
                </div>
              </div>

              {/* Email + Phone */}
              <div className="daan-form-row">
                <div className="daan-form-group">
                  <label className="daan-form-label" htmlFor={`daan-email-${daan.id}`}>Email *</label>
                  <div className="daan-form-input-wrapper">
                    <span className="daan-form-icon">✉️</span>
                    <input id={`daan-email-${daan.id}`} className="daan-form-input" type="email"
                      name="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                  </div>
                </div>
                <div className="daan-form-group">
                  <label className="daan-form-label" htmlFor={`daan-phone-${daan.id}`}>Phone *</label>
                  <div className="daan-form-input-wrapper">
                    <span className="daan-form-icon">📞</span>
                    <input id={`daan-phone-${daan.id}`} className="daan-form-input" type="tel"
                      name="phone" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handleChange} required />
                  </div>
                </div>
              </div>

              {/* Amount */}
              <div className="mb-3">
                <label className="block text-xs font-semibold text-gray-500 uppercase tracking-widest mb-2"
                  htmlFor={`daan-amount-${daan.id}`}>
                  Donation Amount (₹) *
                </label>
                {/* Presets */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {AMOUNT_PRESETS.map((p) => (
                    <button key={p} type="button" onClick={() => handlePreset(p)}
                      className={`px-3 py-1 rounded-full text-xs font-bold border transition-all duration-150 ${
                        Number(form.amount) === p
                          ? 'text-white border-transparent'
                          : 'bg-white text-gray-500 border-gray-200 hover:border-gray-400'
                      }`}
                      style={Number(form.amount) === p ? { background: daan.btnGradient } : {}}
                    >
                      ₹{p.toLocaleString('en-IN')}
                    </button>
                  ))}
                </div>
                {/* Custom input */}
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm select-none">₹</span>
                  <input id={`daan-amount-${daan.id}`} type="number" name="amount" min="1" step="1"
                    placeholder="Custom amount" value={form.amount} onChange={handleChange} required
                    className="w-full pl-7 pr-3 py-2.5 border-2 border-gray-200 rounded-xl text-gray-800 font-bold text-sm
                               focus:outline-none transition-all"
                    style={{ focusBorderColor: daan.accent }}
                  />
                </div>
                {form.amount && Number(form.amount) >= 1 && (
                  <p className="mt-1 text-xs text-gray-400">
                    Donating <span className="font-bold text-gray-700">₹{Number(form.amount).toLocaleString('en-IN')}</span> for <span className="font-semibold">{daan.title}</span>
                  </p>
                )}
              </div>

              {/* Message */}
              <div className="daan-form-group">
                <label className="daan-form-label" htmlFor={`daan-msg-${daan.id}`}>Message (Optional)</label>
                <div className="daan-form-input-wrapper">
                  <span className="daan-form-icon" style={{ top: '1rem', transform: 'none' }}>💬</span>
                  <textarea id={`daan-msg-${daan.id}`} className="daan-form-input" name="message"
                    placeholder="Share a message..." value={form.message} onChange={handleChange}
                    rows={2} style={{ paddingTop: '0.8rem', resize: 'none' }} />
                </div>
              </div>

              <button type="submit" className="daan-modal-submit" style={{ background: daan.btnGradient }} disabled={loading}>
                {loading ? 'Saving…' : 'Continue to Payment →'}
              </button>
            </form>
          </>
        )}

        {/* ══ STEP 2 — QR ════════════════════════════════════════════════════ */}
        {step === 2 && (
          <div className="qr-step">

            {/* ── Header strip with icon, title & close ── */}
            <div className="qr-step-header" style={{ background: daan.btnGradient }}>
              <div className="qr-step-header-left">
                <div className="qr-step-icon" style={{ background: 'rgba(255,255,255,0.18)' }}>
                  {daan.icon}
                </div>
                <div>
                  <p className="qr-step-hindi">{daan.hindi}</p>
                  <p className="qr-step-title">{daan.title}</p>
                </div>
              </div>

              {/* Amount chip */}
              <div className="qr-amount-chip">
                <span className="qr-amount-label">Donating</span>
                <span className="qr-amount-value">₹{Number(form.amount).toLocaleString('en-IN')}</span>
              </div>

              {/* Close */}
              <button onClick={tryClose} aria-label="Close" className="qr-close-btn">✕</button>
            </div>

            {/* ── Dark QR body ── */}
            <div className="qr-step-body">

              {/* Instruction banner */}
              <div className="qr-instruction">
                <span className="qr-instruction-icon">📲</span>
                <p>
                  Scan with any UPI app — amount is pre-filled.
                  <span className="qr-instruction-highlight"> On mobile, tap "Open in UPI App".</span>
                </p>
              </div>

              {/* Main content row: QR + timer */}
              <div className="qr-content-row">

                {/* QR card with glowing border */}
                <div className={`qr-frame ${expired ? 'qr-frame-expired' : ''}`}
                  style={!expired ? { '--qr-glow': daan.accentGlow, '--qr-border': daan.accent } : {}}>

                  {/* Corner decorations */}
                  <div className="qr-corner qr-corner-tl" style={{ borderColor: daan.accent }} />
                  <div className="qr-corner qr-corner-tr" style={{ borderColor: daan.accent }} />
                  <div className="qr-corner qr-corner-bl" style={{ borderColor: daan.accent }} />
                  <div className="qr-corner qr-corner-br" style={{ borderColor: daan.accent }} />

                  {/* Loading shimmer */}
                  {!qrLoaded && !expired && (
                    <div className="qr-loading">
                      <div className="qr-spinner" style={{ borderColor: `${daan.accent} transparent ${daan.accent} ${daan.accent}` }} />
                      <p className="qr-loading-text">Generating QR…</p>
                    </div>
                  )}

                  {/* QR image */}
                  <img
                    src={qrUrl}
                    alt="UPI QR Code"
                    className="qr-image"
                    onLoad={() => setQrLoaded(true)}
                    onError={() => setQrLoaded(true)}
                  />

                  {/* Expired overlay */}
                  {expired && (
                    <div className="qr-expired-overlay">
                      <span className="qr-expired-icon">⌛</span>
                      <p className="qr-expired-title">QR Expired</p>
                      <p className="qr-expired-sub">Closing shortly…</p>
                      <button
                        onClick={handleRegenerate}
                        className="qr-regen-btn"
                        style={{ background: daan.btnGradient }}
                      >
                        ↻ Regenerate
                      </button>
                    </div>
                  )}
                </div>

                {/* Right panel: timer + UPI info */}
                <div className="qr-sidebar">
                  <RingTimer timeLeft={timeLeft} accent={daan.accent} />

                  <div className="qr-upi-info">
                    <div className="qr-upi-label">Pay to</div>
                    <div className="qr-upi-vpa">{UPI_VPA}</div>
                    <div className="qr-upi-name">{UPI_NAME}</div>
                  </div>

                  {/* Security badge */}
                  <div className="qr-secure-badge">
                    <span>🔒</span>
                    <span>Secured</span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="qr-divider" />

              {/* ✅ I've Paid button */}
              <button
                onClick={handlePaid}
                className="qr-paid-btn"
                disabled={expired}
              >
                <span className="qr-paid-btn-icon">✅</span>
                I've Paid
              </button>

              {/* Open in UPI App button */}
              <a
                href={upiLink}
                className={`qr-upi-btn ${expired ? 'qr-upi-btn-disabled' : ''}`}
                style={!expired ? { background: daan.btnGradient } : {}}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                Open in UPI App
              </a>

              {/* Back link */}
              <button
                onClick={() => { clearInterval(timerRef.current); setStep(1); }}
                className="qr-back-btn"
              >
                ← Back to edit details
              </button>
            </div>
          </div>
        )}

        {/* ══ STEP 3 — SUCCESS ═══════════════════════════════════════════════ */}
        {step === 3 && (
          <div className="qr-success-step">
            {/* Confetti top bar */}
            <div className="qr-success-topbar" style={{ background: daan.btnGradient }} />

            <div className="qr-success-body">
              {/* Animated checkmark */}
              <div className="qr-success-circle" style={{ borderColor: daan.accent, boxShadow: `0 0 40px ${daan.accentGlow}` }}>
                <span className="qr-success-check">✓</span>
              </div>

              <h2 className="qr-success-title">Dhanyavaad! 🙏</h2>
              <p className="qr-success-hindi">धन्यवाद</p>
              <p className="qr-success-msg">
                Your <strong>{daan.title}</strong> donation of{' '}
                <span className="qr-success-amount" style={{ color: daan.accent }}>
                  ₹{Number(form.amount).toLocaleString('en-IN')}
                </span>{' '}
                has been recorded. Anandwan thanks you from the heart.
              </p>

              {/* Email status */}
              <div className="qr-email-status">
                {emailStatus === 'sending' && (
                  <div className="qr-email-chip qr-email-sending">
                    <span className="qr-email-spinner" />
                    Sending receipt to {form.email}…
                  </div>
                )}
                {emailStatus === 'sent' && (
                  <div className="qr-email-chip qr-email-sent">
                    📧 Receipt sent to <strong>{form.email}</strong>
                  </div>
                )}
                {emailStatus === 'error' && (
                  <div className="qr-email-chip qr-email-error">
                    ⚠️ Email couldn't be sent — please contact us directly.
                  </div>
                )}
              </div>

              {/* Donor info strip */}
              <div className="qr-success-info-row">
                <div className="qr-success-info-item">
                  <span>👤</span><span>{form.name}</span>
                </div>
                <div className="qr-success-info-dot" />
                <div className="qr-success-info-item">
                  <span>💰</span><span>₹{Number(form.amount).toLocaleString('en-IN')}</span>
                </div>
                <div className="qr-success-info-dot" />
                <div className="qr-success-info-item">
                  <span>{daan.icon}</span><span>{daan.title}</span>
                </div>
              </div>

              <button onClick={onClose} className="qr-success-close" style={{ background: daan.btnGradient }}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Page root ─────────────────────────────────────────────────────────────────
export default function DaanSection() {
  const [activeDaan, setActiveDaan] = useState(null);

  return (
    <section id="donate" className="daan-section">
      <div className="container">
        <div className="daan-section-header">
          <div className="daan-badge">Ways to Give</div>
          <h2>Choose Your <span>Daan</span></h2>
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

"use client";

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { supabase } from '@/lib/supabaseClient';
import './Contact.css';

// ─── Simple Toast Component ────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  if (!message) return null;
  const isSuccess = type === 'success';
  return (
    <div style={{
      position: 'fixed', bottom: '28px', left: '50%', transform: 'translateX(-50%)',
      zIndex: 99999, display: 'flex', alignItems: 'center', gap: '12px',
      background: isSuccess ? '#1a472a' : '#c0392b',
      color: '#fff', padding: '14px 24px', borderRadius: '12px',
      boxShadow: '0 8px 32px rgba(0,0,0,0.22)',
      fontSize: '0.95rem', fontWeight: 600, minWidth: '280px',
      animation: 'toastIn 0.3s ease',
    }}>
      <span style={{ fontSize: '1.2rem' }}>{isSuccess ? '✅' : '❌'}</span>
      <span style={{ flex: 1 }}>{message}</span>
      <button
        onClick={onClose}
        suppressHydrationWarning
        style={{
          background: 'rgba(255,255,255,0.2)', border: 'none', color: '#fff',
          borderRadius: '50%', width: '24px', height: '24px', cursor: 'pointer',
          fontSize: '0.85rem', lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}
      >✕</button>
      <style>{`
        @keyframes toastIn {
          from { opacity: 0; transform: translateX(-50%) translateY(20px); }
          to   { opacity: 1; transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  );
}

// ─── Contact Page ──────────────────────────────────────────────────────────────
export default function Contact() {
  const { t } = useTranslation();

  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '' });

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast({ message: '', type: '' }), 4000);
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.from('contact_messages').insert([{
        name:    form.name.trim(),
        email:   form.email.trim(),
        phone:   form.phone.trim() || null,
        subject: form.subject.trim(),
        message: form.message.trim(),
      }]);

      if (error) throw error;

      showToast('Message sent successfully! We will get back to you soon. 🙏', 'success');
      setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact form error:', err);
      showToast('Something went wrong. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-page">
      {/* Toast */}
      <Toast message={toast.message} type={toast.type} onClose={() => setToast({ message: '', type: '' })} />

      {/* Hero Section */}
      <section className="contact-hero">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>{t('contact.hero_title')}</h1>
          <p>{t('contact.hero_subtitle')}</p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section">
        <div className="container">
          <h2 className="section-title">{t('contact.send_message_title')}</h2>
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">{t('contact.full_name')}</label>
              <input
                type="text" id="name" name="name"
                placeholder={t('contact.name_placeholder')}
                value={form.name} onChange={handleChange}
                required suppressHydrationWarning
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('contact.email_address')}</label>
              <input
                type="email" id="email" name="email"
                placeholder={t('contact.email_placeholder')}
                value={form.email} onChange={handleChange}
                required suppressHydrationWarning
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone">{t('contact.phone_number')}</label>
              <input
                type="tel" id="phone" name="phone"
                placeholder={t('contact.phone_placeholder')}
                value={form.phone} onChange={handleChange}
                suppressHydrationWarning
              />
            </div>
            <div className="form-group">
              <label htmlFor="subject">{t('contact.subject')}</label>
              <input
                type="text" id="subject" name="subject"
                placeholder={t('contact.subject_placeholder')}
                value={form.subject} onChange={handleChange}
                required suppressHydrationWarning
              />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t('contact.message')}</label>
              <textarea
                id="message" name="message"
                placeholder={t('contact.message_placeholder')}
                rows="5" value={form.message} onChange={handleChange}
                required suppressHydrationWarning
              />
            </div>
            <button
              type="submit"
              className="btn btn-submit"
              disabled={loading}
              suppressHydrationWarning
              style={{ opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            >
              {loading ? 'Sending…' : t('contact.send_button')}
            </button>
          </form>
        </div>
      </section>

      {/* Location Section */}
      <section className="location-section">
        <div className="container">
          <h2 className="section-title">{t('contact.location_title')}</h2>
          <div className="location-content">
            <div className="location-details">
              <h3>{t('contact.ashram_name')}</h3>
              <p>
                <strong>{t('contact.address_label')}</strong> {t('contact.address_value')}
              </p>
              <p><strong>{t('contact.phone_label')}</strong> +91 7176 282 034</p>
              <p><strong>{t('contact.email_label')}</strong> contact@anandwan.org</p>
              <p><strong>{t('contact.visiting_hours_label')}</strong> {t('contact.visiting_hours_value')}</p>
            </div>
            <div className="location-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3732.576829698231!2d79.62097461414895!3d20.23386588642764!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bd4a5e5f5e5e5e5%3A0x5e5e5e5e5e5e5e5e!2sAnandwan!5e0!3m2!1sen!2sin!4v1698765432100!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                title="Anandwan Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Contact Info */}
      <section className="additional-contact">
        <div className="container">
          <h2 className="section-title">{t('contact.more_ways_title')}</h2>
          <div className="contact-grid">
            <div className="contact-card">
              <div className="contact-icon email-icon"></div>
              <h3>{t('contact.email_us')}</h3>
              <p>contact@anandwan.org</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon phone-icon"></div>
              <h3>{t('contact.call_us')}</h3>
              <p>+91 7176 282 034</p>
            </div>
            <div className="contact-card">
              <div className="contact-icon social-icon"></div>
              <h3>{t('contact.follow_us')}</h3>
              <p>
                <a href="https://facebook.com/anandwan" target="_blank" rel="noopener noreferrer">Facebook</a> | 
                <a href="https://twitter.com/anandwan" target="_blank" rel="noopener noreferrer">Twitter</a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

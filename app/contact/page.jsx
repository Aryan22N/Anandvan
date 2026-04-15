"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import './Contact.css';

export default function Contact() {
  const { t } = useTranslation();

  return (
    <div className="contact-page">
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
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label htmlFor="name">{t('contact.full_name')}</label>
              <input type="text" id="name" placeholder={t('contact.name_placeholder')} required />
            </div>
            <div className="form-group">
              <label htmlFor="email">{t('contact.email_address')}</label>
              <input type="email" id="email" placeholder={t('contact.email_placeholder')} required />
            </div>
            <div className="form-group">
              <label htmlFor="phone">{t('contact.phone_number')}</label>
              <input type="tel" id="phone" placeholder={t('contact.phone_placeholder')} />
            </div>
            <div className="form-group">
              <label htmlFor="subject">{t('contact.subject')}</label>
              <input type="text" id="subject" placeholder={t('contact.subject_placeholder')} required />
            </div>
            <div className="form-group">
              <label htmlFor="message">{t('contact.message')}</label>
              <textarea id="message" placeholder={t('contact.message_placeholder')} rows="5" required></textarea>
            </div>
            <button type="submit" className="btn btn-submit">{t('contact.send_button')}</button>
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

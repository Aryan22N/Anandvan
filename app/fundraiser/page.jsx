"use client";

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import './Fundraiser.css';

export default function Fundraiser() {
  const { t } = useTranslation();
  const router = useRouter();
  const goalAmount = 500000; // Example goal in INR
  const raisedAmount = 320000; // Example raised amount in INR
  const progress = (raisedAmount / goalAmount) * 100;

  return (
    <div className="fundraiser-page">
      {/* Hero Section with Background Video */}
      <section className="fundraiser-hero">
        <video autoPlay muted loop className="hero-video">
          <source src="/videos/4443742-hd_1920_1080_25fps.mp4" type="video/mp4" />
          <source src="/videos/4443742-hd_1920_1080_25fps.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>{t('fundraiser.hero_title')}</h1>
          <p>{t('fundraiser.hero_subtitle')}</p>
          <Link href="/donate/daan" className="btn btn-donate">{t('fundraiser.donate_now')}</Link>
        </div>
      </section>

      {/* Fundraiser Info */}
      <section className="fundraiser-info">
        <div className="container">
          <h2 className="section-title">{t('fundraiser.current_fundraiser')}</h2>
          <div className="info-content">
            <div className="info-text">
              <h3>{t('fundraiser.rehab_center_title')}</h3>
              <p>
                {t('fundraiser.rehab_center_desc')}
              </p>
              <div className="progress-bar">
                <div className="progress" style={{ width: `${progress}%` }}></div>
              </div>
              <div className="progress-details">
                <span>{t('fundraiser.raised')}: ₹{raisedAmount.toLocaleString()}</span>
                <span>{t('fundraiser.goal')}: ₹{goalAmount.toLocaleString()}</span>
              </div>
            </div>
            <div className="info-image">
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYotzCAPH54FcfEBZ7whQ7JLepag7npm9Qdw&s" alt="Rehabilitation Center" />
            </div>
          </div>
        </div>
      </section>

      {/* Donor Testimonials */}
      <section className="donor-testimonials">
        <div className="container">
          <h2 className="section-title">{t('fundraiser.donors_say')}</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p>{t('fundraiser.testimonial_1')}</p>
              <div className="testimonial-author">
                <div>
                  <h4>Priya Sharma</h4>
                  <p>{t('fundraiser.donor_1_since')}</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <p>{t('fundraiser.testimonial_2')}</p>
              <div className="testimonial-author">
                <div>
                  <h4>Rahul Desai</h4>
                  <p>{t('fundraiser.donor_2_since')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta">
        <div className="container">
          <h2>{t('fundraiser.be_change')}</h2>
          <p>{t('fundraiser.be_change_desc')}</p>
          <Link href="/donate/daan" className="btn btn-cta">{t('fundraiser.donate_now')}</Link>
        </div>
      </section>
    </div>
  );
}

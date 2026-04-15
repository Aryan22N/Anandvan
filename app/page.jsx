"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import './Home.css';

import { FaNotesMedical, FaBookReader, FaSeedling, FaHandsHelping } from 'react-icons/fa';

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="home-page">
      {/* Hero Section with Background Video */}
      <section className="hero">
        <video autoPlay muted loop className="hero-video">
          <source src="/videos/3696027-hd_1920_1080_24fps.mp4" type="video/mp4" />
          <source src="/videos/3696027-hd_1920_1080_24fps.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>

        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>{t('home.welcome')}</h1>
          <p>{t('home.subtitle')}</p>
          <div className="hero-buttons">
            <Link href="/about" className="btn btn-primary">{t('home.learn_more')}</Link>
            <Link href="/fundraiser" className="btn btn-secondary">{t('home.support_us')}</Link>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="mission">
        <div className="container">
          <h2 className="section-title">{t('home.mission_title')}</h2>
          <div className="mission-content">
            <div className="mission-text">
              <p className="quote">{t('home.quote')}</p>
              <p>{t('home.mission_text')}</p>
            </div>
            <div className="mission-image">
              <img src="https://filaantro.org/blog/uploads/baba-amte-main-23.jpg" alt="Baba Amte" />
            </div>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="impact">
        <div className="container">
          <h2 className="section-title">{t('home.impact_title')}</h2>
          <div className="impact-stats">
            <div className="stat-item">
              <div className="stat-number">70+</div>
              <div className="stat-label">{t('home.years_service')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">5000+</div>
              <div className="stat-label">{t('home.lives_transformed')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">3</div>
              <div className="stat-label">{t('home.community_centers')}</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">450</div>
              <div className="stat-label">{t('home.acres_reclaimed')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Focus Areas */}
      <section className="focus-areas">
        <div className="container">
          <h2 className="section-title">{t('home.focus_title')}</h2>
          <div className="areas-grid">
            <div className="area-card">
              <div className="area-icon health-icon">
                <FaNotesMedical size={40} color="#fff" />
              </div>
              <h3>{t('home.healthcare')}</h3>
              <p>{t('home.healthcare_desc')}</p>
            </div>
            <div className="area-card">
              <div className="area-icon education-icon">
                <FaBookReader size={40} color="#fff" />
              </div>
              <h3>{t('home.education')}</h3>
              <p>{t('home.education_desc')}</p>
            </div>
            <div className="area-card">
              <div className="area-icon agriculture-icon">
                <FaSeedling size={40} color="#fff" />
              </div>
              <h3>{t('home.agriculture')}</h3>
              <p>{t('home.agriculture_desc')}</p>
            </div>
            <div className="area-card">
              <div className="area-icon empowerment-icon">
                <FaHandsHelping size={40} color="#fff" />
              </div>
              <h3>{t('home.empowerment')}</h3>
              <p>{t('home.empowerment_desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">{t('home.testimonials_title')}</h2>
          <div className="testimonial-slider">
            <div className="testimonial">
              <p>{t('home.testimonial_1')}</p>
              <div className="testimonial-author">
                <img src="https://images.unsplash.com/photo-1632414237690-7713a79fe9d3?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dmlsbGFnZSUyMG1hbnxlbnwwfHwwfHx8MA%3D%3D" alt="Testimonial Author" />
                <div>
                  <h4>Ramesh Patil</h4>
                  <p>{t('home.resident_since')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="get-involved">
        <div className="container">
          <h2>{t('home.get_involved_title')}</h2>
          <p>{t('home.get_involved_subtitle')}</p>
          <div className="involvement-options">
            <Link href="/donate/daan" className="involvement-card">
              <h3>{t('home.donate')}</h3>
              <p>{t('home.donate_desc')}</p>
            </Link>
            <Link href="/contact" className="involvement-card">
              <h3>{t('home.volunteer')}</h3>
              <p>{t('home.volunteer_desc')}</p>
            </Link>
            <Link href="/awareness" className="involvement-card">
              <h3>{t('home.spread_awareness')}</h3>
              <p>{t('home.spread_awareness_desc')}</p>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

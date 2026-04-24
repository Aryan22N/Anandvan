"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';

export default function About() {
  const { t } = useTranslation();

  return (
    <div className="about-page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <h1>{t('about.title')}</h1>
      </div>

      {/* History Section */}
      <section className="about-section fade-in">
        <h2 className="section-title">{t('about.history_title')}</h2>
        <div className="history-grid">
          <div className="history-text">
            <p>{t('about.history_p1')}</p>
            <p>{t('about.history_p2')}</p>
            <p>{t('about.history_p3')}</p>
          </div>
          <div className="history-image-wrapper">
            <img
              src="https://live.staticflickr.com/3596/3309051462_f11e61e315_b.jpg"
              alt="Anandwan History"
            />
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="about-section slide-in">
        <h2 className="section-title">{t('about.mission_vision_title')}</h2>
        <div className="mission-vision-grid">
          <div className="mv-card">
            <h3>
              <span style={{ fontSize: '2rem' }}></span>
              {t('about.mission_label')}
            </h3>
            <p>{t('about.mission_text')}</p>
          </div>
          <div className="mv-card">
            <h3>
              <span style={{ fontSize: '2rem' }}></span>
              {t('about.vision_label')}
            </h3>
            <p>{t('about.vision_text')}</p>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="about-section fade-in">
        <h2 className="section-title">{t('about.founder_title')}</h2>
        <div className="founder-card">
          <div className="founder-img-wrapper">
            <img
              src="https://i.pinimg.com/736x/26/58/49/265849d3ebec6715bd503d2caba49cf1.jpg"
              alt="Baba Amte"
            />
          </div>
          <div className="founder-info">
            <h3>{t('about.founder_name')}</h3>
            <p>{t('about.founder_p1')}</p>
            <p>{t('about.founder_p2')}</p>
            <p>{t('about.founder_p3')}</p>
          </div>
        </div>
      </section>

      {/* Our Work Section */}
      <section className="about-section slide-in">
        <h2 className="section-title">{t('about.work_title')}</h2>
        <div className="work-grid">
          <div className="work-card">
            <h3>🏥 {t('about.work_healthcare')}</h3>
            <ul>
              <li>{t('about.work_healthcare_1')}</li>
              <li>{t('about.work_healthcare_2')}</li>
              <li>{t('about.work_healthcare_3')}</li>
              <li>{t('about.work_healthcare_4')}</li>
              <li>{t('about.work_healthcare_5')}</li>
            </ul>
          </div>
          <div className="work-card">
            <h3>📚 {t('about.work_education')}</h3>
            <ul>
              <li>{t('about.work_education_1')}</li>
              <li>{t('about.work_education_2')}</li>
              <li>{t('about.work_education_3')}</li>
              <li>{t('about.work_education_4')}</li>
              <li>{t('about.work_education_5')}</li>
            </ul>
          </div>
          <div className="work-card">
            <h3>🌱 {t('about.work_sustainability')}</h3>
            <ul>
              <li>{t('about.work_sustainability_1')}</li>
              <li>{t('about.work_sustainability_2')}</li>
              <li>{t('about.work_sustainability_3')}</li>
              <li>{t('about.work_sustainability_4')}</li>
              <li>{t('about.work_sustainability_5')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="about-section fade-in">
        <h2 className="section-title">{t('about.leadership_title')}</h2>
        <div className="leadership-grid">
          <div className="leader-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSENufW0h3eX8OYKDWRkwuShyBtZ2unQKG5vg&s" alt="Dr. Vikas Amte" />
            <h3>{t('about.vikas_amte')}</h3>
            <p>{t('about.vikas_role')}</p>
          </div>
          <div className="leader-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7dvFdmRRJT_HHgdVF27AB6-X9gR8ddOmqQ&s" alt="Dr. Sheetal Amte-Karajgi" />
            <h3>{t('about.sheetal_amte')}</h3>
            <p>{t('about.sheetal_role')}</p>
          </div>
          <div className="leader-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-O5o4qv_TiazNsHlWmjgexS1hUJl84XWUEw&s" alt="Dr. Prakash Amte" />
            <h3>{t('about.prakash_amte')}</h3>
            <p>{t('about.prakash_role')}</p>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="about-section slide-in">
        <h2 className="section-title">{t('about.gallery_title')}</h2>
        <div className="gallery-grid">
          <div className="gallery-item">
            <img src="https://www.thehitavada.com/Encyc/2025/2/10/Dignitaries-along-with-Anandwan-inmates-planting-saplings_202502101127157396_H@@IGHT_320_W@@IDTH_426.jpg" alt="Anandwan Community" />
          </div>
          <div className="gallery-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc_Xl_YV6A1-nnnZWmNownPMdpexnpbQ6gyg&s" alt="Medical Services" />
          </div>
          <div className="gallery-item">
            <img src="https://ecoversities.org/wp-content/uploads/2018/10/welcome-300x200.jpg" alt="Education Programs" />
          </div>
          <div className="gallery-item">
            <img src="https://anandvanfoundation.org/wp-content/uploads/2023/07/Aruva-Copy-85.jpg" alt="Agricultural Activities" />
          </div>
          <div className="gallery-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ6tiUx8mYGu8ixc-ft6myk78S3KZoqxhN9Q&s" alt="Community Events" />
          </div>
          <div className="gallery-item">
            <img src="https://www.tataneu.com/pages/travel/_next/image?url=https%3A%2F%2Fd1msew97rp2nin.cloudfront.net%2Fprodin%2Ftntravel%2Fblogimages%2Fchecklist-for-exploring-artisan-studios-in-india-ae0bf8ed-f823-41a9-b282-78c59b8f385a.webp&w=3840&q=75" alt="Handicraft Production" />
          </div>
          <div className="gallery-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXNOr9Qm4khs6AQ9ejUUnlzhHLi8HF3VVmPg&s" alt="Rehabilitation Work" />
          </div>
          <div className="gallery-item">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Gb3a6nFtbsUcyy4hj_Qbhjy4Tm_uXdIsYQ&s" alt="Sustainable Initiatives" />
          </div>
        </div>
      </section>
    </div>
  );
}

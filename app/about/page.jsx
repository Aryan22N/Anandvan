"use client";

import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './About.css';

export default function About() {
  const { t } = useTranslation();

  // Add animation effect when scrolling
  useEffect(() => {
    const sections = document.querySelectorAll('section');

    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    sections.forEach(section => {
      observer.observe(section);
    });

    return () => {
      sections.forEach(section => {
        observer.unobserve(section);
      });
    };
  }, []);

  return (
    <div className="container mx-auto px-4 py-12" style={{ paddingTop: '100px' }}>
      <h1 className="text-4xl font-bold mb-8 text-center about-title">{t('about.title')}</h1>

      {/* History Section */}
      <section className="mb-16 history-section">
        <h2 className="text-2xl font-bold mb-6 text-green-700 section-header">{t('about.history_title')}</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="mb-4">{t('about.history_p1')}</p>
            <p className="mb-4">{t('about.history_p2')}</p>
            <p>{t('about.history_p3')}</p>
          </div>
          <div className="flex justify-center">
            <img src="https://live.staticflickr.com/3596/3309051462_f11e61e315_b.jpg" alt="Anandwan History" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-green-700 section-header">{t('about.mission_vision_title')}</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="mission-vision p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">{t('about.mission_label')}</h3>
            <p>{t('about.mission_text')}</p>
          </div>
          <div className="mission-vision p-8 rounded-lg">
            <h3 className="text-xl font-bold mb-4">{t('about.vision_label')}</h3>
            <p>{t('about.vision_text')}</p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="mb-16 founder-section">
        <h2 className="text-2xl font-bold mb-6 text-green-700 section-header">{t('about.founder_title')}</h2>
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="flex justify-center">
            <img src="https://i.pinimg.com/736x/26/58/49/265849d3ebec6715bd503d2caba49cf1.jpg" alt="Baba Amte" className="rounded-lg shadow-lg" />
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">{t('about.founder_name')}</h3>
            <p className="mb-4">{t('about.founder_p1')}</p>
            <p className="mb-4">{t('about.founder_p2')}</p>
            <p>{t('about.founder_p3')}</p>
          </div>
        </div>
      </section>

      {/* Our Work */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-green-700 section-header">{t('about.work_title')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="work-card p-6">
            <h3 className="text-xl font-bold mb-4">{t('about.work_healthcare')}</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('about.work_healthcare_1')}</li>
              <li>{t('about.work_healthcare_2')}</li>
              <li>{t('about.work_healthcare_3')}</li>
              <li>{t('about.work_healthcare_4')}</li>
              <li>{t('about.work_healthcare_5')}</li>
            </ul>
          </div>
          <div className="work-card p-6">
            <h3 className="text-xl font-bold mb-4">{t('about.work_education')}</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('about.work_education_1')}</li>
              <li>{t('about.work_education_2')}</li>
              <li>{t('about.work_education_3')}</li>
              <li>{t('about.work_education_4')}</li>
              <li>{t('about.work_education_5')}</li>
            </ul>
          </div>
          <div className="work-card p-6">
            <h3 className="text-xl font-bold mb-4">{t('about.work_sustainability')}</h3>
            <ul className="list-disc pl-5 space-y-2">
              <li>{t('about.work_sustainability_1')}</li>
              <li>{t('about.work_sustainability_2')}</li>
              <li>{t('about.work_sustainability_3')}</li>
              <li>{t('about.work_sustainability_4')}</li>
              <li>{t('about.work_sustainability_5')}</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-green-700 section-header">{t('about.leadership_title')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center leader-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSENufW0h3eX8OYKDWRkwuShyBtZ2unQKG5vg&s" alt="Dr. Vikas Amte" className="w-48 h-48 rounded-full mx-auto mb-4 object-cover" />
            <h3 className="text-xl font-bold">{t('about.vikas_amte')}</h3>
            <p className="text-gray-600">{t('about.vikas_role')}</p>
          </div>
          <div className="text-center leader-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7dvFdmRRJT_HHgdVF27AB6-X9gR8ddOmqQ&s" alt="Dr. Sheetal Amte-Karajgi" className="w-48 h-48 rounded-full mx-auto mb-4 object-cover" />
            <h3 className="text-xl font-bold">{t('about.sheetal_amte')}</h3>
            <p className="text-gray-600">{t('about.sheetal_role')}</p>
          </div>
          <div className="text-center leader-card">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-O5o4qv_TiazNsHlWmjgexS1hUJl84XWUEw&s" alt="Dr. Prakash Amte" className="w-48 h-48 rounded-full mx-auto mb-4 object-cover" />
            <h3 className="text-xl font-bold">{t('about.prakash_amte')}</h3>
            <p className="text-gray-600">{t('about.prakash_role')}</p>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section>
        <h2 className="text-2xl font-bold mb-6 text-green-700 section-header">{t('about.gallery_title')}</h2>
        <div className="gallery-container">
          <div className="gallery-image">
            <img src="https://www.thehitavada.com/Encyc/2025/2/10/Dignitaries-along-with-Anandwan-inmates-planting-saplings_202502101127157396_H@@IGHT_320_W@@IDTH_426.jpg" alt="Anandwan Community" />
          </div>
          <div className="gallery-image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRc_Xl_YV6A1-nnnZWmNownPMdpexnpbQ6gyg&s" alt="Medical Services" />
          </div>
          <div className="gallery-image">
            <img src="https://ecoversities.org/wp-content/uploads/2018/10/welcome-300x200.jpg" alt="Education Programs" />
          </div>
          <div className="gallery-image">
            <img src="https://anandvanfoundation.org/wp-content/uploads/2023/07/Aruva-Copy-85.jpg" alt="Agricultural Activities" />
          </div>
          <div className="gallery-image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ6tiUx8mYGu8ixc-ft6myk78S3KZoqxhN9Q&s" alt="Community Events" />
          </div>
          <div className="gallery-image">
            <img src="https://www.tataneu.com/pages/travel/_next/image?url=https%3A%2F%2Fd1msew97rp2nin.cloudfront.net%2Fprodin%2Ftntravel%2Fblogimages%2Fchecklist-for-exploring-artisan-studios-in-india-ae0bf8ed-f823-41a9-b282-78c59b8f385a.webp&w=3840&q=75" alt="Handicraft Production" />
          </div>
          <div className="gallery-image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXNOr9Qm4khs6AQ9ejUUnlzhHLi8HF3VVmPg&s" alt="Rehabilitation Work" />
          </div>
          <div className="gallery-image">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9Gb3a6nFtbsUcyy4hj_Qbhjy4Tm_uXdIsYQ&s" alt="Sustainable Initiatives" />
          </div>
        </div>
      </section>
    </div>
  );
}

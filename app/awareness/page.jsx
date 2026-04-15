"use client";

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import './Awareness.css';

const LeprosyAwarenessPage = () => {
  const { t } = useTranslation();

  return (
    <div className="awareness-page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <h1>{t('awareness.hero_title')}</h1>
        <p>{t('awareness.hero_subtitle')}</p>
      </div>

      {/* Introduction Section */}
      <section className="section">
        <h2>{t('awareness.what_is_title')}</h2>
        <p>
          {t('awareness.what_is_p1')}
        </p>
        <p>
          {t('awareness.what_is_p2')}
        </p>
      </section>

      {/* Breaking the Myths */}
      <section className="myths-facts-container">
        <div className="myths">
          <h3>{t('awareness.myths_title')}</h3>
          <ul>
            <li><strong>{t('awareness.myth_label')}</strong> {t('awareness.myth_1')}</li>
            <li><strong>{t('awareness.myth_label')}</strong> {t('awareness.myth_2')}</li>
            <li><strong>{t('awareness.myth_label')}</strong> {t('awareness.myth_3')}</li>
            <li><strong>{t('awareness.myth_label')}</strong> {t('awareness.myth_4')}</li>
          </ul>
        </div>

        <div className="facts">
          <h3>{t('awareness.facts_title')}</h3>
          <ul>
            <li><strong>{t('awareness.fact_label')}</strong> {t('awareness.fact_1')}</li>
            <li><strong>{t('awareness.fact_label')}</strong> {t('awareness.fact_2')}</li>
            <li><strong>{t('awareness.fact_label')}</strong> {t('awareness.fact_3')}</li>
            <li><strong>{t('awareness.fact_label')}</strong> {t('awareness.fact_4')}</li>
          </ul>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <h2>{t('awareness.cta_title')}</h2>
        <p>{t('awareness.cta_subtitle')}</p>
        <Link href="/contact" className="cta-button">{t('awareness.cta_button')}</Link>
      </section>
    </div>
  );
};

export default LeprosyAwarenessPage;

"use client";

import React from 'react';
import { useTranslation } from 'react-i18next';
import './Videos.css';

const VideosPage = () => {
  const { t } = useTranslation();

  const videos = [
    {
      id: "eyGg4FVf6_E",
      title: "Baba Amte's Vision",
      description: "Discover the founding principles of Anandwan and how one man's vision transformed thousands of lives."
    },
    {
      id: "rJhQhOA6Fy8",
      title: "Empowering Through Education",
      description: "See how education is empowering the next generation at Anandwan to build a brighter, self-reliant future."
    },
    {
      id: "GB6L2lOMnGE",
      title: "Sustainable Living Practices",
      description: "Learn about our organic farming, water conservation, and renewable energy initiatives."
    },
    {
      id: "iqJcIqaEe-U",
      title: "Voices from Anandwan",
      description: "Hear firsthand accounts from residents whose lives have been transformed by the community."
    },
    {
      id: "fhoHeNOZceA",
      title: "Handicrafts & Artistry",
      description: "A glimpse into the skilled craftsmanship of Anandwan's artisans producing beautiful textiles and crafts."
    },
    {
      id: "uv6pl9qX6SU",
      title: "Healthcare Initiatives",
      description: "An overview of the comprehensive medical care and rehabilitation services provided to the community."
    }
  ];

  return (
    <div className="videos-page">
      {/* Hero Banner */}
      <div className="hero-banner">
        <h1>{t('videos.hero_title')}</h1>
        <p>{t('videos.hero_subtitle')}</p>
      </div>

      {/* Video Grid */}
      <div className="videos-container">
        {videos.map((video, index) => (
          <div className="video-card" key={index}>
            <div className="video-wrapper">
              <iframe 
                src={`https://www.youtube-nocookie.com/embed/${video.id}?rel=0`} 
                title={video.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-info">
              <h3>{video.title}</h3>
              <p>{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VideosPage;

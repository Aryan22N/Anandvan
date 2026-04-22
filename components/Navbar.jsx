"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaBars, FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <nav className={`navbar ${scrolled || !isHomePage ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <Link href="/" className="navbar-logo">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRH-JSFGNHy_Hl7nabU8pxmaNQ8oUJ-Yhp1jA&s"
            alt="Anandwan"
          />
          Anandwan
        </Link>

        <div className="navbar-links">
          <Link href="/">{t('nav.home')}</Link>
          <Link href="/about">{t('nav.about')}</Link>
          <Link href="/awareness">{t('nav.awareness')}</Link>
          <Link href="/fundraiser">{t('nav.fundraiser')}</Link>
          <Link href="/products">Products</Link>
          <Link href="/videos">{t('nav.videos')}</Link>
          <Link href="/contact">{t('nav.contact')}</Link>
          
          <select 
            className="language-switcher" 
            value={i18n.language} 
            onChange={changeLanguage}
            suppressHydrationWarning
            style={{ marginLeft: '1rem', padding: '0.3rem', borderRadius: '4px', background: 'transparent', color: '#fff', border: '1px solid rgba(255,255,255,0.6)' }}
          >
            <option value="en" style={{ color: '#000' }}>English</option>
            <option value="hi" style={{ color: '#000' }}>हिंदी</option>
            <option value="mr" style={{ color: '#000' }}>मराठी</option>
          </select>
        </div>

        <button
          className="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <div className={`mobile-menu ${isMenuOpen ? 'show' : ''}`}>
          <Link href="/" onClick={() => setIsMenuOpen(false)}>{t('nav.home')}</Link>
          <Link href="/about" onClick={() => setIsMenuOpen(false)}>{t('nav.about')}</Link>
          <Link href="/awareness" onClick={() => setIsMenuOpen(false)}>{t('nav.awareness')}</Link>
          <Link href="/fundraiser" onClick={() => setIsMenuOpen(false)}>{t('nav.fundraiser')}</Link>
          <Link href="/products" onClick={() => setIsMenuOpen(false)}>Products</Link>
          <Link href="/videos" onClick={() => setIsMenuOpen(false)}>{t('nav.videos')}</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)}>{t('nav.contact')}</Link>
          <select 
            className="language-switcher-mobile" 
            value={i18n.language} 
            onChange={(e) => { changeLanguage(e); setIsMenuOpen(false); }}
            suppressHydrationWarning
            style={{ margin: '1rem', padding: '0.5rem', width: '90%', fontSize: '1.2rem'}}
          >
            <option value="en">English</option>
            <option value="hi">हिंदी</option>
            <option value="mr">मराठी</option>
          </select>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

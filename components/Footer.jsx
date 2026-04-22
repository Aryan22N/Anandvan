"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import './Footer.css';

function Footer() {
  const [email, setEmail] = useState('');
  const [subscribeStatus, setSubscribeStatus] = useState('');
  const [year, setYear] = useState(2024);

  React.useEffect(() => {
    setYear(new Date().getFullYear());
  }, []);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribeStatus('Thank you for subscribing!');
      setEmail('');
      setTimeout(() => setSubscribeStatus(''), 3000);
    }
  };

  return (
    <footer className="footer">
      <div className="footer-waves">
        <div className="wave wave1"></div>
        <div className="wave wave2"></div>
        <div className="wave wave3"></div>
      </div>
      <div className="footer-content">
        <div className="footer-section">
          <h3>Anandwan</h3>
          <p>Transforming lives through dignity, empowerment, and sustainable development since 1949.</p>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/projects">Our Projects</Link></li>
            <li><Link href="/fundraiser">Support Us</Link></li>
            <li><Link href="/contact">Contact</Link></li>
          </ul>
        </div>
        <div className="footer-section">
          <h3>Contact Info</h3>
          <ul className="contact-info">
            <li><i className="fas fa-map-marker-alt"></i> Anandwan, Warora, Maharashtra 442914</li>
            <li><i className="fas fa-phone"></i> +91 07176-282051</li>
            <li><i className="fas fa-envelope"></i> info@anandwan.org</li>
          </ul>
        </div>
        <div className="footer-section newsletter">
          <h3>Newsletter</h3>
          <p>Stay updated with our latest news and developments.</p>
          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input 
              type="email" 
              placeholder="Enter your email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              suppressHydrationWarning
            />
            <button type="submit" suppressHydrationWarning>Subscribe</button>
          </form>
          {subscribeStatus && (
            <p className="subscribe-status">{subscribeStatus}</p>
          )}
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {year} Anandwan. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;

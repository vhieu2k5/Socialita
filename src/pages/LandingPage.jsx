import React, { useEffect, useRef, useState } from 'react';

/* Intersection-observer based reveal hook */
function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

export const LandingPage = ({ onEnter, onAbout }) => {
  useReveal();
  const aboutRef = useRef(null);
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const scrollToAbout = () => {
    if (aboutRef.current) {
      aboutRef.current.scrollIntoView({ behavior: 'smooth' });
    } else {
      onAbout && onAbout();
    }
  };

  const handlePlayVideo = () => {
    setIsVideoOpen(true);
    // Venetian blind effect happens via CSS class "video-modal--open"
  };

  const handleCloseVideo = () => {
    setIsVideoOpen(false);
  };

  return (
    <div className="landing-page">
      {/* ── NAV ── */}
      <nav className="landing-nav" data-reveal style={{ '--delay': '0s' }}>
        <div className="landing-nav__logo">
          <img src="/logo.png" alt="Socialita" />
          <span>Socialita</span>
        </div>
        <div className="landing-nav__links">
          <button onClick={scrollToAbout} className="landing-nav__link">Features</button>
          <button onClick={onEnter} className="landing-nav__cta">Sign In</button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="landing-hero">
        <div className="landing-blob landing-blob--1" />
        <div className="landing-blob landing-blob--2" />

        <div className="landing-hero__left" data-reveal style={{ '--delay': '0.1s' }}>
          <img
            src="/pics/Socialita_Square_1x1.png"
            alt="Socialita"
            className="landing-hero__emblem"
          />
        </div>

        <div className="landing-hero__right">
          <p className="landing-hero__eyebrow" data-reveal style={{ '--delay': '0.2s' }}>
            Mini Social Network
          </p>
          {/* Text Clipping Mask Effect from specs */}
          <h1 className="landing-hero__headline text-clip-mask" data-reveal style={{ '--delay': '0.3s' }}>
            More Than<br />Just Social.
          </h1>
          <p className="landing-hero__sub" data-reveal style={{ '--delay': '0.4s' }}>
            Create an account, publish posts with text and images, connect with friends, chat in real-time, and follow a personalized newsfeed.
          </p>
          <div className="landing-hero__actions" data-reveal style={{ '--delay': '0.5s' }}>
            <button className="landing-btn landing-btn--primary" onClick={onEnter}>
              Enter site
            </button>
            <button className="landing-btn landing-btn--ghost" onClick={scrollToAbout}>
              Explore Features
            </button>
          </div>
        </div>
      </section>

      {/* ── INFINITE MARQUEE TICKER ── */}
      <div className="marquee-container">
        <div className="marquee-track">
          <span className="marquee-text">--- CONNECT WITH FRIENDS --- SHARE RICH MEDIA --- REAL-TIME MESSAGING --- PERSONALIZED NEWSFEED ---</span>
          <span className="marquee-text">--- CONNECT WITH FRIENDS --- SHARE RICH MEDIA --- REAL-TIME MESSAGING --- PERSONALIZED NEWSFEED ---</span>
        </div>
      </div>

      {/* ── VIDEO PLACEHOLDER SECTION ── */}
      <section className="landing-video-section" data-reveal>
        <div className="landing-video-wrapper">
          <img src="/pics/Socialita_Banner.png" alt="Video Thumbnail" className="landing-video-thumb" />
          <div className="landing-video-overlay">
            <button className="play-button magnetic" onClick={handlePlayVideo}>
              <svg viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
            </button>
            <h3>Watch the Trailer</h3>
          </div>
        </div>
      </section>

      {/* VIDEO MODAL (Venetian Blinds Transition) */}
      <div className={`video-modal ${isVideoOpen ? 'video-modal--open' : ''}`}>
        <div className="stripe stripe-1"></div>
        <div className="stripe stripe-2"></div>
        <div className="stripe stripe-3"></div>
        <div className="stripe stripe-4"></div>
        <div className="stripe stripe-5"></div>
        
        <div className="video-modal-content">
          <button className="close-video" onClick={handleCloseVideo}>✕</button>
          {isVideoOpen && (
            <div className="video-placeholder">
              <img src="/pics/Socialita_Banner.png" alt="Playing Video..." />
              <div className="playing-text">Video Playing...</div>
            </div>
          )}
        </div>
      </div>

      {/* ── FEATURES GRID ── */}
      <section className="landing-features" ref={aboutRef}>
        <div className="landing-section-header" data-reveal>
          <span className="landing-pill">Platform Features</span>
          <h2>A complete social experience.</h2>
          <p>Everything you need in a modern, scalable social network application.</p>
        </div>

        <div className="landing-features__grid">
          {[
            {
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>,
              title: 'Personalized Newsfeed',
              desc: 'Follow your friends\' posts on a personalized newsfeed. React with hearts and comment instantly on what matters to you.'
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
              title: 'Real-time Messaging',
              desc: 'One-to-one real-time chat with a familiar Messenger-like interface. Always fast, always secure.'
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" /></svg>,
              title: 'Rich Media Posts',
              desc: 'Create and publish posts with text, photos, and video extensions. Manage your personal profile seamlessly.'
            },
            {
              icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>,
              title: 'Admin Moderation',
              desc: 'Full administrative control to delete posts, manage accounts, and monitor user statistics and activities.'
            },
          ].map((feat, i) => (
            <div className="landing-feature-card" key={i} data-reveal style={{ '--delay': `${0.1 * i}s` }}>
              <div className="landing-feature-card__icon">{feat.icon}</div>
              <h3>{feat.title}</h3>
              <p>{feat.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── BANNER / CTA ── */}
      <section className="landing-cta-section" data-reveal>
        <div className="landing-cta-section__inner">
          <img src="/logo.png" alt="" className="landing-cta-section__logo" />
          <h2>Join the community.</h2>
          <button className="landing-btn landing-btn--primary" onClick={onEnter}>
            Get Started Now
          </button>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="landing-footer">
        <div className="landing-footer__inner">
          <div className="landing-footer__brand">
            <img src="/logo.png" alt="Socialita" />
            <span>Socialita</span>
          </div>
          <p className="landing-footer__copy">© 2026 Socialita. Mini Social Network Project.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

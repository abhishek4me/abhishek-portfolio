import React from 'react';
import { motion } from 'framer-motion';
import ProfileCard from './ProfileCard/ProfileCard';
import DarkVeil from './DarkVeil/DarkVeil';
import './HeroSection.css';

const HeroSection = () => {
  // Smooth scroll to experience-section
  const scrollToExperience = () => {
    const experienceSection = document.getElementById('experience-section');
    if (experienceSection) {
      const offsetTop = experienceSection.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  // Smooth scroll to contact-section
  const scrollToContact = () => {
    const contactSection = document.getElementById('contact-section');
    if (contactSection) {
      const offsetTop = contactSection.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  return (
    <section className="hero-section">
      {/* Animated Background */}
      <div className="darkveil-background">
        <DarkVeil
          hueShift={270}
          noiseIntensity={0.03}
          scanlineIntensity={0}
          speed={0.4}
          scanlineFrequency={0}
          warpAmount={0.3}
          resolutionScale={1}
        />
      </div>

      <div className="hero-container">
        <div className="hero-main-content">
          {/* Left: ProfileCard */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -50 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{
              duration: 1.2,
              delay: 0.5,
              type: "spring",
              stiffness: 100
            }}
            className="profile-card-column"
          >
            <ProfileCard
              name="Abhishek R S"
              title="B.Tech Electronics and CS"
              contactText="Let's Connect"
              avatarUrl="https://iili.io/Fvpn2WX.md.jpg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={scrollToContact}
            />
          </motion.div>

          {/* Right: Headings & buttons */}
          <motion.div
            className="content-column"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <div className="hero-content-text">
              <h1 className="hero-main-title">
                <span className="title-line">ABHISHEK'S</span>
                <span className="title-line">PORTFOLIO</span>
              </h1>
              <p className="hero-description">
                B.Tech Electronics & Computer Science Student
              </p>
              <p className="hero-tagline">
                Passionate about crafting digital experiences with precision and creativity.
              </p>
              <div className="hero-cta-buttons">
                <motion.button
                  className="hero-btn-primary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToExperience}
                >
                  View My Work
                </motion.button>
                <motion.button
                  className="hero-btn-secondary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToContact}
                >
                  Get In Touch
                </motion.button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

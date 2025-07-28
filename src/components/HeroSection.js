import React from 'react';
import { motion } from 'framer-motion';
import ProfileCard from './ProfileCard/ProfileCard';
import './HeroSection.css';

const HeroSection = () => {
  // Enhanced smooth scroll function with offset
  const scrollToExperience = () => {
    const experienceSection = document.getElementById('experience-section');
    if (experienceSection) {
      const offsetTop = experienceSection.offsetTop - 80; // 80px offset from top
      
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="hero-section">
      <div className="hero-container">
        
        {/* Two-column layout - ProfileCard on left, content on right */}
        <div className="hero-main-content">
          
          {/* Left column - ProfileCard */}
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
              handle="abhishek6969"
              status="Available for opportunities"
              contactText="Let's Connect"
              avatarUrl="/hhh.jpeg"
              miniAvatarUrl="/hhh.jpeg"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={() => {
                window.open('https://www.linkedin.com/in/abhishek6969/', '_blank');
              }}
            />
          </motion.div>

          {/* Right column - Content area */}
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
              
              {/* CTA Buttons */}
              <div className="hero-cta-buttons">
                <motion.button
                  className="hero-btn-primary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={scrollToExperience} // SMOOTH SCROLL FUNCTION
                >
                  View My Work
                </motion.button>
                <motion.button
                  className="hero-btn-secondary"
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    window.open('https://www.linkedin.com/in/abhishek6969/', '_blank');
                  }}
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

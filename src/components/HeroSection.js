import React from 'react';
import { motion } from 'framer-motion';
import ProfileCard from './ProfileCard/ProfileCard';
import CurvedLoop from './CurvedLoop/CurvedLoop';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <div className="hero-container">
        {/* Animated Curved Loop Text */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="curved-text-container"
        >
          <CurvedLoop
            marqueeText="Abhishek's 👽 Portfolio 👽 Abhishek's  Portfolio 👽 Abhishek's 👽 Portfolio 👽 Abhishek's  Portfolio"
            speed={1}
            curveAmount={0}
            direction="left"
            interactive={true}
            className="custom-text-style"
          />
        </motion.div>

        {/* ProfileCard with Animation */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotateY: 180 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ 
            duration: 1.2, 
            delay: 1.5,
            type: "spring",
            stiffness: 100
          }}
          className="profile-card-wrapper"
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

        {/* Animated Subtitle */}
        <motion.div 
          className="subtitle-container"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 2.5 }}
        >
          <p className="hero-subtitle">Welcome to my digital Portfolio</p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

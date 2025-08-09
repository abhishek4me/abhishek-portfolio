import React, { Suspense } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollFloat from '../ScrollFloat/ScrollFloat';
import './ExperienceSection.css';

const CircularGallery = React.lazy(() => import('../CircularGallery/CircularGallery'));

const ExperienceSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  // **UPDATED: Added NASSCOM certificate**
  const certificates = [
    {
      image: "https://i.ibb.co/jZhwx8Kf/Abhishek-R-S-level-up-page-0001.jpg",
      text: "Level Up Certificate"
    },
    {
      image: "https://i.ibb.co/bj40prnh/designx2025.png",
      text: "DesignX 2025 Certificate"
    },
    {
      image: "https://i.ibb.co/wZ443nXf/quick-code.jpg",
      text: "Quick Code Certificate"
    },
    {
      image: "https://i.ibb.co/Gv4dVjPL/Screenshot-2025-07-23-004715.png",
      text: "Achievement Certificate"
    },
    {
      image: "https://i.ibb.co/WvmQm8zP/Certificate-Abhishek-1.jpg",
      text: "Professional Certification I"
    },
    {
      image: "https://i.ibb.co/8DVq9vRh/Certificate-Abhishek-2.jpg",
      text: "Professional Certification II"
    },
    {
      image: "https://i.ibb.co/4n53SzP5/Certificate-Abhishek-3.jpg",
      text: "Professional Certification III"
    },
    {
      image: "https://i.ibb.co/7xnGKJqN/Certificate-Abhishek-4.jpg",
      text: "Professional Certification IV"
    },
    {
      image: "https://i.ibb.co/XZBv4g36/Sherlocks-2.png",
      text: "Sherlocks Achievement"
    },
    // **NEW NASSCOM CERTIFICATE ADDED**
    {
      image: "https://i.ibb.co/V8ytdg8/Certificate-of-nasscom.jpg",
      text: "NASSCOM Certification"
    }
  ];

  return (
    <section id="experience-section" className="experience-section">
      <div className="container">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.2}
          containerClassName="experience-title-float"
          textClassName="experience-title-text"
        >
          Certificates & Achievements
        </ScrollFloat>
        
        <motion.div
          ref={ref}
          className="gallery-container"
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="gallery-wrapper">
            <Suspense fallback={
              <div className="gallery-loading">
                <div className="loading-spinner"></div>
                <p>Loading certificates...</p>
              </div>
            }>
              <CircularGallery
                items={certificates}
                bend={3}
                textColor="#E0E0E0"
                borderRadius={0.08}
                font="bold 24px Inter"
                scrollSpeed={2}
                scrollEase={0.02}
              />
            </Suspense>
          </div>
          
          <div className="gallery-instructions">
            <p>Scroll, drag, or click certificates to explore achievements</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;

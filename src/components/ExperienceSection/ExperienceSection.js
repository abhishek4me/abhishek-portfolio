import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollFloat from '../ScrollFloat/ScrollFloat';
import CircularGallery from '../CircularGallery/CircularGallery';
import './ExperienceSection.css';

const ExperienceSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  // Certificate data with professional achievement images
  const certificates = [
    {
      image: "https://images.pexels.com/photos/267507/pexels-photo-267507.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      text: "Python Programming Certificate"
    },
    {
      image: "https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      text: "Web Development Certification"
    },
    {
      image: "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      text: "Data Analysis Certificate"
    },
    {
      image: "https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      text: "Content Writing Award"
    },
    {
      image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      text: "Leadership Excellence"
    },
    {
      image: "https://images.pexels.com/photos/3182834/pexels-photo-3182834.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      text: "Technical Workshop Completion"
    },
    {
      image: "https://images.pexels.com/photos/3184639/pexels-photo-3184639.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      text: "Project Management Certification"
    },
    {
      image: "https://images.pexels.com/photos/3182826/pexels-photo-3182826.jpeg?auto=compress&cs=tinysrgb&w=800&h=600",
      text: "IT Networking Certificate"
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
            <CircularGallery
              items={certificates}
              bend={3}
              textColor="#E0E0E0"
              borderRadius={0.08}
              font="bold 24px Inter"
              scrollSpeed={2}
              scrollEase={0.02}
            />
          </div>
          
          <div className="gallery-instructions">
            <p>Scroll or drag to explore my certificates</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;
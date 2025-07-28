import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollFloat from '../ScrollFloat/ScrollFloat';
import './ExperienceSection.css';

const ExperienceSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const experiences = [
    "Freelance Content Writer",
    "Curious to work on Python",
    "Leader in multiple group projects & competitions",
    "Active member, IT workshops & tech networks"
  ];

  return (
    // ADDED: id="experience-section" for smooth scroll targeting
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
          Experience & Achievements
        </ScrollFloat>
        
        <motion.div
          ref={ref}
          className="experience-list"
        >
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              className="experience-item"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.15 
              }}
            >
              <div className="experience-bullet"></div>
              <p>{experience}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;

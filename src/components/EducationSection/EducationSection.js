import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollFloat from '../ScrollFloat/ScrollFloat';
import './EducationSection.css';

const EducationSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const educationData = [
    {
      institution: "APJ Abdul Kalam Technical University",
      period: "2024-Present",
      degree: "B.Tech, Electronics & Computer Science",
      id: 1
    },
    {
      institution: "Sarvodaya Central Vidyalaya (CBSE)",
      period: "2023-2024",
      degree: "Higher Secondary",
      id: 2
    },
    {
      institution: "St. Antony's Public School, Annakal",
      period: "2022-2023",
      degree: "Studies Completed",
      id: 3
    },
    {
      institution: "Kendriya Vidyalaya",
      period: "2010-2020",
      degree: "Grades 1-10",
      id: 4
    }
  ];

  return (
    <section className="education-section">
      <div className="container">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.2}
          containerClassName="education-title-float"
          textClassName="education-title-text"
        >
          Educational Journey
        </ScrollFloat>
        
        <motion.div
          ref={ref}
          className="timeline-container"
        >
          {educationData.map((item, index) => (
            <motion.div
              key={item.id}
              className="timeline-item"
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2 
              }}
            >
              <h3>{item.institution}</h3>
              <p><strong>{item.period}:</strong> {item.degree}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollFloat from '../ScrollFloat/ScrollFloat';
import './SkillsSection.css';

const SkillsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const skills = [
    { name: "Python Programming", level: "Expert", color: "#6C35E1" },
    { name: "Article & Blog Writing", level: "Advanced", color: "#9F7AEA" },
    { name: "Leadership & Teamwork", level: "Advanced", color: "#6C35E1" },
    { name: "English", level: "Fluent", color: "#9F7AEA" },
    { name: "Hindi", level: "Fluent", color: "#6C35E1" },
    { name: "Tamil", level: "Good", color: "#9F7AEA" }
  ];

  return (
    <section className="skills-section">
      <div className="container">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.2}
          containerClassName="skills-title-float"
          textClassName="skills-title-text"
        >
          Skills
        </ScrollFloat>
        
        <motion.div
          ref={ref}
          className="skills-grid"
        >
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              className="skill-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1 
              }}
              style={{ borderColor: skill.color }}
            >
              <h3>{skill.name}</h3>
              <span className="skill-level" style={{ backgroundColor: skill.color }}>
                {skill.level}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;

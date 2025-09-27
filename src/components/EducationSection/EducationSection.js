import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollStack, { ScrollStackItem } from '../ScrollStack/ScrollStack';
import ScrollFloat from '../ScrollFloat/ScrollFloat';
import './EducationSection.css';

const EducationSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const educationData = [
    {
      id: 1,
      institution: "Marian Engineering College",
      location: "Trivandrum, Kerala",
      period: "2023-Present",
      degree: "B.Tech Electronics & Computer Engineering",
      currentStatus: "2nd Year Student",
      description: "Currently pursuing Bachelor of Technology in Electronics and Computer Engineering, focusing on embedded systems, programming, and digital electronics.",
      image: "https://i.ibb.co/pBQ0f0wc/IMG-20250325-WA0023.jpg",
      achievements: [
        "Active participation in hackathons",
        "Web development projects using React.js",
        "Electronics project implementations"
      ]
    },
    {
      id: 2,
      institution: "Sarvodaya Central Vidyalaya (CBSE)",
      location: "Kerala",
      period: "2022-2023",
      degree: "Higher Secondary Education (Class XII)",
      currentStatus: "Completed",
      description: "Completed higher secondary education with focus on Science stream, preparing foundation for engineering studies.",
      image: "https://i.ibb.co/gbkNrKfP/IMG-1152-EDIT.jpg",
      achievements: [
        "Science stream specialization",
        "Strong foundation in Mathematics and Physics",
        "Preparation for engineering entrance exams"
      ]
    },
    {
      id: 3,
      institution: "St. Antony's Public School, Annakal",
      location: "Kerala",
      period: "2021-2022",
      degree: "Secondary Education (Class XI)",
      currentStatus: "Completed",
      description: "Completed intermediate studies with focus on building strong academic foundation in science subjects.",
      image: "https://media.licdn.com/dms/image/v2/C560BAQF09LaGn5Y8Tw/company-logo_200_200/company-logo_200_200/0/1630634735248/st_antonys_public_school_logo?e=2147483647&v=beta&t=SEt_dAi9MNX-mtr2hEeqDHaCICxNx6nVuDBra2Rs5io",
      achievements: [
        "Academic excellence in science subjects",
        "Active participation in school activities",
        "Leadership development programs"
      ]
    },
    {
      id: 4,
      institution: "Kendriya Vidyalaya",
      location: "India",
      period: "2010-2021",
      degree: "Primary & Secondary Education (Grades 1-10)",
      currentStatus: "Completed",
      description: "Foundation education covering primary and secondary levels, developing core academic skills and interests in science and technology.",
      image: "https://designersio.com/wp-content/uploads/2024/04/5a4ef9b9d7806da10afb1e9b3efdb22d-300x300.jpg",
      achievements: [
        "Strong foundation in Mathematics and Science",
        "Early interest in technology and programming",
        "Consistent academic performance",
        "Participation in science exhibitions"
      ]
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
          className="education-scroll-container"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <ScrollStack
            className="education-stack"
            itemDistance={120}
            itemScale={0.05}
            itemStackDistance={40}
            stackPosition="25%"
            scaleEndPosition="15%"
            baseScale={0.9}
            useWindowScroll={true}
          >
            {educationData.map((item, index) => (
              <ScrollStackItem key={item.id} itemClassName="education-card">
                <div className="education-card-content">
                  <div className="education-card-header">
                    <div className="education-image-container">
                      <img 
                        src={item.image} 
                        alt={item.institution}
                        className="education-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="education-header-text">
                      <h3 className="institution-name">{item.institution}</h3>
                      <p className="institution-location">{item.location}</p>
                      <span className="education-period">{item.period}</span>
                    </div>
                  </div>
                  
                  <div className="education-details">
                    <h4 className="degree-title">{item.degree}</h4>
                    <p className="current-status">{item.currentStatus}</p>
                    <p className="education-description">{item.description}</p>
                    
                    <div className="achievements-section">
                      <h5>Key Highlights:</h5>
                      <ul className="achievements-list">
                        {item.achievements.map((achievement, idx) => (
                          <li key={idx} className="achievement-item">
                            {achievement}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </ScrollStackItem>
            ))}
          </ScrollStack>
        </motion.div>
      </div>
    </section>
  );
};

export default EducationSection;
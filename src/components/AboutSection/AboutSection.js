import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollFloat from '../ScrollFloat/ScrollFloat';
import DecryptedText from '../DecryptedText/DecryptedText';
import './AboutSection.css';

const AboutSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const aboutText = `I am Abhishek R S, a Second year B.Tech student in Electronics and Computer Engineering at APJ Abdul Kalam Technological University. I come from a family that values discipline, purpose, and steady growth which are the traits that I've absorbed from my father, a train manager as well as a retired army officer, and my mother, whose resilience and dedication shape our home.

My academic journey began under the CBSE curriculum, where I built strong communication skills in English and Hindi, and developed working fluency in Tamil. Early on, I found a deep interest in technology and programming. By the end of high school, I had independently learned Python and later earned an A+ in the KTU First year semester examination.

Writing is another space where I thrive. I've contributed to several group projects and written technical and research-based documents. Whether it's breaking down complex ideas or leading collaborative efforts, I focus on clarity, structure, and impact.

Outside academics, I enjoy working in teams, often stepping into leadership roles to coordinate tasks and guide project flow. I like taking initiative, especially when it involves solving real problems or organizing efforts that bring people together. My teachers often describe me as dependable, thoughtful, and consistently focused on improvement.

At home, I share a close bond with my younger brother, who's in high school, and our pet cat, Pisu, who adds a touch of fun to everyday life. Respect, curiosity, and a steady drive to grow these are the things which define how I work, learn, and show up for others. I'm still learning, still building, and always ready for the next challenge.`;

  const paragraphs = aboutText.split('\n\n');

  return (
    <section className="about-section">
      <div className="container">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.2}
          containerClassName="about-me-float"
          textClassName="about-me-text"
        >
          About Me
        </ScrollFloat>
        
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="about-content"
        >
          {paragraphs.map((paragraph, index) => (
            <motion.div
              key={index}
              className="about-paragraph-container"
              initial={{ opacity: 0, x: -50 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ 
                duration: 0.8, 
                delay: 0.3 + (index * 0.5) 
              }}
            >
              <DecryptedText
                text={paragraph}
                speed={30}
                maxIterations={15}
                animateOn="view"
                revealDirection="start"
                className="decrypted-text"
                parentClassName="decrypted-parent"
                encryptedClassName="encrypted-char"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;

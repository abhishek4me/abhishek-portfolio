import React from 'react';
import { motion } from 'framer-motion';
import ScrollFloat from '../ScrollFloat/ScrollFloat';
import './ContactSection.css';

const ContactSection = () => {
  const contactLinks = [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/in/abhishek6969/",
      icon: "💼",
      color: "#0A66C2"
    },
    {
      name: "Email",
      url: "mailto:abhishek@example.com",
      icon: "📧",
      color: "#FF8C00"
    },
    {
      name: "GitHub",
      url: "https://github.com/abhishek6969",
      icon: "💻",
      color: "#333"
    }
  ];

  return (
    <section className="contact-section">
      <div className="container">
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=40%'
          stagger={0.2}
          containerClassName="contact-title-float"
          textClassName="contact-title-text"
        >
          Let's Connect
        </ScrollFloat>
        
        <motion.div
          className="contact-links"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
        >
          {contactLinks.map((link, index) => (
            <motion.a
              key={index}
              href={link.url}
              className="contact-link"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ 
                duration: 0.3, 
                delay: index * 0.1 
              }}
              viewport={{ once: true }}
            >
              <span className="contact-icon">{link.icon}</span>
              <span className="contact-name">{link.name}</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;

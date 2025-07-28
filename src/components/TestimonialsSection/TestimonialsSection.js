import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollFloat from '../ScrollFloat/ScrollFloat';
import TiltedCard from '../TiltedCard/TiltedCard';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  const testimonials = [
    {
      quote: "Abhishek is truly someone who follows through. Intelligent, humble, and always inquisitive, whether it is tech stuff or writing he applies true thought and effort. You can count on him to get things done, and he goes and does it without a problem.",
      author: "Karan A S",
      title: "Classmate",
      image: "https://i.ibb.co/BVx19nZ8/IMG-20250705-WA0010.jpg",
      linkedin: "https://www.linkedin.com/in/karan-a-s-862612235/",
      id: 1
    },
    {
      quote: "Working with Abhishek is like turning the lights on, I mean whenever he is in team the things just start moving. He is smart, he is focused, and he genuinely cares about the people around him. Projects in collaboration with him are successful but moreover feel good to be part of.",
      author: "Karthik R K",
      title: "Benchmate",
      image: "https://i.ibb.co/dJ0jhJz0/20241125-101235-EDIT.jpg",
      linkedin: "https://www.linkedin.com/in/karthik-r-k-22b97733b/",
      id: 2
    },
    {
      quote: "The most striking thing about Abhishek is his balance ie he is ambitious but down to earth, skilled but continuously learning. He is not boastful, but the value of his work and the way that he treats other people is louder than anything he could say.",
      author: "Madhav",
      title: "Teammate",
      image: "https://i.ibb.co/XrLGy3vG/20241125-101235-EDIT.jpg",
      linkedin: "https://www.linkedin.com/in/madhav-s-951392331/",
      id: 3
    }
  ];

  const [hoveredCard, setHoveredCard] = useState(null);

  return (
    <section className="testimonials-section">
      <ScrollFloat
        animationDuration={1}
        ease='back.inOut(2)'
        scrollStart='center bottom+=50%'
        scrollEnd='bottom bottom-=40%'
        stagger={0.2}
        containerClassName="testimonials-title-float"
        textClassName="testimonials-title-text"
      >
        What People Say
      </ScrollFloat>
      
      <motion.div
        ref={ref}
        className="testimonials-grid"
      >
        {testimonials.map((testimonial, index) => {
          const isHovered = hoveredCard === testimonial.id;
          const isCenter = index === 1;
          
          return (
            <motion.div
              key={testimonial.id}
              className={`testimonial-card-wrapper position-${index}`}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { 
                opacity: 1, 
                y: 0,
                scale: isHovered ? 1.05 : isCenter ? 1.02 : 1,
                filter: isHovered ? 'brightness(1.1)' : 'brightness(1)'
              } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.2,
                ease: "easeOut"
              }}
              onHoverStart={() => setHoveredCard(testimonial.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <TiltedCard
                containerHeight="100%"
                containerWidth="100%"
                imageHeight="100%"
                imageWidth="100%"
                scaleOnHover={1.5}
                rotateAmplitude={18}
                showMobileWarning={false}
                showTooltip={false}
              >
                <div className={`testimonial-card ${isHovered ? 'hovered' : ''}`}>
                  <div className="testimonial-header">
                    <a
                      href={testimonial.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="testimonial-profile-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        src={testimonial.image}
                        alt={testimonial.author}
                        className="testimonial-profile-image"
                      />
                    </a>
                    <div className="testimonial-author-info">
                      <h4 className="testimonial-author-name">{testimonial.author}</h4>
                      <p className="testimonial-author-title">{testimonial.title}</p>
                    </div>
                  </div>
                  
                  <p className="testimonial-quote">{testimonial.quote}</p>
                </div>
              </TiltedCard>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};

export default TestimonialsSection;

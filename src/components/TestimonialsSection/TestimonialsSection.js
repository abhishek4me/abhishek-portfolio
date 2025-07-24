import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import ScrollFloat from '../ScrollFloat/ScrollFloat';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const [ref, inView] = useInView({
    threshold: 0.3,
    triggerOnce: true
  });

  const testimonials = [
    {
      quote: "Abhishek is truly someone who follows through. Intelligent, humble, and always inquisitive, whether it is tech stuff or writing he applies true thought and effort. You can count on him to get things done, and he goes and does it without a problem.",
      author: "Karan A S",
      title: "Classmate",
      id: 1
    },
    {
      quote: "Working with Abhishek is like turning the lights on, I mean whenever he is in team the things just start moving. He is smart, he is focused, and he genuinely cares about the people around him. Projects in collaboration with him are successful but moreover feel good to be part of.",
      author: "Karthik R K",
      title: "Benchmate",
      id: 2
    }
  ];

  return (
    <section className="testimonials-section">
      <div className="container">
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
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              className="testimonial-card"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.3 
              }}
            >
              <div className="quote-mark">"</div>
              <p className="testimonial-quote">{testimonial.quote}</p>
              <div className="testimonial-author">
                <div className="author-avatar">👨‍💻</div>
                <div className="author-info">
                  <span className="author-name">{testimonial.author}</span>
                  <span className="author-title">{testimonial.title}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

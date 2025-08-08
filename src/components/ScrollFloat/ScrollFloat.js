import React from 'react';
import { motion } from 'framer-motion';

const ScrollFloat = ({ 
  children, 
  animationDuration = 1,
  ease = 'back.inOut(2)',
  scrollStart = 'center bottom+=50%',
  scrollEnd = 'bottom bottom-=40%',
  stagger = 0.2,
  containerClassName = '',
  textClassName = ''
}) => {
  const words = typeof children === 'string' ? children.split(' ') : [children];

  return (
    <div className={containerClassName}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ 
          duration: animationDuration,
          ease: ease === 'back.inOut(2)' ? [0.68, -0.55, 0.265, 1.55] : ease
        }}
      >
        {words.length > 1 ? (
          <h1 className={textClassName}>
            {words.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: animationDuration * 0.8,
                  delay: index * stagger,
                  ease: ease === 'back.inOut(2)' ? [0.68, -0.55, 0.265, 1.55] : ease
                }}
                style={{ display: 'inline-block', marginRight: '0.3em' }}
              >
                {word}
              </motion.span>
            ))}
          </h1>
        ) : (
          <h1 className={textClassName}>{children}</h1>
        )}
      </motion.div>
    </div>
  );
};

export default ScrollFloat;

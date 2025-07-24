import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection/AboutSection';
import EducationSection from './components/EducationSection/EducationSection';
import SkillsSection from './components/SkillsSection/SkillsSection';
import ExperienceSection from './components/ExperienceSection/ExperienceSection';
import TestimonialsSection from './components/TestimonialsSection/TestimonialsSection';
import ContactSection from './components/ContactSection/ContactSection';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        {/* Hero Section with Animated CurvedLoop Text and ProfileCard */}
        <HeroSection />
        
        {/* About Me Section with ScrollFloat Animation */}
        <AboutSection />
        
        {/* Educational Journey Timeline Section */}
        <EducationSection />
        
        {/* Skills Section with Animated Cards */}
        <SkillsSection />
        
        {/* Experience & Achievements Section */}
        <ExperienceSection />
        
        {/* Testimonials Section */}
        <TestimonialsSection />
        
        {/* Contact Section */}
        <ContactSection />
      </div>
    </Router>
  );
}

export default App;

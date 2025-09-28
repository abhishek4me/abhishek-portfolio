import React from 'react';
import './EducationSection.css';

const EducationSection = () => {
  const education = [
    {
      institution: "Marian Engineering College",
      degree: "Bachelor of Technology - Electronics and Computer Engineering",
      period: "2023 - 2027 (Current - 2nd Year)",
      location: "Thiruvananthapuram, Kerala",
      grade: "Current Student",
      image: "https://i.ibb.co/pBQ0f0wc/IMG-20250325-WA0023.jpg",
      description: "Currently pursuing Electronics and Computer Engineering with focus on embedded systems, web development, and machine learning."
    },
    {
      institution: "Sarvodaya Central Vidyalaya",
      degree: "Higher Secondary Education (12th Grade)",
      period: "2021 - 2023",
      location: "Kerala",
      grade: "Completed",
      image: "https://i.ibb.co/gbkNrKfP/IMG-1152-EDIT.jpg",
      description: "Completed higher secondary education with focus on Science stream."
    },
    {
      institution: "St. Antony's Public School",
      degree: "Secondary Education (10th Grade)",
      period: "2019 - 2021",
      location: "Kerala",
      grade: "Completed",
      image: "https://media.licdn.com/dms/image/v2/C560BAQF09LaGn5Y8Tw/company-logo_200_200/company-logo_200_200/0/1630634735248/st_antonys_public_school_logo",
      description: "Completed secondary education with excellent academic performance."
    },
    {
      institution: "Kendriya Vidyalaya",
      degree: "Primary and Middle School Education",
      period: "2015 - 2019",
      location: "Kerala",
      grade: "Completed",
      image: "https://designersio.com/wp-content/uploads/2024/04/5a4ef9b9d7806da10afb1e9b3efdb22d-300x300.jpg",
      description: "Foundation education with strong academic performance and extracurricular activities."
    }
  ];

  return (
    <section id="education" className="education-section">
      <div className="container">
        <h2 className="section-title">Education Journey</h2>
        <div className="education-grid">
          {education.map((edu, index) => (
            <div key={index} className="education-card">
              <div className="education-image">
                <img src={edu.image} alt={edu.institution} />
              </div>
              <div className="education-content">
                <h3 className="institution-name">{edu.institution}</h3>
                <h4 className="degree">{edu.degree}</h4>
                <p className="period">{edu.period}</p>
                <p className="location">{edu.location}</p>
                <p className="description">{edu.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;

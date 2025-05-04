import { useState, useRef, useEffect } from 'react';
import { FaBriefcase, FaCalendarAlt, FaMapMarkerAlt, FaAngleDown, FaFileDownload } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import AnimatedElement from '../common/AnimatedElement';
import Button from '../common/Button';
import experiences from '../../data/experiences';
import '../../styles/sections/Experiences.css';

const Experiences = () => {
  const [expandedId, setExpandedId] = useState(experiences[0].id);
  const timelineRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Toggle expand/collapse of experience items
  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };
  
  // Handle timeline animation on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
      const timelineTop = timelineRef.current.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (timelineTop < windowHeight * 0.5) {
        timelineItems.forEach((item, index) => {
          setTimeout(() => {
            item.classList.add('animate-in');
          }, index * 200);
        });
      }
      
      // Update active index based on scroll position
      timelineItems.forEach((item, index) => {
        const rect = item.getBoundingClientRect();
        if (rect.top < windowHeight * 0.6 && rect.bottom > windowHeight * 0.4) {
          setActiveIndex(index);
        }
      });
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section id="experience" className="experiences section">
      <div className="experiences-decoration">
        <div className="decoration-shape shape-1"></div>
        <div className="decoration-shape shape-2"></div>
        <div className="decoration-dots"></div>
      </div>
      
      <div className="container">
        <SectionHeading
          title="Professional Experience"
          subtitle="My journey in the software development field and the skills I've gained along the way"
        />
        
        <div className="timeline-container">
          <div className="timeline-years">
            {experiences.map((exp, index) => (
              <div 
                key={index}
                className={`year-marker ${activeIndex === index ? 'active' : ''}`}
                onClick={() => {
                  const timelineItems = timelineRef.current.querySelectorAll('.timeline-item');
                  timelineItems[index].scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'center' 
                  });
                }}
              >
                <div className="year-dot"></div>
                <span className="year-text">{exp.period.split(' - ')[0].split(' ').pop()}</span>
              </div>
            ))}
          </div>
          
          <div className="timeline" ref={timelineRef}>
            {experiences.map((experience, index) => (
              <div 
                key={experience.id} 
                className={`timeline-item ${expandedId === experience.id ? 'expanded' : ''}`}
              >
                <div className="timeline-marker">
                  <FaBriefcase className="marker-icon" />
                </div>
                
                <div className="timeline-content">
                  <div 
                    className="timeline-header"
                    onClick={() => toggleExpand(experience.id)}
                  >
                    <div className="header-main">
                      <h3 className="timeline-title">{experience.role}</h3>
                      <span className="timeline-company">{experience.company}</span>
                    </div>
                    
                    <div className="timeline-info">
                      <div className="info-item">
                        <FaCalendarAlt className="info-icon" />
                        <span>{experience.period}</span>
                      </div>
                      
                      <div className="info-item">
                        <FaMapMarkerAlt className="info-icon" />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                    
                    <button 
                      className={`expand-btn ${expandedId === experience.id ? 'expanded' : ''}`}
                      aria-label={expandedId === experience.id ? "Collapse details" : "Expand details"}
                    >
                      <FaAngleDown />
                    </button>
                  </div>
                  
                  <div className="timeline-body">
                    <p className="timeline-description">{experience.description}</p>
                    
                    <div className="timeline-details">
                      <h4>Key Responsibilities:</h4>
                      <ul className="responsibilities-list">
                        {experience.responsibilities.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                      
                      <div className="technologies">
                        <h4>Technologies Used:</h4>
                        <div className="tech-tags">
                          {experience.technologies.map((tech, i) => (
                            <span key={i} className="tech-tag">{tech}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="resume-cta">
          <div className="resume-cta-content">
            <h3>Want to see my full professional background?</h3>
            <p>Download my detailed resume to learn more about my qualifications, skills, and experience.</p>
          </div>
          
          <a 
            href="/resume.docx" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="resume-link"
          >
            Download Resume <FaFileDownload className="resume-icon" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Experiences;
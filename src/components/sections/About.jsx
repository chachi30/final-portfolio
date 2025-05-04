import { useRef, useEffect } from 'react';
import { FaCode, FaPalette, FaMobileAlt, FaDatabase } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import AnimatedElement from '../common/AnimatedElement';
import Button from '../common/Button';
import '../../styles/sections/About.css';

const About = () => {
  const progressRefs = useRef([]);
  
  // Skills with percentages
  const skills = [
    { name: 'JavaScript', level: 90 },
    { name: 'React', level: 85 },
    { name: 'Django', level: 80 },
    { name: 'HTML/CSS', level: 95 },
    { name: 'php', level: 75 },
    { name: 'Tailwind', level: 70 },
  ];
  
  // Services offered
  const services = [
    {
      icon: <FaCode />,
      title: 'Web Development',
      description: 'Creating responsive, high-performance websites tailored to meet specific business needs with clean and maintainable code.'
    },
    {
      icon: <FaPalette />,
      title: 'UI/UX Design',
      description: 'Designing intuitive user interfaces and experiences that are both aesthetically pleasing and functionally effective.'
    },
    {
      icon: <FaMobileAlt />,
      title: 'Mobile Development',
      description: 'Building cross-platform mobile applications that deliver consistent experiences across all devices.'
    },
    {
      icon: <FaDatabase />,
      title: 'Backend Solutions',
      description: 'Developing robust backend systems and APIs that power reliable and scalable applications.'
    }
  ];
  
  // Handle scroll animation for skill bars
  useEffect(() => {
    const handleScroll = () => {
      const skillsSection = document.getElementById('skills-section');
      if (!skillsSection) return;
      
      const sectionTop = skillsSection.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;
      
      if (sectionTop < windowHeight * 0.75) {
        progressRefs.current.forEach(progressBar => {
          if (progressBar) {
            const level = progressBar.getAttribute('data-level');
            progressBar.style.width = `${level}%`;
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    // Trigger once on load
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  return (
    <section id="about" className="about section">
      <div className="about-decoration">
        <div className="decoration-shape shape-1"></div>
        <div className="decoration-shape shape-2"></div>
        <div className="decoration-dots"></div>
      </div>
      
      <div className="container">
        <SectionHeading
          title="About Me"
          subtitle="Learn more about my journey, skills, and what I can offer"
        />
        
        <div className="about-content">
          <AnimatedElement animation="slide-right" className="about-image-container">
            <div className="about-image">
              <img src="/about-profile.jpg" alt="About Me" />
              <div className="about-image-border"></div>
            </div>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-left" className="about-text">
            <div className="section-tag">My Background</div>
            <h3>Full Stack Developer & UI/UX Enthusiast</h3>
            
            <p className="lead-text">
              Passionate about creating beautiful, functional digital experiences that solve real problems and delight users.
            </p>
            
            <p>
              Hello! I'm Charls, a passionate Full Stack Developer with a strong background in building web applications and digital experiences.
            </p>
            
            <p>
              My journey in web development began during my Information Technology course, when I discovered the perfect blend of logical problem-solving and creative expression that coding offers. Since then, I've been continuously learning and applying new technologies to create elegant, user-centered solutions.
            </p>
            

            
            <div className="about-actions">
              <Button 
                href="/resume.docx" 
                variant="primary"
                target="_blank"
              >
                Download Resume
              </Button>
              
              <Button 
                href="#contact" 
                variant="outline"
              >
                Let's Talk
              </Button>
            </div>
          </AnimatedElement>
        </div>
        
        <div className="skills-container" id="skills-section">
          <AnimatedElement animation="fade-in">
            <div className="section-tag center">Technical Proficiency</div>
            <h3 className="skills-title">My Technical Skills</h3>
            <div className="skills-grid">
              {skills.map((skill, index) => (
                <div className="skill-item" key={index}>
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-percentage">{skill.level}%</span>
                  </div>
                  <div className="skill-bar">
                    <div 
                      className="skill-progress" 
                      style={{ width: 0 }}
                      data-level={skill.level}
                      ref={el => progressRefs.current[index] = el}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedElement>
        </div>
        
        <div className="services-container">
          <div className="section-tag center">What I Do</div>
          <h3 className="services-title">Services I Offer</h3>
          <div className="services-grid">
            {services.map((service, index) => (
              <AnimatedElement 
                key={index} 
                animation="scale-up" 
                delay={index * 100}
                className="service-card"
              >
                <div className="service-icon">{service.icon}</div>
                <h4 className="service-title">{service.title}</h4>
                <p className="service-description">{service.description}</p>
              </AnimatedElement>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
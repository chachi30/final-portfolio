import { useEffect, useRef } from 'react';
import { FaGithub, FaLinkedinIn, FaTwitter, FaArrowDown, FaEnvelope } from 'react-icons/fa';
import Button from '../common/Button';
import '../../styles/sections/Hero.css';

const Hero = () => {
  const titleRef = useRef(null);
  const heroRef = useRef(null);
  
  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement) {
      titleElement.classList.add('animate-typing');
    }
    
    // Parallax effect for hero section
    const handleScroll = () => {
      if (heroRef.current) {
        const scrollPosition = window.scrollY;
        const opacity = 1 - scrollPosition / 700;
        const transform = `translateY(${scrollPosition * 0.4}px)`;
        
        heroRef.current.style.opacity = opacity > 0 ? opacity : 0;
        heroRef.current.querySelector('.hero-bg-shapes').style.transform = transform;
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      
      if (titleElement) {
        titleElement.classList.remove('animate-typing');
      }
    };
  }, []);
  
  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero-background">
        <div className="hero-overlay"></div>
        <div className="hero-bg-pattern"></div>
        <div className="hero-bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>
      
      <div className="container hero-container">
        <div className="hero-content">
          <div className="hero-intro animate-fade-in">
            <span className="badge">Available for Freelance Work</span>
            <h4 className="hero-greeting">Hello, I'm</h4>
          </div>
          
          <div className="hero-headline">
            <h1 className="hero-title animate-slide-up">
              <span className="hero-name">Charls Hermosa</span>
              <div className="typing-container">
                <span ref={titleRef} className="hero-role">Full Stack Developer</span>
              </div>
            </h1>
          </div>
          
          <div className="hero-bio animate-slide-up delay-200">
            <p className="hero-description">
              I craft responsive websites and web applications where technology meets creativity. 
              Specializing in building exceptional digital experiences with modern technologies.
            </p>
            

          </div>
          
          <div className="hero-actions animate-slide-up delay-300">
            <Button 
              href="#projects" 
              variant="primary" 
              size="lg"
              className="btn-with-effect"
            >
              View My Work
            </Button>
            
            <Button 
              href="/assets/resume.pdf" 
              variant="outline" 
              size="lg"
              target="_blank"
              rel="noopener noreferrer"
            >
              Download CV
            </Button>
          </div>
          
          <div className="hero-social animate-slide-up delay-400">
            <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <FaLinkedinIn />
            </a>
            <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Twitter">
              <FaTwitter />
            </a>
            <a href="mailto:hello@example.com" className="social-icon" aria-label="Email">
              <FaEnvelope />
            </a>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="hero-image-container animate-fade-in delay-300">
            <div className="hero-image">
              <img src="/hero-profile.jpg" alt="Charls Hermosa" />
              <div className="image-backdrop"></div>
            </div>
            
            <div className="hero-skills">
              <div className="skill-tag" style={{ top: '15%', left: '-10%' }}>
                <span>React</span>
              </div>
              <div className="skill-tag" style={{ top: '75%', left: '10%' }}>
                <span>html</span>
              </div>
              <div className="skill-tag" style={{ top: '35%', right: '-15%' }}>
                <span>php</span>
              </div>
              <div className="skill-tag" style={{ top: '85%', right: '5%' }}>
                <span>Tailwind</span>
              </div>
            </div>
          </div>
          
          <div className="hero-decoration">
            <svg width="180" height="180" viewBox="0 0 180 180" className="blob-decoration">
              <path d="M48.6,-60.5C62.1,-49.1,71.8,-33.4,75.8,-16.1C79.9,1.2,78.5,20.1,69.2,33.5C59.9,46.9,42.8,54.8,25.4,62.4C8.1,69.9,-9.5,77.2,-26.9,74.5C-44.2,71.9,-61.4,59.4,-73.9,42.3C-86.4,25.3,-94.3,3.6,-88.8,-13.7C-83.4,-31,-64.7,-43.9,-47.3,-55.2C-29.9,-66.5,-14.9,-76.2,1.2,-77.6C17.3,-79.1,35.1,-71.9,48.6,-60.5Z" transform="translate(85 85)" />
            </svg>
          </div>
        </div>
      </div>
      
      <a href="#about" className="scroll-down-btn" aria-label="Scroll to About section">
        <FaArrowDown />
        <span className="scroll-text">Scroll Down</span>
      </a>
    </section>
  );
};

export default Hero;
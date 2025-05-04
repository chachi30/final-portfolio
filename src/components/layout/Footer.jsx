import { Link } from 'react-router-dom';
import { 
  FaGithub, 
  FaLinkedinIn, 
  FaTwitter, 
  FaDribbble, 
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhone,
  FaHeart,
  FaAngleRight
} from 'react-icons/fa';
import '../../styles/layout/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-decoration">
        <div className="footer-pattern"></div>
        <div className="footer-shape shape-1"></div>
        <div className="footer-shape shape-2"></div>
      </div>
      
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="footer-logo">
              <span className="logo-text">Dev</span>
              <span className="logo-highlight">Portfolio</span>
            </div>
            <p className="footer-tagline">
              Crafting elegant digital experiences with clean code and creative design
            </p>
            
            <div className="footer-contact">
              <div className="contact-item">
                <div className="item-icon">
                  <FaEnvelope />
                </div>
                <a href="mailto:hello@example.com">hello@example.com</a>
              </div>
              
              <div className="contact-item">
                <div className="item-icon">
                  <FaPhone />
                </div>
                <a href="tel:+11234567890">+1 (123) 456-7890</a>
              </div>
              
              <div className="contact-item">
                <div className="item-icon">
                  <FaMapMarkerAlt />
                </div>
                <p>Zamboanga City, Philippines</p>
              </div>
            </div>
            
            <div className="footer-social">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="https://dribbble.com/" target="_blank" rel="noopener noreferrer" aria-label="Dribbble">
                <FaDribbble />
              </a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="footer-links-column">
              <h3 className="footer-links-title">Quick Links</h3>
              <ul className="footer-menu">
                <li>
                  <FaAngleRight className="menu-icon" />
                  <a href="#home">Home</a>
                </li>
                <li>
                  <FaAngleRight className="menu-icon" />
                  <a href="#about">About</a>
                </li>
                <li>
                  <FaAngleRight className="menu-icon" />
                  <a href="#experience">Experience</a>
                </li>
                <li>
                  <FaAngleRight className="menu-icon" />
                  <a href="#projects">Projects</a>
                </li>
                <li>
                  <FaAngleRight className="menu-icon" />
                  <a href="#blog">Blog</a>
                </li>
                <li>
                  <FaAngleRight className="menu-icon" />
                  <a href="#contact">Contact</a>
                </li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3 className="footer-links-title">Resources</h3>
              <ul className="footer-menu">
                <li>
                  <FaAngleRight className="menu-icon" />
                  <a href="/assets/resume.pdf" target="_blank" rel="noopener noreferrer">Resume</a>
                </li>
                <li>
                  <FaAngleRight className="menu-icon" />
                  <a href="#" target="_blank" rel="noopener noreferrer">Case Studies</a>
                </li>
                <li>
                  <FaAngleRight className="menu-icon" />
                  <a href="#" target="_blank" rel="noopener noreferrer">Resources</a>
                </li>
                <li>
                  <FaAngleRight className="menu-icon" />
                  <a href="#" target="_blank" rel="noopener noreferrer">Documentation</a>
                </li>
              </ul>
            </div>
            
            <div className="footer-links-column">
              <h3 className="footer-links-title">Services</h3>
              <ul className="footer-menu">
                <li>
                  <FaAngleRight className="menu-icon" />
                  <a href="#">Web Development</a>
                </li>
                <li>
                  <FaAngleRight className="menu-icon" />
                  <a href="#">UI/UX Design</a>
                </li>
                <li>
                  <FaAngleRight className="menu-icon" />
                  <a href="#">Mobile Development</a>
                </li>
                <li>
                  <FaAngleRight className="menu-icon" />
                  <a href="#">Backend Solutions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-divider"></div>
        
        <div className="footer-bottom">
          <p className="copyright">
            &copy; {currentYear} CharlsHermosa. All rights reserved.
          </p>
          <p className="built-with">
            Built React & Vite
          </p>
        </div>
      </div>
      
      <button 
        className="scroll-to-top" 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Scroll to top"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4L4 12H9V20H15V12H20L12 4Z" fill="currentColor" />
        </svg>
      </button>
    </footer>
  );
};

export default Footer;
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaGithub, FaLinkedinIn, FaTwitter, FaEnvelope, FaBars, FaTimes } from 'react-icons/fa';
import '../../styles/layout/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const navbarRef = useRef(null);
  const location = useLocation();
  
  // Check if we're on a blog post page
  const isBlogPost = location.pathname.startsWith('/blog/');
  
  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar style based on scroll position
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      
      // Only update active section on home page
      if (!isBlogPost) {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          const sectionId = section.getAttribute('id');
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(sectionId);
          }
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Close menu when clicking outside
    const handleClickOutside = (event) => {
      if (navbarRef.current && 
          !navbarRef.current.contains(event.target) && 
          isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isBlogPost]);
  
  // Close menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 992 && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);
  
  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);
  
  // Close menu when a link is clicked
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };
  
  // Toggle menu on mobile
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  return (
    <header 
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
      ref={navbarRef}
    >
      <div className="container navbar-container">
        <div className="navbar-logo">
          <Link to="/" className="logo">
            <span className="logo-text">Charles</span>
            <span className="logo-highlight">Hermosa</span>
          </Link>
        </div>
        
        <button 
          className={`navbar-toggle ${isMenuOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        
        <nav className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <ul className="navbar-links">
            <li className="navbar-item">
              <Link 
                to="/#home" 
                onClick={handleLinkClick}
                className={activeSection === 'home' && !isBlogPost ? 'active' : ''}
              >
                Home
              </Link>
            </li>
            <li className="navbar-item">
              <Link 
                to="/#about" 
                onClick={handleLinkClick}
                className={activeSection === 'about' && !isBlogPost ? 'active' : ''}
              >
                About
              </Link>
            </li>
            <li className="navbar-item">
              <Link 
                to="/#experience" 
                onClick={handleLinkClick}
                className={activeSection === 'experience' && !isBlogPost ? 'active' : ''}
              >
                Experience
              </Link>
            </li>
            <li className="navbar-item">
              <Link 
                to="/#projects" 
                onClick={handleLinkClick}
                className={activeSection === 'projects' && !isBlogPost ? 'active' : ''}
              >
                Projects
              </Link>
            </li>
            <li className="navbar-item">
              <Link 
                to="/#blog" 
                onClick={handleLinkClick}
                className={activeSection === 'blog' && !isBlogPost ? 'active' : ''}
              >
                Blog
              </Link>
            </li>
            <li className="navbar-item">
              <Link 
                to="/#contact" 
                onClick={handleLinkClick}
                className={activeSection === 'contact' && !isBlogPost ? 'active' : ''}
              >
                Contact
              </Link>
            </li>
          </ul>
          
          <div className="navbar-cta">
            <div className="mobile-social">
              <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <FaGithub />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <FaLinkedinIn />
              </a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                <FaTwitter />
              </a>
              <a href="mailto:hello@example.com" aria-label="Email">
                <FaEnvelope />
              </a>
            </div>
            
            <a href="/resume.docx"  target="_blank" rel="noopener noreferrer" className="navbar-button">
              Resume
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
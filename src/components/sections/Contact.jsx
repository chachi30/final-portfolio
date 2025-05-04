import { useState, useEffect } from 'react';
import { 
  FaEnvelope, 
  FaPhone, 
  FaMapMarkerAlt, 
  FaGithub, 
  FaLinkedinIn, 
  FaTwitter, 
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle
} from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import SectionHeading from '../common/SectionHeading';
import AnimatedElement from '../common/AnimatedElement';
import Button from '../common/Button';
import '../../styles/sections/Contact.css';

// Define your EmailJS credentials directly or use environment variables
const EMAILJS_CONFIG = {
  SERVICE_ID: 'service_kg5qi2e', // Replace with your actual service ID
  TEMPLATE_ID: 'template_gevlgvs', // Replace with your actual template ID
  PUBLIC_KEY: 'gqPGXov9uDB9PtYKO' // Replace with your actual public key
};

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [formState, setFormState] = useState({
    isSubmitting: false,
    isSubmitted: false,
    error: null
  });
  
  const [validation, setValidation] = useState({
    name: { valid: true, message: '' },
    email: { valid: true, message: '' },
    subject: { valid: true, message: '' },
    message: { valid: true, message: '' }
  });

  // Initialize EmailJS
  useEffect(() => {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }, []);
  
  const validateField = (name, value) => {
    let isValid = true;
    let message = '';
    
    switch (name) {
      case 'name':
        if (!value.trim()) {
          isValid = false;
          message = 'Name is required';
        } else if (value.length < 2) {
          isValid = false;
          message = 'Name must be at least 2 characters';
        }
        break;
        
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value.trim()) {
          isValid = false;
          message = 'Email is required';
        } else if (!emailRegex.test(value)) {
          isValid = false;
          message = 'Please enter a valid email address';
        }
        break;
        
      case 'subject':
        if (!value.trim()) {
          isValid = false;
          message = 'Subject is required';
        } else if (value.length < 3) {
          isValid = false;
          message = 'Subject must be at least 3 characters';
        }
        break;
        
      case 'message':
        if (!value.trim()) {
          isValid = false;
          message = 'Message is required';
        } else if (value.length < 10) {
          isValid = false;
          message = 'Message must be at least 10 characters';
        }
        break;
        
      default:
        break;
    }
    
    setValidation(prev => ({
      ...prev,
      [name]: { valid: isValid, message }
    }));
    
    return isValid;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (formState.error) {
      setFormState(prev => ({
        ...prev,
        error: null
      }));
    }
    
    validateField(name, value);
  };
  
  const handleBlur = (e) => {
    const { name, value } = e.target;
    validateField(name, value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    let isFormValid = true;
    Object.entries(formData).forEach(([name, value]) => {
      const fieldValid = validateField(name, value);
      if (!fieldValid) isFormValid = false;
    });
    
    if (!isFormValid) return;
    
    setFormState({
      isSubmitting: true,
      isSubmitted: false,
      error: null
    });
    
    try {
      const response = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message
        },
        EMAILJS_CONFIG.PUBLIC_KEY
      );
      
      if (response.status === 200) {
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        
        setFormState({
          isSubmitting: false,
          isSubmitted: true,
          error: null
        });
        
        setTimeout(() => {
          setFormState(prev => ({
            ...prev,
            isSubmitted: false
          }));
        }, 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Email sending error:', error);
      setFormState({
        isSubmitting: false,
        isSubmitted: false,
        error: 'There was an error sending your message. Please try again.'
      });
    }
  };
  
  const [isMapFocused, setIsMapFocused] = useState(false);
  
  return (
    <section id="contact" className="contact section">
      <div className="contact-decoration">
        <div className="decoration-shape shape-1"></div>
        <div className="decoration-shape shape-2"></div>
        <div className="decoration-dots"></div>
      </div>
      
      <div className="container">
        <SectionHeading
          title="Get In Touch"
          subtitle="Have a project in mind or want to collaborate? Feel free to reach out!"
        />
        
        <div className="contact-grid">
          <AnimatedElement animation="slide-right" className="contact-info">
            <div className="info-card">
              <h3 className="info-title">Contact Information</h3>
              <p className="info-subtitle">
                I'm open for freelance opportunities and interesting projects. 
                Let's build something amazing together!
              </p>
              
              <ul className="contact-details">
                <li className="contact-item">
                  <div className="item-icon">
                    <FaEnvelope />
                  </div>
                  <div className="item-content">
                    <span>Email</span>
                    <a href="mailto:t.chachi32@gmail.com">t.chachi32@gmail.com</a>
                  </div>
                </li>

                <li className="contact-item">
                  <div className="item-icon">
                    <FaPhone />
                  </div>
                  <div className="item-content">
                    <span>Phone</span>
                    <a href="tel:+639123456789">+63 912 345 6789</a>
                  </div>
                </li>

                <li className="contact-item">
                  <div className="item-icon">
                    <FaMapMarkerAlt />
                  </div>
                  <div className="item-content">
                    <span>Location</span>
                    <p>Zamboanga City, Philippines</p>
                  </div>
                </li>
              </ul>
              
              <div className="social-links">
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <FaGithub />
                </a>
                <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </a>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <FaTwitter />
                </a>
              </div>
              
              <div className="map-container">
                <div 
                  className={`map-frame ${isMapFocused ? 'focused' : ''}`}
                  tabIndex="0"
                  onFocus={() => setIsMapFocused(true)}
                  onBlur={() => setIsMapFocused(false)}
                  role="application"
                  aria-label="Map showing my location in Zamboanga City"
                >
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126846.55765782934!2d122.04847824999999!3d6.9214187!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x32505effeab4ebbf%3A0x9d0b1b4e07db3297!2sZamboanga%20City%2C%20Zamboanga%20del%20Sur%2C%20Philippines!5e0!3m2!1sen!2sus!4v1652836674334!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Google Maps location"
                  ></iframe>
                </div>
              </div>
            </div>
          </AnimatedElement>
          
          <AnimatedElement animation="slide-left" className="contact-form-container">
            <div className="form-card">
              <div className="form-header">
                <div className="section-tag">Send a Message</div>
                <h3>Have a question or proposal?</h3>
                <p>Send me a message and I'll get back to you within 24 hours.</p>
              </div>
              
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name" 
                      value={formData.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="John Doe" 
                      className={!validation.name.valid ? 'invalid' : ''}
                      aria-invalid={!validation.name.valid}
                      aria-describedby={!validation.name.valid ? "name-error" : undefined}
                    />
                    {!validation.name.valid && (
                      <div className="error-message" id="name-error">
                        <FaExclamationCircle /> {validation.name.message}
                      </div>
                    )}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="johndoe@example.com" 
                      className={!validation.email.valid ? 'invalid' : ''}
                      aria-invalid={!validation.email.valid}
                      aria-describedby={!validation.email.valid ? "email-error" : undefined}
                    />
                    {!validation.email.valid && (
                      <div className="error-message" id="email-error">
                        <FaExclamationCircle /> {validation.email.message}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input 
                    type="text" 
                    id="subject" 
                    name="subject" 
                    value={formData.subject}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Project Inquiry" 
                    className={!validation.subject.valid ? 'invalid' : ''}
                    aria-invalid={!validation.subject.valid}
                    aria-describedby={!validation.subject.valid ? "subject-error" : undefined}
                  />
                  {!validation.subject.valid && (
                    <div className="error-message" id="subject-error">
                      <FaExclamationCircle /> {validation.subject.message}
                    </div>
                  )}
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea 
                    id="message" 
                    name="message" 
                    value={formData.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Hello, I'd like to talk about..." 
                    rows="5"
                    className={!validation.message.valid ? 'invalid' : ''}
                    aria-invalid={!validation.message.valid}
                    aria-describedby={!validation.message.valid ? "message-error" : undefined}
                  ></textarea>
                  {!validation.message.valid && (
                    <div className="error-message" id="message-error">
                      <FaExclamationCircle /> {validation.message.message}
                    </div>
                  )}
                </div>
                
                {formState.error && (
                  <div className="form-error">
                    <FaExclamationCircle /> {formState.error}
                  </div>
                )}
                
                {formState.isSubmitted && (
                  <div className="form-success">
                    <FaCheckCircle /> Your message has been sent successfully! I'll get back to you soon.
                  </div>
                )}
                
                <Button 
                  type="submit"
                  variant="primary"
                  className="submit-btn"
                  disabled={formState.isSubmitting}
                  icon={<FaPaperPlane />}
                >
                  {formState.isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </AnimatedElement>
        </div>
      </div>
    </section>
  );
};

export default Contact;
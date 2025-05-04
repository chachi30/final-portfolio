import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  FaCalendarAlt, 
  FaTag, 
  FaUser, 
  FaArrowLeft, 
  FaFacebook, 
  FaTwitter, 
  FaLinkedinIn,
  FaEnvelope,
  FaEye,
  FaHeart,
  FaComment,
  FaGithub,
  FaClock,
  FaImage,
  FaExpand
} from 'react-icons/fa';
import blogposts from '../../data/blogposts';
import Button from '../common/Button';
import Card, { CardBadge } from '../common/Card';
import AnimatedElement from '../common/AnimatedElement';
import '../../styles/sections/BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [selectedImage, setSelectedImage] = useState(null);
  
  useEffect(() => {
    // Find the post by ID
    const postId = parseInt(id);
    const foundPost = blogposts.find(post => post.id === postId);
    
    if (!foundPost) {
      navigate('/'); // Redirect to home if post not found
      return;
    }
    
    setPost(foundPost);
    
    // Find related posts (same category or shared tags)
    const related = blogposts
      .filter(p => p.id !== postId && 
        (p.category === foundPost.category || 
         p.tags.some(tag => foundPost.tags.includes(tag)))
      )
      .sort(() => Math.random() - 0.5) // Shuffle for variety
      .slice(0, 3);
    
    setRelatedPosts(related);
    
    // Scroll to top on post load
    window.scrollTo(0, 0);
    
    // Set up scroll progress tracking
    const handleScroll = () => {
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [id, navigate]);
  
  // Format date to more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Estimate reading time (words per minute)
  const calculateReadingTime = (content) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return readingTime;
  };
  
  if (!post) {
    return (
      <div className="blog-post-loading">
        <div className="container">
          <h2>Loading post...</h2>
        </div>
      </div>
    );
  }
  
  const readingTime = calculateReadingTime(post.content);
  
  return (
    <div className="blog-post-page">
      {/* Reading progress indicator */}
      <div 
        className="reading-progress-bar" 
        style={{ width: `${scrollProgress}%` }}
      ></div>
      
      <div className="blog-post-header">
        <div className="post-header-overlay"></div>
        <div 
          className="post-header-bg"
          style={{ backgroundImage: `url(${post.coverImage})` }}
        ></div>
        <div className="container">
          <div className="post-header-content">
            <div className="post-category">
              <FaTag className="category-icon" />
              <span>{post.category}</span>
            </div>
            
            <h1 className="post-title">{post.title}</h1>
            
            <div className="post-meta">
              <div className="meta-item">
                <FaCalendarAlt className="meta-icon" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="meta-item">
                <FaUser className="meta-icon" />
                <span>{post.author}</span>
              </div>
              <div className="meta-item">
                <FaClock className="meta-icon" />
                <span>{readingTime} min read</span>
              </div>
            </div>
            
            <div className="post-tags">
              {post.tags.map((tag, i) => (
                <CardBadge key={i} color="light" className="post-tag">
                  {tag}
                </CardBadge>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="blog-post-content">
        <div className="container">
          <div className="blog-post-layout">
            <main className="post-main">
              <AnimatedElement animation="fade-in" className="post-body-wrapper">
              <article className="post-body">
  <div 
    dangerouslySetInnerHTML={{ 
      __html: post.content
        // Process headers first
        .replace(/^###\s+(.*?)$/gm, '<h3>$1</h3>')
        .replace(/^##\s+(.*?)$/gm, '<h2>$1</h2>')
        .replace(/^#\s+(.*?)$/gm, '<h1>$1</h1>')
        
        // Process images
        .replace(/!\[(.*?)\]\((.*?)\)/g, '<img src="$2" alt="$1" class="post-image" />')
        
        // Process code blocks and inline code
        .replace(/```(.*?)\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        
        // Process text formatting
        .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
        .replace(/\*([^*]+)\*/g, '<em>$1</em>')
        
        // Process paragraphs
        .replace(/\n\n/g, '</p><p>')
        
        // Process unordered lists - improved regex for better matching
        .replace(/^[\s]*[-*]\s+(.*?)$/gm, '<li>$1</li>')
        
        // Properly wrap lists in <ul> tags
        .replace(/(<li>.*?<\/li>)/gs, '<ul>$1</ul>')
        
        // Fix duplicate ul tags
        .replace(/<\/ul>\s*<ul>/g, '')
        
        // Fix paragraph and list interactions
        .replace(/<\/p><ul>/g, '</p><ul>')
        .replace(/<\/ul><p>/g, '</ul><p>')
        
        // Handle any remaining paragraph tags
        .replace(/^([^<].*?)$/gm, '<p>$1</p>')
        .replace(/<p><\/p>/g, '')
        .replace(/<p><h([1-3])>/g, '<h$1>')
        .replace(/<\/h([1-3])><\/p>/g, '</h$1>')
    }} 
  />
</article>
              </AnimatedElement>
              
              {/* Gallery Section - Only show if post has gallery images */}
              {post.gallery && post.gallery.length > 0 && (
                <div className="post-gallery">
                  <h2 className="gallery-title">
                    <FaImage className="gallery-icon" />
                    Related Visual Resources
                  </h2>
                  <div className="gallery-grid">
                    {post.gallery.map((image) => (
                      <div 
                        key={image.id} 
                        className="gallery-item"
                        onClick={() => setSelectedImage(image)}
                      >
                        <div className="gallery-image">
                          <img src={image.url} alt={image.alt} />
                          <div className="gallery-overlay">
                            <FaExpand className="expand-icon" />
                          </div>
                        </div>
                        <div className="gallery-caption">{image.caption}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Image Modal */}
              {selectedImage && (
                <div 
                  className="image-modal"
                  onClick={() => setSelectedImage(null)}
                >
                  <div className="modal-content" onClick={e => e.stopPropagation()}>
                    <button 
                      className="modal-close"
                      onClick={() => setSelectedImage(null)}
                      aria-label="Close modal"
                    >
                      ×
                    </button>
                    <img 
                      src={selectedImage.url} 
                      alt={selectedImage.alt}
                      className="modal-image" 
                    />
                    <div className="modal-caption">{selectedImage.caption}</div>
                  </div>
                </div>
              )}
              
              <div className="post-actions">
                <div className="post-stats">
                  <button className="stat-button">
                    <FaEye className="stat-icon" />
                    <span>247 Views</span>
                  </button>
                  <button className="stat-button">
                    <FaHeart className="stat-icon" />
                    <span>18 Likes</span>
                  </button>
                  <button className="stat-button">
                    <FaComment className="stat-icon" />
                    <span>12 Comments</span>
                  </button>
                </div>
                
                <div className="post-share">
                  <span>Share this post:</span>
                  <div className="share-buttons">
                    <a href="#" className="share-button facebook" aria-label="Share on Facebook">
                      <FaFacebook />
                    </a>
                    <a href="#" className="share-button twitter" aria-label="Share on Twitter">
                      <FaTwitter />
                    </a>
                    <a href="#" className="share-button linkedin" aria-label="Share on LinkedIn">
                      <FaLinkedinIn />
                    </a>
                    <a href="#" className="share-button email" aria-label="Share via Email">
                      <FaEnvelope />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="author-bio">
                <div className="author-avatar">
                  <span>{post.author.charAt(0)}</span>
                </div>
                <div className="author-info">
                  <h3 className="author-name">About {post.author}</h3>
                  <p className="author-description">
                    Full Stack Developer with a passion for creating clean, efficient, and user-friendly web applications. I enjoy sharing my knowledge and experiences through writing.
                  </p>
                  <div className="author-social">
                    <a href="#" className="social-link"><FaTwitter /></a>
                    <a href="#" className="social-link"><FaGithub /></a>
                    <a href="#" className="social-link"><FaLinkedinIn /></a>
                  </div>
                </div>
              </div>
            </main>
            
            <aside className="post-sidebar">
              <div className="sidebar-section author-section">
                <h3 className="sidebar-title">About the Author</h3>
                <div className="author-card">
                  <div className="author-avatar">
                    <span>{post.author.charAt(0)}</span>
                  </div>
                  <h4 className="author-name">{post.author}</h4>
                  <p className="author-bio">
                    Full Stack Developer with a passion for creating clean, efficient, and user-friendly web applications.
                  </p>
                  <Button 
                    href="#" 
                    variant="outline" 
                    size="sm"
                  >
                    View Profile
                  </Button>
                </div>
              </div>
              
              {relatedPosts.length > 0 && (
                <div className="sidebar-section related-posts-section">
                  <h3 className="sidebar-title">Related Posts</h3>
                  <div className="related-posts">
                    {relatedPosts.map(relatedPost => (
                      <Link 
                        key={relatedPost.id} 
                        to={`/blog/${relatedPost.id}`}
                        className="related-post-item"
                      >
                        <div className="related-post-image">
                          <img src={relatedPost.coverImage} alt={relatedPost.title} />
                        </div>
                        <div className="related-post-content">
                          <h4 className="related-post-title">{relatedPost.title}</h4>
                          <span className="related-post-date">{formatDate(relatedPost.date)}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="sidebar-section tags-section">
                <h3 className="sidebar-title">Tags</h3>
                <div className="tags-cloud">
                  {post.tags.map((tag, i) => (
                    <CardBadge key={i} color="light" className="sidebar-tag">
                      {tag}
                    </CardBadge>
                  ))}
                </div>
              </div>
            </aside>
          </div>
          
          <div className="back-to-blog">
            <Link to="/#blog" className="back-button">
              <FaArrowLeft /> Back to Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
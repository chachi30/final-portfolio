
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaTag, FaArrowRight, FaEye, FaHeart, FaComment } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import Card, { CardMedia, CardContent, CardHeader, CardFooter, CardBadge } from '../common/Card';
import AnimatedElement from '../common/AnimatedElement';
import Button from '../common/Button';
import blogposts from '../../data/blogposts';
import '../../styles/sections/BlogList.css';

const BlogList = () => {
  const [category, setCategory] = useState('all');
  const [featuredPost, setFeaturedPost] = useState(null);
  const [regularPosts, setRegularPosts] = useState([]);
  
  // Get unique categories
  const categories = ['all', ...new Set(blogposts.map(post => post.category))];
  
  // Setup featured and regular posts
  useEffect(() => {
    // Filter posts by category if needed
    const filteredPosts = category === 'all' 
      ? blogposts 
      : blogposts.filter(post => post.category === category);
    
    // Sort posts by date (newest first)
    const sortedPosts = [...filteredPosts].sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    
    // Set the newest post as featured (if exists)
    if (sortedPosts.length > 0) {
      setFeaturedPost(sortedPosts[0]);
      setRegularPosts(sortedPosts.slice(1, 4)); // Next 3 posts as regular
    } else {
      setFeaturedPost(null);
      setRegularPosts([]);
    }
  }, [category]);
  
  // Format date to more readable format
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  return (
    <section id="blog" className="blog-list section">
      <div className="blog-decoration">
        <div className="decoration-shape shape-1"></div>
        <div className="decoration-shape shape-2"></div>
        <div className="decoration-dots"></div>
      </div>
      
      <div className="container">
        <SectionHeading
          title="Latest Articles"
          subtitle="Thoughts, tutorials, and insights on web development and technology"
        />
        
        <div className="blog-filters">
          {categories.map((cat, index) => (
            <button 
              key={index}
              className={`blog-filter-btn ${category === cat ? 'active' : ''}`}
              onClick={() => setCategory(cat)}
            >
              {cat === 'all' ? 'All Categories' : cat}
            </button>
          ))}
        </div>
        
        {featuredPost && (
          <div className="featured-post">
            <AnimatedElement animation="fade-in" className="featured-post-inner">
              <Card 
                variant="elevated" 
                className="featured-card"
              >
                <div className="featured-content">
                  <div className="featured-meta">
                    <span className="featured-label">Featured Post</span>
                    <div className="post-meta">
                      <div className="meta-item">
                        <FaCalendarAlt className="meta-icon" />
                        <span>{formatDate(featuredPost.date)}</span>
                      </div>
                      <div className="meta-item">
                        <FaTag className="meta-icon" />
                        <span>{featuredPost.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <h3 className="featured-title">{featuredPost.title}</h3>
                  <p className="featured-excerpt">{featuredPost.excerpt}</p>
                  
                  <div className="featured-tags">
                    {featuredPost.tags.slice(0, 4).map((tag, i) => (
                      <CardBadge key={i} color="light" className="featured-tag">
                        {tag}
                      </CardBadge>
                    ))}
                  </div>
                  
                  <div className="post-stats">
                    <div className="stat-item">
                      <FaEye className="stat-icon" />
                      <span>247 Views</span>
                    </div>
                    <div className="stat-item">
                      <FaHeart className="stat-icon" />
                      <span>18 Likes</span>
                    </div>
                    <div className="stat-item">
                      <FaComment className="stat-icon" />
                      <span>{featuredPost.comments?.length || 0} Comments</span>
                    </div>
                  </div>
                  
                  <Link to={`/blog/${featuredPost.id}`} className="featured-link">
                    Read Full Article <FaArrowRight className="link-icon" />
                  </Link>
                </div>
                
                <div className="featured-image">
                  <img src={featuredPost.coverImage} alt={featuredPost.title} />
                  <div className="image-overlay"></div>
                </div>
              </Card>
            </AnimatedElement>
          </div>
        )}
        
        {regularPosts.length > 0 ? (
  <div className="blog-grid">
    {regularPosts.map((post, index) => (
      <AnimatedElement 
        key={post.id}
        animation="fade-in"
        delay={index * 100}
        className="blog-item"
      >
        <Card 
          variant="default" 
          hover="lift"
          className="blog-card"
        >
          <Link to={`/blog/${post.id}`}>
            <CardMedia 
              src={post.coverImage} 
              alt={post.title} 
              className="blog-image"
            />
          </Link>
          
          <CardContent className="blog-content">
            <div className="blog-meta">
              <div className="meta-item">
                <FaCalendarAlt className="meta-icon" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="meta-item">
                <FaTag className="meta-icon" />
                <span>{post.category}</span>
              </div>
            </div>
            
            <CardHeader
              title={<Link to={`/blog/${post.id}`} className="blog-title-link">{post.title}</Link>}
              className="blog-header"
            />
            
            <p className="blog-excerpt">{post.excerpt}</p>
            
            <div className="blog-tags">
              {post.tags.slice(0, 3).map((tag, i) => (
                <CardBadge key={i} color="light" className="blog-tag">
                  {tag}
                </CardBadge>
              ))}
              {post.tags.length > 3 && (
                <span className="more-tags">+{post.tags.length - 3}</span>
              )}
            </div>
          </CardContent>
          
          <CardFooter className="blog-footer">
            <Link to={`/blog/${post.id}`} className="read-more">
              Read More <FaArrowRight className="arrow-icon" />
            </Link>
          </CardFooter>
        </Card>
      </AnimatedElement>
    ))}
  </div>
) : (
  featuredPost === null && (
    <div className="no-posts">
      <p>No articles found in this category yet.</p>
    </div>
  )
)}
        
        {(featuredPost || regularPosts.length > 0) && (
          <div className="blog-more">
            <Button 
              href="/#blog" 
              variant="outline"
            >
              View All Articles
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogList;

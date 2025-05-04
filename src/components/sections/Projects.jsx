import { useState, useEffect } from 'react';
import { FaGithub, FaExternalLinkAlt, FaSearch, FaTimes } from 'react-icons/fa';
import SectionHeading from '../common/SectionHeading';
import Card, { CardMedia, CardContent, CardHeader, CardFooter, CardBadge } from '../common/Card';
import AnimatedElement from '../common/AnimatedElement';
import Button from '../common/Button';
import projects from '../../data/projects';
import '../../styles/sections/Projects.css';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTags, setActiveTags] = useState([]);
  const [isSearchActive, setIsSearchActive] = useState(false);
  
  // Get unique tags for filtering
  const allTags = Array.from(
    new Set(projects.flatMap(project => project.tags))
  ).sort();
  
  // Filter projects whenever filter, searchTerm, or activeTags change
  useEffect(() => {
    let result = projects;
    
    // Apply category filter (if not 'all')
    if (filter !== 'all') {
      result = result.filter(project => project.tags.includes(filter));
    }
    
    // Apply tag filters (if any)
    if (activeTags.length > 0) {
      result = result.filter(project => 
        activeTags.every(tag => project.tags.includes(tag))
      );
    }
    
    // Apply search term (if any)
    if (searchTerm.trim() !== '') {
      const searchLower = searchTerm.toLowerCase();
      result = result.filter(project => 
        project.title.toLowerCase().includes(searchLower) || 
        project.description.toLowerCase().includes(searchLower) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    setFilteredProjects(result);
  }, [filter, searchTerm, activeTags]);
  
  // Handle search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Clear search
  const clearSearch = () => {
    setSearchTerm('');
    setIsSearchActive(false);
  };
  
  // Toggle search active state
  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearchTerm('');
    }
  };
  
  // Toggle tag filter
  const toggleTag = (tag) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter(t => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setFilter('all');
    setActiveTags([]);
    setSearchTerm('');
    setIsSearchActive(false);
  };
  
  return (
    <section id="projects" className="projects section">
      <div className="projects-decoration">
        <div className="decoration-shape shape-1"></div>
        <div className="decoration-shape shape-2"></div>
        <div className="decoration-dots"></div>
      </div>
      
      <div className="container">
        <SectionHeading
          title="Featured Projects"
          subtitle="A selection of my recent work, personal projects, and experiments"
        />
        
        <div className="projects-toolbar">
          <div className="filter-controls">
            <button 
              className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
              onClick={() => setFilter('all')}
            >
              All Projects
            </button>
            
            {allTags.slice(0, 5).map(tag => (
              <button 
                key={tag}
                className={`filter-btn ${filter === tag ? 'active' : ''}`}
                onClick={() => setFilter(tag)}
              >
                {tag}
              </button>
            ))}
            
            {allTags.length > 5 && (
              <div className="filter-dropdown">
                <button className="filter-btn dropdown-toggle">
                  More
                </button>
                <div className="dropdown-menu">
                  {allTags.slice(5).map(tag => (
                    <button 
                      key={tag}
                      className={`dropdown-item ${filter === tag ? 'active' : ''}`}
                      onClick={() => setFilter(tag)}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="search-controls">
            <div className={`search-container ${isSearchActive ? 'active' : ''}`}>
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="search-input"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              
              {searchTerm && (
                <button className="search-clear" onClick={clearSearch}>
                  <FaTimes />
                </button>
              )}
            </div>
            
            <button 
              className={`search-toggle ${isSearchActive ? 'active' : ''}`}
              onClick={toggleSearch}
              aria-label="Toggle search"
            >
              <FaSearch />
            </button>
          </div>
        </div>
        
        {activeTags.length > 0 && (
          <div className="active-filters">
            <div className="filter-tags">
              <span className="filter-label">Active filters:</span>
              {activeTags.map(tag => (
                <button 
                  key={tag} 
                  className="active-tag"
                  onClick={() => toggleTag(tag)}
                >
                  {tag} <FaTimes />
                </button>
              ))}
              <button className="clear-filters" onClick={clearFilters}>
                Clear all
              </button>
            </div>
          </div>
        )}
        
        <div className="projects-grid">
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project, index) => (
              <AnimatedElement 
                key={project.id}
                animation="fade-in"
                delay={index * 100}
                className="project-item"
              >
                <Card variant="elevated" hover="lift" className="project-card">
                  <CardMedia 
                    src={project.image} 
                    alt={project.title}
                    className="project-media" 
                  />
                  
                  <CardContent className="project-content">
                    <CardHeader
                      title={project.title}
                      subtitle={project.subtitle}
                      className="project-header"
                    />
                    
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-tags">
                      {project.tags.map((tag, i) => (
                        <CardBadge 
                          key={i} 
                          color={activeTags.includes(tag) ? 'primary' : 'light'}
                          className="project-tag"
                          onClick={(e) => {
                            e.preventDefault();
                            toggleTag(tag);
                          }}
                        >
                          {tag}
                        </CardBadge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="project-footer">
                    <a 
                      href={project.repoUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link"
                      aria-label={`GitHub repository for ${project.title}`}
                    >
                      <FaGithub /> Code
                    </a>
                    
                    <a 
                      href={project.liveUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="project-link primary"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  </CardFooter>
                </Card>
              </AnimatedElement>
            ))
          ) : (
            <div className="no-projects">
              <div className="no-results-icon">
                <FaSearch />
              </div>
              <h3>No projects found</h3>
              <p>
                No projects match your current search criteria.
                Try adjusting your filters or search term.
              </p>
              <Button variant="primary" onClick={clearFilters}>
                Clear Filters
              </Button>
            </div>
          )}
        </div>
        
        <div className="more-projects">
          <div className="section-tag center">More Work</div>
          <p>
            These are just a few examples of my work. 
            Check out my GitHub for more projects.
          </p>
          
          <Button 
            href="https://github.com/chachi30"
            target="_blank"
            variant="outline"
            icon={<FaGithub />}
          >
            View More on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
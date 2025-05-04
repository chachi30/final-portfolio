import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Experiences from './components/sections/Experiences';
import Projects from './components/sections/Projects';
import BlogList from './components/sections/BlogList';
import Contact from './components/sections/Contact';
import BlogPost from './components/pages/BlogPost';

function App() {
  const location = useLocation();
  
  // Handle hash navigation and scroll on route changes
  useEffect(() => {
    if (location.hash) {
      // Hash navigation (e.g., /#about)
      const sectionId = location.hash.replace('#', '');
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (location.pathname === '/') {
      // Homepage navigation - scroll to top
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  // Check if we're on the main page or a blog post
  const isHomePage = location.pathname === '/';

  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <Experiences />
              <Projects />
              <BlogList />
              <Contact />
            </>
          } />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
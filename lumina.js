import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronRight, ArrowRight, Plus, MousePointer, Upload, Zap, ArrowUpRight, Search } from 'lucide-react';

// Main App Component
const App = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showNotification, setShowNotification] = useState(false);
  
  // Refs for sections to track scroll position
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const showcaseRef = useRef(null);
  const ctaRef = useRef(null);
  
  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      
      // Determine which section is currently in view
      const scrollPosition = window.scrollY + window.innerHeight / 2;
      
      if (heroRef.current && scrollPosition < heroRef.current.offsetTop + heroRef.current.offsetHeight) {
        setActiveSection('home');
      } else if (featuresRef.current && scrollPosition < featuresRef.current.offsetTop + featuresRef.current.offsetHeight) {
        setActiveSection('features');
      } else if (showcaseRef.current && scrollPosition < showcaseRef.current.offsetTop + showcaseRef.current.offsetHeight) {
        setActiveSection('showcase');
      } else {
        setActiveSection('contact');
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Track mouse position for interactive elements
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);
  
  // Show notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(true);
      
      // Hide notification after 5 seconds
      const hideTimer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      
      return () => clearTimeout(hideTimer);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Toggle theme
  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };
  
  return (
    <div className={`app ${darkMode ? 'dark' : 'light'}`}>
      {/* Cursor follower effect */}
      <div 
        className="cursor-follower" 
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          opacity: scrollY > 100 ? 0.2 : 0.1
        }}
      />
      
      {/* Notification */}
      <div className={`notification ${showNotification ? 'notification-show' : ''}`}>
        <div className="notification-content">
          <Zap size={18} />
          <p>Try our interactive features! Click on cards to expand.</p>
          <button onClick={() => setShowNotification(false)}><X size={16} /></button>
        </div>
      </div>
      
      {/* Header */}
      <header className={scrollY > 50 ? 'header-scrolled' : ''}>
        <div className="logo">
          <div className="logo-icon">L</div>
          <span>Lumina</span>
        </div>
        
        <nav className={menuOpen ? 'nav-open' : ''}>
          <ul>
            <li className={activeSection === 'home' ? 'active' : ''}>
              <a href="#home" onClick={() => setMenuOpen(false)}>Home</a>
            </li>
            <li className={activeSection === 'features' ? 'active' : ''}>
              <a href="#features" onClick={() => setMenuOpen(false)}>Features</a>
            </li>
            <li className={activeSection === 'showcase' ? 'active' : ''}>
              <a href="#showcase" onClick={() => setMenuOpen(false)}>Showcase</a>
            </li>
            <li className={activeSection === 'contact' ? 'active' : ''}>
              <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
            </li>
          </ul>
        </nav>
        
        <div className="header-controls">
          <button className="theme-toggle" onClick={toggleTheme}>
            <div className={`toggle-thumb ${darkMode ? '' : 'light-mode'}`}></div>
          </button>
          
          <button className="cta-button">
            Get Started
            <ArrowRight size={16} />
          </button>
          
          <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>
      
      {/* Hero Section */}
      <section id="home" className="hero-section" ref={heroRef}>
        <Fireflies count={30} />
        
        <div className="hero-content">
          <div className="hero-badge">
            <span>New</span> Interactive Experience Platform
          </div>
          
          <h1>Transform Your Digital Experience</h1>
          
          <p className={darkMode ? 'purple-text' : ''}>Create stunning interfaces with powerful animations and seamless transitions. Elevate your brand with our cutting-edge design platform.</p>
          
          <div className="hero-buttons">
            <button className="primary-button">
              Get Started
              <ArrowRight size={16} />
            </button>
            
            <button className="secondary-button">
              Learn More
              <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="hero-stats">
            <div className="stat">
              <div className="stat-number">10k+</div>
              <div className={`stat-label ${darkMode ? 'purple-text' : ''}`}>Active Users</div>
            </div>
            
            <div className="stat">
              <div className="stat-number">1M+</div>
              <div className={`stat-label ${darkMode ? 'purple-text' : ''}`}>Projects</div>
            </div>
            
            <div className="stat">
              <div className="stat-number">98%</div>
              <div className={`stat-label ${darkMode ? 'purple-text' : ''}`}>Satisfaction</div>
            </div>
          </div>
        </div>
        
        <div className="hero-visual">
          <div className="floating-card card1">
            <div className="card-icon"><Upload size={20} /></div>
            <div className="card-text">Drag & Drop</div>
          </div>
          
          <div className="floating-card card2">
            <div className="card-icon"><MousePointer size={20} /></div>
            <div className="card-text">Interactive UI</div>
          </div>
          
          <div className="floating-card card3">
            <div className="card-icon"><Zap size={20} /></div>
            <div className="card-text">Fast & Responsive</div>
          </div>
          
          <div className="hero-circle"></div>
          <div className="hero-square"></div>
        </div>
        
        <div className="scroll-indicator">
          <div className="scroll-dot"></div>
          <span className={darkMode ? 'purple-text' : ''}>Scroll to explore</span>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="features-section" ref={featuresRef}>
        <div className="section-intro">
          <h2>Powerful Features</h2>
          <p className={darkMode ? 'purple-text' : ''}>Discover the tools that will transform your digital presence</p>
        </div>
        
        <div className="features-grid">
          <FeatureCard 
            title="Intuitive Design Tools" 
            description="Create stunning interfaces with our drag-and-drop editor and pre-built components. No coding required."
            icon={<DesignIcon />}
            color="purple"
            darkMode={darkMode}
          />
          
          <FeatureCard 
            title="Advanced Animations" 
            description="Bring your designs to life with our library of animations and transitions. Create engaging user experiences."
            icon={<AnimationIcon />}
            color="blue"
            darkMode={darkMode}
          />
          
          <FeatureCard 
            title="Responsive Templates" 
            description="Choose from a wide range of responsive templates designed for any industry. Customize to fit your brand."
            icon={<TemplateIcon />}
            color="green"
            darkMode={darkMode}
          />
          
          <FeatureCard 
            title="Real-time Collaboration" 
            description="Work together with your team in real-time. See changes instantly and speed up your workflow."
            icon={<CollaborationIcon />}
            color="orange"
            darkMode={darkMode}
          />
          
          <FeatureCard 
            title="Analytics Dashboard" 
            description="Track user engagement and performance with powerful analytics. Make data-driven decisions."
            icon={<AnalyticsIcon />}
            color="pink"
            darkMode={darkMode}
          />
          
          <FeatureCard 
            title="SEO Optimization" 
            description="Improve your search engine rankings with built-in SEO tools and recommendations."
            icon={<SeoIcon />}
            color="yellow"
            darkMode={darkMode}
          />
        </div>
      </section>
      
      {/* Showcase Section */}
      <section id="showcase" className="showcase-section" ref={showcaseRef}>
        <div className="showcase-content">
          <div className="showcase-text">
            <h2>Beautiful Analytics Dashboard</h2>
            <p className={darkMode ? 'purple-text' : ''}>Our intuitive dashboard gives you insights at a glance. Monitor performance, track engagement, and make data-driven decisions with our comprehensive analytics tools.</p>
            
            <ul className="feature-list">
              <li>
                <div className="feature-icon"><CheckIcon /></div>
                <span className={darkMode ? 'purple-text' : ''}>Real-time data visualization</span>
              </li>
              <li>
                <div className="feature-icon"><CheckIcon /></div>
                <span className={darkMode ? 'purple-text' : ''}>Customizable metrics and KPIs</span>
              </li>
              <li>
                <div className="feature-icon"><CheckIcon /></div>
                <span className={darkMode ? 'purple-text' : ''}>Interactive charts and graphs</span>
              </li>
              <li>
                <div className="feature-icon"><CheckIcon /></div>
                <span className={darkMode ? 'purple-text' : ''}>Export and share reports</span>
              </li>
            </ul>
            
            <button className="primary-button">
              Explore Features
              <ArrowRight size={16} />
            </button>
          </div>
          
          <div className="showcase-image">
            <DashboardDemo />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section id="contact" className="cta-section" ref={ctaRef}>
        <div className="cta-content">
          <h2>Ready to Transform Your Digital Experience?</h2>
          <p className={darkMode ? 'purple-text' : ''}>Join thousands of businesses who have already elevated their online presence with our platform.</p>
          
          <ContactForm darkMode={darkMode} />
        </div>
      </section>
      
      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-info">
            <div className="logo">
              <div className="logo-icon">L</div>
              <span>Lumina</span>
            </div>
            
            <p className={darkMode ? 'purple-text' : ''}>Transforming digital experiences with powerful design tools and beautiful animations.</p>
            
            <div className="social-links">
              <a href="#" className="social-link"><TwitterIcon /></a>
              <a href="#" className="social-link"><FacebookIcon /></a>
              <a href="#" className="social-link"><InstagramIcon /></a>
              <a href="#" className="social-link"><LinkedinIcon /></a>
            </div>
          </div>
          
          <div className="footer-links">
            <div className="links-column">
              <h3>Products</h3>
              <ul>
                <li><a href="#" className={darkMode ? 'purple-link' : ''}>Features</a></li>
                <li><a href="#" className={darkMode ? 'purple-link' : ''}>Pricing</a></li>
                <li><a href="#" className={darkMode ? 'purple-link' : ''}>Templates</a></li>
                <li><a href="#" className={darkMode ? 'purple-link' : ''}>Examples</a></li>
              </ul>
            </div>
            
            <div className="links-column">
              <h3>Resources</h3>
              <ul>
                <li><a href="#" className={darkMode ? 'purple-link' : ''}>Documentation</a></li>
                <li><a href="#" className={darkMode ? 'purple-link' : ''}>Tutorials</a></li>
                <li><a href="#" className={darkMode ? 'purple-link' : ''}>Blog</a></li>
                <li><a href="#" className={darkMode ? 'purple-link' : ''}>Community</a></li>
              </ul>
            </div>
            
            <div className="links-column">
              <h3>Company</h3>
              <ul>
                <li><a href="#" className={darkMode ? 'purple-link' : ''}>About</a></li>
                <li><a href="#" className={darkMode ? 'purple-link' : ''}>Careers</a></li>
                <li><a href="#" className={darkMode ? 'purple-link' : ''}>Contact</a></li>
                <li><a href="#" className={darkMode ? 'purple-link' : ''}>Press</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className={darkMode ? 'purple-text-light' : ''}>&copy; 2025 Lumina. All rights reserved.</p>
          
          <div className="footer-bottom-links">
            <a href="#" className={darkMode ? 'purple-link' : ''}>Privacy Policy</a>
            <a href="#" className={darkMode ? 'purple-link' : ''}>Terms of Service</a>
            <a href="#" className={darkMode ? 'purple-link' : ''}>Cookies Settings</a>
          </div>
        </div>
      </footer>
      
      {/* Back to top button */}
      <button 
        className={`back-to-top ${scrollY > 300 ? 'visible' : ''}`}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      >
        <ArrowUpRight size={20} />
      </button>

      {/* Add the CSS styles */}
      <style>{`
        /* Root variables for theme */
        :root {
          --primary: #8a2be2;
          --primary-light: #b980ff;
          --primary-dark: #5d1e9e;
          --blue: #4361ee;
          --green: #38b000;
          --orange: #ff7f11;
          --pink: #e83e8c;
          --yellow: #ffbe0b;
          
          --dark: #121212;
          --dark-surface: #1e1e1e;
          --dark-hover: #2a2a2a;
          --light: #ffffff;
          --light-surface: #f8f9fa;
          --light-hover: #e9ecef;
          
          --gray-100: #f8f9fa;
          --gray-200: #e9ecef;
          --gray-300: #dee2e6;
          --gray-400: #ced4da;
          --gray-500: #adb5bd;
          --gray-600: #6c757d;
          --gray-700: #495057;
          --gray-800: #343a40;
          --gray-900: #212529;
          
          --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.1);
          --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.12);
          --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.15);
          --shadow-xl: 0 20px 40px rgba(0, 0, 0, 0.2);
          
          --radius-sm: 4px;
          --radius-md: 8px;
          --radius-lg: 16px;
          --radius-xl: 24px;
          --radius-full: 9999px;
          
          --transition-fast: 0.2s;
          --transition-normal: 0.3s;
          --transition-slow: 0.5s;
          
          --font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        /* Base Styles */
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: var(--font-sans);
        }
        
        html, body {
          height: 100%;
          scroll-behavior: smooth;
        }
        
        body {
          overflow-x: hidden;
        }
        
        .app {
          position: relative;
          overflow-x: hidden;
          transition: background-color var(--transition-normal);
        }
        
        .app.dark {
          background-color: var(--dark);
          color: var(--light);
        }
        
        .app.light {
          background-color: var(--light);
          color: var(--dark);
        }
        
        button {
          cursor: pointer;
          border: none;
          outline: none;
          background: none;
          font-family: inherit;
        }
        
        /* Purple text styles for dark mode */
        .purple-text {
          color: #c299ff !important;
          transition: color var(--transition-normal);
        }

        .purple-text-light {
          color: #d4b3ff !important;
          transition: color var(--transition-normal);
        }

        .purple-link {
          color: #b980ff !important;
          transition: color var(--transition-normal);
        }

        .purple-link:hover {
          color: #d4b3ff !important;
        }

        .dark-input {
          border-color: rgba(185, 128, 255, 0.3) !important;
        }

        .dark-input:focus {
          border-color: var(--primary-light) !important;
          box-shadow: 0 0 0 2px rgba(185, 128, 255, 0.3) !important;
        }
        
        /* Cursor Follower */
        .cursor-follower {
          position: fixed;
          width: 300px;
          height: 300px;
          background: radial-gradient(circle at center, var(--primary) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
          z-index: 0;
          opacity: 0.1;
          transform: translate(-50%, -50%);
          transition: opacity var(--transition-normal);
        }
        
        /* Notification */
        .notification {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-radius: var(--radius-md);
          padding: 1rem;
          box-shadow: var(--shadow-lg);
          z-index: 100;
          transform: translateX(120%);
          transition: transform var(--transition-normal);
          border: 1px solid rgba(255, 255, 255, 0.1);
          max-width: 300px;
        }
        
        .notification.notification-show {
          transform: translateX(0);
        }
        
        .notification-content {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.75rem;
        }
        
        .notification-content svg {
          color: var(--primary-light);
        }
        
        .notification-content p {
          flex: 1;
          font-size: 0.875rem;
        }
        
        .notification-content button {
          color: var(--gray-500);
          transition: color var(--transition-fast);
        }
        
        .notification-content button:hover {
          color: var(--light);
        }
        
        /* Header */
        header {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem 2rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          z-index: 100;
          transition: all var(--transition-normal);
        }
        
        .header-scrolled {
          background: rgba(18, 18, 18, 0.8);
          backdrop-filter: blur(10px);
          padding: 1rem 2rem;
          box-shadow: var(--shadow-md);
        }
        
        .logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 700;
          font-size: 1.5rem;
          color: var(--light);
          text-decoration: none;
        }
        
        .logo-icon {
          width: 32px;
          height: 32px;
          background: linear-gradient(45deg, var(--primary), var(--primary-light));
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        nav ul {
          display: flex;
          gap: 2rem;
          list-style: none;
        }
        
        nav a {
          color: var(--light);
          text-decoration: none;
          font-weight: 500;
          position: relative;
          padding: 0.5rem 0;
          transition: color var(--transition-fast);
        }
        
        nav a:hover {
          color: var(--primary-light);
        }
        
        nav a::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--primary-light);
          transition: width var(--transition-normal);
        }
        
        nav a:hover::after,
        nav li.active a::after {
          width: 100%;
        }
        
        nav li.active a {
          color: var(--primary-light);
        }
        
        .header-controls {
          display: flex;
          align-items: center;
          gap: 1rem;
        }
        
        .theme-toggle {
          position: relative;
          width: 48px;
          height: 24px;
          background: rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-full);
          padding: 2px;
          display: flex;
          align-items: center;
        }
        
        .toggle-thumb {
          width: 20px;
          height: 20px;
          background: var(--primary-light);
          border-radius: 50%;
          transition: transform var(--transition-normal);
        }
        
        .toggle-thumb.light-mode {
          transform: translateX(24px);
        }
        
        .cta-button {
          background: linear-gradient(45deg, var(--primary), var(--primary-light));
          color: var(--light);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .cta-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(138, 43, 226, 0.4);
        }
        
        .menu-toggle {
          display: none;
          color: var(--light);
        }
        
        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 7rem 2rem 2rem;
          position: relative;
          overflow: hidden;
          background: radial-gradient(circle at 70% 50%, var(--dark-hover), var(--dark));
        }
        
        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 600px;
          margin-right: 2rem;
        }
        
        .hero-badge {
          display: inline-flex;
          align-items: center;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          margin-bottom: 1.5rem;
        }
        
        .hero-badge span {
          background: linear-gradient(45deg, var(--primary), var(--primary-light));
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          font-weight: 700;
          margin-right: 0.5rem;
        }
        
        .hero-content h1 {
          font-size: 3.5rem;
          font-weight: 800;
          margin-bottom: 1.5rem;
          background: linear-gradient(45deg, var(--light), var(--primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 200% 200%;
          animation: gradientShift 5s ease infinite;
        }
        
        .hero-content p {
          font-size: 1.25rem;
          color: var(--gray-500);
          margin-bottom: 2.5rem;
          line-height: 1.6;
        }
        
        .hero-buttons {
          display: flex;
          gap: 1rem;
          margin-bottom: 3rem;
        }
        
        .primary-button {
          background: linear-gradient(45deg, var(--primary), var(--primary-light));
          color: var(--light);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          transition: transform var(--transition-fast), box-shadow var(--transition-fast);
          box-shadow: 0 4px 15px rgba(138, 43, 226, 0.3);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .primary-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(138, 43, 226, 0.4);
        }
        
        .secondary-button {
          background: rgba(255, 255, 255, 0.1);
          color: var(--light);
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .secondary-button:hover {
          background: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        
        .hero-stats {
          display: flex;
          gap: 2rem;
        }
        
        .stat {
          display: flex;
          flex-direction: column;
        }
        
        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-light);
        }
        
        .stat-label {
          font-size: 0.875rem;
          color: var(--gray-500);
        }
        
        .hero-visual {
          position: relative;
          width: 400px;
          height: 400px;
        }
        
        .floating-card {
          position: absolute;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          border-radius: var(--radius-md);
          border: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          align-items: center;
          gap: 0.75rem;
          box-shadow: var(--shadow-lg);
          transition: transform var(--transition-slow) ease-in-out;
        }
        
        .card1 {
          top: 20%;
          left: 10%;
          animation: float 5s ease-in-out infinite;
        }
        
        .card2 {
          top: 40%;
          right: 5%;
          animation: float 5s ease-in-out infinite 1s;
        }
        
        .card3 {
          bottom: 20%;
          left: 20%;
          animation: float 5s ease-in-out infinite 2s;
        }
        
        .card-icon {
          width: 36px;
          height: 36px;
          background: linear-gradient(45deg, var(--primary-dark), var(--primary));
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--light);
        }
        
        .card-text {
          font-weight: 500;
        }
        
        .hero-circle {
          position: absolute;
          width: 300px;
          height: 300px;
          background: linear-gradient(45deg, rgba(138, 43, 226, 0.1), transparent);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 4s ease-in-out infinite;
        }
        
        .hero-square {
          position: absolute;
          width: 150px;
          height: 150px;
          border: 2px solid rgba(138, 43, 226, 0.3);
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(45deg);
          animation: rotate 15s linear infinite;
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          color: var(--gray-500);
          font-size: 0.875rem;
        }
        
        .scroll-dot {
          width: 2px;
          height: 10px;
          background: var(--primary-light);
          animation: scrollDown 2s ease-in-out infinite;
        }
        
        /* Fireflies effect */
        .fireflies {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }
        
        .firefly {
          position: absolute;
          background: radial-gradient(circle at center, rgba(255, 255, 255, 0.8) 0%, rgba(185, 128, 255, 0.3) 70%, transparent 100%);
          border-radius: 50%;
          filter: blur(1px);
          animation: firefly 5s ease-in-out infinite;
        }
        
        /* Features Section */
        .features-section {
          padding: 6rem 2rem;
          background: linear-gradient(180deg, var(--dark), var(--dark-hover));
          position: relative;
        }
        
        .section-intro {
          text-align: center;
          margin-bottom: 4rem;
        }
        
        .section-intro h2 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          background: linear-gradient(45deg, var(--light), var(--primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .section-intro p {
          color: var(--gray-500);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }
        
        .feature-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-lg);
          padding: 2rem;
          transition: all var(--transition-normal);
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.05);
          cursor: pointer;
          height: 240px;
        }
        
        .feature-card.expanded {
          height: auto;
          padding-bottom: 3rem;
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-xl);
          border-color: rgba(255, 255, 255, 0.1);
        }
        
        .feature-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 5px;
          background: linear-gradient(90deg, var(--primary), var(--primary-light));
          opacity: 0;
          transition: opacity var(--transition-normal);
        }
        
        .feature-card:hover::before,
        .feature-card.expanded::before {
          opacity: 1;
        }
        
        .feature-card.purple::before { background: linear-gradient(90deg, var(--primary), var(--primary-light)); }
        .feature-card.blue::before { background: linear-gradient(90deg, var(--blue), #6e8efb); }
        .feature-card.green::before { background: linear-gradient(90deg, var(--green), #7ed321); }
        .feature-card.orange::before { background: linear-gradient(90deg, var(--orange), #ffc107); }
        .feature-card.pink::before { background: linear-gradient(90deg, var(--pink), #ff7eb3); }
        .feature-card.yellow::before { background: linear-gradient(90deg, var(--yellow), #fdcb6e); }
        
        .feature-card .feature-icon {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-md);
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          color: var(--primary-light);
          transition: all var(--transition-normal);
        }
        
        .feature-card:hover .feature-icon {
          transform: scale(1.1);
        }
        
        .feature-card.purple .feature-icon { color: var(--primary-light); }
        .feature-card.blue .feature-icon { color: #6e8efb; }
        .feature-card.green .feature-icon { color: #7ed321; }
        .feature-card.orange .feature-icon { color: #ffc107; }
        .feature-card.pink .feature-icon { color: #ff7eb3; }
        .feature-card.yellow .feature-icon { color: #fdcb6e; }
        
        .feature-card h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--light);
          transition: color var(--transition-fast);
        }
        
        .feature-card:hover h3 {
          color: var(--primary-light);
        }
        
        .feature-card.purple:hover h3 { color: var(--primary-light); }
        .feature-card.blue:hover h3 { color: #6e8efb; }
        .feature-card.green:hover h3 { color: #7ed321; }
        .feature-card.orange:hover h3 { color: #ffc107; }
        .feature-card.pink:hover h3 { color: #ff7eb3; }
        .feature-card.yellow:hover h3 { color: #fdcb6e; }
        
        .feature-card p {
          color: var(--gray-500);
          line-height: 1.6;
        }
        
        .feature-details {
          margin-top: 1.5rem;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          animation: fadeIn 0.5s ease forwards;
        }
        
        .feature-details h4 {
          margin-bottom: 1rem;
          color: var(--light);
        }
        
        .feature-details ul {
          margin-bottom: 1.5rem;
          padding-left: 1.5rem;
        }
        
        .feature-details li {
          margin-bottom: 0.5rem;
          color: var(--gray-500);
        }
        
        .feature-button {
          background: rgba(255, 255, 255, 0.1);
          color: var(--light);
          padding: 0.5rem 1rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 500;
          transition: all var(--transition-fast);
        }
        
        .feature-button:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        
        .expand-indicator {
          position: absolute;
          bottom: 1rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.75rem;
          color: var(--gray-600);
          opacity: 0;
          transition: opacity var(--transition-fast);
        }
        
        .feature-card:hover .expand-indicator {
          opacity: 1;
        }
        
        /* Showcase Section */
        .showcase-section {
          padding: 6rem 2rem;
          background: linear-gradient(180deg, var(--dark-hover), var(--dark));
          position: relative;
          overflow: hidden;
        }
        
        .showcase-content {
          display: flex;
          align-items: center;
          gap: 4rem;
          max-width: 1200px;
          margin: 0 auto;
          position: relative;
        }
        
        .showcase-text {
          flex: 1;
        }
        
        .showcase-text h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          background: linear-gradient(45deg, var(--light), var(--primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .showcase-text p {
          color: var(--gray-500);
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        
        .feature-list {
          list-style: none;
          margin-bottom: 2rem;
        }
        
        .feature-list li {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-bottom: 1rem;
          color: var(--gray-400);
        }
        
        .feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: rgba(138, 43, 226, 0.1);
          border-radius: 50%;
          color: var(--primary-light);
        }
        
        .showcase-image {
          flex: 1;
          position: relative;
          height: 500px;
          border-radius: var(--radius-lg);
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: var(--shadow-xl);
        }
        
        /* Dashboard mockup */
        .dashboard-mockup {
          width: 100%;
          height: 100%;
          background: var(--dark-surface);
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
        }
        
        .dashboard-header {
          padding: 1rem;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(255, 255, 255, 0.03);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .dashboard-logo {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          font-weight: 600;
          font-size: 1rem;
        }
        
        .dashboard-logo .logo-icon {
          width: 24px;
          height: 24px;
          font-size: 0.875rem;
        }
        
        .dashboard-tabs {
          display: flex;
          gap: 0.5rem;
        }
        
        .tab {
          padding: 0.5rem 1rem;
          border-radius: var(--radius-md);
          font-size: 0.875rem;
          transition: all var(--transition-fast);
          color: var(--gray-500);
        }
        
        .tab.active {
          background: var(--primary);
          color: var(--light);
        }
        
        .tab:hover:not(.active) {
          background: rgba(255, 255, 255, 0.05);
          color: var(--gray-300);
        }
        
        .dashboard-actions {
          display: flex;
          gap: 0.5rem;
        }
        
        .icon-button {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: var(--radius-md);
          color: var(--gray-500);
          transition: all var(--transition-fast);
        }
        
        .icon-button:hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--light);
        }
        
        .dashboard-content {
          flex: 1;
          display: flex;
          padding: 1rem;
          gap: 1rem;
        }
        
        .dashboard-card {
          background: rgba(255, 255, 255, 0.03);
          border-radius: var(--radius-md);
          padding: 1rem;
          flex: 1;
          border: 1px solid rgba(255, 255, 255, 0.05);
          transition: all var(--transition-normal);
          position: relative;
          overflow: hidden;
        }
        
        .dashboard-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 3px;
          height: 100%;
          transition: all var(--transition-normal);
        }
        
        .dashboard-card.purple::before { background: linear-gradient(to bottom, var(--primary), transparent); }
        .dashboard-card.blue::before { background: linear-gradient(to bottom, var(--blue), transparent); }
        .dashboard-card.green::before { background: linear-gradient(to bottom, var(--green), transparent); }
        
        .dashboard-card.hovered {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
          border-color: rgba(255, 255, 255, 0.1);
        }
        
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.5rem;
        }
        
        .card-title {
          font-size: 0.875rem;
          color: var(--gray-500);
        }
        
        .card-trend {
          font-size: 0.75rem;
          font-weight: 500;
          padding: 0.25rem 0.5rem;
          border-radius: var(--radius-sm);
          background: rgba(56, 176, 0, 0.1);
          color: #7ed321;
        }
        
        .card-value {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        
        .card-chart {
          height: 60px;
          position: relative;
        }
        
        .chart-bar {
          height: 100%;
          display: flex;
          align-items: flex-end;
        }
        
        .bar-fill {
          width: 100%;
          height: 70%;
          background: linear-gradient(to right, rgba(138, 43, 226, 0.1), rgba(138, 43, 226, 0.3));
          border-radius: var(--radius-sm);
          position: relative;
          overflow: hidden;
        }
        
        .bar-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            transparent 100%);
          transform: translateX(-100%);
          animation: shimmer 2s infinite;
        }
        
        .dashboard-card.purple .bar-fill { background: linear-gradient(to right, rgba(138, 43, 226, 0.1), rgba(138, 43, 226, 0.3)); }
        .dashboard-card.blue .bar-fill { background: linear-gradient(to right, rgba(67, 97, 238, 0.1), rgba(67, 97, 238, 0.3)); }
        .dashboard-card.green .bar-fill { background: linear-gradient(to right, rgba(56, 176, 0, 0.1), rgba(56, 176, 0, 0.3)); }
        
        /* CTA Section */
        .cta-section {
          padding: 6rem 2rem;
          text-align: center;
          background: linear-gradient(45deg, var(--dark), #0c0c0c);
          position: relative;
          overflow: hidden;
        }
        
        .cta-content {
          max-width: 700px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        
        .cta-content h2 {
          font-size: 2.5rem;
          margin-bottom: 1.5rem;
          background: linear-gradient(45deg, var(--light), var(--primary-light));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        
        .cta-content p {
          color: var(--gray-500);
          margin-bottom: 2rem;
          line-height: 1.6;
        }
        
        /* Contact Form */
        .contact-form-container {
          max-width: 500px;
          margin: 0 auto;
          background: rgba(255, 255, 255, 0.03);
          padding: 2rem;
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        
        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }
        
        .form-group label {
          font-size: 0.875rem;
          color: var(--gray-400);
        }
        
        .form-group input,
        .form-group textarea {
          padding: 0.75rem 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          color: var(--light);
          font-size: 1rem;
          transition: all var(--transition-fast);
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 2px rgba(138, 43, 226, 0.2);
        }
        
        .submit-button {
          background: linear-gradient(45deg, var(--primary), var(--primary-light));
          color: var(--light);
          border: none;
          padding: 0.75rem 1.5rem;
          border-radius: var(--radius-full);
          font-weight: 600;
          transition: all var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          cursor: pointer;
        }
        
        .submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(138, 43, 226, 0.4);
        }
        
        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .submit-button.submitting {
          position: relative;
        }
        
        .submit-button.submitting::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            transparent 100%);
          transform: translateX(-100%);
          animation: shimmer 1.5s infinite;
        }
        
        .form-success {
          text-align: center;
          animation: fadeIn 0.5s ease forwards;
        }
        
        .success-icon {
          width: 60px;
          height: 60px;
          background: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin: 0 auto 1.5rem;
        }
        
        .form-success h3 {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--light);
        }
        
        .form-success p {
          color: var(--gray-500);
        }
        
        /* Footer */
        footer {
          padding: 4rem 2rem 2rem;
          background: var(--dark);
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .footer-content {
          display: flex;
          justify-content: space-between;
          max-width: 1200px;
          margin: 0 auto;
          flex-wrap: wrap;
          gap: 3rem;
          margin-bottom: 3rem;
        }
        
        .footer-info {
          flex: 1;
          min-width: 250px;
        }
        
        .footer-info p {
          color: var(--gray-500);
          margin: 1.5rem 0;
          line-height: 1.6;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
        }
        
        .social-link {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.05);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--gray-400);
          transition: all var(--transition-fast);
        }
        
        .social-link:hover {
          background: var(--primary);
          color: var(--light);
          transform: translateY(-3px);
        }
        
        .footer-links {
          display: flex;
          gap: 4rem;
          flex-wrap: wrap;
        }
        
        .links-column {
          min-width: 150px;
        }
        
        .links-column h3 {
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          color: var(--light);
        }
        
        .links-column ul {
          list-style: none;
        }
        
        .links-column li {
          margin-bottom: 0.75rem;
        }
        
        .links-column a {
          color: var(--gray-500);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        
        .links-column a:hover {
          color: var(--primary-light);
        }
        
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          max-width: 1200px;
          margin: 0 auto;
          flex-wrap: wrap;
          gap: 1rem;
        }
        
        .footer-bottom p {
          color: var(--gray-600);
          font-size: 0.875rem;
        }
        
        .footer-bottom-links {
          display: flex;
          gap: 1.5rem;
        }
        
        .footer-bottom-links a {
          color: var(--gray-600);
          font-size: 0.875rem;
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        
        .footer-bottom-links a:hover {
          color: var(--primary-light);
        }
        
        /* Back to top button */
        .back-to-top {
          position: fixed;
          bottom: 2rem;
          right: 2rem;
          width: 48px;
          height: 48px;
          background: var(--primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--light);
          box-shadow: var(--shadow-lg);
          opacity: 0;
          transform: translateY(20px);
          transition: all var(--transition-normal);
          z-index: 90;
        }
        
        .back-to-top.visible {
          opacity: 1;
          transform: translateY(0);
        }
        
        .back-to-top:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 30px rgba(138, 43, 226, 0.6);
        }
        
        /* Animations */
        @keyframes gradientShift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes float {
          0% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0); }
        }
        
        @keyframes pulse {
          0% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.3; }
          100% { transform: translate(-50%, -50%) scale(1); opacity: 0.5; }
        }
        
        @keyframes rotate {
          0% { transform: translate(-50%, -50%) rotate(0); }
          100% { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        @keyframes scrollDown {
          0% { transform: translateY(0); opacity: 0.7; }
          50% { transform: translateY(10px); opacity: 1; }
          100% { transform: translateY(0); opacity: 0.7; }
        }
        
        @keyframes firefly {
          0% { transform: translate(0, 0); opacity: 0; }
          50% { transform: translate(10px, -10px); opacity: 0.8; }
          100% { transform: translate(20px, -20px); opacity: 0; }
        }
        
        @keyframes fadeIn {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        /* Responsive styles */
        @media (max-width: 992px) {
          .showcase-content {
            flex-direction: column;
            gap: 3rem;
          }
          
          .hero-content {
            margin-right: 0;
            margin-bottom: 3rem;
            text-align: center;
          }
          
          .hero-buttons {
            justify-content: center;
          }
          
          .hero-stats {
            justify-content: center;
          }
          
          .hero-visual {
            width: 100%;
            max-width: 400px;
            margin: 0 auto;
          }
        }
        
        @media (max-width: 768px) {
          header {
            padding: 1rem;
          }
          
          nav {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: var(--dark);
            display: flex;
            align-items: center;
            justify-content: center;
            transform: translateX(-100%);
            transition: transform var(--transition-normal);
            z-index: 95;
          }
          
          nav.nav-open {
            transform: translateX(0);
          }
          
          nav ul {
            flex-direction: column;
            align-items: center;
            gap: 2rem;
          }
          
          nav a {
            font-size: 1.5rem;
          }
          
          .menu-toggle {
            display: flex;
            z-index: 100;
          }
          
          .theme-toggle {
            display: none;
          }
          
          .hero-section {
            padding-top: 6rem;
            flex-direction: column;
          }
          
          .hero-content h1 {
            font-size: 2.5rem;
          }
          
          .dashboard-content {
            flex-direction: column;
          }
          
          .dashboard-card {
            margin-bottom: 1rem;
          }
          
          .footer-content, .footer-links {
            flex-direction: column;
            gap: 2rem;
          }
        }
      `}</style>
    </div>
  );
};

// Fireflies Component
const Fireflies = ({ count = 20 }) => {
  const [fireflies, setFireflies] = useState([]);
  
  useEffect(() => {
    const newFireflies = [];
    
    for (let i = 0; i < count; i++) {
      newFireflies.push({
        id: i,
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        size: Math.random() * 6 + 4,
        animationDuration: Math.random() * 4 + 4,
        animationDelay: Math.random() * 5,
      });
    }
    
    setFireflies(newFireflies);
  }, [count]);
  
  return (
    <div className="fireflies">
      {fireflies.map((firefly) => (
        <div
          key={firefly.id}
          className="firefly"
          style={{
            left: firefly.left,
            top: firefly.top,
            width: `${firefly.size}px`,
            height: `${firefly.size}px`,
            animationDuration: `${firefly.animationDuration}s`,
            animationDelay: `${firefly.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ title, description, icon, color, darkMode }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div 
      className={`feature-card ${expanded ? 'expanded' : ''} ${color}`}
      onClick={() => setExpanded(!expanded)}
    >
      <div className="feature-icon">{icon}</div>
      <h3>{title}</h3>
      <p className={darkMode ? 'purple-text' : ''}>{description}</p>
      
      {expanded && (
        <div className="feature-details">
          <h4>Key Benefits</h4>
          <ul>
            <li className={darkMode ? 'purple-text' : ''}>Enhanced productivity and workflow</li>
            <li className={darkMode ? 'purple-text' : ''}>Intuitive user interface</li>
            <li className={darkMode ? 'purple-text' : ''}>Time-saving automation features</li>
          </ul>
          <button className="feature-button">Learn More</button>
        </div>
      )}
      
      <div className="expand-indicator">
        {expanded ? 'Click to collapse' : 'Click to expand'}
      </div>
    </div>
  );
};

// Dashboard Demo Component
const DashboardDemo = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [hoveredCard, setHoveredCard] = useState(null);
  
  const metrics = [
    { id: 1, title: 'Total Visitors', value: '24,582', trend: '+12%', color: 'purple' },
    { id: 2, title: 'Conversion Rate', value: '8.7%', trend: '+3.2%', color: 'blue' },
    { id: 3, title: 'Engagement', value: '12.3m', trend: '+18%', color: 'green' },
  ];
  
  return (
    <div className="dashboard-mockup">
      <div className="dashboard-header">
        <div className="dashboard-logo">
          <div className="logo-icon">L</div>
          <span>Analytics</span>
        </div>
        
        <div className="dashboard-tabs">
          <button 
            className={`tab ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`tab ${activeTab === 'reports' ? 'active' : ''}`}
            onClick={() => setActiveTab('reports')}
          >
            Reports
          </button>
          <button 
            className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
        
        <div className="dashboard-actions">
          <button className="icon-button">
            <Search size={18} />
          </button>
          <button className="icon-button">
            <Plus size={18} />
          </button>
        </div>
      </div>
      
      <div className="dashboard-content">
        {metrics.map((metric) => (
          <div 
            key={metric.id}
            className={`dashboard-card ${metric.color} ${hoveredCard === metric.id ? 'hovered' : ''}`}
            onMouseEnter={() => setHoveredCard(metric.id)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="card-header">
              <div className="card-title">{metric.title}</div>
              <div className="card-trend">{metric.trend}</div>
            </div>
            
            <div className="card-value">{metric.value}</div>
            
            <div className="card-chart">
              <div className="chart-bar">
                <div className="bar-fill"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Contact Form Component
const ContactForm = ({ darkMode }) => {
  const [formState, setFormState] = useState({
    email: '',
    name: '',
    message: '',
  });
  
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  
  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setFormState({
          email: '',
          name: '',
          message: '',
        });
      }, 3000);
    }, 1500);
  };
  
  return (
    <div className="contact-form-container">
      {!submitted ? (
        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className={darkMode ? 'purple-text-light' : ''}>Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              placeholder="Your name"
              className={darkMode ? 'dark-input' : ''}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email" className={darkMode ? 'purple-text-light' : ''}>Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              placeholder="Your email address"
              className={darkMode ? 'dark-input' : ''}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="message" className={darkMode ? 'purple-text-light' : ''}>Message</label>
            <textarea
              id="message"
              name="message"
              value={formState.message}
              onChange={handleChange}
              required
              placeholder="Your message"
              rows="4"
              className={darkMode ? 'dark-input' : ''}
            />
          </div>
          
          <button 
            type="submit" 
            className={`submit-button ${submitting ? 'submitting' : ''}`}
            disabled={submitting}
          >
            {submitting ? 'Sending...' : 'Get Started'}
            <ArrowRight size={16} />
          </button>
        </form>
      ) : (
        <div className="form-success">
          <div className="success-icon">✓</div>
          <h3>Thank you!</h3>
          <p className={darkMode ? 'purple-text' : ''}>Your message has been sent successfully. We'll get back to you soon.</p>
        </div>
      )}
    </div>
  );
};

// Icon Components
const DesignIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3L20 7.5V16.5L12 21L4 16.5V7.5L12 3Z" />
    <circle cx="12" cy="12" r="2" />
    <path d="M12 14V17" />
    <path d="M12 10V7" />
    <path d="M14 12H17" />
    <path d="M10 12H7" />
  </svg>
);

const AnimationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <path d="M8 14L12 16L16 14" />
    <path d="M8 10L12 12L16 10" />
    <path d="M12 16V12" />
  </svg>
);

const TemplateIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9H21" />
    <path d="M9 21V9" />
  </svg>
);

const CollaborationIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="8" cy="8" r="4" />
    <circle cx="16" cy="16" r="4" />
    <path d="M12 12L15 15" />
    <path d="M9 7L7 9" />
    <path d="M17 15L15 17" />
  </svg>
);

const AnalyticsIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3V21H21" />
    <path d="M7 14L12 9L17 14L22 9" />
  </svg>
);

const SeoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="10" cy="10" r="7" />
    <path d="M21 21L15 15" />
    <path d="M10 7V13" />
    <path d="M7 10H13" />
  </svg>
);

const CheckIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17L4 12" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
  </svg>
);

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37C16.1234 12.2022 15.9813 13.0522 15.5938 13.799C15.2063 14.5458 14.5931 15.1514 13.8416 15.5297C13.0901 15.9079 12.2384 16.0396 11.4078 15.9059C10.5771 15.7723 9.80976 15.3801 9.21484 14.7852C8.61992 14.1902 8.22773 13.4229 8.09407 12.5922C7.9604 11.7615 8.09207 10.9099 8.47033 10.1584C8.84859 9.40685 9.45419 8.79374 10.201 8.40624C10.9478 8.01874 11.7978 7.87658 12.63 8C13.4789 8.12588 14.2649 8.52146 14.8717 9.12831C15.4785 9.73515 15.8741 10.5211 16 11.37Z" />
    <circle cx="16.5" cy="7.5" r="1.5" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8C17.5913 8 19.1174 8.63214 20.2426 9.75736C21.3679 10.8826 22 12.4087 22 14V21H18V14C18 13.4696 17.7893 12.9609 17.4142 12.5858C17.0391 12.2107 16.5304 12 16 12C15.4696 12 14.9609 12.2107 14.5858 12.5858C14.2107 12.9609 14 13.4696 14 14V21H10V14C10 12.4087 10.6321 10.8826 11.7574 9.75736C12.8826 8.63214 14.4087 8 16 8Z" />
    <path d="M6 9H2V21H6V9Z" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default App;
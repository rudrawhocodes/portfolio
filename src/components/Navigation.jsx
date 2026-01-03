import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import './Navigation.css';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navRef = useRef(null);
  const { scrollY } = useScroll();
  
  const navBackground = useTransform(
    scrollY,
    [0, 100],
    ['rgba(5, 5, 5, 0)', 'rgba(5, 5, 5, 0.9)']
  );

  const navBorder = useTransform(
    scrollY,
    [0, 100],
    ['rgba(34, 34, 34, 0)', 'rgba(34, 34, 34, 1)']
  );

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Work' },
    { id: 'skills', label: 'Skills' },
    { id: 'experience', label: 'Experience' },
    { id: 'education', label: 'Education' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        '.menu-link',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power4.out',
          delay: 0.3,
        }
      );
    }
  }, [isOpen]);

  return (
    <>
      <motion.nav
        ref={navRef}
        className="navigation"
        style={{
          backgroundColor: navBackground,
          borderBottomColor: navBorder,
        }}
      >
        <div className="nav-container">
          <motion.a
            href="#hero"
            className="nav-logo"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('hero');
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="logo-text">RT</span>
            <span className="logo-dot"></span>
          </motion.a>

          <div className="nav-links-desktop">
            {navLinks.map((link) => (
              <motion.a
                key={link.id}
                href={`#${link.id}`}
                className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(link.id);
                }}
                whileHover={{ y: -2 }}
              >
                <span className="nav-link-text">{link.label}</span>
                <span className="nav-link-indicator"></span>
              </motion.a>
            ))}
          </div>

          <div className="nav-right">
            <motion.a
              href="https://github.com/rudrathacker"
              target="_blank"
              rel="noopener noreferrer"
              className="nav-github"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </motion.a>

            <button
              className={`nav-menu-btn ${isOpen ? 'open' : ''}`}
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <span className="menu-line"></span>
              <span className="menu-line"></span>
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="menu-content">
              <div className="menu-links">
                {navLinks.map((link, i) => (
                  <div key={link.id} className="menu-link-wrapper">
                    <a
                      href={`#${link.id}`}
                      className="menu-link"
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.id);
                      }}
                    >
                      <span className="menu-link-number">0{i + 1}</span>
                      <span className="menu-link-text">{link.label}</span>
                    </a>
                  </div>
                ))}
              </div>

              <div className="menu-footer">
                <div className="menu-socials">
                  <a href="https://github.com/rudrathacker" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="https://linkedin.com/in/rudrathacker" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="mailto:rudra@example.com">Email</a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;

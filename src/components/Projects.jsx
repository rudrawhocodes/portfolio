import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import './Projects.css';

const Projects = () => {
  const sectionRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const projects = [];

  useEffect(() => {
    if (!isInView) return;

    gsap.fromTo(
      '.project-card',
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
      }
    );
  }, [isInView]);

  return (
    <section id="projects" ref={sectionRef} className="projects section">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-label">02 — Work</span>
          <h2 className="section-title">
            Selected <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-description">
            Systems and tools built with focus on performance, correctness, and elegant design.
          </p>
        </div>

        <motion.div
          className="projects-placeholder"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Projects listing soon.
        </motion.div>

        <div className="projects-cta">
          <motion.a
            href="https://github.com/rudrawhocodes"
            target="_blank"
            rel="noopener noreferrer"
            className="view-all-link"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span>View All Projects on GitHub</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/>
              <line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
};

export default Projects;

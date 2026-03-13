import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import gsap from 'gsap';
import './Projects.css';

const Projects = () => {
  const sectionRef = useRef(null);
  const [hoveredProject, setHoveredProject] = useState(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const projects = [
    {
      title: "Paper Trader",
      description: "A paper trading application that simulates real-market trading without financial risk. Features order management, portfolio tracking, P&L calculation, and performance analysis modules.",
      category: "Fintech",
      number: "01",
      color: "#00ff88",
      tags: ["Trading", "Portfolio", "P&L", "Analytics"],
      link: "https://papertraderr.netlify.app",
      linkLabel: "Live Demo",
    },
    {
      title: "Quant Screener",
      description: "A full-stack quantitative finance engine that applies discrete mathematics and Warshall's algorithm to identify systemic market risk. Groups stocks into equivalence classes via transitive closure of correlation matrices, enabling real-time risk visualization and statistical arbitrage detection.",
      category: "Quant Finance",
      number: "02",
      color: "#00ccff",
      tags: ["TypeScript", "Python", "FastAPI", "Warshall's Algorithm"],
      link: "https://quantscreener.netlify.app",
      linkLabel: "Live Demo",
    },
    {
      title: "2D Physics Engine",
      description: "A from-scratch 2D physics simulation engine built in C++. Features rigid body dynamics, collision detection, and physics-based interactions with a CMake build system and dedicated test suite.",
      category: "Systems",
      number: "03",
      color: "#ff6b6b",
      tags: ["C++", "CMake", "Physics", "Simulation"],
      link: "https://github.com/rudrawhocodes/2D_PhysicsEngine",
      linkLabel: "Source Code",
    },
    {
      title: "Portfolio Website",
      description: "A modern, high-performance personal portfolio built with Vite and deployed on Cloudflare. Features smooth scroll animations via GSAP and Lenis, particle backgrounds, and a fully responsive design.",
      category: "Web",
      number: "04",
      color: "#a78bfa",
      tags: ["JavaScript", "CSS", "Vite", "Cloudflare"],
      link: "https://rudrathacker.me",
      linkLabel: "Live Site",
    },
  ];

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

        <div className="projects-grid">
          {projects.map((project, index) => (
            <motion.article
              key={index}
              className="project-card"
              style={{ '--project-color': project.color }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="project-glow" />

              <div className="project-header">
                <span className="project-number">{project.number}</span>
                <span className="project-category">{project.category}</span>
              </div>

              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
              >
                <span>{project.linkLabel}</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                  <polyline points="15 3 21 3 21 9"/>
                  <line x1="10" y1="14" x2="21" y2="3"/>
                </svg>
              </a>
            </motion.article>
          ))}
        </div>

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

import { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import './Education.css';

const Education = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const cardRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [10, 0, -10]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.edu-card',
        { y: 100, opacity: 0, rotateX: 15 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          duration: 1.2,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.course-item',
        { x: -30, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          stagger: 0.05,
          duration: 0.5,
          ease: 'power3.out',
          delay: 0.6,
        }
      );

      gsap.fromTo(
        '.edu-stat',
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          delay: 0.8,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  const courses = [
    { name: "Data Structures & Algorithms", icon: "⬡" },
    { name: "Calculus & Linear Algebra", icon: "∑" },
    { name: "Probability & Statistics", icon: "◈" },
    { name: "Computer Architecture", icon: "⚙" },
    { name: "Object-Oriented Programming", icon: "{ }" },
    { name: "Database Systems", icon: "◇" },
    { name: "Operating Systems", icon: "▣" },
    { name: "Discrete Mathematics", icon: "∴" },
  ];

  return (
    <section id="education" ref={sectionRef} className="education section">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-label">05 — Education</span>
          <h2 className="section-title">
            Academic <span className="gradient-text">Foundation</span>
          </h2>
        </div>

        <motion.div 
          className="edu-container"
          style={{ rotateX, scale }}
        >
          <div className="edu-card" ref={cardRef}>
            <div className="edu-card-inner">
              {/* University Badge */}
              <div className="edu-badge">
                <div className="badge-icon">
                  <span>AU</span>
                </div>
                <div className="badge-glow" />
              </div>

              {/* Main Info */}
              <div className="edu-main">
                <div className="edu-degree-group">
                  <h3 className="edu-degree">B.E./B.Tech</h3>
                  <p className="edu-major">Computer Science & Applied Mathematics</p>
                </div>
                
                <div className="edu-institution">
                  <h4 className="edu-university">Adani University</h4>
                  <p className="edu-location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    Ahmedabad, India
                  </p>
                </div>

                <div className="edu-period">
                  <span className="period-label">Duration</span>
                  <span className="period-value">2025 — Present</span>
                  <span className="period-status">Currently Pursuing</span>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="edu-decoration">
                <div className="deco-line deco-line-1" />
                <div className="deco-line deco-line-2" />
                <div className="deco-circle" />
              </div>
            </div>

            {/* Coursework */}
            <div className="edu-coursework">
              <h4 className="coursework-title">
                <span className="title-icon">◆</span>
                Relevant Coursework
              </h4>
              <div className="courses-grid">
                {courses.map((course, index) => (
                  <motion.div
                    key={index}
                    className="course-item"
                    whileHover={{ x: 5, backgroundColor: 'rgba(0, 255, 136, 0.05)' }}
                    transition={{ duration: 0.2 }}
                  >
                    <span className="course-icon">{course.icon}</span>
                    <span className="course-name">{course.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="edu-stats">
              <div className="edu-stat">
                <span className="stat-icon">◈</span>
                <span className="stat-label">Focus</span>
                <span className="stat-value">DSA & Quant</span>
              </div>
              <div className="edu-stat">
                <span className="stat-icon">⚡</span>
                <span className="stat-label">Approach</span>
                <span className="stat-value">Theory + Practice</span>
              </div>
              <div className="edu-stat">
                <span className="stat-icon">◆</span>
                <span className="stat-label">Goal</span>
                <span className="stat-value">Systems Engineer</span>
              </div>
            </div>

            {/* Background Pattern */}
            <div className="edu-pattern">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none">
                <defs>
                  <pattern id="eduGrid" width="10" height="10" patternUnits="userSpaceOnUse">
                    <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.1"/>
                  </pattern>
                </defs>
                <rect width="100" height="100" fill="url(#eduGrid)" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Education;

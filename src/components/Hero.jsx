import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Hero.css';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const smoothY = useSpring(y, { stiffness: 100, damping: 30 });
  const smoothOpacity = useSpring(opacity, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate title letters
      gsap.fromTo(
        '.hero-title-line',
        { y: 120, opacity: 0, rotateX: -40 },
        {
          y: 0,
          opacity: 1,
          rotateX: 0,
          stagger: 0.15,
          duration: 1.2,
          ease: 'power4.out',
          delay: 0.5,
        }
      );

      // Animate subtitle
      gsap.fromTo(
        '.hero-subtitle',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 1.2 }
      );

      // Animate CTA
      gsap.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.5 }
      );

      // Animate status
      gsap.fromTo(
        '.hero-status',
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 1.8 }
      );

      // Animate scroll indicator
      gsap.fromTo(
        '.scroll-indicator',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 2 }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const titleLines = [
    { text: "I Build", highlight: false },
    { text: "High-Performance", highlight: true },
    { text: "Software & Quant Tools", highlight: false },
  ];

  return (
    <section id="hero" ref={heroRef} className="hero">
      <motion.div 
        className="hero-content"
        style={{ y: smoothY, opacity: smoothOpacity, scale }}
      >
        <div className="hero-main">
          <div className="hero-title-wrapper" ref={titleRef}>
            {titleLines.map((line, index) => (
              <div key={index} className="hero-title-line-wrapper">
                <h1 className={`hero-title-line ${line.highlight ? 'highlight' : ''}`}>
                  {line.text}
                </h1>
              </div>
            ))}
          </div>

          <p className="hero-subtitle" ref={subtitleRef}>
            Software Engineer & Quantitative Developer focused on 
            <span className="highlight"> elegant algorithms</span>,
            <span className="highlight"> performance-aware code</span>, and
            <span className="highlight"> data-driven products</span>.
          </p>

          <div className="hero-cta">
            <motion.a
              href="#projects"
              className="cta-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
              data-cursor-text="View"
            >
              <span>Explore My Work</span>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </motion.a>

            <motion.a
              href="https://github.com/rudrathacker"
              target="_blank"
              rel="noopener noreferrer"
              className="cta-secondary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              data-cursor="pointer"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
              </svg>
              <span>GitHub</span>
            </motion.a>
          </div>
        </div>

        <div className="hero-status">
          <div className="status-indicator">
            <span className="status-dot"></span>
            <span className="status-text">Available for opportunities</span>
          </div>
          <div className="status-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>Based in India</span>
          </div>
        </div>
      </motion.div>

      <div className="scroll-indicator">
        <div className="scroll-line"></div>
        <span className="scroll-text">Scroll to explore</span>
      </div>

      <div className="hero-decoration">
        <div className="decoration-line decoration-line-1"></div>
        <div className="decoration-line decoration-line-2"></div>
        <div className="decoration-circle"></div>
      </div>
    </section>
  );
};

export default Hero;

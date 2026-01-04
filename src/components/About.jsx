import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './About.css';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.about-text-line',
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.about-stat',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.15,
          duration: 0.6,
          ease: 'power3.out',
          delay: 0.4,
        }
      );

      gsap.fromTo(
        '.about-image-wrapper',
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          delay: 0.3,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  const stats = [
    { value: "C++", label: "Primary Language" },
    { value: "Python", label: "Data & Prototyping" },
    { value: "DSA", label: "Core Expertise" },
    { value: "Software", label: "Domain Focus" },
    { value: "Quantitative", label: "Domain Focus" },
  ];

  return (
    <section id="about" ref={sectionRef} className="about section">
      <div className="section-inner">
        <div className="about-grid">
          <div className="about-content">
            <div className="section-header">
              <span className="section-label">01 — About</span>
              <h2 className="section-title">
                <span className="about-text-line">Engineering</span>
                <span className="about-text-line">
                  with <span className="gradient-text">Purpose</span>
                </span>
              </h2>
            </div>

            <div className="about-text">
              <p className="about-text-line">
                I am a software engineer who finds beauty in efficient algorithms and 
                well-architected systems. My approach is simple: understand the problem 
                deeply, design with intention, and implement with precision.
              </p>
              <p className="about-text-line">
                Whether building low-latency trading systems, implementing complex 
                data structures, or optimizing critical code paths—I focus on what 
                matters: correctness, performance, and maintainability.
              </p>
              <p className="about-text-line">
                My background spans quantitative development and systems engineering, 
                giving me a unique perspective on building software that not only works 
                but performs under real-world constraints.
              </p>
            </div>

            <div className="about-stats">
              {stats.map((stat, index) => (
                <div key={index} className="about-stat">
                  <span className="stat-value">{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <motion.div 
            className="about-visual"
            style={{ y: parallaxY }}
          >
            <div className="about-image-wrapper">
              <div className="about-image-placeholder">
                <div className="code-block">
                  <div className="code-header">
                    <span className="code-dot"></span>
                    <span className="code-dot"></span>
                    <span className="code-dot"></span>
                    <span className="code-title">philosophy.hpp</span>
                  </div>
                  <pre className="code-content">
{`class Engineer {
public:
  void approach() {
    understand_deeply();
    design_intentionally();
    implement_precisely();
    measure_continuously();
  }
  
private:
  bool correctness_first = true;
  bool premature_optimization = false;
  
  constexpr auto principles = {
    "Simple > Complex",
    "Measured > Assumed", 
    "Correct > Clever"
  };
};`}
                  </pre>
                </div>
              </div>
            </div>

            <div className="about-decoration">
              <div className="deco-grid"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;

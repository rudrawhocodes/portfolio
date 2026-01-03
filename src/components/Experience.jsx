import { useRef, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import gsap from 'gsap';
import './Experience.css';

const Experience = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const timelineRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 0.5], ["0%", "100%"]);

  const experiences = [
    {
      role: "Founder & President",
      company: "FinBiz Club",
      companyFull: "Fintech & Business Club",
      location: "Adani University, Ahmedabad",
      period: "2025 — Present",
      type: "Leadership",
      description: [
        "Founded and lead the premier fintech and business club at Adani University, building a community of 50+ members passionate about financial technology and entrepreneurship.",
        "Organize workshops on algorithmic trading, quantitative finance, and fintech innovation, bridging the gap between academic learning and industry practices.",
        "Collaborate with industry professionals to host speaker sessions, hackathons, and case competitions focused on real-world financial problem-solving.",
        "Develop educational content on topics including market microstructure, trading systems, and the intersection of technology and finance."
      ],
      highlights: [
        { label: "Members", value: "500+" },
        { label: "Events", value: "10+" },
        { label: "Workshops", value: "Monthly" }
      ],
      icon: "◆"
    }
  ];

  useEffect(() => {
    if (!isInView) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.experience-card',
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.2,
          duration: 1,
          ease: 'power3.out',
        }
      );

      gsap.fromTo(
        '.exp-highlight',
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          stagger: 0.1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          delay: 0.5,
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [isInView]);

  return (
    <section id="experience" ref={sectionRef} className="experience section">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-label">04 — Experience</span>
          <h2 className="section-title">
            Building <span className="gradient-text">Communities</span>
          </h2>
          <p className="section-description">
            Leading initiatives that bridge technology and finance.
          </p>
        </div>

        <div className="experience-container">
          <div className="experience-timeline" ref={timelineRef}>
            <motion.div 
              className="timeline-line"
              style={{ height: lineHeight }}
            />
            <div className="timeline-line-bg" />
          </div>

          <div className="experience-cards">
            {experiences.map((exp, index) => (
              <motion.article
                key={index}
                className="experience-card"
                whileHover={{ x: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="exp-timeline-dot">
                  <span className="dot-icon">{exp.icon}</span>
                </div>

                <div className="exp-content">
                  <div className="exp-header">
                    <div className="exp-title-group">
                      <h3 className="exp-role">{exp.role}</h3>
                      <div className="exp-company-group">
                        <span className="exp-company">{exp.company}</span>
                        <span className="exp-company-full">— {exp.companyFull}</span>
                      </div>
                    </div>
                    <div className="exp-meta">
                      <span className="exp-period">{exp.period}</span>
                      <span className="exp-type">{exp.type}</span>
                    </div>
                  </div>

                  <div className="exp-location">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                      <circle cx="12" cy="10" r="3"/>
                    </svg>
                    <span>{exp.location}</span>
                  </div>

                  <div className="exp-description">
                    {exp.description.map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>

                  <div className="exp-highlights">
                    {exp.highlights.map((highlight, i) => (
                      <div key={i} className="exp-highlight">
                        <span className="highlight-value">{highlight.value}</span>
                        <span className="highlight-label">{highlight.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="exp-decoration">
                  <div className="exp-glow" />
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

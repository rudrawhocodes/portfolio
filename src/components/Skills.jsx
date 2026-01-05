import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useMotionValueEvent, useSpring, useTransform } from 'framer-motion';
import gsap from 'gsap';
import './Skills.css';

const Skills = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(0);

  const skillCategories = [
    {
      name: "Languages",
      icon: "{ }",
      skills: [
        { name: "C++", level: 95, detail: "STL, Templates, Memory Management, Move Semantics" },
        { name: "Python", level: 90, detail: "NumPy, Pandas, Data Analysis, Scripting" },
        { name: "SQL", level: 75, detail: "Query Optimization, Indexing, Analytics" },
      ]
    },
    {
      name: "Data Structures",
      icon: "⬡",
      skills: [
        { name: "Trees & Graphs", level: 90, detail: "BST, AVL, Segment Trees, Graph Algorithms" },
        { name: "Hash Tables", level: 85, detail: "Open Addressing, Chaining, Perfect Hashing" },
        { name: "Heaps & Queues", level: 90, detail: "Priority Queues, Deques, Circular Buffers" },
        { name: "Advanced", level: 70, detail: "Tries, Union-Find, Fenwick Trees" },
      ]
    },
    {
      name: "Algorithms",
      icon: "◈",
      skills: [
        { name: "Sorting & Searching", level: 95, detail: "Quick, Merge, Binary Search variants" },
        { name: "Dynamic Programming", level: 90, detail: "Memoization, Tabulation, Optimization" },
        { name: "Graph Algorithms", level: 90, detail: "BFS, DFS, Dijkstra, Bellman-Ford, A*" },
        { name: "Greedy & Divide", level: 85, detail: "Optimal Substructure, Partitioning" },
      ]
    },
    {
      name: "Software Development",
      icon: "</>",
      skills: [
        { name: "Architecture", level: 90, detail: "Modular design, clean interfaces, trade-off analysis" },
        { name: "APIs & Services", level: 88, detail: "REST, gRPC, pagination, rate limiting, caching" },
        { name: "Testing & Quality", level: 85, detail: "Unit + property tests, benchmarks, reproducibility" },
        { name: "Perf & Profiling", level: 88, detail: "Hot-path tuning, memory layout, latency budgets" },
      ]
    },
  ];

  useEffect(() => {
    if (!isInView) return;

    gsap.fromTo(
      '.skill-category-btn',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out',
      }
    );

    gsap.fromTo(
      '.skills-visualization',
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.3,
      }
    );
  }, [isInView]);

  return (
    <section id="skills" ref={sectionRef} className="skills section">
      <div className="section-inner">
        <div className="section-header">
          <span className="section-label">03 — Skills</span>
          <h2 className="section-title">
            Technical <span className="gradient-text">Expertise</span>
          </h2>
        </div>

        <div className="skills-container">
          <div className="skills-categories">
            {skillCategories.map((category, index) => (
              <motion.button
                key={index}
                className={`skill-category-btn ${activeCategory === index ? 'active' : ''}`}
                onClick={() => setActiveCategory(index)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
                <span className="category-count">{category.skills.length}</span>
              </motion.button>
            ))}
          </div>

          <div className="skills-visualization">
            <div className="skills-panel">
              <div className="panel-header">
                <h3>{skillCategories[activeCategory].name}</h3>
                <span className="panel-icon">{skillCategories[activeCategory].icon}</span>
              </div>

              <div className="skills-list">
                {skillCategories[activeCategory].skills.map((skill, index) => (
                  <SkillBar key={`${activeCategory}-${index}`} skill={skill} index={index} />
                ))}
              </div>
            </div>

            <div className="skills-radar">
              <SkillsRadar categories={skillCategories} activeIndex={activeCategory} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const SkillBar = ({ skill, index }) => {
  const barRef = useRef(null);
  const isInView = useInView(barRef, { once: true });
  const width = useSpring(0, { stiffness: 50, damping: 20 });
  const [displayedPercent, setDisplayedPercent] = useState(0);
  const widthPercent = useTransform(width, (latest) => `${latest}%`);

  useMotionValueEvent(width, 'change', (latest) => {
    setDisplayedPercent(Math.round(latest));
  });

  useEffect(() => {
    if (isInView) {
      setTimeout(() => {
        width.set(skill.level);
      }, index * 100);
    }
  }, [isInView, skill.level, index, width]);

  return (
    <motion.div
      ref={barRef}
      className="skill-item"
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <div className="skill-header">
        <span className="skill-name">{skill.name}</span>
        <span className="skill-percent">{displayedPercent}%</span>
      </div>
      <div className="skill-bar-container">
        <motion.div
          className="skill-bar-fill"
          style={{ width: widthPercent }}
        />
        <div className="skill-bar-glow" style={{ width: `${skill.level}%` }} />
      </div>
      <p className="skill-detail">{skill.detail}</p>
    </motion.div>
  );
};

const SkillsRadar = ({ categories, activeIndex }) => {
  const size = 280;
  const center = size / 2;
  const radius = size / 2 - 40;
  const levels = 5;

  const getPoint = (index, value) => {
    const angle = (Math.PI * 2 * index) / categories.length - Math.PI / 2;
    const r = (value / 100) * radius;
    return {
      x: center + r * Math.cos(angle),
      y: center + r * Math.sin(angle),
    };
  };

  const avgSkills = categories.map(cat => 
    cat.skills.reduce((sum, s) => sum + s.level, 0) / cat.skills.length
  );

  const points = avgSkills.map((level, i) => getPoint(i, level));
  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="radar-svg">
      {/* Grid circles */}
      {[...Array(levels)].map((_, i) => (
        <circle
          key={i}
          cx={center}
          cy={center}
          r={(radius / levels) * (i + 1)}
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="1"
          opacity="0.3"
        />
      ))}

      {/* Axis lines */}
      {categories.map((_, i) => {
        const point = getPoint(i, 100);
        return (
          <line
            key={i}
            x1={center}
            y1={center}
            x2={point.x}
            y2={point.y}
            stroke="var(--color-border)"
            strokeWidth="1"
            opacity="0.3"
          />
        );
      })}

      {/* Data polygon */}
      <motion.path
        d={pathD}
        fill="url(#radarGradient)"
        stroke="var(--color-accent)"
        strokeWidth="2"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* Data points */}
      {points.map((point, i) => (
        <motion.circle
          key={i}
          cx={point.x}
          cy={point.y}
          r={i === activeIndex ? 6 : 4}
          fill={i === activeIndex ? "var(--color-accent)" : "var(--color-surface)"}
          stroke="var(--color-accent)"
          strokeWidth="2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: i * 0.1, duration: 0.3 }}
        />
      ))}

      {/* Labels */}
      {categories.map((cat, i) => {
        const point = getPoint(i, 115);
        return (
          <text
            key={i}
            x={point.x}
            y={point.y}
            textAnchor="middle"
            dominantBaseline="middle"
            className={`radar-label ${i === activeIndex ? 'active' : ''}`}
          >
            {cat.name}
          </text>
        );
      })}

      <defs>
        <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--color-accent-secondary)" stopOpacity="0.1" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Skills;

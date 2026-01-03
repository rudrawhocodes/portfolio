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
      id: 1,
      title: "Quantitative Portfolio Analyzer",
      category: "Quant Engineering",
      tags: ["C++", "Python", "NumPy", "Risk Analytics"],
      description: "High-performance portfolio analytics engine computing Sharpe ratios, VaR, and covariance matrices. Processes 10 years of daily data for 500+ assets in under 200ms using SIMD-optimized matrix operations.",
      metrics: [
        { label: "Processing Speed", value: "<200ms" },
        { label: "Assets Handled", value: "500+" },
        { label: "Data Span", value: "10 Years" },
      ],
      tech: "C++ core with Python bindings via pybind11. Welford's algorithm for numerical stability. Memory-mapped I/O for large datasets.",
      github: "https://github.com/rudrathacker/portfolio-analyzer",
      color: "#00ff88",
    },
    {
      id: 2,
      title: "Custom Memory Allocator",
      category: "Systems Programming",
      tags: ["C++", "Memory Management", "Performance"],
      description: "High-performance custom memory allocator implementing pool allocation, slab allocation, and buddy system. Reduces allocation latency by 10x compared to malloc for fixed-size objects.",
      metrics: [
        { label: "Speedup", value: "10x" },
        { label: "Fragmentation", value: "<5%" },
        { label: "Thread-Safe", value: "Yes" },
      ],
      tech: "Lock-free free lists. Cache-line aligned allocations. RAII wrappers for automatic memory management.",
      github: "https://github.com/rudrathacker/memory-allocator",
      color: "#ff6b35",
    },
    {
      id: 3,
      title: "LRU Cache Implementation",
      category: "Data Structures",
      tags: ["C++", "DSA", "O(1) Operations"],
      description: "Thread-safe LRU cache with O(1) get/put operations using hash map + doubly linked list. Supports configurable eviction policies and memory limits.",
      metrics: [
        { label: "Get/Put", value: "O(1)" },
        { label: "Thread Safety", value: "Lock-free" },
        { label: "Memory", value: "Bounded" },
      ],
      tech: "Intrusive linked list for cache-friendly traversal. Custom memory pool. Lock-free design with atomic operations.",
      github: "https://github.com/rudrathacker/lru-cache",
      color: "#a855f7",
    },
    {
      id: 4,
      title: "Graph Algorithm Visualizer",
      category: "Algorithms",
      tags: ["C++", "Python", "BFS/DFS", "Dijkstra"],
      description: "Interactive visualization of graph algorithms including BFS, DFS, Dijkstra's, A*, and Bellman-Ford. Educational tool with step-by-step execution and complexity analysis.",
      metrics: [
        { label: "Algorithms", value: "8+" },
        { label: "Nodes", value: "10K+" },
        { label: "FPS", value: "60" },
      ],
      tech: "Adjacency list with custom graph class. Priority queue optimizations. Real-time rendering pipeline.",
      github: "https://github.com/rudrathacker/graph-visualizer",
      color: "#00ccff",
    },
    {
      id: 5,
      title: "Database Query Engine",
      category: "Software Engineering",
      tags: ["C++", "B+ Trees", "Query Optimization"],
      description: "Mini SQL query engine with B+ tree indexing, query parsing, and execution planning. Supports SELECT, INSERT, UPDATE, DELETE with WHERE clauses and JOINs.",
      metrics: [
        { label: "Query Parse", value: "<1ms" },
        { label: "Index Lookup", value: "O(log n)" },
        { label: "Tables", value: "Unlimited" },
      ],
      tech: "Recursive descent parser. Cost-based query optimizer. Buffer pool with LRU eviction. WAL for crash recovery.",
      github: "https://github.com/rudrathacker/query-engine",
      color: "#00ff88",
    },
    {
      id: 6,
      title: "Segment Tree Library",
      category: "Data Structures",
      tags: ["C++", "Templates", "Lazy Propagation"],
      description: "Generic segment tree implementation with lazy propagation. Supports range queries and updates in O(log n). Template-based for any associative operation.",
      metrics: [
        { label: "Query", value: "O(log n)" },
        { label: "Update", value: "O(log n)" },
        { label: "Build", value: "O(n)" },
      ],
      tech: "Zero-indexed, iterative implementation. Memory-efficient array representation. Compile-time operation binding.",
      github: "https://github.com/rudrathacker/segment-tree",
      color: "#00ccff",
    },
    {
      id: 7,
      title: "Rate Limiter Service",
      category: "Backend Engineering",
      tags: ["C++", "Distributed Systems", "Redis"],
      description: "Distributed rate limiter using token bucket and sliding window algorithms. Supports multi-tenant configurations with per-user and per-endpoint limits.",
      metrics: [
        { label: "Throughput", value: "100K/s" },
        { label: "Latency P99", value: "<1ms" },
        { label: "Accuracy", value: "99.9%" },
      ],
      tech: "Lua scripts for atomic Redis operations. Consistent hashing for distribution. Graceful degradation under load.",
      github: "https://github.com/rudrathacker/rate-limiter",
      color: "#a855f7",
    },
    {
      id: 8,
      title: "Order Book Simulator",
      category: "Market Simulation",
      tags: ["C++", "Low Latency", "L3 Data"],
      description: "Limit order book simulator for market microstructure analysis. Supports replay of L3 data and synthetic order flow generation for stress testing.",
      metrics: [
        { label: "Operations", value: "2M/s" },
        { label: "Memory/Order", value: "64 bytes" },
        { label: "Latency", value: "<1μs" },
      ],
      tech: "Intrusive linked lists for O(1) removal. Lock-free order pool. FIX protocol parser for real data.",
      github: "https://github.com/rudrathacker/orderbook-sim",
      color: "#ff6b35",
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
              key={project.id}
              className={`project-card ${hoveredProject === index ? 'hovered' : ''}`}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{ '--project-color': project.color }}
              data-cursor="pointer"
              data-cursor-text="View"
            >
              <div className="project-header">
                <span className="project-number">0{index + 1}</span>
                <span className="project-category">{project.category}</span>
              </div>

              <h3 className="project-title">{project.title}</h3>
              
              <p className="project-description">{project.description}</p>

              <div className="project-metrics">
                {project.metrics.map((metric, i) => (
                  <div key={i} className="metric">
                    <span className="metric-value">{metric.value}</span>
                    <span className="metric-label">{metric.label}</span>
                  </div>
                ))}
              </div>

              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>

              <div className="project-tech">
                <span className="tech-label">Implementation:</span>
                <p>{project.tech}</p>
              </div>

              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link"
                whileHover={{ x: 5 }}
              >
                <span>View on GitHub</span>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </motion.a>

              <div className="project-glow"></div>
            </motion.article>
          ))}
        </div>

        <div className="projects-cta">
          <motion.a
            href="https://github.com/rudrathacker"
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

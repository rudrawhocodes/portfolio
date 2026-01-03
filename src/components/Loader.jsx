import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Loader.css';

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const duration = 2500;
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      const easeOutQuart = 1 - Math.pow(1 - currentStep / steps, 4);
      setProgress(Math.min(Math.floor(easeOutQuart * 100), 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(onComplete, 800);
        }, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  const letterVariants = {
    initial: { y: 100, opacity: 0 },
    animate: (i) => ({
      y: 0,
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    }),
  };

  const name = "RUDRA THACKER";

  return (
    <AnimatePresence>
      {!isComplete && (
        <motion.div
          className="loader"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <div className="loader-content">
            <div className="loader-name">
              {name.split('').map((letter, i) => (
                <motion.span
                  key={i}
                  custom={i}
                  variants={letterVariants}
                  initial="initial"
                  animate="animate"
                  className={letter === ' ' ? 'space' : ''}
                >
                  {letter}
                </motion.span>
              ))}
            </div>

            <div className="loader-progress-container">
              <motion.div
                className="loader-progress-bar"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: progress / 100 }}
                transition={{ duration: 0.1, ease: 'linear' }}
              />
            </div>

            <div className="loader-percentage">
              <span className="loader-number">{progress}</span>
              <span className="loader-percent">%</span>
            </div>

            <motion.div
              className="loader-tagline"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              Engineering Excellence
            </motion.div>
          </div>

          <div className="loader-corners">
            <span className="corner corner-tl"></span>
            <span className="corner corner-tr"></span>
            <span className="corner corner-bl"></span>
            <span className="corner corner-br"></span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;

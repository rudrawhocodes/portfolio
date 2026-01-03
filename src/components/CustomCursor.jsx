import { useEffect, useRef, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const cursorDotRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isEnabled] = useState(() => {
    if (typeof window === 'undefined') return true;
    return !window.matchMedia('(pointer: coarse)').matches;
  });

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    if (!isEnabled) return undefined;

    const moveCursor = (e) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(true);
        const text = target.closest('[data-cursor-text]')?.dataset.cursorText;
        if (text) setCursorText(text);
      }
    };

    const handleMouseLeave = (e) => {
      const target = e.target;
      if (target.closest('a, button, [data-cursor="pointer"]')) {
        setIsHovering(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    document.addEventListener('mouseenter', handleMouseEnter, true);
    document.addEventListener('mouseleave', handleMouseLeave, true);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('mouseenter', handleMouseEnter, true);
      document.removeEventListener('mouseleave', handleMouseLeave, true);
    };
  }, [cursorX, cursorY, isEnabled]);

  if (!isEnabled) return null;

  return (
    <>
      <motion.div
        ref={cursorRef}
        className={`cursor ${isHovering ? 'hovering' : ''} ${isClicking ? 'clicking' : ''}`}
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      >
        {cursorText && <span className="cursor-text">{cursorText}</span>}
      </motion.div>
      <motion.div
        ref={cursorDotRef}
        className="cursor-dot"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
    </>
  );
};

export default CustomCursor;

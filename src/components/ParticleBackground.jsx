import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate particles outside component to avoid impure function during render
function generateParticles(count) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    positions[i3] = (Math.random() - 0.5) * 20;
    positions[i3 + 1] = (Math.random() - 0.5) * 20;
    positions[i3 + 2] = (Math.random() - 0.5) * 20;

    // Gradient colors: cyan to green to purple
    const t = Math.random();
    if (t < 0.33) {
      colors[i3] = 0;
      colors[i3 + 1] = 1;
      colors[i3 + 2] = 0.53;
    } else if (t < 0.66) {
      colors[i3] = 0;
      colors[i3 + 1] = 0.8;
      colors[i3 + 2] = 1;
    } else {
      colors[i3] = 0.66;
      colors[i3 + 1] = 0.33;
      colors[i3 + 2] = 0.97;
    }
  }

  return { positions, colors };
}

function ParticleField({ count = 5000 }) {
  const ref = useRef();
  const [particles, setParticles] = useState(null);

  useEffect(() => {
    setParticles(generateParticles(count));
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    
    const time = state.clock.getElapsedTime();
    ref.current.rotation.x = time * 0.02;
    ref.current.rotation.y = time * 0.03;

    // Mouse influence
    const mouseX = (state.mouse.x * 0.5);
    const mouseY = (state.mouse.y * 0.5);
    ref.current.rotation.x += (mouseY - ref.current.rotation.x) * 0.01;
    ref.current.rotation.y += (mouseX - ref.current.rotation.y) * 0.01;
  });

  if (!particles) return null;

  return (
    <Points ref={ref} positions={particles.positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        vertexColors
        size={0.03}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

function FloatingGeometry() {
  const meshRef = useRef();
  const wireframeRef = useRef();

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.1;
      meshRef.current.rotation.y = time * 0.15;
      meshRef.current.position.y = Math.sin(time * 0.5) * 0.3;
    }
    
    if (wireframeRef.current) {
      wireframeRef.current.rotation.x = -time * 0.08;
      wireframeRef.current.rotation.y = -time * 0.12;
    }
  });

  return (
    <group>
      <mesh ref={meshRef} position={[3, 0, -2]}>
        <icosahedronGeometry args={[1.5, 1]} />
        <meshBasicMaterial
          color="#00ff88"
          wireframe
          transparent
          opacity={0.1}
        />
      </mesh>
      
      <mesh ref={wireframeRef} position={[-4, 1, -3]}>
        <octahedronGeometry args={[1.2, 0]} />
        <meshBasicMaterial
          color="#00ccff"
          wireframe
          transparent
          opacity={0.08}
        />
      </mesh>
    </group>
  );
}

const ParticleBackground = () => {
  const particleCount = useMemo(() => {
    if (typeof window === 'undefined') return 4000;
    return window.innerWidth < 768 ? 1800 : 3800;
  }, []);

  return (
    <div className="particle-background" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
    }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        dpr={[1, 1.75]}
        style={{ background: 'transparent' }}
      >
        <ParticleField count={particleCount} />
        <FloatingGeometry />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
};

export default ParticleBackground;

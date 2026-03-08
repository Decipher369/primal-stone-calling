import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 300;

function FireParticles() {
  const meshRef = useRef<THREE.Points>(null);
  const timeRef = useRef(0);

  const { positions, velocities, colors, sizes, lifetimes, maxLifetimes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);
    const lifetimes = new Float32Array(PARTICLE_COUNT);
    const maxLifetimes = new Float32Array(PARTICLE_COUNT);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      resetParticle(i, positions, velocities, colors, sizes, lifetimes, maxLifetimes, true);
    }

    return { positions, velocities, colors, sizes, lifetimes, maxLifetimes };
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    timeRef.current += delta;
    const geo = meshRef.current.geometry;
    const posAttr = geo.attributes.position as THREE.BufferAttribute;
    const colAttr = geo.attributes.color as THREE.BufferAttribute;
    const sizeAttr = geo.attributes.size as THREE.BufferAttribute;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      lifetimes[i] += delta;
      const progress = lifetimes[i] / maxLifetimes[i];

      if (progress >= 1) {
        resetParticle(i, positions, velocities, colors, sizes, lifetimes, maxLifetimes, false);
        continue;
      }

      const i3 = i * 3;
      // Wind wobble
      const wobble = Math.sin(timeRef.current * 2 + i * 0.5) * 0.3 * delta;
      positions[i3] += velocities[i3] * delta + wobble;
      positions[i3 + 1] += velocities[i3 + 1] * delta;
      positions[i3 + 2] += velocities[i3 + 2] * delta;

      // Alpha via brightness
      let alpha: number;
      if (progress < 0.1) alpha = progress / 0.1;
      else if (progress < 0.5) alpha = 1;
      else alpha = 1 - (progress - 0.5) / 0.5;
      alpha = Math.max(0, alpha);

      // Flicker
      const flicker = 0.7 + 0.3 * Math.sin(timeRef.current * 8 + i * 3.7);
      alpha *= flicker;

      // Color shift: orange → red → dark as it rises
      const hue = 0.06 - progress * 0.04; // orange to red
      const sat = 1;
      const light = (0.6 - progress * 0.4) * alpha;
      const col = new THREE.Color().setHSL(hue, sat, light);
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      // Size decay
      sizes[i] = (1 - progress * 0.6) * (2 + Math.sin(i) * 1.5);
    }

    posAttr.needsUpdate = true;
    colAttr.needsUpdate = true;
    sizeAttr.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          array={positions}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors}
          count={PARTICLE_COUNT}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes}
          count={PARTICLE_COUNT}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        transparent
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
        size={3}
      />
    </points>
  );
}

function resetParticle(
  i: number,
  positions: Float32Array,
  velocities: Float32Array,
  colors: Float32Array,
  sizes: Float32Array,
  lifetimes: Float32Array,
  maxLifetimes: Float32Array,
  initial: boolean
) {
  const i3 = i * 3;
  const spread = 12;
  positions[i3] = (Math.random() - 0.5) * spread;
  positions[i3 + 1] = initial ? (Math.random() - 0.5) * 8 - 2 : -5 + Math.random() * -2;
  positions[i3 + 2] = (Math.random() - 0.5) * 4 - 2;

  velocities[i3] = (Math.random() - 0.5) * 0.5;
  velocities[i3 + 1] = 1.2 + Math.random() * 2.5;
  velocities[i3 + 2] = (Math.random() - 0.5) * 0.3;

  const hue = 0.04 + Math.random() * 0.06;
  const col = new THREE.Color().setHSL(hue, 1, 0.5 + Math.random() * 0.2);
  colors[i3] = col.r;
  colors[i3 + 1] = col.g;
  colors[i3 + 2] = col.b;

  sizes[i] = 1.5 + Math.random() * 3;
  lifetimes[i] = initial ? Math.random() * 4 : 0;
  maxLifetimes[i] = 3 + Math.random() * 4;
}

function FloatingRunes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.elapsedTime * 0.03;
  });

  const runes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => {
      const angle = (i / 8) * Math.PI * 2;
      const radius = 5 + Math.random() * 2;
      return {
        position: [Math.cos(angle) * radius, (Math.random() - 0.5) * 3, Math.sin(angle) * radius] as [number, number, number],
        rotation: [0, Math.random() * Math.PI, 0] as [number, number, number],
        scale: 0.3 + Math.random() * 0.4,
        speed: 0.5 + Math.random() * 1,
        offset: Math.random() * Math.PI * 2,
      };
    });
  }, []);

  return (
    <group ref={groupRef}>
      {runes.map((rune, i) => (
        <RuneGlyph key={i} {...rune} />
      ))}
    </group>
  );
}

function RuneGlyph({ position, rotation, scale, speed, offset }: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  speed: number;
  offset: number;
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.position.y = position[1] + Math.sin(t * speed + offset) * 0.5;
    ref.current.material.opacity = 0.15 + Math.sin(t * speed * 0.5 + offset) * 0.1;
  });

  return (
    <mesh ref={ref} position={position} rotation={rotation} scale={scale}>
      <torusGeometry args={[1, 0.05, 8, 3]} />
      <meshBasicMaterial
        color="#e8842c"
        transparent
        opacity={0.2}
        blending={THREE.AdditiveBlending}
      />
    </mesh>
  );
}

const FireScene3D = () => {
  return (
    <div className="absolute inset-0 z-[1]" style={{ opacity: 0.7 }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        gl={{ alpha: true, antialias: false }}
        style={{ background: "transparent" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.1} />
        <FireParticles />
        <FloatingRunes />
      </Canvas>
    </div>
  );
};

export default FireScene3D;

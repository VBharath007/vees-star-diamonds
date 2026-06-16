"use client";
import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, Sparkles, useFBX, useTexture, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

// Mouse-reactive light controller component
function ReactiveLight() {
  const lightRef = useRef();
  const { mouse, viewport } = useThree();

  useFrame(() => {
    if (lightRef.current) {
      // Scale mouse position to 3D space
      const x = (mouse.x * viewport.width) / 2;
      const y = (mouse.y * viewport.height) / 2;
      lightRef.current.position.set(x * 1.5, y * 1.5, 3);
    }
  });

  return (
    <directionalLight
      ref={lightRef}
      intensity={3.5}
      color="#ffffff"
      castShadow
    />
  );
}

// 3D Diamond Mesh component
function DiamondMesh({ colorTone = "#ffffff", rotationSpeed = 0.5, cutStyle = "round", scale = 1 }) {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.25 * rotationSpeed;
      groupRef.current.rotation.x += delta * 0.08 * rotationSpeed;
    }
  });

  // Calculate facets based on cutStyle
  // "round" -> 16 segments (classic round cut feel)
  // "emerald" -> 4 segments (box/emerald feel)
  // "pear" -> 10 segments (pear shape/asymmetric)
  // "princess" -> 4 segments (square feel)
  const segments = cutStyle === "emerald" || cutStyle === "princess" ? 4 : cutStyle === "pear" ? 10 : 16;
  const isSquare = cutStyle === "princess";

  return (
    <group ref={groupRef} scale={[scale, scale, scale]}>
      {/* Upper Crown (top half from girdle to table) */}
      <mesh castShadow receiveShadow>
        <cylinderGeometry
          args={[
            isSquare ? 0.35 : 0.45, // radiusTop (table size)
            isSquare ? 0.75 : 0.8,  // radiusBottom (girdle size)
            0.35,                   // height
            segments,               // radialSegments
            1,                      // heightSegments
            false                   // openEnded
          ]}
        />
        <meshPhysicalMaterial
          color={colorTone}
          roughness={0.05}
          metalness={0.1}
          transmission={0.4}
          ior={2.417} // Real diamond refractive index
          thickness={1.2}
          clearcoat={1.0}
          clearcoatRoughness={0.0}
          flatShading={true} // Creates clean facets that catch light
          envMapIntensity={2.0}
        />
      </mesh>

      {/* Lower Pavilion (bottom half from girdle to point/culet) */}
      <mesh castShadow receiveShadow position={[0, -0.45, 0]}>
        <cylinderGeometry
          args={[
            isSquare ? 0.75 : 0.8, // radiusTop (girdle size)
            0.0,                   // radiusBottom (culet point)
            0.55,                  // height
            segments,              // radialSegments
            1,                     // heightSegments
            false                  // openEnded
          ]}
        />
        <meshPhysicalMaterial
          color={colorTone}
          roughness={0.05}
          metalness={0.1}
          transmission={0.4}
          ior={2.417}
          thickness={1.2}
          clearcoat={1.0}
          clearcoatRoughness={0.0}
          flatShading={true}
          envMapIntensity={2.0}
        />
      </mesh>
    </group>
  );
}

// 3D Diamond Model component loading external FBX and textures
function DiamondModel({ colorTone = "#ffffff", scale = 0.3 }) {
  const fbx = useFBX("/diamond/source/diamond.fbx");
  const textures = useTexture({
    map: "/diamond/textures/DiamondOutside_Base_Color.png",
    emissiveMap: "/diamond/textures/DiamondOutside_Emissive.png",
    metalnessMap: "/diamond/textures/DiamondOutside_Metallic.png",
    aoMap: "/diamond/textures/DiamondOutside_Mixed_AO.png",
    alphaMap: "/diamond/textures/DiamondOutside_Opacity.png",
    roughnessMap: "/diamond/textures/DiamondOutside_Roughness.png",
  });

  useEffect(() => {
    if (!fbx) return;
    fbx.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = new THREE.MeshPhysicalMaterial({
          transparent: true,
          opacity: 0.65,      // Volumetric glass transparency
          roughness: 0.0,
          metalness: 0.1,
          color: new THREE.Color("#121b2d"), // Luxury deep diamond gray-blue base tint
          clearcoat: 1.0,
          clearcoatRoughness: 0.01,
          envMapIntensity: 4.0, // High intensity reflections for facet spark
          side: THREE.DoubleSide, // Volumetric depth reflections
          flatShading: false, // Smooth shading using model's split normals
        });
        child.material.needsUpdate = true;
      }
    });
  }, [fbx, textures, colorTone]);

  const clonedFbx = React.useMemo(() => fbx.clone(), [fbx]);

  return <primitive object={clonedFbx} scale={[scale, scale, scale]} />;
}

// Main Diamond Canvas Component
export default function DiamondScene({ colorTone = "#ffffff", rotationSpeed = 0.5, cutStyle = "round", autoFloat = true, scale = 1.6 }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black">
        <div className="w-8 h-8 rounded-full border-2 border-champagne-gold border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative">
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <fog attach="fog" args={["#000000", 2, 8]} />
        
        {/* Orbit Controls for drag/touch rotation */}
        <OrbitControls enableZoom={false} makeDefault />

        {/* Environment Map for reflection mapping */}
        <Environment preset="studio" />

        {/* Lights */}
        <ambientLight intensity={0.45} />
        <directionalLight position={[0, 0, 5]} intensity={2.5} color="#ffffff" />
        <directionalLight position={[0, 5, -5]} intensity={1.5} color="#ffffff" />
        <directionalLight position={[-5, 5, 2]} intensity={1.5} color="#85A9FF" /> {/* Soft blue chromatic fire light */}
        <directionalLight position={[5, -5, 2]} intensity={1.2} color="#FF9ECB" /> {/* Soft pink chromatic fire light */}
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-5, -5, -2]} intensity={0.8} color="#C9A84C" />
        
        {/* Mouse Reactive directional light */}
        <ReactiveLight />

        {/* Ambient Floating Dust Particles */}
        <Sparkles
          count={65}
          scale={3.5}
          size={1.2}
          speed={0.4}
          color="#ffffff"
          opacity={0.3}
        />
        <Sparkles
          count={25}
          scale={3}
          size={1.5}
          speed={0.2}
          color="#C9A84C"
          opacity={0.25}
        />

        {/* Floating/Rotating Diamond */}
        <Suspense fallback={<DiamondMesh colorTone={colorTone} rotationSpeed={rotationSpeed} cutStyle={cutStyle} scale={scale} />}>
          {autoFloat ? (
            <Float speed={1.8} rotationIntensity={0.5} floatIntensity={0.6}>
              <DiamondModel colorTone={colorTone} scale={scale * 0.22} />
            </Float>
          ) : (
            <DiamondModel colorTone={colorTone} scale={scale * 0.22} />
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}

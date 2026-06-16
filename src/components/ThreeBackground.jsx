"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

// ─────────────────────────────────────────────────────────────────────────────
// SPARKLE VERTEX SHADER
// Each point drifts with a sine wave; proximity to the mouse boosts size/brightness.
// Scroll offset is applied as a Y translation (parallax).
// ─────────────────────────────────────────────────────────────────────────────
const SPARKLE_VERT = /* glsl */ `
  attribute float aSize;
  attribute float aBrightness;
  attribute float aPhase;

  uniform float uTime;
  uniform vec2  uMouse;       // NDC -1..1
  uniform float uScroll;      // px
  uniform float uPixelRatio;

  varying float vBrightness;
  varying float vMouse;

  void main() {
    vec3 pos = position;

    // Organic float
    pos.x += sin(uTime * 0.28 + aPhase)        * 0.18;
    pos.y += cos(uTime * 0.22 + aPhase * 1.3)  * 0.14;
    pos.y -= uScroll * 0.0018;                  // scroll parallax

    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    float depth = -mv.z;

    // Mouse-proximity boost (screen-space approx)
    vec4 clip = projectionMatrix * mv;
    vec2 ndc  = clip.xy / clip.w;
    float d   = length(ndc - uMouse);
    float prox = smoothstep(0.6, 0.0, d);       // 1 near cursor, 0 far away

    vBrightness = aBrightness;
    vMouse      = prox;

    float pulse = 0.75 + 0.25 * sin(uTime * 2.1 + aPhase * 6.28);
    float sz    = aSize * (22.0 / depth) * pulse * (1.0 + prox * 1.8) * uPixelRatio;
    gl_PointSize = clamp(sz, 0.5, 18.0);
    gl_Position  = clip;
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// SPARKLE FRAGMENT SHADER
// Draws a 4-pointed star / cross shape. Near-cursor particles get a blue-white tint.
// Additive blending gives a natural bloom.
// ─────────────────────────────────────────────────────────────────────────────
const SPARKLE_FRAG = /* glsl */ `
  varying float vBrightness;
  varying float vMouse;

  void main() {
    vec2  uv   = gl_PointCoord - 0.5;           // -0.5 .. 0.5
    float dist = length(uv);

    // 4-pointed star: cross falloff
    float starX = abs(uv.x);
    float starY = abs(uv.y);
    float cross = max(starX, starY);
    float star  = 1.0 - smoothstep(0.0, 0.46, cross * 2.2);
    float circ  = 1.0 - smoothstep(0.0, 0.46, dist * 2.0);
    float shape = max(star * 0.8, circ);
    if (shape < 0.01) discard;

    // Gold base; cursor-near particles get a brighter warm-white tint
    vec3 gold  = vec3(0.773, 0.659, 0.502);
    vec3 white = vec3(0.96,  0.92,  0.84);
    vec3 color = mix(gold, white, vMouse * 0.7);

    gl_FragColor = vec4(color, shape * vBrightness * (0.75 + vMouse * 0.5));
  }
`;

// ─────────────────────────────────────────────────────────────────────────────
// RIPPLE RING — spawned on click
// ─────────────────────────────────────────────────────────────────────────────
function makeRipple(scene) {
  const geo = new THREE.TorusGeometry(0.5, 0.035, 8, 48);
  const mat = new THREE.MeshBasicMaterial({
    color: 0xc5a880,
    transparent: true,
    opacity: 0.7,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const mesh = new THREE.Mesh(geo, mat);
  scene.add(mesh);
  return {
    mesh,
    age: 0,
    dispose() {
      scene.remove(mesh);
      geo.dispose();
      mat.dispose();
    },
  };
}

export default function ThreeBackground() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const W = mount.clientWidth;
    const H = mount.clientHeight;

    // ── RENDERER ───────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    const dpr = Math.min(window.devicePixelRatio, 2);
    renderer.setPixelRatio(dpr);
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.set(0, 0, 28);

    // ── SPARKLE POINT CLOUD ────────────────────────────────────────
    const N = 1400;
    const pos       = new Float32Array(N * 3);
    const sizes     = new Float32Array(N);
    const brightness = new Float32Array(N);
    const phases    = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      pos[i * 3]     = (Math.random() - 0.5) * 90;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 65;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 45 - 8;
      sizes[i]       = Math.random() * 2.8 + 0.4;
      brightness[i]  = Math.random() * 0.65 + 0.35;
      phases[i]      = Math.random() * Math.PI * 2;
    }

    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute("position",    new THREE.BufferAttribute(pos,        3));
    sparkGeo.setAttribute("aSize",       new THREE.BufferAttribute(sizes,      1));
    sparkGeo.setAttribute("aBrightness", new THREE.BufferAttribute(brightness, 1));
    sparkGeo.setAttribute("aPhase",      new THREE.BufferAttribute(phases,     1));

    const sparkMat = new THREE.ShaderMaterial({
      vertexShader:   SPARKLE_VERT,
      fragmentShader: SPARKLE_FRAG,
      uniforms: {
        uTime:       { value: 0 },
        uMouse:      { value: new THREE.Vector2(0, 0) },
        uScroll:     { value: 0 },
        uPixelRatio: { value: dpr },
      },
      transparent: true,
      depthWrite:  false,
      blending:    THREE.AdditiveBlending,
    });

    scene.add(new THREE.Points(sparkGeo, sparkMat));

    // ── DIAMOND CRYSTAL MESHES ─────────────────────────────────────
    const palette = [0xc5a880, 0xe6dec4, 0x8a9a9f, 0xb88a7d, 0xd4bc9b, 0xf0e8d8];
    const crystals = [];

    for (let i = 0; i < 50; i++) {
      const size = Math.random() * 0.52 + 0.1;
      const geo  = Math.random() > 0.45
        ? new THREE.OctahedronGeometry(size, 0)
        : new THREE.IcosahedronGeometry(size * 0.9, 0);

      const mat = new THREE.MeshStandardMaterial({
        color:       palette[Math.floor(Math.random() * palette.length)],
        metalness:   0.92,
        roughness:   0.07,
        transparent: true,
        opacity:     Math.random() * 0.28 + 0.08,
        wireframe:   Math.random() > 0.6,
      });

      const mesh = new THREE.Mesh(geo, mat);
      const ox = (Math.random() - 0.5) * 58;
      const oy = (Math.random() - 0.5) * 40;
      const oz = (Math.random() - 0.5) * 30;
      mesh.position.set(ox, oy, oz);
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      );

      const baseOpacity = mat.opacity;
      const data = {
        mesh,
        rx:           (Math.random() - 0.5) * 0.006,
        ry:           (Math.random() - 0.5) * 0.009,
        rz:           (Math.random() - 0.5) * 0.005,
        phase:        Math.random() * Math.PI * 2,
        scrollRate:   Math.random() * 0.7 + 0.15, // depth-layer scroll multiplier
        origX:        ox,
        origY:        oy,
        baseOpacity,
      };
      scene.add(mesh);
      crystals.push(data);
    }

    // ── SOFT AMBIENT ORBS ──────────────────────────────────────────
    const bgOrbs = [
      { color: 0xc5a880, x: -16, y:  6, phase: 0.0 },
      { color: 0x8a9a9f, x:   0, y: -8, phase: 2.1 },
      { color: 0xb88a7d, x:  16, y:  4, phase: 4.2 },
    ].map(({ color, x, y, phase }) => {
      const geo  = new THREE.SphereGeometry(5, 8, 8);
      const mat  = new THREE.MeshBasicMaterial({
        color, transparent: true, opacity: 0.022,
        blending: THREE.AdditiveBlending, depthWrite: false,
      });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, y, -8);
      scene.add(mesh);
      return { mesh, mat, geo, phase };
    });

    // ── MOUSE-FOLLOWING GLOW ORB ───────────────────────────────────
    const orbGeo = new THREE.SphereGeometry(2.2, 12, 12);
    const orbMat = new THREE.MeshBasicMaterial({
      color: 0xd4bc9b, transparent: true, opacity: 0,
      blending: THREE.AdditiveBlending, depthWrite: false,
    });
    const mouseOrb = new THREE.Mesh(orbGeo, orbMat);
    mouseOrb.position.set(0, 0, 10);
    scene.add(mouseOrb);

    // ── LIGHTING ───────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xf7f4eb, 0.45));

    const dirGold = new THREE.DirectionalLight(0xc5a880, 2.4);
    dirGold.position.set(10, 15, 8);
    scene.add(dirGold);

    const dirCool = new THREE.DirectionalLight(0x8a9a9f, 0.9);
    dirCool.position.set(-12, -8, 10);
    scene.add(dirCool);

    // Dynamic mouse point light — warm gold, follows cursor
    const mouseLight = new THREE.PointLight(0xc5a880, 0, 35);
    scene.add(mouseLight);

    // ── STATE ──────────────────────────────────────────────────────
    const mouse    = { x: 0, y: 0, vx: 0, vy: 0, speed: 0 };
    let   scrollY  = 0;
    let   targetSY = 0;
    const ripples  = [];

    // ── EVENTS ────────────────────────────────────────────────────
    const onMouseMove = (e) => {
      const nx  = (e.clientX / window.innerWidth  - 0.5) * 2;
      const ny  = -(e.clientY / window.innerHeight - 0.5) * 2;
      mouse.vx  = nx - mouse.x;
      mouse.vy  = ny - mouse.y;
      mouse.speed = Math.sqrt(mouse.vx * mouse.vx + mouse.vy * mouse.vy);
      mouse.x   = nx;
      mouse.y   = ny;
    };

    const onScroll = () => { targetSY = window.scrollY; };

    const onClick = (e) => {
      // Place ripple at approximate 3D position on the near plane
      const nx = (e.clientX / window.innerWidth  - 0.5) *  26;
      const ny = -(e.clientY / window.innerHeight - 0.5) * 18;
      const r  = makeRipple(scene);
      r.mesh.position.set(nx, ny, 8);
      ripples.push(r);
    };

    const onResize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll",    onScroll, { passive: true });
    window.addEventListener("click",     onClick);
    window.addEventListener("resize",    onResize);

    // ── ANIMATION LOOP ─────────────────────────────────────────────
    let raf;
    let t = 0;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      t  += 0.006;

      // Smooth scroll
      scrollY += (targetSY - scrollY) * 0.055;

      // Camera follows mouse with gentle lag
      camera.position.x += (mouse.x * 4.2 - camera.position.x) * 0.04;
      camera.position.y += (mouse.y * 3.0 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);

      // Shader uniforms
      sparkMat.uniforms.uTime.value   = t;
      sparkMat.uniforms.uScroll.value = scrollY;
      sparkMat.uniforms.uMouse.value.set(mouse.x, mouse.y);

      // Mouse glow orb
      const tx = mouse.x * 17;
      const ty = mouse.y * 11;
      mouseOrb.position.x += (tx - mouseOrb.position.x) * 0.09;
      mouseOrb.position.y += (ty - mouseOrb.position.y) * 0.09;
      orbMat.opacity = Math.min(0.08, mouse.speed * 0.25 + 0.015);

      // Dynamic light follows orb
      mouseLight.position.copy(mouseOrb.position);
      mouseLight.intensity = 0.8 + mouse.speed * 10;

      // Crystal meshes
      crystals.forEach((c) => {
        c.mesh.rotation.x += c.rx;
        c.mesh.rotation.y += c.ry;
        c.mesh.rotation.z += c.rz;

        // Float + scroll parallax combined into a single Y assignment (no drift)
        c.mesh.position.x = c.origX + Math.cos(t * 0.35 + c.phase) * 0.35;
        c.mesh.position.y = c.origY
          + Math.sin(t + c.phase) * 0.75
          - scrollY * 0.0028 * c.scrollRate;

        // Pulse opacity around base value
        c.mesh.material.opacity = Math.max(
          0.03,
          c.baseOpacity + Math.sin(t * 0.7 + c.phase) * 0.05,
        );
      });

      // Background orbs drift
      bgOrbs.forEach(({ mesh, mat, phase }) => {
        mesh.position.x += Math.sin(t * 0.13 + phase) * 0.014;
        mesh.position.y += Math.cos(t * 0.10 + phase) * 0.010;
        mat.opacity = 0.018 + Math.sin(t * 0.35 + phase) * 0.008;
      });

      // Ripple rings — expand and fade
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.age  += 0.025;
        const s = 1 + r.age * 7;
        r.mesh.scale.setScalar(s);
        r.mesh.material.opacity = Math.max(0, 0.7 - r.age);
        if (r.age >= 1) {
          r.dispose();
          ripples.splice(i, 1);
        }
      }

      renderer.render(scene, camera);
    };
    animate();

    // ── CLEANUP ────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll",    onScroll);
      window.removeEventListener("click",     onClick);
      window.removeEventListener("resize",    onResize);

      crystals.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      bgOrbs.forEach(({ mesh, mat, geo }) => {
        scene.remove(mesh); geo.dispose(); mat.dispose();
      });
      sparkGeo.dispose();
      sparkMat.dispose();
      orbGeo.dispose();
      orbMat.dispose();
      ripples.forEach((r) => r.dispose());
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      style={{
        position:      "fixed",
        inset:         0,
        width:         "100vw",
        height:        "100vh",
        zIndex:        0,
        pointerEvents: "none",
        overflow:      "hidden",
      }}
    />
  );
}

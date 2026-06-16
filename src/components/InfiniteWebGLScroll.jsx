"use client";

import React, { useEffect, useRef, useState } from "react";

const DEFAULT_IMAGES = [
  'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&q=80',
  'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&q=80',
  'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
  'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
  'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&q=80',
  'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&q=80',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&q=80',
  'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&q=80',
  'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=800&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&q=80',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&q=80',
  'https://images.unsplash.com/photo-1541450805268-4822a3a774ca?w=800&q=80',
  'https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800&q=80',
  'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=800&q=80',
  'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=800&q=80',
  'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&q=80',
  'https://images.unsplash.com/photo-1614850523296-d8c1af93d400?w=800&q=80',
  'https://images.unsplash.com/photo-1542281286-9e0a16bb7366?w=800&q=80',
  'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
];

class InfinitePortraitGallery {
  constructor(canvas, container, props, onProgress) {
    this.canvas = canvas;
    this.container = container;
    this.onProgress = onProgress;
    this.sourceImages = props.images && props.images.length > 0 ? props.images : DEFAULT_IMAGES;
    this.imageWidth = props.imageWidth || 200;
    this.imageHeight = props.imageHeight || 260;
    this.gap = props.gap !== undefined ? props.gap : 20;
    this.inertia = props.inertia !== undefined ? props.inertia : 0.95;
    this.bulgeStrength = props.bulgeStrength !== undefined ? props.bulgeStrength : 0.6;
    this.bulgeRadius = props.bulgeRadius !== undefined ? props.bulgeRadius : 1.5;
    this.adjustedBulgeRadius = this.bulgeRadius;
    this.images = [];
    this.textures = [];
    this.viewOffset = { x: 0, y: 0 };
    this.drag = { isDragging: false, lastX: 0, lastY: 0, velocityX: 0, velocityY: 0 };
    this.program = null;
    this.indexCount = 0;
    this.positionBuffer = null;
    this.texCoordBuffer = null;
    this.indexBuffer = null;
    this.animationFrameId = null;

    this.boundResizeCanvas = this.resizeCanvas.bind(this);
    this.boundMousemove = this.handleMousemove.bind(this);
    this.boundMouseup = this.handleMouseup.bind(this);
    this.boundTouchmove = this.handleTouchmove.bind(this);
    this.boundTouchend = this.handleTouchend.bind(this);

    this.gl = this.canvas.getContext("webgl");
    if (!this.gl) return;

    this.resizeCanvas();
    window.addEventListener("resize", this.boundResizeCanvas);
    this.init();
    this.loadImages();
    this.setupEventListeners();
    this.animate();
  }

  resizeCanvas() {
    const rect = this.container.getBoundingClientRect();
    this.canvas.width = rect.width;
    this.canvas.height = rect.height;
    const t = Math.sqrt(
      Math.pow(this.canvas.width / Math.min(this.canvas.width, this.canvas.height), 2) +
      Math.pow(this.canvas.height / Math.min(this.canvas.width, this.canvas.height), 2)
    );
    this.adjustedBulgeRadius = Math.max(this.bulgeRadius, 0.6 * t * 1.2);
    if (this.gl) this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
  }

  init() {
    if (!this.gl) return;
    const vsSource = `
      attribute vec2 aPosition;
      attribute vec2 aTexCoord;
      varying vec2 vTexCoord;
      uniform vec2 uResolution;
      uniform vec2 uOffset;
      uniform vec2 uImagePosition;
      uniform float uBulgeStrength;
      uniform float uBulgeRadius;

      vec2 applyBulge(vec2 pos){
        vec2 norm = pos / uResolution;
        vec2 center = vec2(0.5, 0.5);
        vec2 delta = norm - center;
        float aspect = uResolution.x / uResolution.y;
        delta.x *= aspect;
        float dist = length(delta);
        if(dist < uBulgeRadius){
          float t = dist / uBulgeRadius;
          float z = sqrt(1.5 - t * t);
          delta *= 0.35 + uBulgeStrength * z;
          delta.x /= aspect;
          norm = center + delta;
          pos = norm * uResolution;
        }
        return pos;
      }

      void main(){
        vec2 pos = aPosition * vec2(${this.imageWidth}.0, ${this.imageHeight}.0);
        pos += uImagePosition;
        pos -= uOffset;
        vec2 imgCenter = uImagePosition + vec2(${this.imageWidth / 2}.0, ${this.imageHeight / 2}.0) - uOffset;
        pos = applyBulge(pos);
        vec2 clip = pos / uResolution * 2.0 - 1.0;
        clip.y *= -1.0;
        gl_Position = vec4(clip, 0.0, 1.0);
        vTexCoord = aTexCoord;
      }
    `;

    const fsSource = `
      precision mediump float;
      varying vec2 vTexCoord;
      uniform sampler2D uSampler;
      void main(){
        vec4 color = texture2D(uSampler, vTexCoord);
        if(color.a < 0.01) discard;
        gl_FragColor = color;
      }
    `;

    this.program = this.createProgram(vsSource, fsSource);
    if (!this.program) return;

    const SUBDIV = 24;
    const positions = [];
    const texCoords = [];
    const indices = [];
    for (let y = 0; y <= SUBDIV; y++) {
      for (let x = 0; x <= SUBDIV; x++) {
        positions.push(x / SUBDIV, y / SUBDIV);
        texCoords.push(x / SUBDIV, y / SUBDIV);
      }
    }
    for (let y = 0; y < SUBDIV; y++) {
      for (let x = 0; x < SUBDIV; x++) {
        const i = y * (SUBDIV + 1) + x;
        indices.push(i, i + 1, i + SUBDIV + 1, i + 1, i + SUBDIV + 2, i + SUBDIV + 1);
      }
    }
    this.indexCount = indices.length;

    this.positionBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(positions), this.gl.STATIC_DRAW);

    this.texCoordBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
    this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(texCoords), this.gl.STATIC_DRAW);

    this.indexBuffer = this.gl.createBuffer();
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), this.gl.STATIC_DRAW);

    this.gl.enable(this.gl.BLEND);
    this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
  }

  async loadImages() {
    const total = this.sourceImages.length;
    const promises = this.sourceImages.map((src, i) =>
      new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          this.images.push(img);
          const tex = this.createTexture(img);
          if (tex) this.textures.push(tex);
          this.onProgress(Math.round((this.images.length / total) * 100));
          resolve();
        };
        img.onerror = () => resolve();
        img.src = src;
      })
    );
    await Promise.all(promises);
    this.onProgress(100);
  }

  createTexture(img) {
    if (!this.gl) return null;
    const tex = this.gl.createTexture();
    this.gl.bindTexture(this.gl.TEXTURE_2D, tex);
    this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, img);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_S, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_WRAP_T, this.gl.CLAMP_TO_EDGE);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
    this.gl.texParameteri(this.gl.TEXTURE_2D, this.gl.TEXTURE_MAG_FILTER, this.gl.LINEAR);
    return tex;
  }

  getVisibleTiles() {
    if (this.images.length === 0) return [];
    const sw = this.imageWidth + this.gap;
    const sh = this.imageHeight + this.gap;
    const x0 = Math.floor((this.viewOffset.x - this.canvas.width) / sw) - 1;
    const x1 = Math.ceil((this.viewOffset.x + 2 * this.canvas.width) / sw) + 1;
    const y0 = Math.floor((this.viewOffset.y - this.canvas.height) / sh) - 1;
    const y1 = Math.ceil((this.viewOffset.y + 2 * this.canvas.height) / sh) + 1;
    const tiles = [];
    for (let gy = y0; gy <= y1; gy++) {
      for (let gx = x0; gx <= x1; gx++) {
        const idx = (Math.abs(gx) * 17 + Math.abs(gy) * 31) % this.images.length;
        tiles.push({ x: gx * sw, y: gy * sh, imageIndex: idx });
      }
    }
    return tiles;
  }

  render() {
    if (!this.program || this.images.length === 0 || !this.gl) return;
    this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    this.gl.clearColor(0, 0, 0, 0);
    this.gl.clear(this.gl.COLOR_BUFFER_BIT);
    this.gl.useProgram(this.program);

    const aPosLoc = this.gl.getAttribLocation(this.program, "aPosition");
    this.gl.enableVertexAttribArray(aPosLoc);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.positionBuffer);
    this.gl.vertexAttribPointer(aPosLoc, 2, this.gl.FLOAT, false, 0, 0);

    const aTexLoc = this.gl.getAttribLocation(this.program, "aTexCoord");
    this.gl.enableVertexAttribArray(aTexLoc);
    this.gl.bindBuffer(this.gl.ARRAY_BUFFER, this.texCoordBuffer);
    this.gl.vertexAttribPointer(aTexLoc, 2, this.gl.FLOAT, false, 0, 0);

    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer);

    this.gl.uniform2f(this.gl.getUniformLocation(this.program, "uResolution"), this.canvas.width, this.canvas.height);
    this.gl.uniform1f(this.gl.getUniformLocation(this.program, "uBulgeStrength"), this.bulgeStrength);
    this.gl.uniform1f(this.gl.getUniformLocation(this.program, "uBulgeRadius"), this.adjustedBulgeRadius);

    const uOffset = this.gl.getUniformLocation(this.program, "uOffset");
    const uImgPos = this.gl.getUniformLocation(this.program, "uImagePosition");
    const uSampler = this.gl.getUniformLocation(this.program, "uSampler");

    for (const tile of this.getVisibleTiles()) {
      this.gl.uniform2f(uOffset, this.viewOffset.x, this.viewOffset.y);
      this.gl.uniform2f(uImgPos, tile.x, tile.y);
      this.gl.activeTexture(this.gl.TEXTURE0);
      this.gl.bindTexture(this.gl.TEXTURE_2D, this.textures[tile.imageIndex]);
      this.gl.uniform1i(uSampler, 0);
      this.gl.drawElements(this.gl.TRIANGLES, this.indexCount, this.gl.UNSIGNED_SHORT, 0);
    }
  }

  handleMousemove(e) {
    if (!this.drag.isDragging) return;
    const dx = e.clientX - this.drag.lastX;
    const dy = e.clientY - this.drag.lastY;
    this.drag.velocityX = 0.3 * dx + 0.7 * this.drag.velocityX;
    this.drag.velocityY = 0.3 * dy + 0.7 * this.drag.velocityY;
    this.viewOffset.x -= this.drag.velocityX;
    this.viewOffset.y -= this.drag.velocityY;
    this.drag.lastX = e.clientX;
    this.drag.lastY = e.clientY;
  }

  handleMouseup() { this.drag.isDragging = false; }

  handleTouchmove(e) {
    if (!this.drag.isDragging) return;
    e.preventDefault();
    const dx = e.touches[0].clientX - this.drag.lastX;
    const dy = e.touches[0].clientY - this.drag.lastY;
    this.drag.velocityX = 0.3 * dx + 0.7 * this.drag.velocityX;
    this.drag.velocityY = 0.3 * dy + 0.7 * this.drag.velocityY;
    this.viewOffset.x -= this.drag.velocityX;
    this.viewOffset.y -= this.drag.velocityY;
    this.drag.lastX = e.touches[0].clientX;
    this.drag.lastY = e.touches[0].clientY;
  }

  handleTouchend() { this.drag.isDragging = false; }

  setupEventListeners() {
    this.canvas.addEventListener("mousedown", (e) => {
      this.drag.isDragging = true;
      this.drag.lastX = e.clientX;
      this.drag.lastY = e.clientY;
    });
    window.addEventListener("mousemove", this.boundMousemove);
    window.addEventListener("mouseup", this.boundMouseup);
    this.canvas.addEventListener("touchstart", (e) => {
      e.preventDefault();
      this.drag.isDragging = true;
      this.drag.lastX = e.touches[0].clientX;
      this.drag.lastY = e.touches[0].clientY;
    }, { passive: false });
    window.addEventListener("touchmove", this.boundTouchmove, { passive: false });
    window.addEventListener("touchend", this.boundTouchend);
    this.canvas.addEventListener("wheel", (e) => {
      e.preventDefault();
      this.drag.velocityX += 0.3 * e.deltaX;
      this.drag.velocityY += 0.3 * e.deltaY;
    }, { passive: false });
  }

  animate() {
    if (!this.drag.isDragging) {
      this.viewOffset.x -= this.drag.velocityX;
      this.viewOffset.y -= this.drag.velocityY;
      this.drag.velocityX *= this.inertia;
      this.drag.velocityY *= this.inertia;
      if (Math.abs(this.drag.velocityX) < 0.1) this.drag.velocityX = 0;
      if (Math.abs(this.drag.velocityY) < 0.1) this.drag.velocityY = 0;
    }
    this.render();
    this.animationFrameId = requestAnimationFrame(() => this.animate());
  }

  destroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
    window.removeEventListener("resize", this.boundResizeCanvas);
    window.removeEventListener("mousemove", this.boundMousemove);
    window.removeEventListener("mouseup", this.boundMouseup);
    window.removeEventListener("touchmove", this.boundTouchmove);
    window.removeEventListener("touchend", this.boundTouchend);
    if (this.gl) {
      this.textures.forEach(tex => this.gl.deleteTexture(tex));
      if (this.program) this.gl.deleteProgram(this.program);
      if (this.positionBuffer) this.gl.deleteBuffer(this.positionBuffer);
      if (this.texCoordBuffer) this.gl.deleteBuffer(this.texCoordBuffer);
      if (this.indexBuffer) this.gl.deleteBuffer(this.indexBuffer);
    }
  }

  createProgram(vs, fs) {
    if (!this.gl) return null;
    const vShader = this.loadShader(this.gl.VERTEX_SHADER, vs);
    const fShader = this.loadShader(this.gl.FRAGMENT_SHADER, fs);
    if (!vShader || !fShader) return null;
    const prog = this.gl.createProgram();
    if (!prog) return null;
    this.gl.attachShader(prog, vShader);
    this.gl.attachShader(prog, fShader);
    this.gl.linkProgram(prog);
    if (this.gl.getProgramParameter(prog, this.gl.LINK_STATUS)) return prog;
    console.error("Program link error:", this.gl.getProgramInfoLog(prog));
    return null;
  }

  loadShader(type, src) {
    if (!this.gl) return null;
    const shader = this.gl.createShader(type);
    if (!shader) return null;
    this.gl.shaderSource(shader, src);
    this.gl.compileShader(shader);
    if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) return shader;
    console.error("Shader compile error:", this.gl.getShaderInfoLog(shader));
    this.gl.deleteShader(shader);
    return null;
  }
}

export default function InfiniteWebGLScroll({
  images,
  imageWidth = 200,
  imageHeight = 260,
  gap = 20,
  inertia = 0.95,
  bulgeStrength = 0.6,
  bulgeRadius = 1.5,
  className = "",
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const gallery = new InfinitePortraitGallery(
      canvasRef.current,
      containerRef.current,
      { images, imageWidth, imageHeight, gap, inertia, bulgeStrength, bulgeRadius },
      (pct) => {
        setProgress(pct);
        if (pct >= 100) setTimeout(() => setIsLoading(false), 300);
      }
    );
    return () => gallery.destroy();
  }, [images, imageWidth, imageHeight, gap, inertia, bulgeStrength, bulgeRadius]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full overflow-hidden ${className}`}
      style={{ touchAction: "none" }}
    >
      {isLoading && (
        <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-[#0E0C0A]/90 backdrop-blur-sm transition-opacity duration-500">
          <div className="space-y-4 text-center">
            <div className="text-[11px] font-bold tracking-[0.3em] uppercase text-[#C9A84C]">
              Loading Gallery
            </div>
            <div className="w-48 h-px bg-[#C9A84C]/20 rounded-full overflow-hidden relative">
              <div
                className="absolute inset-y-0 left-0 bg-[#C9A84C] transition-all duration-300 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="text-[10px] text-[#7A6E66] font-mono">{progress}%</div>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="block w-full h-full cursor-grab active:cursor-grabbing"
      />
      <div className="absolute bottom-0 left-0 right-0 flex justify-center pb-4 pointer-events-none select-none z-10">
        <span className="bg-[#0A0806]/80 backdrop-blur-md border border-[#C9A84C]/20 text-[#C9A84C]/80 text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase px-5 py-2 rounded-full shadow-xl whitespace-nowrap">
          Drag · Scroll · Explore
        </span>
      </div>
    </div>
  );
}

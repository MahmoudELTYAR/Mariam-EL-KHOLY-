"use client";

import { useEffect, useRef } from "react";
import { Renderer, Program, Mesh, Triangle, Vec2 } from "ogl";
import { useIsTouch, usePrefersReducedMotion } from "@/hooks/useMediaQuery";

const vertex = /* glsl */ `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fragment = /* glsl */ `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uActive;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);
  vec2 m = (uMouse - 0.5 * uResolution.xy) / min(uResolution.x, uResolution.y);

  float d = length(p - m * uActive);
  float ripple = sin(12.0 * d - uTime * 2.2) * exp(-3.2 * d);
  float field = 0.018 / (0.08 + abs(ripple));

  // soft vignette + grain
  float vig = smoothstep(1.2, 0.2, length(p));
  float n = hash(uv * uResolution.xy + uTime) * 0.035;

  vec3 ink = vec3(0.031, 0.031, 0.031);
  vec3 volt = vec3(0.773, 0.949, 0.302);
  vec3 paper = vec3(0.929, 0.910, 0.875);

  float band = smoothstep(0.35, 0.0, abs(p.y + 0.15 + ripple * 0.08));
  vec3 col = mix(ink, ink + volt * 0.12, band * 0.55);
  col += volt * field * 0.55;
  col += paper * n * 0.4;
  col *= vig;

  gl_FragColor = vec4(col, 1.0);
}
`;

export function HeroCanvas() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const isTouch = useIsTouch();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced || isTouch || !wrapRef.current) return;

    const container = wrapRef.current;
    const renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 1.75),
      alpha: false,
      antialias: false,
    });
    const gl = renderer.gl;
    container.appendChild(gl.canvas);
    gl.clearColor(0.031, 0.031, 0.031, 1);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new Vec2(1, 1) },
        uMouse: { value: new Vec2(0, 0) },
        uActive: { value: 1 },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });

    const mouse = { x: window.innerWidth * 0.5, y: window.innerHeight * 0.4 };
    const target = { ...mouse };

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value.set(w * renderer.dpr, h * renderer.dpr);
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = window.innerHeight - e.clientY;
    };

    let raf = 0;
    let visible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { threshold: 0.05 },
    );
    observer.observe(container);

    const update = (t: number) => {
      raf = requestAnimationFrame(update);
      if (!visible) return;
      mouse.x += (target.x - mouse.x) * 0.08;
      mouse.y += (target.y - mouse.y) * 0.08;
      program.uniforms.uTime.value = t * 0.001;
      program.uniforms.uMouse.value.set(mouse.x * renderer.dpr, mouse.y * renderer.dpr);
      renderer.render({ scene: mesh });
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(update);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      if (gl.canvas.parentNode === container) container.removeChild(gl.canvas);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, [isTouch, reduced]);

  if (reduced || isTouch) {
    return (
      <div
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_30%_20%,rgba(197,242,77,0.12),transparent_45%),radial-gradient(ellipse_at_80%_70%,rgba(237,232,223,0.06),transparent_40%),#080808]"
        aria-hidden
      />
    );
  }

  return (
    <div
      ref={wrapRef}
      className="absolute inset-0 -z-10 overflow-hidden [&_canvas]:h-full [&_canvas]:w-full"
      aria-hidden
    />
  );
}

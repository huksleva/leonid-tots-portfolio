"use client";

import { useEffect, useRef } from "react";

const COUNT = 160;
const SPREAD = 520;
const FOV = 480;
const LINK = 130;

type P = { x: number; y: number; z: number; vx: number; vy: number; vz: number };

function rnd(n: number) {
  return (Math.random() - 0.5) * n;
}

export default function ParticleField() {
  const ref = useRef<HTMLCanvasElement>(null);
  const mx = useRef(-9999);
  const my = useRef(-9999);

  useEffect(() => {
    const cv = ref.current!;
    const ctx = cv.getContext("2d")!;
    let W = (cv.width = window.innerWidth);
    let H = (cv.height = window.innerHeight);

    const pts: P[] = Array.from({ length: COUNT }, () => ({
      x: rnd(SPREAD), y: rnd(SPREAD), z: rnd(SPREAD),
      vx: rnd(0.5), vy: rnd(0.5), vz: rnd(0.5),
    }));

    let rotX = 0;
    let rotY = 0;
    let raf: number;

    function frame() {
      ctx.fillStyle = "#020207";
      ctx.fillRect(0, 0, W, H);

      rotY += 0.0016;
      rotX += 0.0006;

      const cosY = Math.cos(rotY);
      const sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);

      const sx = new Float32Array(COUNT);
      const sy = new Float32Array(COUNT);
      const ss = new Float32Array(COUNT);

      for (let i = 0; i < COUNT; i++) {
        const p = pts[i];

        p.vx += rnd(0.02);
        p.vy += rnd(0.02);
        p.vz += rnd(0.02);
        p.vx *= 0.97;
        p.vy *= 0.97;
        p.vz *= 0.97;
        p.x += p.vx;
        p.y += p.vy;
        p.z += p.vz;

        const d = Math.hypot(p.x, p.y, p.z);
        if (d > SPREAD * 0.58) {
          const k = (SPREAD * 0.58) / d;
          p.x *= k; p.y *= k; p.z *= k;
          p.vx *= -0.3; p.vy *= -0.3; p.vz *= -0.3;
        }

        const x1 = p.x * cosY - p.z * sinY;
        const z1 = p.x * sinY + p.z * cosY;
        const y2 = p.y * cosX - z1 * sinX;
        const z2 = p.y * sinX + z1 * cosX;

        const s = FOV / (FOV + z2 + SPREAD);
        sx[i] = x1 * s + W * 0.5;
        sy[i] = y2 * s + H * 0.5;
        ss[i] = s;

        const ddx = sx[i] - mx.current;
        const ddy = sy[i] - my.current;
        const md = Math.hypot(ddx, ddy);
        if (md < 160 && md > 0) {
          const f = ((160 - md) / 160) * 2;
          p.vx += (ddx / md) * f;
          p.vy += (ddy / md) * f;
        }
      }

      const linkSq = LINK * LINK;
      for (let i = 0; i < COUNT; i++) {
        for (let j = i + 1; j < COUNT; j++) {
          const dx = sx[i] - sx[j];
          const dy = sy[i] - sy[j];
          const d2 = dx * dx + dy * dy;
          if (d2 < linkSq) {
            const t = 1 - Math.sqrt(d2) / LINK;
            const depth = (ss[i] + ss[j]) * 0.5;
            ctx.globalAlpha = t * t * depth * 0.55;
            ctx.strokeStyle = "#5ab0ff";
            ctx.lineWidth = 0.7;
            ctx.beginPath();
            ctx.moveTo(sx[i], sy[i]);
            ctx.lineTo(sx[j], sy[j]);
            ctx.stroke();
          }
        }
      }

      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < COUNT; i++) {
        const s = ss[i];
        const r = Math.max(0.8, 2.5 * s);
        const a = Math.min(0.85, 0.3 + 0.65 * s);

        ctx.globalAlpha = a * 0.12;
        ctx.fillStyle = "#2060ff";
        ctx.beginPath();
        ctx.arc(sx[i], sy[i], r * 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = a * 0.35;
        ctx.fillStyle = "#70b8ff";
        ctx.beginPath();
        ctx.arc(sx[i], sy[i], r * 2.8, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = a;
        ctx.fillStyle = "#dff0ff";
        ctx.beginPath();
        ctx.arc(sx[i], sy[i], r, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      raf = requestAnimationFrame(frame);
    }

    frame();

    function onResize() {
      W = cv.width = window.innerWidth;
      H = cv.height = window.innerHeight;
    }
    function onMouseMove(e: MouseEvent) {
      mx.current = e.clientX;
      my.current = e.clientY;
    }

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{ position: "fixed", inset: 0, width: "100%", height: "100%", cursor: "none" }}
    />
  );
}

"use client";

import { useEffect, useRef, useCallback } from "react";

export default function BinaryTorch() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const gridRef = useRef<string[][]>([]);
  const rafRef = useRef<number>(0);

  const CELL = 22;
  const FONT_SIZE = 12;
  const TORCH_RADIUS = 320;

  const generateGrid = useCallback((cols: number, rows: number) => {
    const grid: string[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: string[] = [];
      for (let c = 0; c < cols; c++) {
        row.push(Math.random() > 0.5 ? "1" : "0");
      }
      grid.push(row);
    }
    return grid;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const cols = Math.ceil(w / CELL) + 1;
      const rows = Math.ceil(h / CELL) + 1;
      gridRef.current = generateGrid(cols, rows);
    };

    resize();
    window.addEventListener("resize", resize);

    // Mutate random bits for a living feel
    const mutateInterval = setInterval(() => {
      const grid = gridRef.current;
      if (grid.length === 0) return;
      for (let i = 0; i < 10; i++) {
        const r = Math.floor(Math.random() * grid.length);
        const c = Math.floor(Math.random() * grid[0].length);
        grid[r][c] = grid[r][c] === "1" ? "0" : "1";
      }
    }, 150);

    // Parse CSS color variables for canvas use
    const parseHex = (hex: string) => {
      hex = hex.trim();
      if (!hex.startsWith("#")) return [173, 198, 255];
      return [
        parseInt(hex.slice(1, 3), 16) || 0,
        parseInt(hex.slice(3, 5), 16) || 0,
        parseInt(hex.slice(5, 7), 16) || 0,
      ];
    };

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      const style = getComputedStyle(document.documentElement);
      const [pr, pg, pb] = parseHex(style.getPropertyValue("--color-primary"));
      const [sr, sg, sb] = parseHex(style.getPropertyValue("--color-on-surface-variant"));

      ctx.clearRect(0, 0, w, h);

      const grid = gridRef.current;
      if (grid.length === 0) {
        rafRef.current = requestAnimationFrame(draw);
        return;
      }

      ctx.font = `500 ${FONT_SIZE}px "JetBrains Mono", "Courier New", monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const cols = grid[0].length;
      const rows = grid.length;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * CELL + CELL / 2;
          const y = r * CELL + CELL / 2;

          const dx = x - mx;
          const dy = y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < TORCH_RADIUS) {
            const intensity = 1 - dist / TORCH_RADIUS;
            const eased = intensity * intensity * intensity;
            const alpha = eased * 0.55;

            const char = grid[r][c];
            if (char === "1") {
              ctx.fillStyle = `rgba(${pr}, ${pg}, ${pb}, ${alpha})`;
            } else {
              ctx.fillStyle = `rgba(${sr}, ${sg}, ${sb}, ${alpha * 0.5})`;
            }
            ctx.fillText(char, x, y);
          }
        }
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    // Track mouse — canvas is fixed so clientX/Y maps directly
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = {
        x: e.clientX,
        y: e.clientY,
      };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    // Listen on window so mouse events aren't blocked by content above
    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
      clearInterval(mutateInterval);
    };
  }, [generateGrid]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}

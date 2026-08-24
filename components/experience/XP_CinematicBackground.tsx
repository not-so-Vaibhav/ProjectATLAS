"use client";

import React, { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/providers/ThemeProvider";

// --- Configuration ---
const CONFIG = {
  // Screen splitting thresholds for gaze zones
  ZONE_X_LEFT: 0.33,
  ZONE_X_RIGHT: 0.66,
  ZONE_Y_UP: 0.40,
  ZONE_Y_DOWN: 0.60,
  
  // Physics parameters for smooth tracking
  // Using a slightly tighter spring so transitions are fast and sharp
  SPRING_STIFFNESS: 0.12,
  SPRING_DAMPING: 0.70, 
  
  // To avoid rapid flickering near boundaries
  HYSTERESIS: 0.01,
};

export function XP_CinematicBackground() {
  const { theme } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking state (not React state, to avoid re-renders)
  const targetPos = useRef({ x: 0, y: 0 }); // Target look direction (-1 to 1)
  const currentPos = useRef({ x: 0, y: 0 }); // Current smoothed look direction
  const velocity = useRef({ x: 0, y: 0 }); // Current velocity
  
  const images = useRef<Record<string, HTMLImageElement>>({});
  const [loaded, setLoaded] = useState(false);

  // Load images whenever theme changes
  useEffect(() => {
    let loadedCount = 0;
    
    // Choose the folder based on the theme
    const baseDir = theme === "light" ? "/cinematic/arival light" : "/cinematic/arrival";
    const sources = {
      upLeft: `${baseDir}/up-left.png`,
      up: `${baseDir}/up.png`,
      upRight: `${baseDir}/up-right.png`,
      left: `${baseDir}/left.png`,
      center: `${baseDir}/center.png`,
      right: `${baseDir}/right.png`,
      downLeft: `${baseDir}/down-left.png`,
      down: `${baseDir}/down.png`,
      downRight: `${baseDir}/down-right.png`,
    };
    
    const totalCount = Object.keys(sources).length;
    
    // Load into a temporary object so the canvas doesn't go blank during load
    const newImages: Record<string, HTMLImageElement> = {};
    
    Object.entries(sources).forEach(([key, src]) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        newImages[key] = img;
        loadedCount++;
        if (loadedCount === totalCount) {
          images.current = newImages;
          setLoaded(true);
        }
      };
    });
  }, [theme]);

  // Mouse tracking listener
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const xPct = e.clientX / window.innerWidth;
      const yPct = e.clientY / window.innerHeight;
      
      let tx = 0;
      if (xPct < CONFIG.ZONE_X_LEFT) tx = -1;
      else if (xPct > CONFIG.ZONE_X_RIGHT) tx = 1;

      let ty = 0;
      if (yPct < CONFIG.ZONE_Y_UP) ty = -1;
      else if (yPct > CONFIG.ZONE_Y_DOWN) ty = 1;
      
      targetPos.current = { x: tx, y: ty };
    };

    const handleMouseLeave = () => {
      // Return to center when mouse leaves
      targetPos.current = { x: 0, y: 0 };
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Animation and rendering loop
  useEffect(() => {
    if (!loaded || !canvasRef.current || !containerRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: false }); // alpha: false optimizes rendering if background is opaque
    if (!ctx) return;

    let animationFrameId: number;

    let rectWidth = 0;
    let rectHeight = 0;

    // Resize handler
    const resize = () => {
      // For high DPI displays
      const dpr = window.devicePixelRatio || 1;
      const rect = containerRef.current!.getBoundingClientRect();
      rectWidth = rect.width;
      rectHeight = rect.height;
      
      // Update canvas backing store
      canvas.width = rectWidth * dpr;
      canvas.height = rectHeight * dpr;
      
      // Set CSS display size
      canvas.style.width = `${rectWidth}px`;
      canvas.style.height = `${rectHeight}px`;
      
      // Reset transform before scaling to avoid accumulation
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    
    window.addEventListener("resize", resize);
    resize();

    // Helper to draw an image filling the canvas covering bounds
    const drawCover = (img: HTMLImageElement, alpha: number) => {
      if (alpha <= 0.005) return; // Optimization: skip drawing if nearly invisible
      
      ctx.globalAlpha = alpha;
      
      // Calculate object-fit: cover math
      const canvasRatio = rectWidth / rectHeight;
      const imgRatio = img.width / img.height;
      
      let drawWidth, drawHeight, offsetX = 0, offsetY = 0;
      
      if (canvasRatio > imgRatio) {
        // Canvas is wider than image
        drawWidth = rectWidth;
        drawHeight = rectWidth / imgRatio;
        offsetY = (rectHeight - drawHeight) / 2;
      } else {
        // Canvas is taller than image
        drawHeight = rectHeight;
        drawWidth = rectHeight * imgRatio;
        offsetX = (rectWidth - drawWidth) / 2;
      }
      
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    // The render loop
    const render = () => {
      // 1. Physics update
      const tx = targetPos.current.x;
      const ty = targetPos.current.y;
      
      const k = CONFIG.SPRING_STIFFNESS;
      const d = CONFIG.SPRING_DAMPING;
      
      const forceX = (tx - currentPos.current.x) * k;
      const forceY = (ty - currentPos.current.y) * k;
      
      velocity.current.x = velocity.current.x * d + forceX;
      velocity.current.y = velocity.current.y * d + forceY;
      
      currentPos.current.x += velocity.current.x;
      currentPos.current.y += velocity.current.y;

      // 2. Blend weight calculation using bilinear interpolation
      // Clamp smoothed pos to [-1, 1] strictly just in case of spring overshoot
      const cx = Math.max(-1, Math.min(1, currentPos.current.x));
      const cy = Math.max(-1, Math.min(1, currentPos.current.y));

      // Hysteresis: smoothly lock near 0
      const absX = Math.abs(cx) < CONFIG.HYSTERESIS ? 0 : cx;
      const absY = Math.abs(cy) < CONFIG.HYSTERESIS ? 0 : cy;

      // Identify quadrants and weights
      const isLeft = absX < 0;
      const isUp = absY < 0;
      
      const xWeight = Math.abs(absX);
      const yWeight = Math.abs(absY);
      
      const invXWeight = 1 - xWeight;
      const invYWeight = 1 - yWeight;

      // Weights for the 4 nearest neighbors
      const wCenter = invXWeight * invYWeight;
      const wHorizontal = xWeight * invYWeight;
      const wVertical = invXWeight * yWeight;
      const wDiagonal = xWeight * yWeight;

      // Determine which 4 images to blend based on quadrant
      const imgCenter = images.current.center;
      const imgHorizontal = isLeft ? images.current.left : images.current.right;
      const imgVertical = isUp ? images.current.up : images.current.down;
      const imgDiagonal = isLeft 
        ? (isUp ? images.current.upLeft : images.current.downLeft)
        : (isUp ? images.current.upRight : images.current.downRight);

      // 3. Render passes
      // We must render in sequence, normalizing alpha over the remaining sum, to get a mathematically perfect crossfade.
      // This prevents the overall opacity from dropping and showing background color (ghosting).
      
      const layers = [
        { img: imgCenter, w: wCenter },
        { img: imgHorizontal, w: wHorizontal },
        { img: imgVertical, w: wVertical },
        { img: imgDiagonal, w: wDiagonal }
      ].filter(l => l.w > 0.001); // Filter out zero weights
      
      // Clear canvas
      ctx.clearRect(0, 0, rectWidth, rectHeight);

      let weightSum = 0;
      layers.forEach(layer => {
        weightSum += layer.w;
        const alpha = layer.w / weightSum;
        drawCover(layer.img, alpha);
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [loaded]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 overflow-hidden bg-[#080808]">
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ease-in-out"
        style={{ opacity: loaded ? 1 : 0 }}
      />
    </div>
  );
}

'use client';

import React, { useRef, useEffect } from "react";
import { useMousePosition } from "@/app/utils/mouse";

interface ParticlesProps {
  className?: string;
  quantity?: number;
  staticity?: number;
  ease?: number;
  refresh?: boolean;
}

export default function Particles({
  className = "",
  quantity = 30,
  staticity = 50,
  ease = 50,
  refresh = false,
}: ParticlesProps) {
  // Refs for canvas and its context, and container
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const context = useRef<CanvasRenderingContext2D | null>(null);

  // State for circles and mouse positions
  const circles = useRef<any[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  // Device pixel ratio for high DPI screens
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;

  // Use mouse position custom hook
  const mousePosition = useMousePosition();

  // Setup and teardown of the canvas, and handle window resizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      context.current = canvas.getContext("2d");
      initCanvas();
      animate();
    }
    // Event listener for resizing the window
    window.addEventListener("resize", initCanvas);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", initCanvas);
    };
  }, []); // Empty dependency array means this runs once on mount and cleanup on unmount

  // Effect to handle mouse movement
  useEffect(() => {
    onMouseMove();
  }, [mousePosition.x, mousePosition.y]); // Re-run when mouse position changes

  // Effect to handle component refresh
  useEffect(() => {
    initCanvas();
  }, [refresh]); // Re-run when refresh changes

  // Initialize canvas settings
  const initCanvas = () => {
    resizeCanvas();
    drawParticles();
  };

  // Update mouse position based on movement over the canvas
  const onMouseMove = () => {
    if (canvasRef.current) {
      const rect = canvasRef.current.getBoundingClientRect();
      const canvasWidth = canvasSize.current.w;
      const canvasHeight = canvasSize.current.h;
      
      // Translate mouse position to be relative to the canvas
      const x = mousePosition.x - rect.left - canvasWidth / 2;
      const y = mousePosition.y - rect.top - canvasHeight / 2;
      
      // Check if the mouse is inside the canvas
      const insideCanvas = x < canvasWidth / 2 && x > -canvasWidth / 2 && y < canvasHeight / 2 && y > -canvasHeight / 2;
      
      if (insideCanvas) {
        mouse.current.x = x;
        mouse.current.y = y;
      }
    }
  };

  type Circle = {
    x: number;
    y: number;
    translateX: number;
    translateY: number;
    size: number;
    alpha: number;
    targetAlpha: number;
    dx: number;
    dy: number;
    magnetism: number;
  };

  // Handle resizing of the canvas to fit its container
  const resizeCanvas = () => {
    if (canvasContainerRef.current && canvasRef.current && context.current) {
      // Reset circles array on resize
      circles.current.length = 0;
      // Update the size of the canvas
      const { offsetWidth, offsetHeight } = canvasContainerRef.current;
      canvasSize.current = { w: offsetWidth, h: offsetHeight };
      // Set the width and height of the canvas element
      canvasRef.current.width = offsetWidth * dpr;
      canvasRef.current.height = offsetHeight * dpr;
      // Scale the canvas
      canvasRef.current.style.width = `${offsetWidth}px`;
      canvasRef.current.style.height = `${offsetHeight}px`;
      context.current.scale(dpr, dpr);
    }
  };

  // Function to generate parameters for a new circle
  const circleParams = (): Circle => {
    return {
      x: Math.floor(Math.random() * canvasSize.current.w),
      y: Math.floor(Math.random() * canvasSize.current.h),
      translateX: 0,
      translateY: 0,
      size: Math.floor(Math.random() * 2) + 0.1, // Ensure non-zero size
      alpha: 0, // Start fully transparent
      targetAlpha: parseFloat((Math.random() * 0.6 + 0.1).toFixed(1)), // Semi-transparent
      dx: (Math.random() - 0.5) * 0.2, // Movement in x direction
      dy: (Math.random() - 0.5) * 0.2, // Movement in y direction
      magnetism: 0.1 + Math.random() * 4, // Random magnetism for interaction
    };
  };

  // Draw a single circle on the canvas
  const drawCircle = (circle: Circle, update = false) => {
    if (context.current) {
      const { x, y, translateX, translateY, size, alpha } = circle;
      context.current.translate(translateX, translateY);
      context.current.beginPath();
      context.current.arc(x, y, size, 0, 2 * Math.PI);
      context.current.fillStyle = `rgba(255, 255, 255, ${alpha})`;
      context.current.fill();
      context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!update) {
        circles.current.push(circle);
      }
    }
  };

  // Clear the canvas context
  const clearContext = () => {
    if (context.current) {
      context.current.clearRect(
        0,
        0,
        canvasSize.current.w,
        canvasSize.current.h,
      );
    }
  };

  // Draw all particles on the canvas
  const drawParticles = () => {
    clearContext();
    const particleCount = quantity;
    for (let i = 0; i < particleCount; i++) {
      const circle = circleParams();
      drawCircle(circle);
    }
  };

  const remapValue = (
    value: number,
    start1: number,
    end1: number,
    start2: number,
    end2: number,
  ): number => {
    const remapped =
      ((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
    return remapped > 0 ? remapped : 0;
  };

  // Animation loop to move and redraw circles
  const animate = () => {
    clearContext();
    circles.current.forEach((circle: Circle, i: number) => {
      // Handle the alpha value
      const edge = [
        circle.x + circle.translateX - circle.size, // distance from left edge
        canvasSize.current.w - circle.x - circle.translateX - circle.size, // distance from right edge
        circle.y + circle.translateY - circle.size, // distance from top edge
        canvasSize.current.h - circle.y - circle.translateY - circle.size, // distance from bottom edge
      ];
      const closestEdge = edge.reduce((a, b) => Math.min(a, b));
      const remapClosestEdge = parseFloat(
        remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
      );
      if (remapClosestEdge > 1) {
        circle.alpha += 0.02;
        if (circle.alpha > circle.targetAlpha) {
          circle.alpha = circle.targetAlpha;
        }
      } else {
        circle.alpha = circle.targetAlpha * remapClosestEdge;
      }
      circle.x += circle.dx;
      circle.y += circle.dy;
      circle.translateX +=
        (mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
        ease;
      circle.translateY +=
        (mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
        ease;
      // circle gets out of the canvas
      if (
        circle.x < -circle.size ||
        circle.x > canvasSize.current.w + circle.size ||
        circle.y < -circle.size ||
        circle.y > canvasSize.current.h + circle.size
      ) {
        // remove the circle from the array
        circles.current.splice(i, 1);
        // create a new circle
        const newCircle = circleParams();
        drawCircle(newCircle);
        // update the circle position
      } else {
        drawCircle(
          {
            ...circle,
            x: circle.x,
            y: circle.y,
            translateX: circle.translateX,
            translateY: circle.translateY,
            alpha: circle.alpha,
          },
          true,
        );
      }
    });
    window.requestAnimationFrame(animate);
  };

  return (
    <div className={className} ref={canvasContainerRef} aria-hidden="true">
      <canvas ref={canvasRef} />
    </div>
  );
}

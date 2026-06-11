import React, { useEffect, useRef } from 'react';

interface Sparkle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  decay: number;
  rotation: number;
  rotationSpeed: number;
}

const SparkleCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  
  // Custom luxury gold color palette
  const goldShades = [
    'rgba(255, 215, 0, ',   // Gold
    'rgba(212, 175, 55, ',  // Metallic Gold
    'rgba(245, 230, 200, ', // Champagne Gold
    'rgba(197, 160, 89, ',  // Brushed Gold
    'rgba(190, 151, 82, ',  // Luxury Gold
  ];

  useEffect(() => {
    const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    const sparkles: Sparkle[] = [];
    const maxSparkles = isMobile ? 35 : 45; // slightly lower max on mobile for memory efficiency

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const createSparkle = (x: number, y: number) => {
      if (sparkles.length >= maxSparkles) {
        sparkles.shift(); // Remove oldest to maintain cap
      }
      
      const size = 1.5 + Math.random() * 3.5;
      const baseColor = goldShades[Math.floor(Math.random() * goldShades.length)];
      
      // Random velocity disperse
      const angle = Math.random() * Math.PI * 2;
      const speed = 0.4 + Math.random() * 0.8;
      
      sparkles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.3, // slight gravity pull down
        size,
        color: baseColor,
        alpha: 1.0,
        decay: 0.012 + Math.random() * 0.015, // decay rate
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: -0.05 + Math.random() * 0.1,
      });
    };

    // Track mouse position and throttle sparkle generation slightly (desktop only)
    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime > 15) { // 15ms throttle
        createSparkle(e.clientX, e.clientY);
        lastTime = currentTime;
      }
    };

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // Touch and Click bursts for interactive feel
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];
        // Create a burst of 6 sparkles
        for (let i = 0; i < 6; i++) {
          createSparkle(touch.clientX, touch.clientY);
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Create a burst of 6 sparkles on click
      for (let i = 0; i < 6; i++) {
        createSparkle(e.clientX, e.clientY);
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('click', handleClick);

    // Draw star shape on canvas
    const drawStar = (
      context: CanvasRenderingContext2D,
      cx: number,
      cy: number,
      spikes: number,
      outerRadius: number,
      innerRadius: number
    ) => {
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      context.beginPath();
      context.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        context.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        context.lineTo(x, y);
        rot += step;
      }
      context.lineTo(cx, cy - outerRadius);
      context.closePath();
      context.fill();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.x += s.vx;
        s.y += s.vy;
        s.alpha -= s.decay;
        s.rotation += s.rotationSpeed;

        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        ctx.fillStyle = `${s.color}${s.alpha})`;
        
        // Draw 4-point star for sparkle effect
        drawStar(ctx, 0, 0, 4, s.size, s.size * 0.35);
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (!isMobile) {
        window.removeEventListener('mousemove', handleMouseMove);
      }
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('click', handleClick);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[9999] w-full h-full block"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default SparkleCursor;

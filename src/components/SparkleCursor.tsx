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
  
  // Custom luxury gold & diamond white color palette
  const goldShades = [
    'rgba(255, 255, 255, ',   // Diamond White
    'rgba(255, 215, 0, ',     // Pure Gold
    'rgba(212, 175, 55, ',    // Metallic Gold
    'rgba(255, 248, 220, ',   // Champagne White
    'rgba(245, 230, 200, ',   // Champagne Gold
    'rgba(255, 239, 155, ',   // Brilliant Gold
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
    const maxSparkles = isMobile ? 80 : 180; // Significantly increased particle cap for rich glitter density

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const createSparkle = (x: number, y: number, speedMultiplier = 1.0) => {
      if (sparkles.length >= maxSparkles) {
        sparkles.shift(); // Remove oldest to maintain cap
      }
      
      const size = 1.0 + Math.random() * 4.5;
      const baseColor = goldShades[Math.floor(Math.random() * goldShades.length)];
      
      // Random velocity disperse
      const angle = Math.random() * Math.PI * 2;
      const speed = (0.5 + Math.random() * 1.5) * speedMultiplier;
      
      sparkles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed + 0.15, // lighter gravity pull for longer floating trails
        size,
        color: baseColor,
        alpha: 1.0,
        decay: 0.007 + Math.random() * 0.010, // Slower decay rate for longer-lasting glittering trails
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: -0.06 + Math.random() * 0.12,
      });
    };

    // Track mouse position and spawn multiple sparkles per step (desktop only)
    let lastTime = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const currentTime = Date.now();
      if (currentTime - lastTime > 8) { // Reduced throttle to 8ms for smoother, denser trails
        // Spawn 2 sparkles per mousemove event for a much thicker trail
        createSparkle(e.clientX, e.clientY);
        createSparkle(e.clientX + (Math.random() - 0.5) * 5, e.clientY + (Math.random() - 0.5) * 5);
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
        // Create a massive burst of 18 sparkles on touch
        for (let i = 0; i < 18; i++) {
          createSparkle(touch.clientX, touch.clientY, 1.8);
        }
      }
    };

    const handleClick = (e: MouseEvent) => {
      // Create a massive burst of 20 sparkles on click
      for (let i = 0; i < 20; i++) {
        createSparkle(e.clientX, e.clientY, 2.0);
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

        // Add twinkling fluctuation to opacity to create a shimmering glitter effect
        const twinkle = 0.85 + Math.sin(Date.now() * 0.02 + s.size) * 0.15;
        const currentAlpha = Math.max(0, Math.min(1.0, s.alpha * twinkle));

        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(s.rotation);
        
        // Setup gold glow shadow effect on the canvas
        ctx.shadowBlur = s.size * 2.0;
        ctx.shadowColor = 'rgba(255, 215, 0, 0.7)';
        ctx.fillStyle = `${s.color}${currentAlpha})`;
        
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

import { useEffect, useRef } from 'react';

/**
 * HeroCanvas  -  dynamic particle & clinical network background.
 * Represents interconnected clinical covariates (Age, Glucose, BMI, Hypertension, etc.)
 * drifting gently in latent space, reacting softly to mouse movement.
 */
export function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = canvas.parentElement.offsetWidth);
    let height = (canvas.height = canvas.parentElement.offsetHeight);

    const resizeHandler = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.offsetWidth;
      height = canvas.height = canvas.parentElement.offsetHeight;
    };

    window.addEventListener('resize', resizeHandler);

    // Clean particle network without tacky floating text
    const particleCount = Math.min(Math.floor(width / 36), 36);
    const particles = [];

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        radius: Math.random() * 1.5 + 1.0,
        alpha: Math.random() * 0.3 + 0.15,
        isHighlight: i % 4 === 0,
      });
    }

    let mouseX = -1000;
    let mouseY = -1000;

    const mouseMoveHandler = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const mouseLeaveHandler = () => {
      mouseX = -1000;
      mouseY = -1000;
    };

    const parent = canvas.parentElement;
    parent.addEventListener('mousemove', mouseMoveHandler);
    parent.addEventListener('mouseleave', mouseLeaveHandler);

    let isVisible = true;
    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    });
    observer.observe(canvas);

    // Animation loop
    const render = () => {
      if (!isVisible) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Draw connecting lines between particles
      const maxDist = 130;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            const lineAlpha = (1 - dist / maxDist) * 0.12;
            ctx.beginPath();
            ctx.strokeStyle = particles[i].isHighlight || particles[j].isHighlight
              ? `rgba(244, 63, 94, ${lineAlpha * 1.2})`
              : `rgba(255, 255, 255, ${lineAlpha * 0.8})`;
            ctx.lineWidth = 0.75;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      // Update & render particles
      particles.forEach((p) => {
        // Move
        p.x += p.vx;
        p.y += p.vy;

        // Bounce on edges
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Soft mouse reaction
        const mdx = p.x - mouseX;
        const mdy = p.y - mouseY;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < 100 && mdist > 0) {
          const force = (100 - mdist) / 100 * 0.4;
          p.x += (mdx / mdist) * force;
          p.y += (mdy / mdist) * force;
        }

        // Draw particle node
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.isHighlight 
          ? 'rgba(244, 63, 94, 0.75)' 
          : 'rgba(255, 255, 255, 0.3)';
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeHandler);
      parent.removeEventListener('mousemove', mouseMoveHandler);
      parent.removeEventListener('mouseleave', mouseLeaveHandler);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-70"
      aria-hidden="true"
    />
  );
}

export default HeroCanvas;

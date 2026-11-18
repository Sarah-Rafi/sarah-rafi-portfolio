import { ChangeDetectionStrategy, Component, DestroyRef, ElementRef, afterNextRender, inject, viewChild } from '@angular/core';
import { reducedMotion } from './motion';

/**
 * A field of particles joined by lines, drawn on a canvas, that moves away from the cursor.
 * It pauses while off-screen (IntersectionObserver), so it costs nothing after you scroll past the hero.
 */
@Component({
  selector: 'app-particles',
  template: `<canvas #canvas aria-hidden="true"></canvas>`,
  styles: `:host{position:absolute;inset:0;pointer-events:none} canvas{width:100%;height:100%;display:block}`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Particles {
  private canvas = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const c = this.canvas().nativeElement;
      const ctx = c.getContext('2d');
      if (!ctx) return; // no canvas support (e.g. the jsdom test environment)
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const mouse = { x: -9999, y: -9999 };
      let w = 0, h = 0, raf = 0, running = false;
      let pts: { x: number; y: number; vx: number; vy: number }[] = [];

      const resize = () => {
        w = c.clientWidth; h = c.clientHeight;
        c.width = w * dpr; c.height = h * dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        const n = Math.min(110, Math.floor((w * h) / 12000));
        pts = Array.from({ length: n }, () => ({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4, vy: (Math.random() - 0.5) * 0.4,
        }));
      };

      const draw = () => {
        ctx.clearRect(0, 0, w, h);
        const color = getComputedStyle(c).getPropertyValue('--particle').trim() || '140,120,255';
        for (const p of pts) {
          const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
          if (d2 < 14000) { p.vx += dx / 4000; p.vy += dy / 4000; }
          p.vx *= 0.985; p.vy *= 0.985;
          p.x += p.vx + (Math.random() - 0.5) * 0.05; p.y += p.vy + (Math.random() - 0.5) * 0.05;
          if (p.x < 0 || p.x > w) p.vx *= -1;
          if (p.y < 0 || p.y > h) p.vy *= -1;
        }
        for (let i = 0; i < pts.length; i++) {
          const a = pts[i];
          ctx.fillStyle = `rgba(${color},.8)`;
          ctx.fillRect(a.x - 1, a.y - 1, 2, 2);
          for (let j = i + 1; j < pts.length; j++) {
            const b = pts[j], d = Math.hypot(a.x - b.x, a.y - b.y);
            if (d < 120) {
              ctx.strokeStyle = `rgba(${color},${(1 - d / 120) * 0.35})`;
              ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
            }
          }
        }
        if (running) raf = requestAnimationFrame(draw);
      };

      const onMove = (e: PointerEvent) => {
        const r = c.getBoundingClientRect();
        mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
      };

      resize();
      addEventListener('resize', resize);
      addEventListener('pointermove', onMove);

      if (reducedMotion()) draw(); // one static frame
      const io = new IntersectionObserver(([e]) => {
        if (reducedMotion()) return;
        running = e.isIntersecting;
        cancelAnimationFrame(raf);
        if (running) raf = requestAnimationFrame(draw);
      });
      io.observe(c);

      destroyRef.onDestroy(() => {
        io.disconnect(); cancelAnimationFrame(raf);
        removeEventListener('resize', resize);
        removeEventListener('pointermove', onMove);
      });
    });
  }
}

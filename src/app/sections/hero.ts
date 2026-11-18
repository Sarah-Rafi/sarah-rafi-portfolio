import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../data/profile';
import { Magnetic, Typewriter } from '../shared/motion';
import { Particles } from '../shared/particles';

@Component({
  selector: 'app-hero',
  imports: [Particles, Typewriter, Magnetic],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="home" class="hero">
      <div class="mesh" aria-hidden="true"><span></span><span></span><span></span></div>
      <app-particles />
      <div class="container inner">
        <p class="hello"><span class="dot"></span> Available for Angular roles · {{ p.location }}</p>
        <h1>
          <span class="line"><span>Hi, I’m</span></span>
          <span class="line"><span class="grad-text name">{{ p.name }}</span></span>
        </h1>
        <p class="role">
          <span [typewriter]="p.roles"></span><span class="caret" aria-hidden="true">|</span>
        </p>
        <p class="lead">I build fast, scalable web and mobile products, from architecture to app-store launch.</p>
        <div class="cta">
          <a class="btn primary" href="#projects" magnetic>View my work <span aria-hidden="true">→</span></a>
          <a class="btn" href="#contact" magnetic>Let’s talk</a>
        </div>
      </div>
      <a class="scroll-cue" href="#about" aria-label="Scroll to about"><span></span></a>
    </section>
  `,
  styles: `
    .hero { min-height: 100svh; display: grid; place-items: center; overflow: hidden; padding: 120px 0 80px; }
    .inner { position: relative; z-index: 1; }
    .mesh { position: absolute; inset: -20%; filter: blur(90px); opacity: .55; }
    .mesh span { position: absolute; width: 45vmax; height: 45vmax; border-radius: 50%; animation: float 18s ease-in-out infinite alternate; }
    .mesh span:nth-child(1) { background: var(--accent); top: 0; left: 5%; }
    .mesh span:nth-child(2) { background: var(--accent-2); bottom: 0; right: 5%; animation-delay: -6s; opacity: .6; }
    .mesh span:nth-child(3) { background: var(--accent-3); top: 30%; left: 40%; width: 30vmax; height: 30vmax; animation-delay: -12s; opacity: .5; }
    @keyframes float { to { transform: translate(8vw, -6vh) scale(1.15) rotate(40deg); } }

    .hello { display: inline-flex; align-items: center; gap: 10px; padding: 8px 16px; border-radius: 999px;
      border: 1px solid var(--card-border); background: var(--card); font-size: 14px; color: var(--muted);
      animation: rise 1s var(--ease) both; backdrop-filter: blur(10px); }
    .dot { width: 8px; height: 8px; border-radius: 50%; background: #3ddc84; box-shadow: 0 0 0 0 #3ddc84; animation: ping 2s infinite; }
    @keyframes ping { 70% { box-shadow: 0 0 0 10px transparent; } }

    h1 { font-size: clamp(48px, 10vw, 128px); margin: 24px 0 12px; }
    .line { display: block; overflow: hidden; }
    .line > span { display: inline-block; animation: slide-up 1.1s var(--ease) both; }
    .line:nth-child(2) > span { animation-delay: .12s; }
    @keyframes slide-up { from { transform: translateY(105%); } }
    @keyframes rise { from { opacity: 0; transform: translateY(20px); } }

    .role { font: 600 clamp(20px, 3vw, 30px)/1.3 var(--font-display); color: var(--text); min-height: 1.3em; animation: rise 1s .3s var(--ease) both; }
    .caret { color: var(--accent-2); animation: blink 1s steps(1) infinite; margin-left: 2px; }
    @keyframes blink { 50% { opacity: 0; } }
    .lead { max-width: 560px; color: var(--muted); font-size: 18px; margin-top: 18px; animation: rise 1s .45s var(--ease) both; }
    .cta { display: flex; flex-wrap: wrap; gap: 14px; margin-top: 36px; animation: rise 1s .6s var(--ease) both; }

    .scroll-cue { position: absolute; bottom: 28px; left: 50%; translate: -50% 0; width: 26px; height: 42px;
      border: 2px solid var(--muted); border-radius: 20px; z-index: 1; }
    .scroll-cue span { position: absolute; left: 50%; top: 8px; width: 4px; height: 8px; margin-left: -2px; border-radius: 2px;
      background: var(--text); animation: wheel 1.8s infinite; }
    @keyframes wheel { to { transform: translateY(14px); opacity: 0; } }
  `,
})
export class Hero {
  protected readonly p = PROFILE;
}

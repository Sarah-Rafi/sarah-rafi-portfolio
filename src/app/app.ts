import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { About } from './sections/about';
import { Contact } from './sections/contact';
import { Experience } from './sections/experience';
import { Hero } from './sections/hero';
import { Projects } from './sections/projects';
import { Skills } from './sections/skills';
import { ThemeService } from './shared/theme';

const SECTIONS = ['home', 'about', 'experience', 'projects', 'skills', 'contact'] as const;

@Component({
  selector: 'app-root',
  imports: [Hero, About, Experience, Projects, Skills, Contact],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(window:scroll)': 'onScroll()',
    '(document:pointermove)': 'onPointer($event)',
  },
  template: `
    <div class="progress" aria-hidden="true"></div>
    <div class="cursor-glow" aria-hidden="true"></div>
    <a class="skip" href="#about">Skip to content</a>

    <header [class.scrolled]="scrolled()">
      <nav class="container">
        <a href="#home" class="logo" aria-label="Sarah Rafi, home"><span class="grad-text">SR</span><i>.</i></a>
        <ul [class.open]="menuOpen()">
          @for (s of sections.slice(1); track s) {
            <li><a [href]="'#' + s" [class.active]="active() === s" (click)="menuOpen.set(false)">{{ s }}</a></li>
          }
        </ul>
        <div class="right">
          <button class="icon" (click)="theme.toggle()" [attr.aria-label]="'Switch to ' + (theme.theme() === 'dark' ? 'light' : 'dark') + ' theme'">
            {{ theme.theme() === 'dark' ? '☀' : '☾' }}
          </button>
          <button class="icon burger" (click)="menuOpen.update(o => !o)" [attr.aria-expanded]="menuOpen()" aria-label="Menu">
            <span></span><span></span>
          </button>
        </div>
      </nav>
    </header>

    <main>
      <app-hero />
      <app-about />
      <app-experience />
      <!-- @defer: these chunks are lazy-loaded when they get near the viewport. The placeholder keeps the #anchor working. -->
      @defer (on viewport; prefetch on idle) {
        <app-projects />
      } @placeholder {
        <section id="projects" style="min-height: 100vh"></section>
      }
      @defer (on viewport; prefetch on idle) {
        <app-skills />
      } @placeholder {
        <section id="skills" style="min-height: 80vh"></section>
      }
      <app-contact />
    </main>

    <footer class="container">
      <a href="#home">Back to top ↑</a>
    </footer>
  `,
  styles: `
    /* Scroll-progress bar: a CSS scroll-driven animation, with no JS. */
    .progress { position: fixed; top: 0; left: 0; right: 0; height: 3px; z-index: 100; background: var(--grad);
      transform-origin: left; animation: grow linear both; animation-timeline: scroll(root); }
    @keyframes grow { from { transform: scaleX(0); } }
    .cursor-glow { position: fixed; z-index: 0; pointer-events: none; width: 500px; height: 500px; border-radius: 50%;
      left: var(--cx, -1000px); top: var(--cy, -1000px); translate: -50% -50%;
      background: radial-gradient(circle, color-mix(in srgb, var(--accent) 16%, transparent), transparent 65%); }
    @media (pointer: coarse) { .cursor-glow { display: none; } }
    .skip { position: absolute; left: -9999px; } .skip:focus { left: 16px; top: 16px; z-index: 200; }

    header { position: fixed; inset: 0 0 auto; z-index: 60; transition: all .4s var(--ease); padding: 18px 0; }
    header.scrolled { padding: 10px 0; background: color-mix(in srgb, var(--bg) 70%, transparent); backdrop-filter: blur(16px);
      border-bottom: 1px solid var(--card-border); }
    nav { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
    .logo { font: 700 26px var(--font-display); text-decoration: none; } .logo i { color: var(--accent-2); font-style: normal; }
    ul { display: flex; gap: 6px; list-style: none; margin: 0; padding: 6px; border-radius: 999px; background: var(--card); border: 1px solid var(--card-border); }
    ul a { display: block; padding: 8px 16px; border-radius: 999px; text-decoration: none; text-transform: capitalize; font-size: 14px;
      color: var(--muted); transition: all .3s var(--ease); }
    ul a:hover { color: var(--text); }
    ul a.active { color: #0a0a12; background: var(--grad); }
    .right { display: flex; gap: 8px; }
    .icon { width: 42px; height: 42px; border-radius: 50%; border: 1px solid var(--card-border); background: var(--card); color: var(--text);
      cursor: pointer; font-size: 18px; display: grid; place-items: center; }
    .burger { display: none; gap: 5px; place-content: center; }
    .burger span { display: block; width: 18px; height: 2px; background: currentColor; transition: transform .3s; }
    .burger[aria-expanded='true'] span:first-child { transform: translateY(3.5px) rotate(45deg); }
    .burger[aria-expanded='true'] span:last-child { transform: translateY(-3.5px) rotate(-45deg); }

    @media (max-width: 760px) {
      .burger { display: grid; }
      ul { position: fixed; top: 74px; left: 16px; right: 16px; flex-direction: column; border-radius: 20px; padding: 12px;
        background: var(--bg-2); opacity: 0; pointer-events: none; transform: translateY(-10px); transition: all .3s var(--ease); }
      ul.open { opacity: 1; pointer-events: auto; transform: none; }
      ul a { padding: 14px 18px; font-size: 16px; }
    }
    main { position: relative; z-index: 1; }
    footer { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; padding: 32px 0 48px; color: var(--muted); font-size: 14px;
      border-top: 1px solid var(--card-border); }
    footer a { text-decoration: none; }
  `,
})
export class App {
  protected readonly theme = inject(ThemeService);
  protected readonly sections = SECTIONS;
  protected readonly active = signal<string>('home');
  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  private ticking = false;

  onScroll() {
    if (this.ticking) return;
    this.ticking = true;
    requestAnimationFrame(() => {
      this.ticking = false;
      this.scrolled.set(scrollY > 40);
      // The active section is the last one whose top has passed 40% of the viewport height.
      const line = innerHeight * 0.4;
      const current = SECTIONS.filter((id) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) < line).at(-1);
      this.active.set(current ?? 'home');
    });
  }

  onPointer(e: PointerEvent) {
    // Writes CSS variables straight to the DOM, so no change detection runs on every pointer move.
    document.documentElement.style.setProperty('--cx', `${e.clientX}px`);
    document.documentElement.style.setProperty('--cy', `${e.clientY}px`);
  }
}

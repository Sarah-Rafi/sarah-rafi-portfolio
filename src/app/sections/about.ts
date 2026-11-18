import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EDUCATION, PROFILE } from '../data/profile';
import { CountUp, Reveal, Tilt } from '../shared/motion';

@Component({
  selector: 'app-about',
  imports: [Reveal, CountUp, Tilt],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="about">
      <div class="container grid">
        <div>
          <span class="eyebrow" reveal>About me</span>
          <h2 class="section-title" reveal="80">Engineering products <span class="grad-text">people actually use.</span></h2>
          <p class="summary" reveal="160">{{ p.summary }}</p>
          <div class="edu card" reveal="240">
            <span class="cap" aria-hidden="true">🎓</span>
            <div><strong>{{ edu.degree }}</strong><span>{{ edu.school }} · {{ edu.period }}</span></div>
          </div>
        </div>
        <div class="stats">
          @for (s of p.stats; track s.label; let i = $index) {
            <div class="stat card" tilt [reveal]="i * 110">
              <strong class="grad-text" [countUp]="s.value" [suffix]="s.suffix"></strong>
              <span>{{ s.label }}</span>
            </div>
          }
        </div>
      </div>
    </section>
  `,
  styles: `
    .grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 64px; align-items: center; }
    .summary { color: var(--muted); font-size: 18px; }
    .edu { display: flex; gap: 16px; align-items: center; padding: 18px 22px; margin-top: 32px; }
    .edu div { display: grid; } .edu span { color: var(--muted); font-size: 14px; }
    .cap { font-size: 28px; }
    .stats { display: grid; grid-template-columns: 1fr 1fr; gap: 18px; }
    .stat { padding: 30px 24px; display: grid; gap: 6px; }
    .stat strong { font: 700 clamp(40px, 5vw, 60px)/1 var(--font-display); }
    .stat span { color: var(--muted); font-size: 14px; }
    @media (max-width: 860px) { .grid { grid-template-columns: 1fr; gap: 40px; } }
  `,
})
export class About {
  protected readonly p = PROFILE;
  protected readonly edu = EDUCATION;
}

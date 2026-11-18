import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXPERIENCE } from '../data/profile';
import { Reveal } from '../shared/motion';

@Component({
  selector: 'app-experience',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="experience">
      <div class="container">
        <span class="eyebrow" reveal>Experience</span>
        <h2 class="section-title" reveal="80">Where I’ve <span class="grad-text">shipped.</span></h2>
        <ol class="timeline">
          @for (job of jobs; track job.company + job.period; let i = $index) {
            <li reveal [class.right]="i % 2">
              <span class="node" aria-hidden="true"></span>
              <article class="card">
                <span class="period">{{ job.period }}</span>
                <h3>{{ job.role }}</h3>
                <p class="company">{{ job.company }}</p>
                <ul>
                  @for (pt of job.points; track pt) { <li>{{ pt }}</li> }
                </ul>
              </article>
            </li>
          }
        </ol>
      </div>
    </section>
  `,
  styles: `
    .timeline { list-style: none; padding: 0; margin: 0; position: relative; }
    /* The line draws itself as you scroll (CSS scroll-driven animation; no JavaScript). */
    .timeline::before { content: ''; position: absolute; left: 50%; top: 0; bottom: 0; width: 2px; margin-left: -1px;
      background: var(--grad); transform-origin: top; animation: draw linear both;
      animation-timeline: view(); animation-range: entry 10% cover 60%; }
    @keyframes draw { from { transform: scaleY(0); } }
    .timeline > li { position: relative; width: 50%; padding: 0 48px 40px 0; }
    .timeline > li.right { margin-left: 50%; padding: 0 0 40px 48px; }
    .node { position: absolute; top: 26px; right: -9px; width: 18px; height: 18px; border-radius: 50%;
      background: var(--bg); border: 3px solid var(--accent-2); box-shadow: 0 0 20px var(--accent-2); }
    .right .node { right: auto; left: -9px; }
    article { padding: 26px 28px; transition: transform .4s var(--ease), border-color .4s; }
    article:hover { transform: translateY(-4px); border-color: var(--accent); }
    .period { font: 600 13px var(--font-display); color: var(--accent-2); letter-spacing: .08em; }
    h3 { font-size: 22px; margin-top: 8px; }
    .company { color: var(--accent); font-weight: 600; margin: 4px 0 12px; }
    ul ul, article ul { padding-left: 18px; margin: 0; color: var(--muted); font-size: 15px; display: grid; gap: 6px; }
    @media (max-width: 760px) {
      .timeline::before { left: 8px; }
      .timeline > li, .timeline > li.right { width: 100%; margin: 0; padding: 0 0 32px 36px; }
      .node, .right .node { left: 0; right: auto; }
    }
  `,
})
export class Experience {
  protected readonly jobs = EXPERIENCE;
}

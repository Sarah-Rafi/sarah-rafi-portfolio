import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SKILLS } from '../data/profile';
import { Reveal } from '../shared/motion';

@Component({
  selector: 'app-skills',
  imports: [Reveal],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="skills">
      <div class="container">
        <span class="eyebrow" reveal>Toolbox</span>
        <h2 class="section-title" reveal="80">Skills &amp; <span class="grad-text">stack.</span></h2>
      </div>

      <div class="marquees" aria-hidden="true">
        @for (row of rows; track $index; let odd = $odd) {
          <div class="marquee" [class.reverse]="odd">
            <div class="track">
              <!-- The list is rendered twice so the -50% loop joins up seamlessly. -->
              @for (s of row.concat(row); track $index) { <span>{{ s }}</span><i>✦</i> }
            </div>
          </div>
        }
      </div>

      <div class="container groups">
        @for (g of skills; track g.group; let i = $index) {
          <div class="group card" [reveal]="i * 80">
            <h3>{{ g.group }}</h3>
            <div class="chips">@for (s of g.items; track s) { <span class="chip">{{ s }}</span> }</div>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .marquees { display: grid; gap: 14px; margin-bottom: 56px; transform: rotate(-2deg); }
    .marquee { overflow: hidden; mask-image: linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent); }
    .track { display: flex; gap: 28px; width: max-content; align-items: center; animation: scroll 40s linear infinite; }
    .reverse .track { animation-direction: reverse; }
    .marquee:hover .track { animation-play-state: paused; }
    .track span { font: 700 clamp(28px, 4vw, 48px) var(--font-display); white-space: nowrap; color: transparent;
      -webkit-text-stroke: 1px var(--muted); transition: color .3s; }
    .track span:hover { color: var(--text); }
    .track i { color: var(--accent-2); font-style: normal; }
    @keyframes scroll { to { transform: translateX(-50%); } }
    .groups { display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 18px; }
    .group { padding: 24px; }
    h3 { font-size: 18px; margin-bottom: 14px; }
    .chips { display: flex; flex-wrap: wrap; gap: 8px; }
    .chip { transition: all .25s var(--ease); }
    .chip:hover { color: var(--text); border-color: var(--accent); transform: translateY(-2px); }
  `,
})
export class Skills {
  protected readonly skills = SKILLS;
  protected readonly rows = [
    SKILLS.slice(0, 2).flatMap((g) => g.items),
    SKILLS.slice(2).flatMap((g) => g.items),
  ];
}

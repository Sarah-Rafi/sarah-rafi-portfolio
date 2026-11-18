import { ChangeDetectionStrategy, Component, ElementRef, computed, signal, viewChild } from '@angular/core';
import { PROJECTS, Project, ProjectCategory } from '../data/projects';
import { Reveal, Tilt } from '../shared/motion';

export type Filter = 'all' | ProjectCategory;

/** Pure function so it can be unit-tested: filters by category and puts featured projects first. */
export function filterProjects(list: Project[], filter: Filter): Project[] {
  return list
    .filter((p) => filter === 'all' || p.category === filter)
    .sort((a, b) => Number(!!b.featured) - Number(!!a.featured));
}

const LINK_LABELS: Record<keyof Project['links'], string> = {
  website: 'Live site', appStore: 'App Store', playStore: 'Play Store', github: 'Code',
};

@Component({
  selector: 'app-projects',
  imports: [Reveal, Tilt],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="projects">
      <div class="container">
        <span class="eyebrow" reveal>Selected work</span>
        <h2 class="section-title" reveal="80">Projects I’m <span class="grad-text">proud of.</span></h2>

        <div class="filters" role="tablist" aria-label="Filter projects" reveal="140">
          @for (f of filters; track f.id) {
            <button role="tab" [attr.aria-selected]="filter() === f.id" [class.active]="filter() === f.id" (click)="filter.set(f.id)">
              {{ f.label }} <span class="count">{{ counts()[f.id] }}</span>
            </button>
          }
        </div>

        <div class="grid">
          @for (p of visible(); track p.title; let i = $index) {
            <button class="project card" tilt="8" [style.--accent-local]="p.accent" (click)="open(p)"
                    animate.enter="pop-in" [style.animation-delay.ms]="i * 60" [attr.aria-label]="'Open details for ' + p.title">
              <span class="glow" aria-hidden="true"></span>
              @if (p.featured) { <span class="badge">Featured</span> }
              <span class="cat">{{ p.category }}</span>
              <h3>{{ p.title }}</h3>
              <p class="tagline">{{ p.tagline }}</p>
              <span class="stack">
                @for (s of p.stack.slice(0, 4); track s) { <span class="chip">{{ s }}</span> }
              </span>
              <span class="more" aria-hidden="true">Details ↗</span>
            </button>
          } @empty {
            <p>No projects in this category yet.</p>
          }
        </div>
      </div>

      <dialog #dialog (close)="selected.set(null)" (click)="onBackdrop($event)" aria-labelledby="project-title">
        @if (selected(); as p) {
          <div class="modal" animate.enter="pop-in" [style.--accent-local]="p.accent">
            <button class="close" (click)="dialog.close()" aria-label="Close">✕</button>
            <span class="cat">{{ p.category }}</span>
            <h3 id="project-title">{{ p.title }}</h3>
            <p class="tagline">{{ p.tagline }}</p>
            <p class="desc">{{ p.description }}</p>
            <h4>Highlights</h4>
            <ul>@for (h of p.highlights; track h) { <li>{{ h }}</li> }</ul>
            <h4>Stack</h4>
            <div class="stack">@for (s of p.stack; track s) { <span class="chip">{{ s }}</span> }</div>
            <div class="links">
              @for (l of linksOf(p); track l.url) {
                <a class="btn" [class.primary]="$first" [href]="l.url" target="_blank" rel="noopener">{{ l.label }} ↗</a>
              }
            </div>
          </div>
        }
      </dialog>
    </section>
  `,
  styles: `
    .filters { display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 36px; }
    .filters button { font: 600 14px var(--font-display); padding: 10px 18px; border-radius: 999px; cursor: pointer;
      border: 1px solid var(--card-border); background: var(--card); color: var(--muted); text-transform: capitalize;
      transition: all .3s var(--ease); }
    .filters button.active { background: var(--grad); color: #0a0a12; border-color: transparent; }
    .count { opacity: .6; margin-left: 4px; }

    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr)); gap: 22px; }
    .project { position: relative; overflow: hidden; text-align: left; padding: 28px; cursor: pointer; color: var(--text);
      font: inherit; display: flex; flex-direction: column; gap: 10px; min-height: 280px; animation-fill-mode: both; }
    .project:hover { border-color: var(--accent-local); }
    .glow { position: absolute; inset: 0; opacity: 0; transition: opacity .4s; pointer-events: none;
      background: radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), color-mix(in srgb, var(--accent-local) 28%, transparent), transparent 60%); }
    .project:hover .glow { opacity: 1; }
    .badge { position: absolute; top: 18px; right: 18px; font-size: 11px; font-weight: 700; padding: 4px 10px; border-radius: 999px;
      background: var(--accent-local); color: #0a0a12; text-transform: uppercase; letter-spacing: .06em; }
    .cat { font: 600 12px var(--font-display); letter-spacing: .14em; text-transform: uppercase; color: var(--accent-local); }
    h3 { font-size: 26px; transform: translateZ(30px); }
    .tagline { color: var(--muted); }
    .stack { display: flex; flex-wrap: wrap; gap: 6px; margin-top: auto; }
    .more { font: 600 14px var(--font-display); color: var(--accent-local); transition: transform .3s var(--ease); }
    .project:hover .more { transform: translateX(6px); }

    dialog { border: none; padding: 0; background: transparent; max-width: min(640px, 100% - 32px); width: 100%; color: var(--text); }
    dialog::backdrop { background: rgba(5, 5, 12, .7); backdrop-filter: blur(8px); }
    .modal { position: relative; background: var(--bg-2); border: 1px solid var(--card-border); border-radius: var(--radius);
      padding: 36px; display: grid; gap: 12px; box-shadow: 0 40px 120px -30px var(--accent-local); }
    .modal h3 { font-size: 34px; }
    .modal h4 { font-size: 14px; text-transform: uppercase; letter-spacing: .12em; color: var(--muted); margin-top: 10px; }
    .modal ul { margin: 0; padding-left: 18px; display: grid; gap: 4px; }
    .desc { line-height: 1.7; }
    .links { display: flex; flex-wrap: wrap; gap: 10px; margin-top: 16px; }
    .close { position: absolute; top: 16px; right: 16px; width: 40px; height: 40px; border-radius: 50%; cursor: pointer;
      background: var(--card); border: 1px solid var(--card-border); color: var(--text); font-size: 16px; }
  `,
})
export class Projects {
  private readonly dialog = viewChild.required<ElementRef<HTMLDialogElement>>('dialog');

  protected readonly filters: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' }, { id: 'mobile', label: 'Mobile' }, { id: 'web', label: 'Web' }, { id: 'fullstack', label: 'Full stack' },
  ];
  protected readonly filter = signal<Filter>('all');
  protected readonly selected = signal<Project | null>(null);
  protected readonly visible = computed(() => filterProjects(PROJECTS, this.filter()));
  protected readonly counts = computed(() =>
    Object.fromEntries(this.filters.map((f) => [f.id, filterProjects(PROJECTS, f.id).length])) as Record<Filter, number>,
  );

  open(p: Project) {
    this.selected.set(p);
    this.dialog().nativeElement.showModal(); // native <dialog> handles the focus trap, Escape and focus restore for free
  }

  onBackdrop(e: MouseEvent) {
    if (e.target === this.dialog().nativeElement) this.dialog().nativeElement.close();
  }

  linksOf(p: Project) {
    return (Object.keys(p.links) as (keyof Project['links'])[])
      .filter((k) => p.links[k])
      .map((k) => ({ label: LINK_LABELS[k], url: p.links[k]! }));
  }
}

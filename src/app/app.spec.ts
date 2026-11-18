// jsdom has no IntersectionObserver; the motion directives only need a no-op one here.
globalThis.IntersectionObserver ??= class { observe() {} unobserve() {} disconnect() {} } as unknown as typeof IntersectionObserver;

import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { PROJECTS } from './data/projects';
import { filterProjects } from './sections/projects';

describe('App', () => {
  it('renders the hero with the name', async () => {
    await TestBed.configureTestingModule({ imports: [App] }).compileComponents();
    const fixture = TestBed.createComponent(App);
    await fixture.whenStable();
    expect((fixture.nativeElement as HTMLElement).querySelector('h1')?.textContent).toContain('Sarah Rafi');
  });
});

describe('projects data', () => {
  it('every project has a title, a description, a stack and at least one link', () => {
    for (const p of PROJECTS) {
      expect(p.title && p.description && p.stack.length).toBeTruthy();
      expect(Object.values(p.links).some(Boolean)).toBe(true);
    }
  });

  it('titles are unique (they are used as @for track keys)', () => {
    expect(new Set(PROJECTS.map((p) => p.title)).size).toBe(PROJECTS.length);
  });
});

describe('filterProjects', () => {
  it('"all" returns everything, with featured first', () => {
    const out = filterProjects(PROJECTS, 'all');
    expect(out.length).toBe(PROJECTS.length);
    const firstNonFeatured = out.findIndex((p) => !p.featured);
    expect(out.slice(firstNonFeatured).some((p) => p.featured)).toBe(false);
  });

  it('filters by category', () => {
    expect(filterProjects(PROJECTS, 'mobile').every((p) => p.category === 'mobile')).toBe(true);
  });
});

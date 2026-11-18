import { Injectable, effect, signal } from '@angular/core';

export type Theme = 'dark' | 'light';

/** App-wide theme, held in a signal. An `effect` copies it to <html data-theme> and saves it to localStorage. */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  readonly theme = signal<Theme>(this.read());

  constructor() {
    effect(() => {
      const t = this.theme();
      document.documentElement.dataset['theme'] = t;
      try { localStorage.setItem('theme', t); } catch { /* private mode: theme just won't persist */ }
    });
  }

  toggle() {
    const next = this.theme() === 'dark' ? 'light' : 'dark';
    // Uses a View Transition for a smooth cross-fade where the browser supports it.
    const doc = document as Document & { startViewTransition?: (cb: () => void) => void };
    // The DOM write happens inside the callback because the effect runs asynchronously, after the snapshot is taken.
    const apply = () => { this.theme.set(next); document.documentElement.dataset['theme'] = next; };
    doc.startViewTransition ? doc.startViewTransition(apply) : apply();
  }

  private read(): Theme {
    try { return (localStorage.getItem('theme') as Theme) || 'dark'; } catch { return 'dark'; }
  }
}

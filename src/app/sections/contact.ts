import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { PROFILE } from '../data/profile';
import { Magnetic, Reveal } from '../shared/motion';

@Component({
  selector: 'app-contact',
  imports: [Reveal, Magnetic],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section id="contact">
      <div class="container box card" reveal>
        <span class="eyebrow">Contact</span>
        <h2>Let’s build something <span class="grad-text">great</span> together.</h2>
        <p>Open to Angular and full stack roles, remote or in Lahore.</p>
        <div class="actions">
          <a class="btn primary" [href]="'mailto:' + p.email" magnetic>Email me ↗</a>
          <button class="btn" (click)="copy()" magnetic>{{ copied() ? 'Copied ✓' : 'Copy email' }}</button>
          <a class="btn" [href]="p.linkedin" target="_blank" rel="noopener" magnetic>LinkedIn ↗</a>
          <a class="btn" [href]="p.github" target="_blank" rel="noopener" magnetic>GitHub ↗</a>
        </div>
        <p class="small"><a [href]="'tel:' + p.phone">{{ p.phone }}</a> · {{ p.location }}</p>
      </div>
      @if (copied()) { <div class="toast" role="status" animate.enter="pop-in" animate.leave="fade-out">Email copied to clipboard</div> }
    </section>
  `,
  styles: `
    .box { text-align: center; padding: clamp(40px, 8vw, 90px) 24px; position: relative; overflow: hidden; }
    .box::before { content: ''; position: absolute; inset: -50%; background: conic-gradient(from 0deg, transparent, var(--accent), transparent 30%);
      animation: spin 8s linear infinite; opacity: .25; z-index: -1; }
    @keyframes spin { to { transform: rotate(360deg); } }
    .eyebrow { justify-content: center; }
    h2 { font-size: clamp(34px, 6vw, 68px); margin: 18px auto; max-width: 800px; }
    p { color: var(--muted); }
    .actions { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin: 36px 0 24px; }
    .small { font-size: 14px; } .small a { text-decoration: none; }
    .toast { position: fixed; bottom: 24px; left: 50%; translate: -50% 0; z-index: 50; padding: 12px 20px; border-radius: 12px;
      background: var(--text); color: var(--bg); font-weight: 600; }
  `,
})
export class Contact {
  protected readonly p = PROFILE;
  protected readonly copied = signal(false);

  async copy() {
    try {
      await navigator.clipboard.writeText(this.p.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      location.href = `mailto:${this.p.email}`; // clipboard blocked: open the mail app instead
    }
  }
}

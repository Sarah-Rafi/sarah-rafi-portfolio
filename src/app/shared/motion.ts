import { Directive, DestroyRef, ElementRef, afterNextRender, inject, input } from '@angular/core';

/** True when the OS asks for less motion. Every directive below checks this. */
export const reducedMotion = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Run `fn` once when the element first scrolls into view. */
function onFirstVisible(el: Element, destroyRef: DestroyRef, fn: () => void, threshold = 0.15) {
  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        fn();
        io.disconnect();
      }
    },
    { threshold },
  );
  io.observe(el);
  destroyRef.onDestroy(() => io.disconnect());
}

/** Fades or slides an element in when it scrolls into view. `[reveal]="120"` adds a 120ms delay, for staggering. */
@Directive({ selector: '[reveal]', host: { class: 'reveal', '[style.--reveal-delay.ms]': 'reveal() || 0' } })
export class Reveal {
  readonly reveal = input<number | string>(0);
  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => onFirstVisible(el, destroyRef, () => el.classList.add('is-visible')));
  }
}

/** 3D tilt that follows the pointer. Writes CSS variables, so the browser does the animating (no change detection runs). */
@Directive({
  selector: '[tilt]',
  host: { '(pointermove)': 'move($event)', '(pointerleave)': 'reset()', class: 'tilt' },
})
export class Tilt {
  readonly tilt = input<number | string>(10);
  private el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;

  move(e: PointerEvent) {
    if (reducedMotion() || e.pointerType === 'touch') return;
    const r = this.el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const max = Number(this.tilt() || 10);
    this.el.style.setProperty('--rx', `${(0.5 - y) * max}deg`);
    this.el.style.setProperty('--ry', `${(x - 0.5) * max}deg`);
    this.el.style.setProperty('--mx', `${x * 100}%`);
    this.el.style.setProperty('--my', `${y * 100}%`);
  }
  reset() {
    this.el.style.setProperty('--rx', '0deg');
    this.el.style.setProperty('--ry', '0deg');
  }
}

/** Element drifts toward the cursor, like a magnet. */
@Directive({
  selector: '[magnetic]',
  host: { '(pointermove)': 'move($event)', '(pointerleave)': 'reset()', class: 'magnetic' },
})
export class Magnetic {
  private el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
  move(e: PointerEvent) {
    if (reducedMotion()) return;
    const r = this.el.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width / 2);
    const dy = e.clientY - (r.top + r.height / 2);
    this.el.style.transform = `translate(${dx * 0.3}px, ${dy * 0.4}px)`;
  }
  reset() {
    this.el.style.transform = '';
  }
}

/** Counts from 0 up to the target number the first time the element becomes visible. */
@Directive({ selector: '[countUp]' })
export class CountUp {
  readonly countUp = input.required<number>();
  readonly suffix = input('');
  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      const target = this.countUp();
      el.textContent = `0${this.suffix()}`;
      onFirstVisible(el, destroyRef, () => {
        if (reducedMotion()) return void (el.textContent = `${target}${this.suffix()}`);
        const start = performance.now();
        const tick = (t: number) => {
          const p = Math.min((t - start) / 1400, 1);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = `${Math.round(target * eased)}${this.suffix()}`;
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    });
  }
}

/** Types out each word, deletes it, then moves on to the next, in a loop. */
@Directive({ selector: '[typewriter]' })
export class Typewriter {
  readonly typewriter = input.required<string[]>();
  constructor() {
    const el = inject(ElementRef<HTMLElement>).nativeElement as HTMLElement;
    let timer: ReturnType<typeof setTimeout>;
    inject(DestroyRef).onDestroy(() => clearTimeout(timer));
    afterNextRender(() => {
      const words = this.typewriter();
      if (reducedMotion()) return void (el.textContent = words[0]);
      let w = 0, i = 0, deleting = false;
      const step = () => {
        const word = words[w];
        i += deleting ? -1 : 1;
        el.textContent = word.slice(0, i);
        let delay = deleting ? 35 : 75;
        if (!deleting && i === word.length) [deleting, delay] = [true, 1600];
        else if (deleting && i === 0) [deleting, w, delay] = [false, (w + 1) % words.length, 300];
        timer = setTimeout(step, delay);
      };
      step();
    });
  }
}

export const MOTION = [Reveal, Tilt, Magnetic, CountUp, Typewriter] as const;

/** @type {import('tailwindcss').Config} */

// Every colour is a CSS variable defined in src/index.css (:root).
// Change the palette there, not here.
const token = (name) => `rgb(var(--c-${name}) / <alpha-value>)`;

const ease = 'cubic-bezier(0.2, 0.7, 0.2, 1)';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        paper: token('paper'),
        'paper-deep': token('paper-deep'),
        card: token('card'),
        polaroid: token('polaroid'),
        'photo-empty': token('photo-empty'),
        beige: token('beige'),
        blush: token('blush'),
        'blush-soft': token('blush-soft'),
        note: token('note'),
        'rose-line': token('rose-line'),
        dusty: token('dusty'),
        'dusty-deep': token('dusty-deep'),
        burgundy: token('burgundy'),
        ink: token('ink'),
        'ink-soft': token('ink-soft'),
        'ink-faint': token('ink-faint'),
        line: token('line'),
        stem: token('stem'),
        leaf: token('leaf'),
        'petal-cream': token('petal-cream'),
        'petal-pink': token('petal-pink'),
        pistil: token('pistil'),
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        hand: ['Caveat', 'cursive'],
        script: ['Sacramento', 'cursive'],
      },
      boxShadow: {
        cell: '0 1px 1px rgb(var(--c-shadow) / 0.05), 0 3px 8px -4px rgb(var(--c-shadow) / 0.16)',
        lift: '0 2px 3px rgb(var(--c-shadow) / 0.07), 0 12px 20px -10px rgb(var(--c-shadow) / 0.32)',
        paper: '0 1px 2px rgb(var(--c-shadow) / 0.06), 0 18px 40px -18px rgb(var(--c-shadow) / 0.32)',
        note: '1px 2px 0 rgb(var(--c-shadow) / 0.04), 0 16px 26px -12px rgb(var(--c-shadow) / 0.34)',
        polaroid: '0 1px 2px rgb(var(--c-shadow) / 0.14), 0 14px 30px -10px rgb(var(--c-shadow) / 0.4)',
        panel: '0 30px 70px -24px rgb(var(--c-shadow) / 0.55)',
      },
      keyframes: {
        'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
        'hero-in': {
          from: { opacity: '0', filter: 'blur(4px)' },
          to: { opacity: '1', filter: 'blur(0)' },
        },
        rise: {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'memory-in': {
          from: { opacity: '0', transform: 'translateY(56px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'month-next': {
          from: { opacity: '0', transform: 'translateX(16px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'month-prev': {
          from: { opacity: '0', transform: 'translateX(-16px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'photo-next': {
          from: { opacity: '0', transform: 'translateX(26px)' },
          to: { opacity: '1', transform: 'none' },
        },
        'photo-prev': {
          from: { opacity: '0', transform: 'translateX(-26px)' },
          to: { opacity: '1', transform: 'none' },
        },
        drift: {
          '0%, 100%': { transform: 'translate(0, 0) rotate(0deg)' },
          '50%': { transform: 'translate(0, -4px) rotate(1.5deg)' },
        },
        heartbeat: {
          '0%, 100%': { transform: 'scale(1)' },
          '45%': { transform: 'scale(1.2)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.4s ease-out both',
        'hero-in': 'hero-in 1.2s ease-out both',
        rise: `rise 1s ${ease} 0.2s both`,
        'memory-in': `memory-in 0.6s ${ease} both`,
        'month-next': `month-next 0.45s ${ease} both`,
        'month-prev': `month-prev 0.45s ${ease} both`,
        'photo-next': `photo-next 0.55s ${ease} both`,
        'photo-prev': `photo-prev 0.55s ${ease} both`,
        drift: 'drift 9s ease-in-out infinite',
        heartbeat: 'heartbeat 1.6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

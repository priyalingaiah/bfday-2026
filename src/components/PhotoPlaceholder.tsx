import { Camera } from 'lucide-react';

export type PlaceholderSize = 'sm' | 'md' | 'lg';

const STYLES: Record<PlaceholderSize, { icon: string; text: string; gap: string }> = {
  sm: { icon: 'hidden', text: 'text-[11px] leading-none', gap: 'gap-1' },
  md: { icon: 'h-5 w-5', text: 'text-base', gap: 'gap-1.5' },
  lg: { icon: 'h-7 w-7 sm:h-8 sm:w-8', text: 'text-xl sm:text-2xl', gap: 'gap-2' },
};

/** The soft "our photo here ♡" shown until a real photograph is added. */
export function PhotoPlaceholder({ size = 'lg' }: { size?: PlaceholderSize }) {
  const s = STYLES[size];
  return (
    <div
      role="img"
      aria-label="Photo coming soon"
      className={`absolute inset-0 flex flex-col items-center justify-center bg-photo-empty text-ink-soft/60 ${s.gap}`}
    >
      <Camera aria-hidden="true" strokeWidth={1.2} className={s.icon} />
      <span className={`font-hand ${s.text}`}>
        our photo here <span className="text-dusty/70">♡</span>
      </span>
    </div>
  );
}

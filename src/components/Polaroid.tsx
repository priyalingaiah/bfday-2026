import type { CSSProperties, ReactNode } from 'react';
import { PhotoImage } from './PhotoImage';
import { PhotoPlaceholder } from './PhotoPlaceholder';

type PolaroidSize = 'sm' | 'md' | 'lg';

const FRAMES: Record<PolaroidSize, string> = {
  sm: 'p-1 pb-3.5 sm:p-1.5 sm:pb-4',
  md: 'p-2.5 pb-9',
  lg: 'p-3 pb-12 sm:p-4 sm:pb-16',
};

const PHOTO_AREA = {
  cover: 'aspect-[1/1.04]',
  natural: '',
  fill: 'flex-1',
} as const;

/** Gentle, varied tilts so a set of Polaroids never looks machine-aligned. */
export const POLAROID_TILTS = [-3, 2, -1, 4, -2, 3];

export function tiltFor(index: number): number {
  return POLAROID_TILTS[index % POLAROID_TILTS.length];
}

export interface PolaroidProps {
  src?: string;
  alt?: string;
  /** Rotation in degrees. */
  rotation?: number;
  size?: PolaroidSize;
  /** Lifts and straightens slightly on hover. */
  interactive?: boolean;
  /** Arrives slightly crooked and settles into place. */
  settle?: boolean;
  /** 'full' shows "your photo here" when the photo is missing; 'blank' leaves it empty (for stacked backing cards). */
  placeholder?: 'full' | 'blank';
  /**
   * 'cover' — fixed near-square print, photo cropped to fill (thumbnails).
   * 'natural' — the print takes the photo's own shape, nothing cropped.
   * 'fill' — stretches to its parent (stacked backing cards).
   */
  fit?: 'cover' | 'natural' | 'fill';
  /** For fit='natural': limits on the photo size, e.g. 'max-h-[58vh] max-w-[440px]'. */
  photoClassName?: string;
  caption?: ReactNode;
  className?: string;
}

export function Polaroid({
  src,
  alt = '',
  rotation = 0,
  size = 'lg',
  interactive = false,
  settle = false,
  placeholder = 'full',
  fit = 'cover',
  photoClassName = 'max-w-full',
  caption,
  className = '',
}: PolaroidProps) {
  const style = { '--rot': `${rotation}deg` } as CSSProperties;

  return (
    <figure
      className={`polaroid ${interactive ? 'polaroid-interactive' : ''} ${settle ? 'polaroid-settle' : ''} ${
        fit === 'fill' ? 'flex h-full w-full flex-col' : ''
      } ${FRAMES[size]} ${className}`}
      style={style}
    >
      <div className={`photo-inset relative overflow-hidden bg-photo-empty ${PHOTO_AREA[fit]}`}>
        {fit === 'natural' ? (
          <PhotoImage
            src={src}
            alt={alt}
            className={`photo-warm block h-auto w-auto ${photoClassName}`}
            fallback={
              <div className="relative aspect-[1/1.04] w-[min(70vw,340px)]">
                {placeholder === 'full' && <PhotoPlaceholder size={size} />}
              </div>
            }
          />
        ) : (
          <PhotoImage
            src={src}
            alt={alt}
            className="photo-warm absolute inset-0 h-full w-full object-cover"
            fallback={placeholder === 'full' ? <PhotoPlaceholder size={size} /> : null}
          />
        )}
        {size !== 'sm' && <div aria-hidden="true" className="film-grain absolute inset-0" />}
      </div>
      {caption && (
        <figcaption className="absolute inset-x-0 bottom-0 flex h-12 items-center justify-center font-hand text-xl text-ink-soft sm:h-16">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

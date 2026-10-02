import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { useSwipe } from '../hooks/useSwipe';
import { FlowerSprig, HandHeart, Tape } from './DecorativeElements';
import { IconButton } from './IconButton';
import { Polaroid, tiltFor } from './Polaroid';

interface PolaroidGalleryProps {
  photos: string[];
  /** Used in alt text, e.g. "Our Anniversary". */
  label: string;
  /** Smaller pile, for days with several events side by side. */
  compact?: boolean;
  /** Flip the flower to the other side so neighbouring galleries don't mirror each other. */
  flowerSide?: 'left' | 'right';
}

/**
 * A little pile of Polaroids: the current photo on top, the next ones
 * peeking out underneath, and the rest laid out as small prints below.
 * Works with 0, 1 or many photos. Swipe, use ← / → while focused, or tap a print.
 */
export function PolaroidGallery({ photos, label, compact = false, flowerSide = 'right' }: PolaroidGalleryProps) {
  const count = photos.length;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const stripRef = useRef<HTMLUListElement>(null);

  const step = useCallback(
    (delta: 1 | -1) => {
      if (count < 2) return;
      setDirection(delta);
      setIndex((i) => (i + delta + count) % count);
    },
    [count],
  );

  const select = (i: number) => {
    if (i === index) return;
    setDirection(i > index ? 1 : -1);
    setIndex(i);
  };

  const swipe = useSwipe({ onSwipeLeft: () => step(1), onSwipeRight: () => step(-1) });

  // arrows only steer the gallery that has focus (a day can hold several)
  const onKeyDown = (event: KeyboardEvent) => {
    if (count < 2 || event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    }
  };

  // keep the active print in view when there are more than fit
  useEffect(() => {
    const strip = stripRef.current;
    const item = strip?.children[index] as HTMLElement | undefined;
    if (!strip || !item || strip.scrollWidth <= strip.clientWidth) return;
    strip.scrollTo({ left: item.offsetLeft - (strip.clientWidth - item.clientWidth) / 2, behavior: 'smooth' });
  }, [index]);

  const photoAlt = (i: number) => `Photo ${i + 1}${count > 1 ? ` of ${count}` : ''}: ${label}`;
  // the print takes each photo's own shape; these only cap how big it gets
  const photoSize = compact ? 'max-h-[46vh] max-w-[min(70vw,320px)]' : 'max-h-[60vh] max-w-[min(82vw,460px)]';
  const flower =
    flowerSide === 'right'
      ? '-right-10 top-[26%] rotate-[8deg] sm:-right-14'
      : '-left-10 top-[30%] -scale-x-100 rotate-[-8deg] sm:-left-14';

  return (
    <div className="flex w-full flex-col items-center" onKeyDown={onKeyDown}>
      <div
        className="relative mx-auto mt-6 w-fit touch-pan-y select-none sm:mt-8"
        role="group"
        aria-roledescription="carousel"
        aria-label={`Photos: ${label}`}
        tabIndex={count > 1 ? 0 : undefined}
        {...swipe}
      >
        {/* the rest of the pile */}
        <div aria-hidden="true" className="absolute inset-0 -translate-x-[4%] translate-y-[2%]">
          <Polaroid rotation={-7} placeholder="blank" fit="fill" src={count > 1 ? photos[(index + 1) % count] : undefined} />
        </div>
        <div aria-hidden="true" className="absolute inset-0 translate-x-[3%] -translate-y-[1%]">
          <Polaroid rotation={5} placeholder="blank" fit="fill" src={count > 2 ? photos[(index + 2) % count] : undefined} />
        </div>

        <div key={index} className={`relative ${direction === 1 ? 'animate-photo-next' : 'animate-photo-prev'}`}>
          <Polaroid src={photos[index]} alt={photoAlt(index)} rotation={tiltFor(index)} fit="natural" photoClassName={photoSize} interactive settle />
        </div>

        <Tape className="absolute -top-3 left-[16%] h-7 w-20 -rotate-[14deg] sm:w-24" />
        <Tape className="absolute -bottom-2 -right-4 h-7 w-20 -rotate-[34deg] sm:w-24" />
        <FlowerSprig className={`pointer-events-none absolute w-20 sm:w-24 ${flower}`} />
      </div>

      {count > 1 && (
        <>
          <ul ref={stripRef} className="no-scrollbar relative mt-10 flex w-full gap-3 overflow-x-auto px-2 pb-3 pt-3 sm:mt-12 sm:gap-4">
            {photos.map((photo, i) => {
              const active = i === index;
              return (
                <li key={`${photo}-${i}`} className="relative shrink-0 first:ml-auto last:mr-auto">
                  <button
                    type="button"
                    onClick={() => select(i)}
                    aria-label={`Show photo ${i + 1} of ${count}`}
                    aria-current={active ? 'true' : undefined}
                    className={`block w-[62px] transition duration-500 ease-out sm:w-[74px] ${
                      active ? '-translate-y-1.5' : 'opacity-75 hover:-translate-y-0.5 hover:opacity-100'
                    }`}
                  >
                    <Polaroid src={photo} size="sm" rotation={active ? 0 : tiltFor(i + 1) * 0.7} />
                  </button>
                  <HandHeart
                    filled
                    className={`absolute -bottom-2.5 left-1/2 h-3 w-3 -translate-x-1/2 text-dusty transition-opacity duration-500 ${
                      active ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                </li>
              );
            })}
          </ul>

          <div className="mt-3 flex w-full items-center justify-between px-1">
            <IconButton label="Previous photo" size="sm" onClick={() => step(-1)}>
              <ChevronLeft aria-hidden="true" strokeWidth={1.6} className="h-4 w-4" />
            </IconButton>
            <p className="font-serif text-lg italic text-ink-soft" aria-live="polite">
              <span className="sr-only">Photo </span>
              {index + 1} <span className="mx-0.5 text-ink-faint">/</span> {count}
            </p>
            <IconButton label="Next photo" size="sm" onClick={() => step(1)}>
              <ChevronRight aria-hidden="true" strokeWidth={1.6} className="h-4 w-4" />
            </IconButton>
          </div>
        </>
      )}
    </div>
  );
}

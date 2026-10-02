import { site } from '../data/site';
import { FlowerSprig, HandHeart, PressedFlower, Sparkle } from './DecorativeElements';
import { PhotoImage } from './PhotoImage';

/** The torn header: our photo as the background, our words centred on top of it. */
export function Hero() {
  return (
    <header className="relative animate-hero-in">
      <div className="hero-shadow">
        {/* cream photo-paper core that shows along the tear */}
        <div className="torn-paper relative">
          <div className="torn-photo hero-dream relative mb-[5px] overflow-hidden">
            <PhotoImage
              src={site.heroPhoto}
              alt={site.heroPhotoAlt}
              loading="eager"
              fallback={null}
              className="photo-warm absolute inset-0 h-full w-full object-cover object-[center_28%]"
            />
            {/* soft blush wash + a brighter glow behind the words so they stay readable */}
            <div aria-hidden="true" className="absolute inset-0 bg-blush-soft/30" />
            <div aria-hidden="true" className="hero-wash absolute inset-0" />
            <div aria-hidden="true" className="light-leak absolute inset-0" />
            <div aria-hidden="true" className="film-grain absolute inset-0 opacity-[0.14]" />

            <div className="text-photo relative flex min-h-[440px] flex-col items-center justify-center px-5 py-12 text-center sm:min-h-[500px] lg:h-[580px]">
              {/* the focal point */}
              <h1 className="relative animate-rise font-script text-[52px] leading-[0.95] text-dusty-deep sm:text-[72px] lg:text-[92px]">
                <Sparkle className="absolute -left-4 top-1 h-3 w-3 text-dusty/70 sm:-left-7 sm:h-4 sm:w-4" />
                <span className="block">{site.loveLine1}</span>
                <span className="block">
                  {site.loveLine2}
                  <HandHeart filled className="ml-2 inline-block h-7 w-7 align-middle text-dusty sm:h-9 sm:w-9 lg:h-11 lg:w-11" />
                </span>
              </h1>

              <p className="mt-5 max-w-[30ch] font-hand text-[18px] font-medium leading-snug text-ink sm:mt-8 sm:max-w-none sm:text-[22px] lg:mt-9">
                {site.subline} <span aria-hidden="true" className="text-dusty">♡</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <FlowerSprig variant="deep" className="pointer-events-none absolute -left-3 -top-3 hidden w-24 origin-bottom animate-drift sm:block lg:w-28" />
      <PressedFlower className="pointer-events-none absolute -bottom-7 left-[12%] w-11 -rotate-[18deg] opacity-90 sm:w-14" />
    </header>
  );
}

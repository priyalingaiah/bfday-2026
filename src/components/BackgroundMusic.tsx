import { Music2, Volume2, VolumeX } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { site } from '../data/site';
import { resolvePhotoSrc } from '../lib/photos';

const MUTED_KEY = 'our-calendar-muted';
const VOLUME = 0.5;
const FIRST_INTERACTION = ['pointerdown', 'keydown', 'touchstart'] as const;

function readMuted(): boolean {
  try {
    return localStorage.getItem(MUTED_KEY) === '1';
  } catch {
    return false;
  }
}

function saveMuted(muted: boolean) {
  try {
    localStorage.setItem(MUTED_KEY, muted ? '1' : '0');
  } catch {
    // private mode etc. — the choice just isn't remembered
  }
}

/**
 * Our song, looping softly in the background, with a small mute/unmute button.
 * Browsers block sound until the visitor interacts with the page, so if
 * autoplay is refused the song starts on the first tap, click or key press.
 * If the song file is missing, nothing is shown.
 */
export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(readMuted);
  const [playing, setPlaying] = useState(false);
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !available || muted) return;
    audio.volume = VOLUME;

    const stopWaiting = () => FIRST_INTERACTION.forEach((type) => window.removeEventListener(type, tryPlay));
    function tryPlay() {
      audio!
        .play()
        .then(stopWaiting)
        .catch(() => {
          // autoplay refused — keep waiting for the first interaction
        });
    }
    FIRST_INTERACTION.forEach((type) => window.addEventListener(type, tryPlay));
    tryPlay();
    return stopWaiting;
  }, [muted, available]);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (muted || !playing) {
      setMuted(false);
      saveMuted(false);
      audio.volume = VOLUME;
      audio.play().catch(() => {});
    } else {
      audio.pause();
      setMuted(true);
      saveMuted(true);
    }
  };

  const label = muted ? 'Play our song' : playing ? 'Mute our song' : 'Play our song';
  const Icon = muted ? VolumeX : playing ? Volume2 : Music2;

  return (
    <>
      <audio
        ref={audioRef}
        src={encodeURI(resolvePhotoSrc(site.song))}
        loop
        preload="auto"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setAvailable(false)}
      />

      {available && (
        <button
          type="button"
          onClick={toggle}
          aria-label={label}
          title={label}
          className="fixed right-3 top-3 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full border border-dusty/35 bg-polaroid/90 text-dusty-deep shadow-cell backdrop-blur-sm transition duration-300 hover:-translate-y-px hover:border-dusty/60 hover:bg-blush-soft hover:shadow-lift sm:right-5 sm:top-5"
        >
          <Icon aria-hidden="true" strokeWidth={1.7} className={`h-5 w-5 ${!muted && !playing ? 'animate-heartbeat' : ''}`} />
        </button>
      )}
    </>
  );
}

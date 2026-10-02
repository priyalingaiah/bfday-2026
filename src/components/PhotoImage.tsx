import { useState, type ImgHTMLAttributes, type ReactNode } from 'react';
import { resolvePhotoSrc } from '../lib/photos';

interface PhotoImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'onError'> {
  src?: string;
  /** Rendered instead of the image when there is no src or the file can't load. */
  fallback: ReactNode;
}

/** An <img> that never shows a broken-image icon. */
export function PhotoImage({ src, fallback, alt = '', ...rest }: PhotoImageProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);

  if (!src || failedSrc === src) return <>{fallback}</>;

  return (
    <img
      src={resolvePhotoSrc(src)}
      alt={alt}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setFailedSrc(src)}
      {...rest}
    />
  );
}

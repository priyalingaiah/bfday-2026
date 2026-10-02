import type { EventIcon } from '../types/specialDate';
import { HandCake, HandHeart } from './DecorativeElements';

type MarkerSize = 'sm' | 'md' | 'lg';

const SIZES: Record<MarkerSize, string> = {
  sm: 'h-3.5 w-3.5 sm:h-4 sm:w-4',
  md: 'h-5 w-5',
  lg: 'h-6 w-6',
};

interface MarkerProps {
  size?: MarkerSize;
  className?: string;
}

/** Anniversaries and special days. */
export function HeartMarker({ size = 'sm', className = '' }: MarkerProps) {
  return <HandHeart className={`text-dusty ${SIZES[size]} ${className}`} />;
}

/** Birthdays. */
export function CakeMarker({ size = 'sm', className = '' }: MarkerProps) {
  return <HandCake className={`text-dusty-deep/85 ${SIZES[size]} ${className}`} />;
}

/** The right hand-drawn mark for an event icon. */
export function EventMark({ icon, ...props }: MarkerProps & { icon: EventIcon }) {
  return icon === 'cake' ? <CakeMarker {...props} /> : <HeartMarker {...props} />;
}

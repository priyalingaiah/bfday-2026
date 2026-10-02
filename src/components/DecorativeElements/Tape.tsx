interface TapeProps {
  /** 'sand' = translucent paper tape, 'rose' = striped washi. */
  variant?: 'sand' | 'rose';
  /** Size, position and rotation. */
  className?: string;
}

export function Tape({ variant = 'sand', className = '' }: TapeProps) {
  return <span aria-hidden="true" className={`pointer-events-none block ${variant === 'rose' ? 'tape-rose' : 'tape-sand'} ${className}`} />;
}

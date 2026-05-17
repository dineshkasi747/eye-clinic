import { useEffect, useRef, useState } from 'react';
import { useInView, animate } from 'framer-motion';

/**
 * CountUp - animates a number from 0 to `to` when it enters the viewport
 * Props:
 *   to        {number}  - target number
 *   duration  {number}  - animation duration in seconds (default 2)
 *   decimals  {number}  - decimal places (default 0)
 *   prefix    {string}  - text before number e.g. "$"
 *   suffix    {string}  - text after number e.g. "+"
 *   className {string}  - extra classes on the span
 */
export default function CountUp({
  to,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const controls = animate(0, to, {
      duration,
      ease: [0.16, 1, 0.3, 1], // expo out — fast start, smooth land
      onUpdate: (latest) => {
        setValue(parseFloat(latest.toFixed(decimals)));
      },
    });

    return () => controls.stop();
  }, [isInView, to, duration, decimals]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {decimals > 0 ? value.toFixed(decimals) : Math.floor(value)}
      {suffix}
    </span>
  );
}

import { useMemo } from 'react'

type Size = 'sm' | 'lg' | number;

const SIZE_TO_WIDTH: Record<Exclude<Size, number>, number> = {
  sm: 80,
  lg: 120,
};

const SIZE_TO_STROKE_WIDTH: Record<Exclude<Size, number>, number> = {
  sm: 7,
  lg: 9,
};

const PROGRESS = 65;

const Loader = () => {
    const predefinedSize = 'sm', appearance="brand"; // or 'sm', 'md', 'xl', etc.
    const size = typeof predefinedSize === 'number' ? predefinedSize : SIZE_TO_WIDTH[predefinedSize];

  const strokeWidth = useMemo(() => {

    if (typeof predefinedSize === 'number') {
      if (predefinedSize <= SIZE_TO_WIDTH.lg) {
        return SIZE_TO_STROKE_WIDTH.sm;
      }

      return SIZE_TO_STROKE_WIDTH.lg;
    }

    return SIZE_TO_STROKE_WIDTH[predefinedSize];
  }, [appearance, predefinedSize]);

  const circlePosition = size / 2;
  const circleRadius = size / 2 - strokeWidth / 2;
  const circleCircumference = 2 * Math.PI * circleRadius;
  const strokeDasharray = `${circleCircumference} ${circleCircumference}`;
  const strokeDashoffset = circleCircumference - (circleCircumference * PROGRESS) / 100;
  const isLogoVisible = appearance === 'brand' && size === SIZE_TO_WIDTH.lg;
  const hasGradient = appearance === 'brand';
  return (
    <div className="loading-overlay">
      <div className="loading-spinner">
        <div
      aria-busy="true"
      aria-live="polite"
      className={'relative'}
      role="status"
      style={{
        width: size,
        height: size,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${size} ${size}`}
        preserveAspectRatio="xMidYMid"
        role="img"
        focusable={false}
        className="animate-spin"
      >
        <title>Loading spinner</title>
        {hasGradient && (
          <>
            <defs>
              <linearGradient data-testid="loading-gradient" id="loading-gradient" x1="100" y1="0" x2="0" y2="0" gradientUnits="userSpaceOnUse">
                <stop offset={isLogoVisible ? '0' : '40%'} stopColor="#307FE2" />
                <stop offset="100%" stopColor="#002D72" />
              </linearGradient>
            </defs>
            <circle
              data-testid="loading-circle-bg"
              cx={circlePosition}
              cy={circlePosition}
              fill="none"
              stroke="#E5E7EB"
              strokeWidth={strokeWidth}
              r={circleRadius}
              strokeLinecap="round"
            />
          </>
        )}
        <circle
          cx={circlePosition}
          cy={circlePosition}
          fill="none"
          stroke={hasGradient ? 'url(#loading-gradient)' : '#94A3B8'}
          strokeWidth={strokeWidth}
          r={circleRadius}
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      {/* <img
        src="/TJ_mob_logo.svg"
        alt="Trajector logo"
        width={40}
        height={40}
        role="presentation"
        className={`absolute top-1/2 -translate-x-1/2 -translate-y-1/2 ${isLogoVisible ? 'opacity-100' : 'opacity-100'}`}
        style={{left: "29%"}}
      /> */}
    </div>
      </div>
    </div>
  )
}

export default Loader
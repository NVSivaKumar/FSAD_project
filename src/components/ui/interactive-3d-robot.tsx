'use client';

import { Suspense, lazy } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
}

export function InteractiveRobotSpline({ scene, className }: InteractiveRobotSplineProps) {
  const { activeTheme } = useTheme();

  // Use sepia(100%) as a baseline (which operates at approx hue=35deg)
  // Then hue-rotate to our precise target theme hue
  let hueRotation = '0deg';
  switch (activeTheme?.id) {
    case 'ocean':
      hueRotation = '182deg'; // 217 - 35
      break;
    case 'amethyst':
      hueRotation = '236deg'; // 271 - 35
      break;
    case 'sunset':
      hueRotation = '-10deg'; // 25 - 35
      break;
    case 'golden':
      hueRotation = '10deg'; // 45 - 35
      break;
    case 'cyber':
    default:
      hueRotation = '107deg'; // 142 - 35
      break;
  }

  return (
    <Suspense
      fallback={
        <div className={`w-full h-full flex items-center justify-center bg-gray-900 text-white ${className}`}>
          <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l2-2.647z"></path>
          </svg>
        </div>
      }
    >
      <Spline
        scene={scene}
        className={className}
        style={{ filter: `sepia(1) saturate(3) hue-rotate(${hueRotation})`, transition: 'filter 0.5s ease-in-out' }}
      />
    </Suspense>
  );
}

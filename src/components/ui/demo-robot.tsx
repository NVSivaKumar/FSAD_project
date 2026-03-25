'use client';

import React from 'react';
import { InteractiveRobotSpline } from '@/components/ui/interactive-3d-robot'

export function Section() { 
  
  const ROBOT_SCENE_URL = "https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode";

  return (
    <div className="relative w-full h-[400px] overflow-hidden rounded-2xl mb-8">
      <InteractiveRobotSpline
        scene={ROBOT_SCENE_URL}
        className="absolute inset-0 z-0" 
      />
    </div> 
  );
}

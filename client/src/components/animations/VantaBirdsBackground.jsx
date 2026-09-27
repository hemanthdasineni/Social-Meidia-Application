import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';

export const VantaBirdsBackground = ({ className = '', children }) => {
  const vantaRef = useRef(null);
  const [vantaEffect, setVantaEffect] = useState(null);
  const { isDark } = useTheme();

  useEffect(() => {
    let effect = null;
    let isMounted = true;

    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });
    };

    const initializeBirds = async () => {
      try {
        if (!window.THREE) {
          await loadScript('https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js');
        }
        if (!window.VANTA || !window.VANTA.BIRDS) {
          await loadScript('https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js');
        }

        if (isMounted && window.VANTA && window.VANTA.BIRDS && vantaRef.current) {
          // Clean up any existing effect first
          if (effect) effect.destroy();

          effect = window.VANTA.BIRDS({
            el: vantaRef.current,
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            scale: 1.00,
            scaleMobile: 1.00,
            backgroundColor: isDark ? 0x070913 : 0xf1f5f9,
            color1: isDark ? 0x7c3aed : 0x4338ca,
            color2: isDark ? 0x22d3ee : 0x0284c7,
            colorMode: 'variance',
            birdSize: 1.40,
            wingSpan: 30.00,
            speedLimit: 5.00,
            separation: 35.00,
            alignment: 35.00,
            cohesion: 40.00,
            quantity: 4.00,
          });

          setVantaEffect(effect);
        }
      } catch (err) {
        console.error('Vanta Birds script loading error:', err);
      }
    };

    initializeBirds();

    return () => {
      isMounted = false;
      if (effect) {
        try {
          effect.destroy();
        } catch {}
      }
    };
  }, [isDark]);

  return (
    <div className={`relative w-full overflow-hidden ${className}`}>
      {/* Dedicated Vanta Canvas Container */}
      <div
        ref={vantaRef}
        className="absolute inset-0 w-full h-full pointer-events-auto z-0"
        style={{ minHeight: '100%' }}
      />
      {/* Translucent bottom fade into page */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-slate-50 dark:to-[#070913] pointer-events-none z-0" />
      {/* Content Layer */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
